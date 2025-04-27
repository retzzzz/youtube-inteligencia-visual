
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { searchYouTubeVideos } from "@/services/youtube-mock-service";
import { useToast } from "@/hooks/use-toast";

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
      // Verificar se a API key foi fornecida
      if (!params.apiKey || params.apiKey.trim() === "") {
        toast({
          title: "Chave de API não fornecida",
          description: "Você precisa fornecer uma chave de API válida do YouTube para obter resultados reais.",
          variant: "destructive",
        });
        console.log("API Key não fornecida, usando dados simulados");
      }
      
      const data = await searchYouTubeVideos(params);
      
      // Garantir que os filtros sejam aplicados corretamente
      let filteredData = data;
      
      // Filter by selected language (aplicado de forma rigorosa)
      if (params.language !== "any") {
        console.log(`Filtrando por idioma: ${params.language}`);
        filteredData = filteredData.filter(video => video.language === params.language);
      }
      
      // Filter by selected period (aplicado de forma rigorosa)
      if (params.period !== "all") {
        console.log(`Filtrando por período: ${params.period}`);
        const periodDays = getPeriodInDays(params.period);
        filteredData = filteredData.filter(video => video.videoAge <= periodDays);
        console.log(`Filtrando vídeos com idade menor ou igual a ${periodDays} dias`);
      }
      
      // Filter music videos if option is enabled
      if (params.excludeMusic) {
        filteredData = filteredData.filter(video => video.category !== "Music" && 
          !isLikelyMusic(video.title));
      }
      
      // Filter by excluded keywords
      if (params.excludeKeywords) {
        const keywords = params.excludeKeywords.toLowerCase().split(',').map(k => k.trim());
        filteredData = filteredData.filter(video => {
          const videoTitle = video.title.toLowerCase();
          return !keywords.some(keyword => videoTitle.includes(keyword));
        });
      }
      
      // Aplicar filtros de visualizações
      if (params.minViews) {
        filteredData = filteredData.filter(video => video.views >= params.minViews);
      }
      
      if (params.maxViews) {
        filteredData = filteredData.filter(video => video.views <= params.maxViews);
      }
      
      // Aplicar filtros de inscritos
      if (params.minSubscribers) {
        filteredData = filteredData.filter(video => video.subscribers >= params.minSubscribers);
      }
      
      if (params.maxSubscribers) {
        filteredData = filteredData.filter(video => video.subscribers <= params.maxSubscribers);
      }
      
      const enrichedData = enrichVideoData(filteredData);
      setResults(enrichedData);
      
      handleSearchResults(enrichedData);
      
      // Log para depuração
      console.log("Dados da pesquisa:", {
        usandoApiReal: params.apiKey && params.apiKey.trim() !== "",
        resultadosBrutos: data.length,
        resultadosFiltrados: filteredData.length,
        resultadosEnriquecidos: enrichedData.length,
        filtrosAplicados: {
          idioma: params.language,
          periodo: params.period,
          periodoDias: getPeriodInDays(params.period),
          minViews: params.minViews,
          maxViews: params.maxViews,
          minSubscribers: params.minSubscribers,
          maxSubscribers: params.maxSubscribers,
          excludeMusic: params.excludeMusic,
          excludeKeywords: params.excludeKeywords
        }
      });
      
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

  const handleSearchResults = (enrichedData: VideoResult[]) => {
    if (enrichedData.length === 0) {
      toast({
        title: "Sem resultados",
        description: "Sua pesquisa não retornou resultados. Tente outros parâmetros.",
      });
    } else {
      const emergingVideos = enrichedData.filter(video => video.videoAge <= 3 && video.viralScore > 700);
      
      toast({
        title: "Pesquisa concluída",
        description: `Encontrados ${enrichedData.length} resultados para sua busca${emergingVideos.length > 0 ? `, incluindo ${emergingVideos.length} vídeos emergentes` : ""}.`,
      });
      
      if (enrichedData.length > 0) {
        const topVideo = [...enrichedData].sort((a, b) => b.viralScore - a.viralScore)[0];
        setSelectedVideo(topVideo);
      }
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

const getPeriodInDays = (period: string): number => {
  switch (period) {
    case "24h": return 1;
    case "48h": return 2;
    case "72h": return 3;
    case "7d": return 7;
    case "30d": return 30;
    case "90d": return 90;
    case "180d": return 180;
    default: return Infinity; // "all" - usar Infinity em vez de um número grande para ser mais claro
  }
};

const isLikelyMusic = (title: string): boolean => {
  const musicKeywords = ["official video", "lyrics", "music video", "official music", "official audio", 
    "videoclip", "video clip", "ft.", "feat", "official lyric", "audio oficial", "clipe oficial"];
  
  title = title.toLowerCase();
  return musicKeywords.some(keyword => title.includes(keyword));
};

const enrichVideoData = (videos: VideoResult[]): VideoResult[] => {
  return videos.map(video => {
    const viewsPerHour = video.videoAge > 0 ? Math.round(video.views / (video.videoAge * 24)) : 0;
    
    let channelSize: "small" | "medium" | "large" = "medium";
    if (video.subscribers < 100000) channelSize = "small";
    else if (video.subscribers > 1000000) channelSize = "large";
    
    let viralityPotential: "low" | "medium" | "high" = "low";
    let viralityReason = "";
    
    if (video.videoAge < 3 && video.engagement > 7 && viewsPerHour > 200) {
      viralityPotential = "high";
      viralityReason = "vídeo recente, alto engajamento, crescimento rápido";
    } else if ((video.videoAge < 7 && video.engagement > 5) || viewsPerHour > 100) {
      viralityPotential = "medium";
      viralityReason = video.videoAge < 7 
        ? "bom engajamento em vídeo recente" 
        : "taxa de visualizações consistente";
    } else {
      viralityReason = "métricas de engajamento e crescimento moderadas";
    }
    
    let growthType: "explosive" | "emerging" | "latent" | undefined;
    
    if (viewsPerHour > 500 && video.videoAge < 2) {
      growthType = "explosive";
    } else if (viewsPerHour > 100 || (video.engagement > 8 && video.videoAge < 7)) {
      growthType = "emerging";
    } else if (video.subscribers < 50000 && video.engagement > 5) {
      growthType = "latent";
    }
    
    const growthData = generateGrowthData(video.views, video.videoAge);
    
    return {
      ...video,
      viewsPerHour,
      channelSize,
      viralityPotential,
      viralityReason,
      growthType,
      growthData
    };
  });
};

const generateGrowthData = (totalViews: number, ageInDays: number) => {
  const data = [];
  const now = new Date();
  const viewsPerDay = totalViews / Math.max(1, ageInDays);
  
  const dataPoints = Math.min(7, Math.ceil(ageInDays));
  
  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const variability = 0.2 * Math.random() - 0.1;
    const dailyViews = Math.round(viewsPerDay * (1 + variability) * (dataPoints - i) / dataPoints);
    
    data.unshift({
      timestamp: date.toISOString(),
      views: dailyViews
    });
  }
  
  return data;
};
