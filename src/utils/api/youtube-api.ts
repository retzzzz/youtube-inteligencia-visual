import { Canal, Subnicho } from '../types/youtube-types';

export const extrairSubnichos = async (
  nicho_principal: string,
  idioma: string,
  max_canais: number,
  apiKey: string
): Promise<Subnicho[]> => {
  try {
    // Buscar canais usando a API do YouTube
    const searchQuery = `${nicho_principal} ${idioma}`;
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=channel&maxResults=${max_canais}&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Falha ao buscar canais');
    }
    
    const searchData = await searchResponse.json();
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);
    
    // Buscar detalhes dos canais
    const channelsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelIds.join(',')}&key=${apiKey}`
    );
    
    if (!channelsResponse.ok) {
      throw new Error('Falha ao buscar detalhes dos canais');
    }
    
    const channelsData = await channelsResponse.json();
    
    // Processar dados dos canais
    const canais: Canal[] = await Promise.all(
      channelsData.items.map(async (channel: any) => {
        // Buscar vídeos recentes do canal
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&order=date&type=video&maxResults=10&key=${apiKey}`
        );
        
        if (!videosResponse.ok) {
          throw new Error('Falha ao buscar vídeos do canal');
        }
        
        const videosData = await videosResponse.json();
        
        return {
          nome_do_canal: channel.snippet.title,
          data_de_criacao: channel.snippet.publishedAt,
          total_videos: parseInt(channel.statistics.videoCount),
          total_inscritos: parseInt(channel.statistics.subscriberCount),
          titulos_recentes: videosData.items.map((video: any) => video.snippet.title)
        };
      })
    );
    
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
    
    return Array.from(subnichoMap.entries()).map(([subnicho, canais]) => ({
      subnicho,
      canais_exemplos: canais
    }));
    
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
