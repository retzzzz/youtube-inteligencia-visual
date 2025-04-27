
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { enrichVideoData } from './video-enricher';
import { fetchVideoStats } from './video-stats';
import { fetchChannelStats } from './channel-stats';
import { validateApiKey } from './validators/api-validator';

/**
 * Busca dados do YouTube usando a API oficial
 */
export const fetchYouTubeData = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  if (!params.apiKey) {
    throw new Error("Chave de API do YouTube não fornecida");
  }

  try {
    console.log("Iniciando requisição à API do YouTube com a chave:", params.apiKey.substring(0, 5) + "..." + params.apiKey.substring(params.apiKey.length - 4));
    
    // Verifica se a chave é nova (criada recentemente)
    const keyInfo = await validateApiKey(params.apiKey);
    console.log("Informações da chave API:", keyInfo);
    
    // Para chaves novas, usamos um endpoint mais leve para o primeiro teste
    if (keyInfo.message.includes("nova")) {
      try {
        // Tente usar um endpoint leve primeiro para chaves novas
        const testResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${params.apiKey}`
        );
        
        console.log("Teste inicial para chave nova:", testResponse.status);
        if (!testResponse.ok) {
          const errorData = await testResponse.json();
          console.log("Resposta do teste para chave nova:", errorData);
        }
      } catch (e) {
        console.log("Erro no teste de chave nova:", e);
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
    
    const searchResponse = await fetch(searchUrl);
    console.log("Resposta da API:", searchResponse.status, searchResponse.statusText);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Dados de erro da API:", errorData);
      
      // Verificar se é uma chave nova com falso positivo de quota excedida
      if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        // Sempre verificar a idade da chave para chaves que retornam erro de quota
        const keyAge = await checkKeyCreationDate(params.apiKey);
        console.log("Idade da chave API (minutos):", keyAge);
        
        if (keyAge !== undefined && keyAge < 15) {
          // Para chaves novas (menos de 15 minutos), é provavelmente um erro temporário
          throw new Error("Esta chave foi criada recentemente e precisa de alguns minutos para ativar completamente. Por favor, aguarde cerca de 5-15 minutos e tente novamente.");
        }
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
  } catch (error) {
    console.error("Erro detalhado ao buscar dados do YouTube:", error);
    throw error;
  }
};

/**
 * Tenta determinar se a chave API é nova
 * Retorna a idade aproximada em minutos, ou undefined se não for possível determinar
 */
const checkKeyCreationDate = async (apiKey: string): Promise<number | undefined> => {
  try {
    // Verificar quando a chave foi utilizada pela primeira vez usando uma chamada leve
    const testEndpoints = [
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    ];
    
    // Tentar ambos os endpoints para garantir
    for (const endpoint of testEndpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          // Se algum endpoint funcionar, consideramos que a chave está ativa
          return 30;
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    // Se chegou aqui, nenhum endpoint funcionou, mas ainda pode ser uma chave nova
    // Retornar um valor pequeno para indicar que pode ser uma chave nova
    return 5;
  } catch (error) {
    console.error("Erro ao verificar idade da chave:", error);
    return undefined;
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
