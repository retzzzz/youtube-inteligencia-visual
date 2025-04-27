
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { enrichVideoData } from './video-enricher';
import { fetchVideoStats } from './video-stats';
import { fetchChannelStats } from './channel-stats';
import { validateApiKey } from './validators/api-validator';
import { markKeyAsNotNew } from './validators/key-validator';

/**
 * Busca dados do YouTube usando a API oficial
 * @param params Parâmetros de busca
 * @param forceNotNew Forçar a chave a não ser considerada nova
 */
export const fetchYouTubeData = async (params: YoutubeSearchParams, forceNotNew: boolean = false): Promise<VideoResult[]> => {
  if (!params.apiKey) {
    throw new Error("Chave de API do YouTube não fornecida");
  }

  try {
    console.log("Iniciando requisição à API do YouTube com a chave:", params.apiKey.substring(0, 5) + "..." + params.apiKey.substring(params.apiKey.length - 4));
    
    // Se forçar como não nova, marcar explicitamente
    if (forceNotNew) {
      console.log("Marcando chave como não nova (forceNotNew=true)");
      markKeyAsNotNew(params.apiKey);
    }
    
    // Verificar se a chave já foi marcada como não nova
    const keyMarker = localStorage.getItem(`apiKey_${params.apiKey.substring(0, 8)}_added`);
    if (keyMarker) {
      const keyAge = (Date.now() - parseInt(keyMarker)) / (1000 * 60);
      if (keyAge > 20) {
        forceNotNew = true;
        console.log("Chave API marcada como não nova (idade em minutos):", keyAge);
      }
    }
    
    // Montar a URL de busca com todos os parâmetros necessários
    const searchParams = new URLSearchParams({
      part: "snippet",
      maxResults: params.maxResults.toString(),
      q: params.keywords,
      type: params.searchType === "shorts" ? "video" : params.searchType,
      key: params.apiKey,
    });
    
    // Adicionar parâmetros condicionais
    if (params.searchType === "shorts") {
      searchParams.append("videoDuration", "short");
    }
    
    if (params.language && params.language !== "any") {
      searchParams.append("relevanceLanguage", params.language);
    }
    
    // Converter período para o formato da API
    if (params.period && params.period !== "all") {
      const now = new Date();
      let daysAgo = 0;
      
      switch (params.period) {
        case "24h": daysAgo = 1; break;
        case "48h": daysAgo = 2; break;
        case "72h": daysAgo = 3; break;
        case "7d": daysAgo = 7; break;
        case "30d": daysAgo = 30; break;
        case "90d": daysAgo = 90; break;
        case "180d": daysAgo = 180; break;
      }
      
      if (daysAgo > 0) {
        const pastDate = new Date(now);
        pastDate.setDate(now.getDate() - daysAgo);
        searchParams.append("publishedAfter", pastDate.toISOString());
      }
    }

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`;
    console.log("URL de busca:", searchUrl.replace(params.apiKey, "API_KEY_HIDDEN"));
    
    let maxRetries = forceNotNew ? 2 : 1;
    let currentRetry = 0;
    
    while (currentRetry <= maxRetries) {
      try {
        currentRetry++;
        console.log(`Tentativa de busca ${currentRetry}/${maxRetries + 1}`);
        
        const searchResponse = await fetch(searchUrl);
        console.log("Resposta da API:", searchResponse.status, searchResponse.statusText);
        
        if (!searchResponse.ok) {
          const errorData = await searchResponse.json();
          console.error("Dados de erro da API:", errorData);
          
          // Se for problema de quota e estamos forçando como não nova, tentar uma vez mais
          if (forceNotNew && 
              errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded") && 
              currentRetry <= maxRetries) {
            console.log("Erro de quota detectado, mas forceNotNew=true. Tentando novamente...");
            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo entre tentativas
            continue;
          }
          
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

        // Extrair IDs dos vídeos e canais
        const videoIds = searchData.items
          .filter((item: any) => item.id.kind === "youtube#video")
          .map((item: any) => item.id.videoId);
        
        if (videoIds.length === 0) {
          console.log("Nenhum vídeo encontrado nos resultados da pesquisa");
          return [];
        }
        
        const channelIds = searchData.items.map((item: any) => item.snippet.channelId);

        console.log(`Processando ${videoIds.length} vídeos e ${channelIds.length} canais`);

        // Buscar dados adicionais (estatísticas)
        const videoStats = await fetchVideoStats(videoIds, params.apiKey);
        const channelStats = await fetchChannelStats(channelIds, params.apiKey);

        // Enriquecer e filtrar os resultados
        const results = enrichVideoData(searchData.items, videoStats, channelStats, params);
        
        console.log(`Processados ${results.length} resultados após filtros`);
        return results;
      } catch (retryError) {
        console.error(`Erro na tentativa ${currentRetry}:`, retryError);
        
        // Se estamos na última tentativa, propagar o erro
        if (currentRetry > maxRetries) {
          throw retryError;
        }
        
        // Esperar antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    // Se chegamos aqui, todas as tentativas falharam
    throw new Error("Todas as tentativas de busca falharam");
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
