import React, { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TitleGeneratorForm from "@/components/TitleGeneratorForm";
import TitleVariationsList from "@/components/TitleVariationsList";
import TitleVariations from "@/components/TitleVariations";
import { useAuth } from "@/contexts/AuthContext";
import {
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes,
  avaliarEPriorizarTitulos,
  extrairTitulosVirais,
  simularExtrairTitulosVirais,
  identificarPadroesTitulos,
  gerarTitulosVirais,
  gerarTitulosMultilingues,
  TitleData,
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

const generateTitleVariations = (
  keyword: string,
  language: string = "auto", 
  emotion: string = "mix", 
  count: number = 15
): TitleVariation[] => {
  const baseVariations = gerarVariacoesTitulo(keyword, count);
  
  const titleVariations: TitleVariation[] = baseVariations.map((text, index) => {
    let type: "dor" | "esperanca" | "curiosidade";
    if (emotion === "mix") {
      const types: ("dor" | "esperanca" | "curiosidade")[] = ["dor", "esperanca", "curiosidade"];
      type = types[index % types.length];
    } else if (["dor", "esperanca", "curiosidade"].includes(emotion)) {
      type = emotion as "dor" | "esperanca" | "curiosidade";
    } else {
      type = "curiosidade";
    }
    
    const saturations: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
    const saturation = saturations[Math.floor(Math.random() * saturations.length)];
    
    let titleLanguage: "pt" | "es" | "en" | "fr" = "pt";
    if (language === "auto") {
      const languages: ("pt" | "es" | "en" | "fr")[] = ["pt", "es", "en", "fr"];
      titleLanguage = languages[Math.floor(Math.random() * languages.length)];
    } else if (["pt", "es", "en", "fr"].includes(language)) {
      titleLanguage = language as "pt" | "es" | "en" | "fr";
    }
    
    return {
      text,
      type,
      saturation,
      language: titleLanguage
    };
  });
  
  return titleVariations;
};

const TitleGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [titulosConcorrentes, setTitulosConcorrentes] = useState<TitleData[]>([]);
  const [variacoesTitulo, setVariacoesTitulo] = useState<TitleVariationsType | null>(null);
  const [titulosSubnicho, setTitulosSubnicho] = useState<string[]>([]);
  const [titulosPriorizados, setTitulosPriorizados] = useState<TitleWithScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();
  
  const [nicho, setNicho] = useState("");
  const [subnicho, setSubnicho] = useState("");
  const [minViews, setMinViews] = useState(1000000);
  const [maxVideos, setMaxVideos] = useState(30);
  const [titulosVirais, setTitulosVirais] = useState<TitleData[]>([]);
  const [padroesTitulos, setPadroesTitulos] = useState<TitlePattern[]>([]);
  const [termosChave, setTermosChave] = useState("");
  const [titulosGerados, setTitulosGerados] = useState<string[]>([]);
  const [idiomasDestino, setIdiomasDestino] = useState<string[]>(["inglês", "espanhol", "português"]);
  const [titulosMultilingues, setTitulosMultilingues] = useState<MultilingualTitle[]>([]);
  const [loadingVirais, setLoadingVirais] = useState(false);
  
  const [formatoCanal, setFormatoCanal] = useState("vídeo");
  const [estruturasRecorrencia, setEstruturasRecorrencia] = useState<RecurrenceStructure[]>([]);
  const [gatilhosRecorrencia, setGatilhosRecorrencia] = useState<RecurrenceTrigger[]>([]);
  const [assuntoRecorrencia, setAssuntoRecorrencia] = useState("");
  const [titulosRecorrencia, setTitulosRecorrencia] = useState<string[]>([]);
  const [frequenciaPublicacao, setFrequenciaPublicacao] = useState("semanal");
  const [periodoCiclo, setPeriodoCiclo] = useState(4);
  const [cronogramaPublicacao, setCronogramaPublicacao] = useState<RecurrencePublicationSchedule[]>([]);
  const [loadingRecorrencia, setLoadingRecorrencia] = useState(false);
  
  const [audienceProfile, setAudienceProfile] = useState<AudienceProfile | null>(null);
  const [microSubnichos, setMicroSubnichos] = useState<MicroSubnicho[]>([]);
  const [titulosAdaptados, setTitulosAdaptados] = useState<string[]>([]);
  const [cronogramaAudiencia, setCronogramaAudiencia] = useState<AudiencePublicationSchedule[]>([]);
  const [loadingAudiencia, setLoadingAudiencia] = useState(false);

  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      const basicVariations = generateTitleVariations(keyword, language, emotion);
      setVariations(basicVariations);
      
      const structuredVariations = gerarVariacoesEstruturadas(keyword);
      setVariacoesTitulo(structuredVariations);
      
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-11">
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
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Títulos com Recorrência</AlertTitle>
                <AlertDescription>
                  Crie títulos que incentivem a audiência a retornar para conteúdo em série.
                  Identifique estruturas de série, gatilhos de retorno e gere títulos otimizados para recorrência.
                </AlertDescription>
              </Alert>
              
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
                        <SelectItem value="vídeo">Vídeos</SelectItem>
                        <SelectItem value="shorts">Shorts</SelectItem>
                        <SelectItem value="livestream">Livestream</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="assunto-recorrencia">Assunto para Títulos</Label>
                    <Input 
                      id="assunto-recorrencia" 
                      placeholder="Ex: lugares misteriosos, técnicas de programação"
                      value={assuntoRecorrencia}
                      onChange={(e) => setAssuntoRecorrencia(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Frequência de Publicação</Label>
                    <Select 
                      value={frequenciaPublicacao}
                      onValueChange={setFrequenciaPublicacao}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diária">Diária</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="quinzenal">Quinzenal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="periodo">Período do Ciclo: {periodoCiclo}</Label>
                    <input
                      type="range"
                      id="periodo"
                      min="2"
                      max="12"
                      step="1"
                      className="w-full"
                      value={periodoCiclo}
                      onChange={(e) => setPeriodoCiclo(parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 pt-4">
                    <Button 
                      onClick={handleExtrairEstruturasRecorrencia}
                      disabled={loadingRecorrencia || !nicho}
                      variant="outline"
                    >
                      {loadingRecorrencia ? "Extraindo..." : "Extrair Estruturas"}
                    </Button>
                    
                    <Button
                      onClick={handleIdentificarGatilhos}
                      disabled={estruturasRecorrencia.length === 0}
                      variant="outline"
                    >
                      Identificar Gatilhos
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  {estruturasRecorrencia.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Estruturas Identificadas</h3>
                      <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                        {estruturasRecorrencia.map((estrutura, index) => (
                          <div 
                            key={`estrutura-${index}`}
                            className="p-3 rounded-md bg-muted/50 border"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium">{estrutura.estrutura_titulo}</h4>
                              <Badge>{estrutura.frequencia}%</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Exemplos em: {estrutura.canais_exemplos.join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  {gatilhosRecorrencia.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Gatilhos de Recorrência</h3>
                      <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                        {gatilhosRecorrencia.map((gatilho, index) => (
                          <div 
                            key={`gatilho-${index}`}
                            className="p-3 rounded-md bg-muted/50 border"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium">{gatilho.gatilho}</h4>
                              <Badge variant={gatilho.peso > 0.7 ? "secondary" : "outline"}>
                                Peso: {(gatilho.peso * 100).toFixed(0)}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {gatilho.descricao}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleGerarTitulosRecorrencia}
                          disabled={gatilhosRecorrencia.length === 0 || !assuntoRecorrencia}
                        >
                          Gerar Títulos com Recorrência
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {titulosRecorrencia.length > 0 && (
                <div className="mt-6 p-4 rounded-md bg-muted/30 border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Títulos com Elementos de Recorrência</h3>
                    <Button 
                      onClick={handlePlanejarCiclo} 
                      size="sm"
                      disabled={titulosRecorrencia.length === 0}
                    >
                      Planejar Ciclo de Publicação
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {titulosRecorrencia.map((titulo, index) => (
                      <div 
                        key={`recorrencia-${index}`}
                        className="p-3 rounded-md bg-card hover:bg-muted/80 transition-colors flex justify-between items-center"
                      >
                        <span>{titulo}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
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
                  <h3 className="text-xl font-bold mb-4">Cronograma de Publicação</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Data Sugerida</TableHead>
                        <TableHead>Dia da Semana</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cronogramaPublicacao.map((item, index) => (
                        <TableRow key={`cronograma-${index}`}>
                          <TableCell className="font-medium">{item.titulo}</TableCell>
                          <TableCell>{new Date(item.data_publicacao).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {new Date(item.data_publicacao).toLocaleDateString('pt-BR', {weekday: 'long'})}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Nenhum cronograma gerado</h3>
                  <p className="text-muted-foreground">
                    Gere títulos com recorrência na aba anterior e depois planeje o ciclo 
                    de publicação para criar um cronograma.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Análise de Audiência</AlertTitle>
                <AlertDescription>
                  Identifique o perfil da sua audiência, gere micro-subnichos que ressoem com ela e adapte seus títulos 
                  para maximizar o engajamento.
                </AlertDescription>
              </Alert>
              
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
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TitleGenerator;
