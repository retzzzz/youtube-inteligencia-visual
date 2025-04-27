
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Check, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info } from 'lucide-react';
import { 
  CompetitionData, 
  EntryTimingData, 
  ComparisonData, 
  RecommendationData 
} from '@/types/youtube-types';
import {
  extrairConcorrenciaSubnicho,
  calcularTempoEntrada,
  compararConcorrenciaIdiomas,
  recomendarIdiomaETiming
} from '@/utils/competitionAnalysis';

interface CompetitionAnalysisProps {
  youtubeApiKey?: string;
}

const CompetitionAnalysis: React.FC<CompetitionAnalysisProps> = ({ youtubeApiKey }) => {
  const [subnicho, setSubnicho] = useState('');
  const [maxVideos, setMaxVideos] = useState(50);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['português', 'inglês', 'espanhol']);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeCompetition = async () => {
    if (!subnicho) {
      toast({
        title: "Subnicho é obrigatório",
        description: "Por favor, informe o subnicho para análise.",
        variant: "destructive",
      });
      return;
    }

    if (selectedLanguages.length === 0) {
      toast({
        title: "Selecione pelo menos um idioma",
        description: "É necessário selecionar pelo menos um idioma para análise.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const comparison = await compararConcorrenciaIdiomas(
        subnicho, 
        selectedLanguages, 
        maxVideos, 
        youtubeApiKey
      );
      setComparisonData(comparison);
      
      const recommendationData = recomendarIdiomaETiming(comparison);
      setRecommendation(recommendationData);
      
      toast({
        title: "Análise concluída!",
        description: `Analisamos a concorrência em ${selectedLanguages.length} idiomas para o subnicho "${subnicho}".`,
      });
    } catch (error) {
      console.error("Erro na análise de concorrência:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível completar a análise de concorrência.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Análise de Concorrência por Idioma</h2>
      
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Como funciona</AlertTitle>
        <AlertDescription>
          Esta ferramenta analisa a concorrência em diferentes idiomas para um subnicho específico,
          permitindo identificar oportunidades de entrada em mercados menos saturados.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="subnicho">Subnicho</Label>
            <Input 
              id="subnicho" 
              placeholder="Ex: histórias de pessoas influentes, receitas vegetarianas"
              value={subnicho}
              onChange={(e) => setSubnicho(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="maxVideos">Número máximo de vídeos a analisar: {maxVideos}</Label>
            <input
              type="range"
              id="maxVideos"
              min="10"
              max="100"
              step="5"
              className="w-full"
              value={maxVideos}
              onChange={(e) => setMaxVideos(parseInt(e.target.value))}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Idiomas para análise</Label>
          <div className="grid grid-cols-2 gap-2">
            {["português", "inglês", "espanhol", "francês", "italiano"].map(language => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  id={`lang-${language}`}
                  checked={selectedLanguages.includes(language)}
                  onChange={() => toggleLanguage(language)}
                  className="mr-2"
                />
                <Label htmlFor={`lang-${language}`}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleAnalyzeCompetition}
          disabled={isLoading || !subnicho || selectedLanguages.length === 0}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisando concorrência...
            </>
          ) : (
            "Analisar Concorrência"
          )}
        </Button>
      </div>
      
      {comparisonData.length > 0 && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Comparação de Concorrência por Idioma</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Idioma</TableHead>
                  <TableHead>Canais Concorrentes</TableHead>
                  <TableHead>Idade Média Canais</TableHead>
                  <TableHead>Média Visualizações</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((data, index) => (
                  <TableRow key={`comparison-${index}`}>
                    <TableCell className="font-medium">
                      {data.idioma.charAt(0).toUpperCase() + data.idioma.slice(1)}
                    </TableCell>
                    <TableCell>{data.num_canais_concorrentes}</TableCell>
                    <TableCell>{data.idade_media_canais.toFixed(1)} meses</TableCell>
                    <TableCell>{data.media_visualizacoes_dos_top.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={data.status_entrada === "porta_aberta" ? "outline" : "outline"}
                        className={data.status_entrada === "porta_aberta" ? "bg-green-500 text-white" : ""}
                      >
                        {data.status_entrada === "porta_aberta" ? "Porta Aberta" : "Porta Fechada"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {recommendation && (
            <Card className="p-4 bg-muted/50 border">
              <h3 className="text-lg font-medium mb-2">Recomendação</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    <strong>Idioma Recomendado:</strong> {recommendation.idioma_recomendado.charAt(0).toUpperCase() + recommendation.idioma_recomendado.slice(1)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    <strong>Melhor momento para lançamento:</strong> {recommendation.prazo_sugerido}
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>
                    <strong>Estratégia de título sugerida:</strong> {recommendation.estrategia_titulo}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </Card>
  );
};

export default CompetitionAnalysis;
