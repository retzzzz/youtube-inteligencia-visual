
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { searchYouTubeVideos } from "@/services/youtube-mock-service";
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

export const useYouTubeSearch = () => {
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
      if (!params.apiKey || params.apiKey.trim() === "") {
        toast({
          title: "Chave de API não fornecida",
          description: "Você precisa fornecer uma chave de API válida do YouTube para obter resultados reais.",
          variant: "destructive",
        });
        console.log("API Key não fornecida, usando dados simulados");
      }
      
      let data = await searchYouTubeVideos(params);
      
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
      toast({
        title: "Erro na pesquisa",
        description: "Ocorreu um erro ao buscar dados. Verifique sua chave de API e tente novamente.",
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
    handleSearch
  };
};
