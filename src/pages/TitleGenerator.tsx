
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/LanguageSelector";

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

// Add the missing generateTitleVariations function
const generateTitleVariations = (
  keyword: string,
  language: string = "auto", 
  emotion: string = "mix", 
  count: number = 15
): TitleVariation[] => {
  // Get base variations from the utility function
  const baseVariations = gerarVariacoesTitulo(keyword, count);
  
  // Map them to our TitleVariation interface format
  const titleVariations: TitleVariation[] = baseVariations.map((text, index) => {
    // Determine type based on emotion parameter or cycle through types
    let type: "dor" | "esperanca" | "curiosidade";
    if (emotion === "mix") {
      // Cycle through the emotion types
      const types: ("dor" | "esperanca" | "curiosidade")[] = ["dor", "esperanca", "curiosidade"];
      type = types[index % types.length];
    } else if (["dor", "esperanca", "curiosidade"].includes(emotion)) {
      type = emotion as "dor" | "esperanca" | "curiosidade";
    } else {
      // Default to curiosidade if invalid emotion type
      type = "curiosidade";
    }
    
    // Determine saturation level
    const saturations: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
    const saturation = saturations[Math.floor(Math.random() * saturations.length)];
    
    // Determine language based on parameter
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
  
  // Novos estados para recursos avançados
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

  // Novos handlers para processos avançados
  const handleExtrairTitulosVirais = async () => {
    if (!nicho || !subnicho) {
      toast({
        title: "Nicho e subnicho necessários",
        description: "Por favor, preencha ambos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoadingVirais(true);

    try {
      let titulos: TitleData[];
      
      if (youtubeApiKey) {
        titulos = await extrairTitulosVirais(
          nicho,
          subnicho,
          idiomasDestino[0] || "inglês",
          minViews,
          maxVideos,
          youtubeApiKey
        );
      } else {
        titulos = simularExtrairTitulosVirais(
          nicho,
          subnicho,
          idiomasDestino[0] || "inglês",
          minViews,
          maxVideos
        );
      }
      
      setTitulosVirais(titulos);
      
      toast({
        title: "Títulos virais extraídos",
        description: `Foram encontrados ${titulos.length} vídeos com pelo menos ${minViews.toLocaleString()} visualizações.`,
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
      description: `Foram identificados ${padroes.length} padrões nos títulos virais.`,
    });
  };

  const handleGerarTitulosVirais = () => {
    if (padroesTitulos.length === 0) {
      toast({
        title: "Sem padrões para basear",
        description: "Identifique padrões em títulos virais primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    if (!termosChave) {
      toast({
        title: "Termos-chave necessários",
        description: "Por favor, informe pelo menos um termo-chave.",
        variant: "destructive",
      });
      return;
    }
    
    const termos = termosChave.split(',').map(termo => termo.trim());
    const titulos = gerarTitulosVirais(padroesTitulos, termos, 10);
    setTitulosGerados(titulos);
    
    toast({
      title: "Títulos virais gerados",
      description: `Foram gerados ${titulos.length} títulos com base nos padrões encontrados.`,
    });
  };

  const handleGerarMultilingues = () => {
    if (titulosGerados.length === 0) {
      toast({
        title: "Sem títulos para traduzir",
        description: "Gere títulos virais primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    const multilingues = gerarTitulosMultilingues(titulosGerados, idiomasDestino);
    setTitulosMultilingues(multilingues);
    
    toast({
      title: "Traduções geradas",
      description: `Foram gerados ${multilingues.length} títulos adaptados para outros idiomas.`,
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="generate">Gerar Títulos</TabsTrigger>
              <TabsTrigger value="analyze">Analisar</TabsTrigger>
              <TabsTrigger value="variations">Variações</TabsTrigger>
              <TabsTrigger value="evaluate">Avaliar</TabsTrigger>
              <TabsTrigger value="viral">Títulos Virais</TabsTrigger>
              <TabsTrigger value="patterns">Padrões</TabsTrigger>
              <TabsTrigger value="innovative">Inovadores</TabsTrigger>
              <TabsTrigger value="multilingual">Multilíngues</TabsTrigger>
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
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TitleGenerator;
