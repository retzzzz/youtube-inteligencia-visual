
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { detectNiche, calculateViralScore, estimateCPM } from './metrics';
import { isMusicVideo } from './utils';
import { calculateVideoAge } from './video-generator';

// Function to fetch data from the YouTube API
export const fetchYouTubeData = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  if (!params.apiKey) {
    throw new Error("Chave de API do YouTube não fornecida");
  }
  
  try {
    // Construir parâmetros de busca
    const searchParams = new URLSearchParams({
      part: "snippet",
      maxResults: params.maxResults.toString(),
      q: params.keywords,
      type: params.searchType === "shorts" ? "video" : params.searchType,
      key: params.apiKey,
    });
    
    // Para shorts, adicionar filtro específico
    if (params.searchType === "shorts") {
      searchParams.append("videoDuration", "short");
    }
    
    // Adicionar filtro de idioma se especificado
    if (params.language && params.language !== "any") {
      searchParams.append("relevanceLanguage", params.language);
    }
    
    console.log("Fazendo solicitação para a API do YouTube:", 
               `https://www.googleapis.com/youtube/v3/search?${searchParams.toString().replace(params.apiKey, "API_KEY_HIDDEN")}`);
    
    // Fazer solicitação para a API de pesquisa do YouTube
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`
    );
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Resposta de erro da API:", errorData);
      
      // Verificar se o erro é de quota excedida
      if (errorData.error && errorData.error.errors && 
          errorData.error.errors.some((e: any) => e.reason === "quotaExceeded")) {
        throw new Error("Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.");
      }
      
      throw new Error(`Erro na API do YouTube: ${errorData.error?.message || searchResponse.statusText || searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    console.log("Dados brutos da API do YouTube:", searchData.pageInfo);
    
    const items = searchData.items || [];
    
    if (items.length === 0) {
      console.log("A API do YouTube não retornou resultados");
      return [];
    }
    
    // Coletar IDs de vídeos e canais para buscar informações adicionais
    const videoIds = items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => item.id.videoId);
      
    const channelIds = items.map((item: any) => item.snippet.channelId);
    
    // Buscar estatísticas de vídeos se tivermos IDs de vídeo
    let videoStatsMap: Record<string, any> = {};
    if (videoIds.length > 0) {
      const videoStatsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet,topicDetails&id=${videoIds.join(",")}&key=${params.apiKey}`
      );
      
      if (!videoStatsResponse.ok) {
        const errorData = await videoStatsResponse.json();
        console.error("Erro ao buscar estatísticas de vídeos:", errorData);
        throw new Error(`Erro ao buscar estatísticas de vídeos: ${errorData.error?.message || videoStatsResponse.statusText}`);
      }
      
      if (videoStatsResponse.ok) {
        const videoStatsData = await videoStatsResponse.json();
        videoStatsMap = (videoStatsData.items || []).reduce((acc: Record<string, any>, item: any) => {
          acc[item.id] = {
            views: parseInt(item.statistics.viewCount) || 0,
            likes: parseInt(item.statistics.likeCount) || 0,
            comments: parseInt(item.statistics.commentCount) || 0,
            duration: item.contentDetails.duration,
            publishedAt: item.snippet.publishedAt,
            tags: item.snippet.tags || [],
            description: item.snippet.description || "",
            category: item.snippet.categoryId,
            topicDetails: item.topicDetails
          };
          return acc;
        }, {});
      }
    }
    
    // Buscar estatísticas de canais
    let channelStatsMap: Record<string, any> = {};
    if (channelIds.length > 0) {
      const channelStatsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelIds.join(",")}&key=${params.apiKey}`
      );
      
      if (!channelStatsResponse.ok) {
        const errorData = await channelStatsResponse.json();
        console.error("Erro ao buscar estatísticas de canais:", errorData);
        throw new Error(`Erro ao buscar estatísticas de canais: ${errorData.error?.message || channelStatsResponse.statusText}`);
      }
      
      if (channelStatsResponse.ok) {
        const channelStatsData = await channelStatsResponse.json();
        channelStatsMap = (channelStatsData.items || []).reduce((acc: Record<string, any>, item: any) => {
          acc[item.id] = {
            subscribers: parseInt(item.statistics.subscriberCount) || 0,
            videoCount: parseInt(item.statistics.videoCount) || 0,
            publishedAt: item.snippet.publishedAt
          };
          return acc;
        }, {});
      }
    }
    
    // Mapear resultados para o formato esperado
    const results = items.map((item: any) => {
      const videoId = item.id.videoId || null;
      const channelId = item.snippet.channelId;
      
      // Obter estatísticas do vídeo e canal dos mapas criados
      const videoStats = videoId ? videoStatsMap[videoId] || {} : {};
      const channelStats = channelStatsMap[channelId] || {};
      
      // Calcular valores
      const views = videoStats.views || 0;
      const likes = videoStats.likes || Math.floor(views * (Math.random() * 0.08 + 0.02));
      const comments = videoStats.comments || Math.floor(likes * (Math.random() * 0.4 + 0.1));
      const engagement = Math.round(((likes + comments) / Math.max(1, views)) * 100);
      
      // Calcular idade do vídeo baseado na data de publicação real
      let videoAge;
      if (videoStats.publishedAt) {
        const publishDate = new Date(videoStats.publishedAt);
        const now = new Date();
        videoAge = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
      } else {
        videoAge = calculateVideoAge(params.period);
      }
      
      // Se o período foi especificado, vamos respeitar isso
      if (params.period !== "all") {
        const maxAgeInDays = {
          "24h": 1,
          "48h": 2,
          "72h": 3,
          "7d": 7,
          "30d": 30,
          "90d": 90,
          "180d": 180,
        }[params.period];
        
        // Se o vídeo for mais antigo que o período especificado, ignorar
        if (maxAgeInDays && videoAge > maxAgeInDays) {
          return null;
        }
      }
      
      // Verificar se é um vídeo musical e excluir se necessário
      if (params.excludeMusic && isMusicVideo(item.snippet.title, videoStats.category, videoStats.tags)) {
        return null;
      }
      
      // Obter inscritos
      const subscribers = channelStats.subscribers || 0;
      
      // Verificar filtros de inscritos
      if ((params.minSubscribers && subscribers < params.minSubscribers) ||
          (params.maxSubscribers && subscribers > params.maxSubscribers)) {
        return null;
      }
      
      // Verificar filtros de visualizações
      if ((params.minViews && views < params.minViews) ||
          (params.maxViews && views > params.maxViews)) {
        return null;
      }
      
      // Detectar nicho com base no título e palavras-chave
      const tagsString = (videoStats.tags || []).join(" ");
      const nicheInfo = detectNiche(item.snippet.title, tagsString + " " + (videoStats.description || ""));
      
      // Calcular métricas
      const viralScore = calculateViralScore(views, engagement, videoAge, subscribers);
      const estimatedCPM = estimateCPM(
        item.snippet.defaultLanguage || params.language || "en", 
        nicheInfo.mainNiche,
        views, 
        engagement
      );
      const estimatedRPM = Number((estimatedCPM * 0.55).toFixed(2)); // YouTubers geralmente recebem 55% do CPM
      const estimatedEarnings = Number(((views / 1000) * estimatedRPM).toFixed(2));
      
      // Construir URLs
      const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined;
      const channelUrl = channelId ? `https://www.youtube.com/channel/${channelId}` : undefined;
      
      // Obter o idioma do vídeo do snippet ou usar o parâmetro language
      const videoLanguage = item.snippet.defaultLanguage || item.snippet.defaultAudioLanguage || params.language || "unknown";
      
      return {
        id: videoId || item.id.channelId || item.id.playlistId || Math.random().toString(36).substring(2, 15),
        title: item.snippet.title || "",
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        channel: item.snippet.channelTitle,
        channelId,
        channelUrl,
        videoUrl,
        views,
        engagement,
        viralScore,
        estimatedCPM,
        estimatedRPM,
        estimatedEarnings,
        subscribers,
        videoAge,
        channelDate: channelStats.publishedAt || new Date().toISOString(),
        language: videoLanguage,
        mainNiche: nicheInfo.mainNiche,
        subNiche: nicheInfo.subNiche,
        category: videoStats.category
      };
    }).filter(Boolean); // Remover vídeos filtrados (null)
    
    // Filtrar por idioma se especificado
    if (params.language && params.language !== "any") {
      return results.filter(video => 
        video && video.language.toLowerCase().includes(params.language.toLowerCase())
      );
    }
    
    return results;
  } catch (error) {
    console.error("Erro detalhado ao buscar dados do YouTube:", error);
    throw error;
  }
};
