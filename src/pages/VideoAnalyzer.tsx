import React, { useState } from "react";
import Header from "@/components/Header";
import YoutubeAnalyzerForm from "@/components/YoutubeAnalyzerForm";
import VideoAnalysisResults from "@/components/VideoAnalysisResults";
import { Card } from "@/components/ui/card";
import { VideoAnalysis } from "@/types/youtube-types";
import { analyzeYoutubeVideo } from "@/services/youtube-analyzer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ApiKeyDialog from "@/components/ApiKeyDialog";
import { Link } from "react-router-dom";

const VideoAnalyzer = () => {
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey, logout } = useAuth();

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
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <ApiKeyDialog />
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Analisador de Vídeos do YouTube</h1>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
          
          <p className="mb-6 text-muted-foreground">
            Cole o link de um vídeo do YouTube para analisar seu conteúdo, receber sugestões de títulos, 
            roteiros e ideias para remodelar o conteúdo de forma original.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Link to="/title-generator">
              <Button variant="secondary">Gerador de Títulos</Button>
            </Link>
            <Link to="/script-generator">
              <Button variant="secondary">Roteirizador Automático</Button>
            </Link>
          </div>
          
          {!youtubeApiKey ? (
            <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
              <h3 className="text-amber-800 font-medium mb-2">Configuração necessária</h3>
              <p className="text-amber-700">
                Configure sua chave de API do YouTube para começar a usar esta ferramenta.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
              <h3 className="text-green-800 font-medium mb-2">API configurada</h3>
              <p className="text-green-700">
                Sua API do YouTube está configurada! Você pode analisar vídeos livremente.
              </p>
            </div>
          )}
          
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
