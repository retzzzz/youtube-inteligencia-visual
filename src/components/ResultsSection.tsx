import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import KPISection from "@/components/KPISection";
import ChartSection from "@/components/ChartSection";
import ActionButtons from "@/components/ActionButtons";
import CPMAnalysisChart from "@/components/CPMAnalysisChart";
import { Card } from "@/components/ui/card";
import ResultsTable from "@/components/ResultsTable";
import RemodelingIdeas from "@/components/RemodelingIdeas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedSearchDialog from "@/components/SavedSearchDialog";
import AIInsights from "@/components/AIInsights";
import { BarChart3, Table, Lightbulb, Sparkles } from "lucide-react";

interface ResultsSectionProps {
  results: VideoResult[];
  selectedVideo: VideoResult | null;
  onSelectVideo: (video: VideoResult) => void;
  searchParams: YoutubeSearchParams | null;
}

const ResultsSection = ({ results, selectedVideo, onSelectVideo, searchParams }: ResultsSectionProps) => {
  if (!results.length) return null;

  return (
    <div className="w-full">
      <div id="dashboard-section" className="mb-8 w-full">
        <Card className="p-6 shadow-lg mb-8 border bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Dashboard de Análise
          </h2>
          
          <KPISection results={results} />
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-lg border bg-white dark:bg-black/20 backdrop-blur-sm">
            <ChartSection results={results} />
          </Card>
          
          <Card className="p-6 shadow-lg border bg-white dark:bg-black/20 backdrop-blur-sm">
            <CPMAnalysisChart results={results} />
          </Card>
        </div>
        
        <div className="flex items-center justify-between mt-8">
          <ActionButtons results={results} searchParams={searchParams} />
          {searchParams && (
            <SavedSearchDialog searchParams={searchParams} />
          )}
        </div>
      </div>

      <Tabs defaultValue="resultados" className="my-6 w-full">
        <TabsList className="w-full md:w-auto p-1 bg-muted/40 backdrop-blur-sm">
          <TabsTrigger value="resultados" className="data-[state=active]:shadow-md flex items-center gap-2">
            <Table className="h-4 w-4" />
            Tabela de Resultados
          </TabsTrigger>
          <TabsTrigger value="remodelagem" className="data-[state=active]:shadow-md flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Sugestões de Remodelagem
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:shadow-md flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Insights de IA
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resultados" className="mt-6 animate-fade-in w-full">
          <div className="w-full overflow-x-auto" style={{ maxWidth: "100%", overflowX: "auto" }}>
            <ResultsTable results={results} onSelectVideo={onSelectVideo} />
          </div>
        </TabsContent>
        
        <TabsContent value="remodelagem" className="mt-6 animate-fade-in w-full">
          {selectedVideo ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <div className="lg:col-span-1">
                <Card className="p-5 glass-panel card-3d-effect">
                  <h3 className="text-lg font-bold mb-3 border-b pb-2">Vídeo Selecionado</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedVideo.title}</p>
                    <p className="text-sm text-muted-foreground">Canal: {selectedVideo.channel}</p>
                    <p className="text-sm text-muted-foreground">Viral Score: {selectedVideo.viralScore}</p>
                    <p className="text-sm text-muted-foreground">Nicho: {selectedVideo.mainNiche || "Diversos"}</p>
                    {selectedVideo.videoUrl && (
                      <div className="mt-4">
                        <a 
                          href={selectedVideo.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm flex items-center gap-1 font-medium"
                        >
                          Ver no YouTube →
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <RemodelingIdeas video={selectedVideo} allVideos={results} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 glass-panel w-full">
              <p className="text-muted-foreground">Selecione um vídeo para ver sugestões de remodelagem.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6 animate-fade-in w-full">
          {searchParams && (
            <AIInsights 
              results={results} 
              searchTerms={searchParams.keywords} 
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsSection;
