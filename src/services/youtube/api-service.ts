
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { enrichVideoData } from './video-enricher';
import { fetchVideoStats } from './video-stats';
import { fetchChannelStats } from './channel-stats';
import { validateApiKey } from './api-validator';

/**
 * Busca dados do YouTube usando a API oficial
 */
export const fetchYouTubeData = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  if (!params.apiKey) {
    throw new Error("Chave de API do YouTube não fornecida");
  }

  try {
    console.log("Iniciando requisição à API do YouTube com a chave:", params.apiKey.substring(0, 5) + "..." + params.apiKey.substring(params.apiKey.length - 4));
    
    // Fetch initial search results
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
      part: "snippet",
      maxResults: params.maxResults.toString(),
      q: params.keywords,
      type: params.searchType === "shorts" ? "video" : params.searchType,
      key: params.apiKey,
      ...(params.searchType === "shorts" && { videoDuration: "short" }),
      ...(params.language && params.language !== "any" && { relevanceLanguage: params.language })
    }).toString()}`;

    console.log("URL de busca:", searchUrl.replace(params.apiKey, "API_KEY_HIDDEN"));
    const searchResponse = await fetch(searchUrl);

    console.log("Resposta da API:", searchResponse.status, searchResponse.statusText);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Dados de erro da API:", errorData);
      handleApiError(errorData, searchResponse);
    }

    const searchData = await searchResponse.json();
    console.log("Resposta bem-sucedida:", {
      totalResults: searchData.pageInfo?.totalResults,
      resultsPerPage: searchData.pageInfo?.resultsPerPage,
      itemsCount: searchData.items?.length
    });

    if (!searchData.items?.length) {
      console.log("A API do YouTube não retornou resultados");
      return [];
    }

    // Extract IDs
    const videoIds = searchData.items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => item.id.videoId);
    
    if (videoIds.length === 0) {
      console.log("Nenhum vídeo encontrado nos resultados da pesquisa");
      return [];
    }
    
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);

    console.log(`Processando ${videoIds.length} vídeos e ${channelIds.length} canais`);

    // Fetch additional data
    const videoStats = await fetchVideoStats(videoIds, params.apiKey);
    const channelStats = await fetchChannelStats(channelIds, params.apiKey);

    // Enrich and filter results
    const results = enrichVideoData(searchData.items, videoStats, channelStats, params);
    
    console.log(`Processados ${results.length} resultados após filtros`);
    return results;
  } catch (error) {
    console.error("Erro detalhado ao buscar dados do YouTube:", error);
    throw error;
  }
};

/**
 * Trata erros específicos da API do YouTube
 */
const handleApiError = (errorData: any, response: Response) => {
  console.error("Resposta de erro da API do YouTube:", errorData);
  
  // Verificar se há erros específicos
  if (errorData.error?.errors) {
    // Verificar quota excedida
    if (errorData.error.errors.some((e: any) => e.reason === "quotaExceeded")) {
      throw new Error("Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.");
    }
    
    // Verificar chave inválida
    if (errorData.error.errors.some((e: any) => e.reason === "keyInvalid")) {
      throw new Error("Chave de API inválida. Verifique se a chave foi digitada corretamente.");
    }
    
    // Verificar API desabilitada
    if (errorData.error.errors.some((e: any) => e.reason === "accessNotConfigured")) {
      throw new Error("A API do YouTube não está habilitada para esta chave. Acesse o Google Cloud Console e ative a YouTube Data API v3.");
    }
  }
  
  // Erro genérico
  throw new Error(`Erro na API do YouTube: ${errorData.error?.message || response.statusText || response.status}`);
};
