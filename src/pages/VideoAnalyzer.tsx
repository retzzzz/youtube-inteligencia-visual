
import React, { useState } from "react";
import Header from "@/components/Header";
import YoutubeAnalyzerForm from "@/components/YoutubeAnalyzerForm";
import VideoAnalysisResults from "@/components/VideoAnalysisResults";
import { Card } from "@/components/ui/card";
import { VideoAnalysis } from "@/types/youtube-types";
import { analyzeYoutubeVideo } from "@/services/youtube-analyzer";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const VideoAnalyzer = () => {
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeVideo = async (videoUrl: string) => {
    setIsLoading(true);
    
    try {
      const videoAnalysis = await analyzeYoutubeVideo(videoUrl);
      setAnalysis(videoAnalysis);
      
      toast({
        title: "Análise completa!",
        description: "Vídeo analisado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao analisar vídeo:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar este vídeo. Verifique o URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analisador de Vídeos do YouTube</h1>
          <p className="mb-6 text-muted-foreground">
            Cole o link de um vídeo do YouTube para analisar seu conteúdo, receber sugestões de títulos, 
            roteiros e ideias para remodelar o conteúdo de forma original.
          </p>
          
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Para usar esta função, você precisa configurar uma chave de API do YouTube no arquivo 
              <code className="mx-1 px-1 py-0.5 bg-muted rounded">src/services/youtube-analyzer.ts</code>.
              Obtenha sua chave no 
              <a 
                href="https://console.developers.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mx-1 text-primary underline"
              >
                Console de Desenvolvedores do Google
              </a>
              e ative a API YouTube Data v3.
            </AlertDescription>
          </Alert>
          
          <YoutubeAnalyzerForm onAnalyzeVideo={handleAnalyzeVideo} isLoading={isLoading} />
        </Card>
      </div>

      {analysis && (
        <VideoAnalysisResults analysis={analysis} />
      )}
    </div>
  );
};

export default VideoAnalyzer;
