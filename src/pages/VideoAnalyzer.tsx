
import React, { useState } from "react";
import Header from "@/components/Header";
import YoutubeAnalyzerForm from "@/components/YoutubeAnalyzerForm";
import VideoAnalysisResults from "@/components/VideoAnalysisResults";
import { Card } from "@/components/ui/card";
import { VideoAnalysis } from "@/types/youtube-types";
import { analyzeYoutubeVideo } from "@/services/youtube-analyzer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import ApiKeyDialog from "@/components/ApiKeyDialog";
import Footer from "@/components/Footer";

const VideoAnalyzer = () => {
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  const handleAnalyzeVideo = async (videoUrl: string) => {
    if (!youtubeApiKey) {
      toast({
        title: "API Key necessária",
        description: "Por favor, configure sua chave de API do YouTube primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const videoAnalysis = await analyzeYoutubeVideo(videoUrl, youtubeApiKey);
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
    <div className="min-h-screen flex flex-col w-full pb-32">
      <ApiKeyDialog />
      <Header />
      
      <div className="w-full px-4 md:px-8 py-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analisador de Vídeos do YouTube</h1>
          
          <p className="mb-6 text-muted-foreground">
            Cole o link de um vídeo do YouTube para analisar seu conteúdo, receber sugestões de títulos, 
            roteiros e ideias para remodelar o conteúdo de forma original.
          </p>
          
          <YoutubeAnalyzerForm onAnalyzeVideo={handleAnalyzeVideo} isLoading={isLoading} />
        </Card>
      </div>

      <div className="w-full px-4 md:px-8">
        {analysis && (
          <VideoAnalysisResults analysis={analysis} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default VideoAnalyzer;
