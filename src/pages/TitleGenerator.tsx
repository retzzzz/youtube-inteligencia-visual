
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleGeneratorForm from "@/components/TitleGeneratorForm";
import TitleVariationsList from "@/components/TitleVariationsList";
import TitleVariations from "@/components/TitleVariations";
import { useAuth } from "@/contexts/AuthContext";
import {
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes,
  avaliarEPriorizarTitulos,
  TitleData,
  TitleWithScore
} from '@/utils/titleAnalysis';
import {
  gerarVariacoesTitulo,
  gerarVariacoesEstruturadas,
  subnichearTitulos,
  TitleVariations as TitleVariationsType
} from '@/utils/titleGeneration';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface TitleVariation {
  text: string;
  type: "dor" | "esperanca" | "curiosidade";
  saturation: "low" | "medium" | "high";
  language: "pt" | "es" | "en" | "fr";
  translations?: {
    text: string;
    language: "pt" | "es" | "en" | "fr";
  }[];
}

const TitleGenerator = () => {
  // Estados compartilhados
  const [keyword, setKeyword] = useState("");
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [titulosConcorrentes, setTitulosConcorrentes] = useState<TitleData[]>([]);
  const [variacoesTitulo, setVariacoesTitulo] = useState<TitleVariationsType | null>(null);
  const [titulosSubnicho, setTitulosSubnicho] = useState<string[]>([]);
  const [titulosPriorizados, setTitulosPriorizados] = useState<TitleWithScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  // Handlers unificados
  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      // Gerar variações básicas
      const basicVariations = generateTitleVariations(keyword, language, emotion);
      setVariations(basicVariations);
      
      // Gerar variações estruturadas
      const structuredVariations = gerarVariacoesEstruturadas(keyword);
      setVariacoesTitulo(structuredVariations);
      
      // Extrair títulos concorrentes
      let titulos;
      if (youtubeApiKey) {
        titulos = await extrairTitulosConcorrentes(keyword, language, 30, youtubeApiKey);
      } else {
        titulos = simularExtrairTitulosConcorrentes(keyword, language, 30);
      }
      setTitulosConcorrentes(titulos);
      
      toast({
        title: "Títulos gerados com sucesso!",
        description: `${basicVariations.length} variações criadas baseadas em "${keyword}"`,
      });
    } catch (error) {
      console.error("Erro ao gerar títulos:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar os títulos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    
    // Combinar todos os títulos gerados para avaliação
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Gerador e Analisador de Títulos</h1>
          
          <p className="mb-6 text-muted-foreground">
            Gere, analise e otimize títulos para seus vídeos usando dados da concorrência e técnicas avançadas de copywriting.
          </p>
          
          <Tabs defaultValue="generate" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="generate">1. Gerar Títulos</TabsTrigger>
              <TabsTrigger value="analyze">2. Analisar Concorrência</TabsTrigger>
              <TabsTrigger value="variations">3. Variações</TabsTrigger>
              <TabsTrigger value="evaluate">4. Avaliar Títulos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Como funciona</AlertTitle>
                <AlertDescription>
                  Digite uma palavra-chave ou ideia, escolha o idioma principal e o tipo de emoção desejada.
                  O sistema gerará automaticamente variações de títulos aplicando diferentes estratégias.
                </AlertDescription>
              </Alert>
              
              <TitleGeneratorForm onGenerate={handleGenerateTitles} isLoading={isLoading} />
              
              {variations.length > 0 && (
                <TitleVariationsList 
                  variations={variations}
                  onGenerateMore={() => {
                    const newVariations = generateTitleVariations(keyword, "auto", "mix", 10);
                    setVariations([...variations, ...newVariations]);
                  }}
                  totalCount={variations.length}
                  setVariations={setVariations}
                  keyword={keyword}
                />
              )}
            </TabsContent>
            
            <TabsContent value="analyze" className="space-y-4">
              {titulosConcorrentes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Títulos Concorrentes</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Canal</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Visualizações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {titulosConcorrentes.slice(0, 10).map((titulo, index) => (
                        <TableRow key={`titulo-${index}`}>
                          <TableCell className="font-medium">{titulo.titulo}</TableCell>
                          <TableCell>{titulo.canal}</TableCell>
                          <TableCell>{new Date(titulo.data_publicacao).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">{titulo.visualizacoes.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TitleGenerator;
