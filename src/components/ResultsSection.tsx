
import { VideoResult } from "@/types/youtube-types";
import { KPISection } from "@/components/KPISection";
import { ChartSection } from "@/components/ChartSection";
import { ActionButtons } from "@/components/ActionButtons";
import { Card } from "@/components/ui/card";
import ResultsTable from "@/components/ResultsTable";
import RemodelingIdeas from "@/components/RemodelingIdeas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZapierIntegration from "@/components/ZapierIntegration";
import { YoutubeSearchParams } from "@/types/youtube-types";

interface ResultsSectionProps {
  results: VideoResult[];
  selectedVideo: VideoResult | null;
  onSelectVideo: (video: VideoResult) => void;
  searchParams: YoutubeSearchParams | null;
}

const ResultsSection = ({ results, selectedVideo, onSelectVideo, searchParams }: ResultsSectionProps) => {
  if (!results.length) return null;

  return (
    <>
      <div id="dashboard-section">
        <KPISection results={results} />
        <ChartSection results={results} />
        <ActionButtons results={results} />
      </div>

      <Tabs defaultValue="resultados" className="my-6">
        <TabsList>
          <TabsTrigger value="resultados">Tabela de Resultados</TabsTrigger>
          <TabsTrigger value="remodelagem">Sugestões de Remodelagem</TabsTrigger>
          <TabsTrigger value="alertas">Alertas e Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resultados" className="mt-4">
          <ResultsTable results={results} onSelectVideo={onSelectVideo} />
        </TabsContent>
        
        <TabsContent value="remodelagem" className="mt-4">
          {selectedVideo ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="p-4 glass-panel">
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
                          className="text-blue-600 hover:underline text-sm flex items-center"
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
    </>
  );
};

export default ResultsSection;
