
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { fetchYouTubeData } from "@/services/youtube";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook that manages the core search functionality
 */
export const useSearchQueries = () => {
  const [searchParams, setSearchParams] = useState<YoutubeSearchParams | null>(null);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const performSearch = async (
    params: YoutubeSearchParams, 
    forceNotNew: boolean = false
  ) => {
    if (!params.apiKey) {
      toast({
        title: "Chave de API não fornecida",
        description: "É necessário fornecer uma chave de API válida do YouTube para buscar resultados.",
        variant: "destructive",
      });
      return { success: false, error: "Chave de API não fornecida" };
    }
    
    setIsLoading(true);
    setSearchParams(params);
    setSelectedVideo(null);
    setError(null);
    setResults([]);
    
    try {
      // Fetch data from YouTube API
      console.log("Buscando dados com parâmetros:", {...params, apiKey: "API_KEY_HIDDEN"});
      const data = await fetchYouTubeData(params, forceNotNew);
      console.log("Dados recebidos da API:", data?.length || 0, "resultados");
      
      if (!data || data.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de pesquisa ou usar outras palavras-chave.",
          variant: "default",
        });
        setResults([]);
        return { success: true, noResults: true };
      }

      setResults(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
      return { success: true, results: data };
    } catch (error) {
      console.error("Erro específico na busca:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Erro desconhecido" 
      };
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
    performSearch,
    error,
  };
};
