
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { fetchYouTubeData } from "@/services/youtube";
import { checkApiQuota } from "@/services/youtube/api-validator";

export const useYouTubeSearch = () => {
  const [searchParams, setSearchParams] = useState<YoutubeSearchParams | null>(null);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { youtubeApiKey, setNeedsApiKey } = useAuth();

  const handleSearch = async (params: YoutubeSearchParams) => {
    setIsLoading(true);
    setSearchParams(params);
    setSelectedVideo(null);
    setError(null);
    setResults([]);

    try {
      // Verificações de API key
      if (!youtubeApiKey || youtubeApiKey.trim() === "") {
        toast({
          title: "Chave de API não fornecida",
          description: "É necessário fornecer uma chave de API válida do YouTube para buscar resultados.",
          variant: "destructive",
        });
        setNeedsApiKey(true);
        throw new Error("Chave de API não fornecida");
      }

      // Verificar se a API key tem quota disponível
      const hasQuota = await checkApiQuota(youtubeApiKey);
      if (!hasQuota) {
        toast({
          title: "Quota da API excedida",
          description: "A quota diária desta chave de API foi excedida. Por favor, use outra chave ou tente novamente mais tarde.",
          variant: "destructive",
        });
        throw new Error("Quota da API do YouTube excedida");
      }

      // Usar a chave de API armazenada
      params.apiKey = youtubeApiKey;
      
      const data = await fetchYouTubeData(params);
      
      if (data.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de pesquisa ou usar outras palavras-chave.",
          variant: "default",
        });
        setResults([]);
        return;
      }

      setResults(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
      
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      
      let errorMessage = "Erro ao buscar dados. Tente novamente mais tarde.";
      
      if (error instanceof Error) {
        if (error.message.includes("quota")) {
          errorMessage = "Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.";
        } else if (error.message.includes("API key")) {
          errorMessage = "Chave de API inválida. Verifique se a chave foi digitada corretamente.";
          setNeedsApiKey(true);
        }
        
        setError(error.message);
      }
      
      toast({
        title: "Erro na pesquisa",
        description: errorMessage,
        variant: "destructive",
      });
      
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchParams,
    results,
    isLoading,
    selectedVideo,
    setSelectedVideo,
    handleSearch,
    error
  };
};
