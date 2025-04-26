
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
      setResults(data);
      
      if (data.length === 0) {
        toast({
          title: "Sem resultados",
          description: "Sua pesquisa não retornou resultados. Tente outros parâmetros.",
        });
      } else {
        // Destacar vídeos emergentes (últimos 3 dias) com alto potencial viral
        const emergingVideos = data.filter(video => video.videoAge <= 3 && video.viralScore > 700);
        
        toast({
          title: "Pesquisa concluída",
          description: `Encontrados ${data.length} resultados para sua busca${emergingVideos.length > 0 ? `, incluindo ${emergingVideos.length} vídeos emergentes` : ""}.`,
        });
        
        // Selecionar o vídeo mais viral para exibir sugestões de remodelagem
        if (data.length > 0) {
          const topVideo = [...data].sort((a, b) => b.viralScore - a.viralScore)[0];
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
            <ResultsTable results={results} />
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
