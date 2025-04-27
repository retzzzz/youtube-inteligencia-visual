
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenerateTab from './GenerateTab';
import AnalyzeTab from './AnalyzeTab';
import { TitleData } from '@/utils/titleAnalysis';
import { TitleVariation } from '@/pages/TitleGenerator';
import TitleVariations from '../TitleVariations';
import { Button } from "@/components/ui/button";
import {
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes,
  avaliarEPriorizarTitulos,
  extrairTitulosVirais,
  simularExtrairTitulosVirais,
  identificarPadroesTitulos,
  gerarTitulosVirais,
  gerarTitulosMultilingues,
  TitleWithScore,
  TitlePattern,
  MultilingualTitle
} from '@/utils/titleAnalysis';
import {
  gerarVariacoesTitulo,
  gerarVariacoesEstruturadas,
  subnichearTitulos,
  TitleVariations as TitleVariationsType
} from '@/utils/titleGeneration';
import {
  extrairEstruturasRecorrencia,
  identificarGatilhosRecorrencia,
  gerarTitulosRecorrencia,
  planejarCicloRecorrencia,
  RecurrenceStructure,
  RecurrenceTrigger,
  PublicationSchedule as RecurrencePublicationSchedule
} from '@/utils/titleRecurrence';
import {
  extrairPerfilAudiencia,
  gerarMicroSubnichosPorAudiencia,
  adaptarTitulosPorAudiencia,
  planejarCronogramaPorAudiencia,
  AudienceProfile,
  MicroSubnicho,
  PublicationSchedule as AudiencePublicationSchedule
} from '@/utils/audienceAnalysis';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/LanguageSelector";
import AudienceAnalysisForm from "@/components/AudienceAnalysisForm";
import AudienceAnalysisResults from "@/components/AudienceAnalysisResults";
import CompetitionAnalysis from "@/components/CompetitionAnalysis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';

interface TitleGeneratorContainerProps {
  variations: TitleVariation[];
  titulosConcorrentes: TitleData[];
  keyword: string;
  isLoading: boolean;
  onGenerate: (keyword: string, language: string, emotion: string) => void;
  setVariations: (variations: TitleVariation[]) => void;
  variacoesTitulo: TitleVariationsType | null;
  titulosSubnicho: string[];
  titulosPriorizados: TitleWithScore[];
  setVariacoesTitulo: (variations: TitleVariationsType | null) => void;
  setTitulosSubnicho: (titles: string[]) => void;
  setTitulosPriorizados: (titles: TitleWithScore[]) => void;
  youtubeApiKey: string | undefined;
  nicho: string;
  subnicho: string;
  minViews: number;
  maxVideos: number;
  titulosVirais: TitleData[];
  padroesTitulos: TitlePattern[];
  termosChave: string;
  titulosGerados: string[];
  idiomasDestino: string[];
  titulosMultilingues: MultilingualTitle[];
  loadingVirais: boolean;
  formatoCanal: string;
  estruturasRecorrencia: RecurrenceStructure[];
  gatilhosRecorrencia: RecurrenceTrigger[];
  assuntoRecorrencia: string;
  titulosRecorrencia: string[];
  frequenciaPublicacao: string;
  periodoCiclo: number;
  cronogramaPublicacao: RecurrencePublicationSchedule[];
  loadingRecorrencia: boolean;
  audienceProfile: AudienceProfile | null;
  microSubnichos: MicroSubnicho[];
  titulosAdaptados: string[];
  cronogramaAudiencia: AudiencePublicationSchedule[];
  loadingAudiencia: boolean;
  setNicho: (nicho: string) => void;
  setSubnicho: (subnicho: string) => void;
  setMinViews: (minViews: number) => void;
  setMaxVideos: (maxVideos: number) => void;
  setTitulosVirais: (titles: TitleData[]) => void;
  setPadroesTitulos: (patterns: TitlePattern[]) => void;
  setTermosChave: (terms: string) => void;
  setTitulosGerados: (titles: string[]) => void;
  setIdiomasDestino: (languages: string[]) => void;
  setTitulosMultilingues: (titles: MultilingualTitle[]) => void;
  setLoadingVirais: (loading: boolean) => void;
  setFormatoCanal: (format: string) => void;
  setEstruturasRecorrencia: (structures: RecurrenceStructure[]) => void;
  setGatilhosRecorrencia: (triggers: RecurrenceTrigger[]) => void;
  setAssuntoRecorrencia: (subject: string) => void;
  setTitulosRecorrencia: (titles: string[]) => void;
  setFrequenciaPublicacao: (frequency: string) => void;
  setPeriodoCiclo: (period: number) => void;
  setCronogramaPublicacao: (schedule: RecurrencePublicationSchedule[]) => void;
  setLoadingRecorrencia: (loading: boolean) => void;
  setAudienceProfile: (profile: AudienceProfile | null) => void;
  setMicroSubnichos: (microSubniches: MicroSubnicho[]) => void;
  setTitulosAdaptados: (titles: string[]) => void;
  setCronogramaAudiencia: (schedule: AudiencePublicationSchedule[]) => void;
  setLoadingAudiencia: (loading: boolean) => void;
}

const TitleGeneratorContainer = ({
  variations,
  titulosConcorrentes,
  keyword,
  isLoading,
  onGenerate,
  setVariations,
  variacoesTitulo,
  titulosSubnicho,
  titulosPriorizados,
  setVariacoesTitulo,
  setTitulosSubnicho,
  setTitulosPriorizados,
  youtubeApiKey,
  nicho,
  subnicho,
  minViews,
  maxVideos,
  titulosVirais,
  padroesTitulos,
  termosChave,
  titulosGerados,
  idiomasDestino,
  titulosMultilingues,
  loadingVirais,
  formatoCanal,
  estruturasRecorrencia,
  gatilhosRecorrencia,
  assuntoRecorrencia,
  titulosRecorrencia,
  frequenciaPublicacao,
  periodoCiclo,
  cronogramaPublicacao,
  loadingRecorrencia,
  audienceProfile,
  microSubnichos,
  titulosAdaptados,
  cronogramaAudiencia,
  loadingAudiencia,
  setNicho,
  setSubnicho,
  setMinViews,
  setMaxVideos,
  setTitulosVirais,
  setPadroesTitulos,
  setTermosChave,
  setTitulosGerados,
  setIdiomasDestino,
  setTitulosMultilingues,
  setLoadingVirais,
  setFormatoCanal,
  setEstruturasRecorrencia,
  setGatilhosRecorrencia,
  setAssuntoRecorrencia,
  setTitulosRecorrencia,
  setFrequenciaPublicacao,
  setPeriodoCiclo,
  setCronogramaPublicacao,
  setLoadingRecorrencia,
  setAudienceProfile,
  setMicroSubnichos,
  setTitulosAdaptados,
  setCronogramaAudiencia,
  setLoadingAudiencia
}: TitleGeneratorContainerProps) => {
  const { toast } = useToast();

  const handleSubnichearTitulos = () => {
    if (!keyword) {
      toast({
        title: "Palavra-chave necessária",
        description: "Digite uma palavra-chave primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const termos = keyword.split(',').map(termo => termo.trim());
      const titulos = subnichearTitulos(keyword, termos, "pt");
      setTitulosSubnicho(titulos);
      
      toast({
        title: "Subnichos gerados",
        description: `Foram gerados ${titulos.length} títulos subnichados.`,
      });
    } catch (error) {
      console.error("Erro ao subnichear títulos:", error);
      toast({
        title: "Erro na subnichagem",
        description: "Não foi possível gerar os títulos subnichados.",
        variant: "destructive",
      });
    }
  };

  const handleAvaliarTitulos = () => {
    if (!titulosSubnicho.length && !variacoesTitulo) {
      toast({
        title: "Sem títulos para avaliar",
        description: "Gere variações ou subnichos de título primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    let todosTitulos: string[] = [...titulosSubnicho];
    
    if (variacoesTitulo) {
      todosTitulos = [
        ...todosTitulos,
        ...variacoesTitulo.emotional,
        ...variacoesTitulo.structural,
        ...variacoesTitulo.multilingual
      ];
    }
    
    const criterios = {
      max_repeticoes: 3,
      min_score_inovacao: 0.5
    };
    
    const titulos = avaliarEPriorizarTitulos(todosTitulos, titulosConcorrentes, criterios);
    setTitulosPriorizados(titulos);
    
    toast({
      title: "Análise concluída",
      description: `Foram avaliados ${todosTitulos.length} títulos e priorizados ${titulos.length}.`,
    });
  };

  const handleExtrairEstruturasRecorrencia = async () => {
    if (!nicho) {
      toast({
        title: "Nicho necessário",
        description: "Por favor, informe o nicho para análise.",
        variant: "destructive",
      });
      return;
    }

    setLoadingRecorrencia(true);

    try {
      const estruturas = await extrairEstruturasRecorrencia(
        nicho,
        formatoCanal,
        idiomasDestino[0] || "português",
        30,
        youtubeApiKey
      );
      
      setEstruturasRecorrencia(estruturas);
      
      toast({
        title: "Estruturas de recorrência extraídas",
        description: `Foram encontradas ${estruturas.length} estruturas de recorrência.`,
      });
      
    } catch (error) {
      console.error("Erro ao extrair estruturas de recorrência:", error);
      toast({
        title: "Erro na extração",
        description: "Não foi possível extrair as estruturas de recorrência.",
        variant: "destructive",
      });
    } finally {
      setLoadingRecorrencia(false);
    }
  };

  const handleIdentificarGatilhos = () => {
    if (estruturasRecorrencia.length === 0) {
      toast({
        title: "Sem estruturas para analisar",
        description: "Extraia estruturas de recorrência primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    const gatilhos = identificarGatilhosRecorrencia(estruturasRecorrencia);
    setGatilhosRecorrencia(gatilhos);
    
    toast({
      title: "Gatilhos identificados",
      description: `Foram identificados ${gatilhos.length} gatilhos de recorrência.`,
    });
  };

  const handleGerarTitulosRecorrencia = () => {
    if (gatilhosRecorrencia.length === 0) {
      toast({
        title: "Sem gatilhos para basear",
        description: "Identifique gatilhos de recorrência primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    if (!assuntoRecorrencia) {
      toast({
        title: "Assunto necessário",
        description: "Por favor, informe um assunto para os títulos.",
        variant: "destructive",
      });
      return;
    }
    
    const titulos = gerarTitulosRecorrencia(gatilhosRecorrencia, assuntoRecorrencia, 5);
    setTitulosRecorrencia(titulos);
    
    toast({
      title: "Títulos de recorrência gerados",
      description: `Foram gerados ${titulos.length} títulos com elementos de recorrência.`,
    });
  };

  const handlePlanejarCiclo = () => {
    if (titulosRecorrencia.length === 0) {
      toast({
        title: "Sem títulos para planejar",
        description: "Gere títulos de recorrência primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    const cronograma = planejarCicloRecorrencia(titulosRecorrencia, frequenciaPublicacao, periodoCiclo);
    setCronogramaPublicacao(cronograma);
    
    toast({
      title: "Cronograma gerado",
      description: `Foi gerado um cronograma com ${cronograma.length} publicações.`,
    });
  };

  const handleExtrairTitulosVirais = async () => {
    if (!nicho) {
      toast({
        title: "Nicho necessário",
        description: "Por favor, informe o nicho para análise.",
        variant: "destructive",
      });
      return;
    }

    setLoadingVirais(true);

    try {
      let titulos;
      if (youtubeApiKey) {
        titulos = await extrairTitulosVirais(
          nicho,
          subnicho,
          idiomasDestino[0] || "português",
          minViews,
          maxVideos,
          youtubeApiKey
        );
      } else {
        titulos = simularExtrairTitulosVirais(
          nicho, 
          subnicho, 
          idiomasDestino[0] || "português",
          minViews,
          maxVideos
        );
      }
      
      setTitulosVirais(titulos);
      
      toast({
        title: "Títulos virais extraídos",
        description: `Foram encontrados ${titulos.length} títulos virais.`,
      });
      
    } catch (error) {
      console.error("Erro ao extrair títulos virais:", error);
      toast({
        title: "Erro na extração",
        description: "Não foi possível extrair os títulos virais.",
        variant: "destructive",
      });
    } finally {
      setLoadingVirais(false);
    }
  };

  const handleIdentificarPadroes = () => {
    if (titulosVirais.length === 0) {
      toast({
        title: "Sem títulos para analisar",
        description: "Extraia títulos virais primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    const padroes = identificarPadroesTitulos(titulosVirais);
    setPadroesTitulos(padroes);
    
    toast({
      title: "Padrões identificados",
      description: `Foram identificados ${padroes.length} padrões em títulos virais.`,
    });
  };

  const handleGerarTitulosVirais = () => {
    if (padroesTitulos.length === 0) {
      toast({
        title: "Sem padrões para basear",
        description: "Identifique padrões de títulos primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    if (!termosChave) {
      toast({
        title: "Termos-chave necessários",
        description: "Por favor, informe os termos-chave para os títulos.",
        variant: "destructive",
      });
      return;
    }
    
    const termos = termosChave.split(',').map(termo => termo.trim());
    const titulos = gerarTitulosVirais(padroesTitulos, termos, 10);
    setTitulosGerados(titulos);
    
    toast({
      title: "Títulos virais gerados",
      description: `Foram gerados ${titulos.length} títulos virais.`,
    });
  };

  const handleGerarMultilingues = () => {
    if (titulosGerados.length === 0) {
      toast({
        title: "Sem títulos para adaptar",
        description: "Gere títulos virais primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    if (idiomasDestino.length === 0) {
      toast({
        title: "Selecione idiomas",
        description: "Por favor, selecione pelo menos um idioma de destino.",
        variant: "destructive",
      });
      return;
    }
    
    const titulos = gerarTitulosMultilingues(titulosGerados, idiomasDestino);
    setTitulosMultilingues(titulos);
    
    toast({
      title: "Títulos multilíngues gerados",
      description: `Foram gerados ${titulos.length} títulos em diferentes idiomas.`,
    });
  };

  const handleAnalyzeAudience = async (canalId: string, nichoPrincipal: string, subnicho: string) => {
    if (!canalId) {
      toast({
        title: "ID do canal obrigatório",
        description: "Por favor, informe o ID do canal.",
        variant: "destructive",
      });
      return;
    }

    setLoadingAudiencia(true);
    
    try {
      const perfil = await extrairPerfilAudiencia(canalId, youtubeApiKey || "");
      setAudienceProfile(perfil);
      
      const micronichos = gerarMicroSubnichosPorAudiencia(perfil, nichoPrincipal, subnicho);
      setMicroSubnichos(micronichos);
      
      const titulosBase = [
        `Como fazer ${nichoPrincipal} do jeito certo`,
        `Segredos de ${subnicho} que ninguém te contou`,
        `${nichoPrincipal}: técnicas avançadas reveladas`
      ];
      
      const todosAdaptados: string[] = [];
      titulosBase.forEach(titulo => {
        const adaptados = adaptarTitulosPorAudiencia(titulo, perfil.top_paises, perfil.top_faixa_etaria);
        todosAdaptados.push(...adaptados);
      });
      
      setTitulosAdaptados(todosAdaptados);
      
      const cronogramaAud = planejarCronogramaPorAudiencia(micronichos, 4, "semanal");
      setCronogramaAudiencia(cronogramaAud);
      
      toast({
        title: "Análise concluída!",
        description: `Foram identificados ${micronichos.length} micro-subnichos e gerados ${todosAdaptados.length} títulos adaptados.`,
      });
    } catch (error) {
      console.error("Erro na análise de audiência:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível completar a análise de audiência.",
        variant: "destructive",
      });
    } finally {
      setLoadingAudiencia(false);
    }
  };

  const toggleLanguage = (language: string) => {
    const updatedLanguages = idiomasDestino.includes(language)
      ? idiomasDestino.filter(lang => lang !== language)
      : [...idiomasDestino, language];
    
    setIdiomasDestino(updatedLanguages);
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerador e Analisador de Títulos</h1>
      
      <p className="mb-6 text-muted-foreground">
        Gere, analise e otimize títulos para seus vídeos usando dados da concorrência e técnicas avançadas de copywriting.
      </p>
      
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
          <TabsTrigger value="generate">Gerar</TabsTrigger>
          <TabsTrigger value="analyze">Analisar</TabsTrigger>
          <TabsTrigger value="variations">Variações</TabsTrigger>
          <TabsTrigger value="evaluate">Avaliar</TabsTrigger>
          <TabsTrigger value="viral">Virais</TabsTrigger>
          <TabsTrigger value="patterns">Padrões</TabsTrigger>
          <TabsTrigger value="innovative">Inovadores</TabsTrigger>
          <TabsTrigger value="multilingual">Multilíngues</TabsTrigger>
          <TabsTrigger value="recurrence">Recorrência</TabsTrigger>
          <TabsTrigger value="schedule">Cronograma</TabsTrigger>
          <TabsTrigger value="audience">Audiência</TabsTrigger>
          <TabsTrigger value="competition">Concorrência</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <GenerateTab
            variations={variations}
            keyword={keyword}
            isLoading={isLoading}
            onGenerate={onGenerate}
            setVariations={setVariations}
          />
        </TabsContent>
        
        <TabsContent value="analyze">
          <AnalyzeTab titulosConcorrentes={titulosConcorrentes} />
        </TabsContent>
        
        <TabsContent value="variations" className="space-y-4">
          {variacoesTitulo && (
            <TitleVariations variations={variacoesTitulo} />
          )}
        </TabsContent>
        
        <TabsContent value="evaluate" className="space-y-4">
          <div className="flex justify-end space-x-4">
            <Button onClick={handleSubnichearTitulos}>
              Gerar Subnichos
            </Button>
            <Button onClick={handleAvaliarTitulos}>
              Avaliar Títulos
            </Button>
          </div>
          
          {titulosPriorizados.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Títulos Priorizados</h3>
              <div className="space-y-4">
                {titulosPriorizados.map((titulo, index) => (
                  <div 
                    key={`priorizado-${index}`}
                    className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{titulo.titulo}</h4>
                      <Badge variant={titulo.score_inovacao > 0.7 ? "secondary" : "outline"}>
                        Score: {(titulo.score_inovacao * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Repetições detectadas: {titulo.repeticoes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="viral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nicho">Nicho Principal</Label>
                <Input 
                  id="nicho" 
                  placeholder="Ex: histórias, finanças, saúde"
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="subnicho">Subnicho</Label>
                <Input 
                  id="subnicho" 
                  placeholder="Ex: histórias de milionários, bitcoin"
                  value={subnicho}
                  onChange={(e) => setSubnicho(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="minViews">Visualizações Mínimas: {minViews.toLocaleString()}</Label>
                <input
                  type="range"
                  id="minViews"
                  min="100000"
                  max="10000000"
                  step="100000"
                  className="w-full"
                  value={minViews}
                  onChange={(e) => setMinViews(parseInt(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="maxVideos">Máximo de Vídeos: {maxVideos}</Label>
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
              
              <div>
                <Label htmlFor="idiomaViral">Idioma Principal</Label>
                <LanguageSelector 
                  value={idiomasDestino[0] || "inglês"}
                  onChange={(value) => setIdiomasDestino([value, ...idiomasDestino.slice(1)])}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleExtrairTitulosVirais}
              disabled={loadingVirais}
            >
              {loadingVirais ? "Extraindo..." : "Extrair Títulos Virais"}
            </Button>
          </div>
          
          {titulosVirais.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Títulos Virais ({titulosVirais.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead className="text-right">Visualizações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {titulosVirais.slice(0, 10).map((titulo, index) => (
                    <TableRow key={`viral-${index}`}>
                      <TableCell className="font-medium">{titulo.titulo}</TableCell>
                      <TableCell>{titulo.canal}</TableCell>
                      <TableCell className="text-right">{titulo.visualizacoes.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="patterns" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              onClick={handleIdentificarPadroes}
              disabled={titulosVirais.length === 0}
            >
              Identificar Padrões
            </Button>
          </div>
          
          {padroesTitulos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Padrões Identificados</h3>
              <div className="space-y-4">
                {padroesTitulos.map((padrao, index) => (
                  <div 
                    key={`padrao-${index}`}
                    className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{padrao.descricao_curta}</h4>
                      <Badge variant={padrao.frequencia > 50 ? "secondary" : "outline"}>
                        {padrao.frequencia}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Exemplo: "{padrao.padrao_exemplo}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="innovative" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="termosChave">Termos-Chave (separados por vírgula)</Label>
              <Input 
                id="termosChave" 
                placeholder="Ex: milionário, segredo, dinheiro, rico"
                value={termosChave}
                onChange={(e) => setTermosChave(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleGerarTitulosVirais}
                disabled={padroesTitulos.length === 0 || !termosChave}
              >
                Gerar Títulos Inovadores
              </Button>
            </div>
          </div>
          
          {titulosGerados.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Títulos Inovadores Gerados</h3>
              <div className="space-y-2">
                {titulosGerados.map((titulo, index) => (
                  <div 
                    key={`inovador-${index}`}
                    className="p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors flex justify-between items-center group"
                  >
                    <span>{titulo}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        navigator.clipboard.writeText(titulo);
                        toast({
                          title: "Copiado!",
                          description: "Título copiado para área de transferência."
                        });
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="multilingual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Selecione os Idiomas Alvo</Label>
              <div className="space-y-2 mt-2">
                {["inglês", "português", "espanhol", "francês", "alemão"].map(idioma => (
                  <div key={idioma} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`idioma-${idioma}`}
                      checked={idiomasDestino.includes(idioma)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIdiomasDestino([...idiomasDestino, idioma]);
                        } else {
                          setIdiomasDestino(idiomasDestino.filter(i => i !== idioma));
                        }
                      }}
                      className="mr-2"
                    />
                    <Label htmlFor={`idioma-${idioma}`}>{idioma.charAt(0).toUpperCase() + idioma.slice(1)}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleGerarMultilingues}
              disabled={titulosGerados.length === 0 || idiomasDestino.length === 0}
            >
              Gerar Versões Multilíngues
            </Button>
          </div>
          
          {titulosMultilingues.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Títulos Multilíngues</h3>
              <div className="space-y-6">
                {idiomasDestino.map(idioma => (
                  <div key={`idioma-group-${idioma}`} className="space-y-2">
                    <h4 className="font-medium">{idioma.charAt(0).toUpperCase() + idioma.slice(1)}</h4>
                    {titulosMultilingues
                      .filter(item => item.idioma === idioma)
                      .map((item, index) => (
                        <div 
                          key={`multilingue-${idioma}-${index}`}
                          className="p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors flex justify-between items-center group"
                        >
                          <span>{item.titulo_adaptado}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              navigator.clipboard.writeText(item.titulo_adaptado);
                              toast({
                                title: "Copiado!",
                                description: "Título copiado para área de transferência."
                              });
                            }}
                          >
                            Copiar
                          </Button>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recurrence" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nicho-recorrencia">Nicho</Label>
                <Input 
                  id="nicho-recorrencia" 
                  placeholder="Ex: viagens, games, educação"
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="formato-canal">Formato do Canal</Label>
                <Select 
                  value={formatoCanal}
                  onValueChange={setFormatoCanal}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vlog">Vlog</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="gameplay">Gameplay</SelectItem>
                    <SelectItem value="review">Resenha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="assunto-recorrencia">Assunto</Label>
                <Input 
                  id="assunto-recorrencia" 
                  placeholder="Ex: dicas de viagem, técnicas de jogo"
                  value={assuntoRecorrencia}
                  onChange={(e) => setAssuntoRecorrencia(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="frequencia">Frequência de Publicação</Label>
                <Select 
                  value={frequenciaPublicacao}
                  onValueChange={setFrequenciaPublicacao}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diario">Diária</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="periodo">Período do Ciclo (dias): {periodoCiclo}</Label>
                <input
                  type="range"
                  id="periodo"
                  min="7"
                  max="90"
                  step="7"
                  className="w-full"
                  value={periodoCiclo}
                  onChange={(e) => setPeriodoCiclo(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              onClick={handleExtrairEstruturasRecorrencia}
              disabled={loadingRecorrencia}
            >
              {loadingRecorrencia ? "Extraindo..." : "1. Extrair Estruturas de Recorrência"}
            </Button>
            
            <Button 
              onClick={handleIdentificarGatilhos}
              disabled={estruturasRecorrencia.length === 0 || loadingRecorrencia}
            >
              2. Identificar Gatilhos
            </Button>
            
            <Button 
              onClick={handleGerarTitulosRecorrencia}
              disabled={gatilhosRecorrencia.length === 0 || !assuntoRecorrencia || loadingRecorrencia}
            >
              3. Gerar Títulos
            </Button>
            
            <Button 
              onClick={handlePlanejarCiclo}
              disabled={titulosRecorrencia.length === 0 || loadingRecorrencia}
            >
              4. Planejar Ciclo
            </Button>
          </div>
          
          {estruturasRecorrencia.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Estruturas de Recorrência</h3>
              <div className="space-y-4">
                {estruturasRecorrencia.map((estrutura, index) => (
                  <div 
                    key={`estrutura-${index}`}
                    className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{estrutura.tipo}</h4>
                      <Badge>
                        Frequência: {estrutura.frequencia}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Descrição: {estrutura.descricao}</p>
                      <p className="mt-1">Exemplo: "{estrutura.exemplo}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {gatilhosRecorrencia.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Gatilhos de Recorrência</h3>
              <div className="space-y-4">
                {gatilhosRecorrencia.map((gatilho, index) => (
                  <div 
                    key={`gatilho-${index}`}
                    className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{gatilho.tipo}</h4>
                      <Badge variant={gatilho.eficacia > 0.7 ? "secondary" : "outline"}>
                        Eficácia: {(gatilho.eficacia * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{gatilho.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {titulosRecorrencia.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Títulos com Elementos de Recorrência</h3>
              <div className="space-y-2">
                {titulosRecorrencia.map((titulo, index) => (
                  <div 
                    key={`recorrencia-${index}`}
                    className="p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors flex justify-between items-center group"
                  >
                    <span>{titulo}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        navigator.clipboard.writeText(titulo);
                        toast({
                          title: "Copiado!",
                          description: "Título copiado para área de transferência."
                        });
                      }}
                    >
                      Copiar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          {cronogramaPublicacao.length > 0 ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Cronograma de Publicação</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Elemento Recorrente</TableHead>
                    <TableHead>Título Sugerido</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cronogramaPublicacao.map((item, index) => (
                    <TableRow key={`cronograma-${index}`}>
                      <TableCell>
                        {new Date(item.data_publicacao).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{item.tipo_recorrencia}</TableCell>
                      <TableCell>{item.titulo_sugerido}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                Gere um cronograma na aba "Recorrência" primeiro.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-4">
          <AudienceAnalysisForm 
            onAnalyze={handleAnalyzeAudience}
            isLoading={loadingAudiencia}
          />
          
          {audienceProfile && (
            <AudienceAnalysisResults 
              audienceProfile={audienceProfile}
              microSubnichos={microSubnichos}
              titulosAdaptados={titulosAdaptados}
              cronogramaPublicacao={cronogramaAudiencia}
            />
          )}
        </TabsContent>
        
        <TabsContent value="competition" className="space-y-4">
          <CompetitionAnalysis 
            titulosConcorrentes={titulosConcorrentes}
            keyword={keyword}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TitleGeneratorContainer;
