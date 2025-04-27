
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { enrichVideoData } from './video-enricher';
import { fetchVideoStats } from './video-stats';
import { fetchChannelStats } from './channel-stats';
import { validateApiKey } from './api-validator';

export const fetchYouTubeData = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  if (!params.apiKey) {
    throw new Error("Chave de API do YouTube não fornecida");
  }

  try {
    // Validate API key first
    await validateApiKey(params.apiKey);
    
    // Fetch initial search results
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams({
        part: "snippet",
        maxResults: params.maxResults.toString(),
        q: params.keywords,
        type: params.searchType === "shorts" ? "video" : params.searchType,
        key: params.apiKey,
        ...(params.searchType === "shorts" && { videoDuration: "short" }),
        ...(params.language && params.language !== "any" && { relevanceLanguage: params.language })
      }).toString()}`
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      handleApiError(errorData, searchResponse);
    }

    const searchData = await searchResponse.json();
    console.log("Dados brutos da API do YouTube:", searchData.pageInfo);

    if (!searchData.items?.length) {
      console.log("A API do YouTube não retornou resultados");
      return [];
    }

    // Extract IDs
    const videoIds = searchData.items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => item.id.videoId);
    
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);

    // Fetch additional data
    const videoStats = await fetchVideoStats(videoIds, params.apiKey);
    const channelStats = await fetchChannelStats(channelIds, params.apiKey);

    // Enrich and filter results
    const results = enrichVideoData(searchData.items, videoStats, channelStats, params);

    return results;
  } catch (error) {
    console.error("Erro detalhado ao buscar dados do YouTube:", error);
    throw error;
  }
};

const handleApiError = (errorData: any, response: Response) => {
  console.error("Resposta de erro da API:", errorData);
  
  if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
    throw new Error("Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.");
  }
  
  throw new Error(`Erro na API do YouTube: ${errorData.error?.message || response.statusText || response.status}`);
};
