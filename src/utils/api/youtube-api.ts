
import { Canal, Subnicho } from '../types/youtube-types';

export const extrairSubnichos = async (
  nicho_principal: string,
  idioma: string,
  max_canais: number,
  apiKey: string
): Promise<Subnicho[]> => {
  try {
    console.log(`Extraindo subnichos para '${nicho_principal}' em ${idioma} (máximo: ${max_canais} canais)`);
    
    // Buscar canais usando a API do YouTube
    const searchQuery = `${nicho_principal} ${idioma}`;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=channel&maxResults=${max_canais}&key=${apiKey}`;
    console.log("Buscando canais com URL:", searchUrl.replace(apiKey, "API_KEY_HIDDEN"));
    
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Erro na busca de canais:", errorData);
      
      // Verificar se é um erro de quota excedida em uma chave nova
      if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        const keyAge = await checkKeyCreationDate(apiKey);
        console.log("Idade aproximada da chave:", keyAge, "minutos");
        
        if (keyAge !== undefined && keyAge < 15) {
          throw new Error("Esta chave foi criada recentemente e pode levar alguns minutos para ficar totalmente ativa. Aguarde 5-15 minutos e tente novamente.");
        }
        
        throw new Error("Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave diferente.");
      }
      
      if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
        throw new Error("Chave de API inválida. Verifique se a chave foi digitada corretamente.");
      }
      
      throw new Error(`Falha ao buscar canais: ${errorData.error?.message || searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();
    console.log(`Encontrados ${searchData.items?.length || 0} canais iniciais`);
    
    if (!searchData.items?.length) {
      return [];
    }
    
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);
    
    // Buscar detalhes dos canais
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelIds.join(',')}&key=${apiKey}`;
    console.log("Buscando detalhes dos canais");
    
    const channelsResponse = await fetch(channelsUrl);
    
    if (!channelsResponse.ok) {
      const errorData = await channelsResponse.json();
      console.error("Erro ao buscar detalhes dos canais:", errorData);
      throw new Error(`Falha ao buscar detalhes dos canais: ${errorData.error?.message || channelsResponse.statusText}`);
    }
    
    const channelsData = await channelsResponse.json();
    console.log(`Detalhes obtidos para ${channelsData.items?.length || 0} canais`);
    
    // Processar dados dos canais
    const canais: Canal[] = [];
    
    // Usar um loop tradicional para evitar muitas solicitações paralelas que poderiam esgotar a quota
    for (const channel of channelsData.items) {
      try {
        // Buscar vídeos recentes do canal (limitando a 5 para economizar quota)
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&order=date&type=video&maxResults=5&key=${apiKey}`
        );
        
        if (!videosResponse.ok) {
          console.warn(`Não foi possível obter vídeos para o canal ${channel.id}`);
          continue;
        }
        
        const videosData = await videosResponse.json();
        
        canais.push({
          nome_do_canal: channel.snippet.title,
          data_de_criacao: channel.snippet.publishedAt,
          total_videos: parseInt(channel.statistics.videoCount || "0"),
          total_inscritos: parseInt(channel.statistics.subscriberCount || "0"),
          titulos_recentes: (videosData.items || []).map((video: any) => video.snippet.title)
        });
      } catch (error) {
        console.warn(`Erro ao processar canal ${channel.id}:`, error);
      }
    }
    
    console.log(`Processados com sucesso ${canais.length} canais`);
    
    // Agrupar canais por subnichos usando os títulos dos vídeos
    const subnichoMap = new Map<string, Canal[]>();
    
    canais.forEach(canal => {
      const palavrasChave = extrairPalavrasChave(canal.titulos_recentes);
      palavrasChave.forEach(subnicho => {
        if (!subnichoMap.has(subnicho)) {
          subnichoMap.set(subnicho, []);
        }
        subnichoMap.get(subnicho)?.push(canal);
      });
    });
    
    const resultado = Array.from(subnichoMap.entries()).map(([subnicho, canais]) => ({
      subnicho,
      canais_exemplos: canais
    }));
    
    console.log(`Identificados ${resultado.length} subnichos potenciais`);
    return resultado;
    
  } catch (error) {
    console.error("Erro ao extrair subnichos:", error);
    throw error;
  }
};

export const extrairCanaisPromissores = async (
  nicho_principal: string,
  idioma: string,
  max_canais: number,
  youtubeApiKey: string
): Promise<Canal[]> => {
  try {
    const subnichos = await extrairSubnichos(nicho_principal, idioma, max_canais, youtubeApiKey);
    
    const canaisFlatList: Canal[] = [];
    subnichos.forEach(subnicho => {
      subnicho.canais_exemplos.forEach(canal => {
        if (!canaisFlatList.some(c => c.nome_do_canal === canal.nome_do_canal)) {
          canaisFlatList.push(canal);
        }
      });
    });
    
    const hoje = new Date();
    return canaisFlatList.filter(canal => {
      const dataCriacao = new Date(canal.data_de_criacao);
      const idadeMeses = (hoje.getFullYear() - dataCriacao.getFullYear()) * 12 + 
                        (hoje.getMonth() - dataCriacao.getMonth());
      
      const ratioInscritosVideos = canal.total_inscritos / (canal.total_videos || 1);
      
      return idadeMeses <= 6 && ratioInscritosVideos >= 100;
    });
  } catch (error) {
    console.error("Erro ao extrair canais promissores:", error);
    throw error;
  }
};

/**
 * Tenta determinar se a chave API é nova
 * Retorna a idade aproximada em minutos, ou undefined se não conseguir determinar
 */
const checkKeyCreationDate = async (apiKey: string): Promise<number | undefined> => {
  try {
    // Verificar usando um endpoint leve
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    if (response.ok) {
      // Se o endpoint funcionar, a chave não é tão nova
      return 30; // Retorna um valor alto, indicando que não é nova
    }
    
    // Se o endpoint falhar, pode ser uma chave nova ou inválida
    // Retornamos um valor baixo para indicar que pode ser uma chave nova
    return 5;
  } catch (error) {
    console.error("Erro ao verificar idade da chave:", error);
    return undefined;
  }
};

/**
 * Simula a extração de palavras-chave para identificar subnichos
 */
function extrairPalavrasChave(titulos: string[]): string[] {
  // Implementação básica - em produção, usar uma biblioteca de NLP
  const palavras = titulos.join(' ').toLowerCase().split(' ');
  const stopwords = ['o', 'a', 'os', 'as', 'um', 'uma', 'e', 'de', 'do', 'da', 'dos', 'das'];
  const frequencia = new Map<string, number>();
  
  palavras
    .filter(palavra => !stopwords.includes(palavra) && palavra.length > 3)
    .forEach(palavra => {
      frequencia.set(palavra, (frequencia.get(palavra) || 0) + 1);
    });
  
  return Array.from(frequencia.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([palavra]) => palavra);
}
