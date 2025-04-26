
import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import KPISection from "@/components/KPISection";
import ResultsTable from "@/components/ResultsTable";
import ChartSection from "@/components/ChartSection";
import SavedSearches from "@/components/SavedSearches";
import ActionButtons from "@/components/ActionButtons";
import ZapierIntegration from "@/components/ZapierIntegration";
import RemodelingIdeas from "@/components/RemodelingIdeas";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { searchYouTubeVideos } from "@/services/youtube-mock-service";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [searchParams, setSearchParams] = useState<YoutubeSearchParams | null>(null);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async (params: YoutubeSearchParams) => {
    setIsLoading(true);
    setSearchParams(params);
    setSelectedVideo(null);

    try {
      const data = await searchYouTubeVideos(params);
      
      // Filtrar resultados pelo idioma selecionado (se não for "any")
      let filteredData = params.language !== "any" 
        ? data.filter(video => video.language === params.language)
        : data;
      
      // Filtrar por período selecionado
      if (params.period !== "all") {
        const now = new Date();
        const periodDays = getPeriodInDays(params.period);
        filteredData = filteredData.filter(video => video.videoAge <= periodDays);
      }
      
      // Filtrar vídeos musicais se a opção estiver ativada
      if (params.excludeMusic) {
        filteredData = filteredData.filter(video => video.category !== "Music" && 
          !isLikelyMusic(video.title));
      }
      
      // Filtrar por palavras-chave excluídas
      if (params.excludeKeywords) {
        const keywords = params.excludeKeywords.toLowerCase().split(',').map(k => k.trim());
        filteredData = filteredData.filter(video => {
          const videoTitle = video.title.toLowerCase();
          return !keywords.some(keyword => videoTitle.includes(keyword));
        });
      }
      
      // Enriquecer os dados com propriedades adicionais
      const enrichedData = filteredData.map(video => {
        // Calcular visualizações por hora
        const viewsPerHour = video.videoAge > 0 ? Math.round(video.views / (video.videoAge * 24)) : 0;
        
        // Determinar tamanho do canal
        let channelSize: "small" | "medium" | "large" = "medium";
        if (video.subscribers < 100000) channelSize = "small";
        else if (video.subscribers > 1000000) channelSize = "large";
        
        // Determinar potencial de viralidade
        let viralityPotential: "low" | "medium" | "high" = "low";
        let viralityReason = "";
        
        // Considerar vários fatores para o potencial de viralidade
        if (video.videoAge < 3 && video.engagement > 7 && viewsPerHour > 200) {
          viralityPotential = "high";
          viralityReason = "vídeo recente, alto engajamento, crescimento rápido";
        } else if ((video.videoAge < 7 && video.engagement > 5) || viewsPerHour > 100) {
          viralityPotential = "medium";
          viralityReason = video.videoAge < 7 
            ? "bom engajamento em vídeo recente" 
            : "taxa de visualizações consistente";
        } else {
          viralityReason = "métricas de engajamento e crescimento moderadas";
        }
        
        // Determinar tipo de crescimento
        let growthType: "explosive" | "emerging" | "latent" | undefined;
        
        if (viewsPerHour > 500 && video.videoAge < 2) {
          growthType = "explosive";
        } else if (viewsPerHour > 100 || (video.engagement > 8 && video.videoAge < 7)) {
          growthType = "emerging";
        } else if (video.subscribers < 50000 && video.engagement > 5) {
          growthType = "latent";
        }
        
        // Dados simulados de crescimento
        const growthData = generateGrowthData(video.views, video.videoAge);
        
        return {
          ...video,
          viewsPerHour,
          channelSize,
          viralityPotential,
          viralityReason,
          growthType,
          growthData
        };
      });
      
      setResults(enrichedData);
      
      if (enrichedData.length === 0) {
        toast({
          title: "Sem resultados",
          description: "Sua pesquisa não retornou resultados. Tente outros parâmetros.",
        });
      } else {
        // Destacar vídeos emergentes (últimos 3 dias) com alto potencial viral
        const emergingVideos = enrichedData.filter(video => video.videoAge <= 3 && video.viralScore > 700);
        
        toast({
          title: "Pesquisa concluída",
          description: `Encontrados ${enrichedData.length} resultados para sua busca${emergingVideos.length > 0 ? `, incluindo ${emergingVideos.length} vídeos emergentes` : ""}.`,
        });
        
        // Selecionar o vídeo mais viral para exibir sugestões de remodelagem
        if (enrichedData.length > 0) {
          const topVideo = [...enrichedData].sort((a, b) => b.viralScore - a.viralScore)[0];
          setSelectedVideo(topVideo);
        }
      }
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      toast({
        title: "Erro na pesquisa",
        description: "Ocorreu um erro ao buscar dados. Tente novamente.",
        variant: "destructive",
      });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função auxiliar para converter período em dias
  const getPeriodInDays = (period: string): number => {
    switch (period) {
      case "24h": return 1;
      case "48h": return 2;
      case "72h": return 3;
      case "7d": return 7;
      case "30d": return 30;
      case "90d": return 90;
      case "180d": return 180;
      default: return 9999; // "all"
    }
  };
  
  // Verificar se um vídeo é provavelmente musical
  const isLikelyMusic = (title: string): boolean => {
    const musicKeywords = ["official video", "lyrics", "music video", "official music", "official audio", 
      "videoclip", "video clip", "ft.", "feat", "official lyric", "audio oficial", "clipe oficial"];
    
    title = title.toLowerCase();
    return musicKeywords.some(keyword => title.includes(keyword));
  };
  
  // Gerar dados fictícios para o gráfico de crescimento
  const generateGrowthData = (totalViews: number, ageInDays: number) => {
    const data = [];
    const now = new Date();
    const viewsPerDay = totalViews / Math.max(1, ageInDays);
    
    // Gerar até 7 pontos de dados (ou menos se o vídeo for mais recente)
    const dataPoints = Math.min(7, Math.ceil(ageInDays));
    
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Adicionar alguma variabilidade aos dados
      const variability = 0.2 * Math.random() - 0.1; // -10% a +10%
      const dailyViews = Math.round(viewsPerDay * (1 + variability) * (dataPoints - i) / dataPoints);
      
      data.unshift({
        timestamp: date.toISOString(),
        views: dailyViews
      });
    }
    
    return data;
  };

  const handleLoadSearch = (params: YoutubeSearchParams) => {
    setSearchParams(params);
    handleSearch(params);
  };
  
  const handleSelectVideo = (video: VideoResult) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div>
          <SavedSearches currentSearch={searchParams} onLoadSearch={handleLoadSearch} />
        </div>
      </div>

      <div id="dashboard-section">
        {results.length > 0 && (
          <>
            <KPISection results={results} />
            <ChartSection results={results} />
            <ActionButtons results={results} />
          </>
        )}
      </div>

      {results.length > 0 && (
        <Tabs defaultValue="resultados" className="my-6">
          <TabsList>
            <TabsTrigger value="resultados">Tabela de Resultados</TabsTrigger>
            <TabsTrigger value="remodelagem">Sugestões de Remodelagem</TabsTrigger>
            <TabsTrigger value="alertas">Alertas e Notificações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resultados" className="mt-4">
            <ResultsTable results={results} onSelectVideo={handleSelectVideo} />
          </TabsContent>
          
          <TabsContent value="remodelagem" className="mt-4">
            {selectedVideo ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card className="p-4">
                    <h3 className="text-lg font-bold mb-3">Vídeo Selecionado</h3>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedVideo.title}</p>
                      <p className="text-sm text-muted-foreground">Canal: {selectedVideo.channel}</p>
                      <p className="text-sm text-muted-foreground">Viral Score: {selectedVideo.viralScore}</p>
                      <p className="text-sm text-muted-foreground">Nicho: {selectedVideo.mainNiche || "Diversos"}</p>
                      {selectedVideo.videoUrl && (
                        <div className="mt-2">
                          <a 
                            href={selectedVideo.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Ver no YouTube →
                          </a>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <RemodelingIdeas video={selectedVideo} />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Selecione um vídeo para ver sugestões de remodelagem.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="alertas" className="mt-4">
            <ZapierIntegration currentSearch={searchParams} />
          </TabsContent>
        </Tabs>
      )}

      {!results.length && !isLoading && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Detetive de Tendências YouTube</h2>
          <p className="text-muted-foreground mb-6">
            Use o formulário acima para pesquisar conteúdo emergente e descobrir novos nichos antes que fiquem saturados.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
