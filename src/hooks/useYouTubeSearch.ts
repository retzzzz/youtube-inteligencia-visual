
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { searchYouTubeVideos } from "@/services/youtube-mock";
import { useToast } from "@/hooks/use-toast";
import {
  filterVideosByLanguage,
  filterVideosByPeriod,
  filterMusicVideos,
  filterByKeywords,
  filterByViews,
  filterBySubscribers
} from "@/utils/video-filters";
import { handleSearchResults } from "@/utils/search-results-handler";
import { useAuth } from "@/contexts/AuthContext";

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

    try {
      // Verificações de API key
      if (!params.apiKey || params.apiKey.trim() === "") {
        toast({
          title: "Chave de API não fornecida",
          description: "É necessário fornecer uma chave de API válida do YouTube para buscar resultados.",
          variant: "destructive",
        });
        setNeedsApiKey(true);
        throw new Error("Chave de API não fornecida");
      }
      
      let data = await searchYouTubeVideos(params);
      
      if (data.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de pesquisa ou usar outras palavras-chave.",
          variant: "default",
        });
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      // Aplicar filtros em sequência
      data = filterVideosByLanguage(data, params.language);
      data = filterVideosByPeriod(data, params.period);
      if (params.excludeMusic) {
        data = filterMusicVideos(data);
      }
      data = filterByKeywords(data, params.excludeKeywords);
      data = filterByViews(data, params.minViews, params.maxViews);
      data = filterBySubscribers(data, params.minSubscribers, params.maxSubscribers);
      
      // Log para depuração
      console.log("Dados da pesquisa:", {
        usandoApiReal: params.apiKey && params.apiKey.trim() !== "",
        resultadosBrutos: data.length,
        filtrosAplicados: {
          idioma: params.language,
          periodo: params.period,
          minViews: params.minViews,
          maxViews: params.maxViews,
          minSubscribers: params.minSubscribers,
          maxSubscribers: params.maxSubscribers,
          excludeMusic: params.excludeMusic,
          excludeKeywords: params.excludeKeywords
        }
      });
      
      setResults(data);
      const topVideo = handleSearchResults(data);
      if (topVideo) {
        setSelectedVideo(topVideo);
      }
      
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      
      let errorMessage = "Erro ao buscar dados. Tente novamente mais tarde.";
      
      if (error instanceof Error) {
        // Verificar erros específicos da API
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
