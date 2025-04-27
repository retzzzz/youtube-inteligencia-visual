
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { analyzeSaturation } from "@/utils/formatters";

/**
 * Interface para título com metadados
 */
export interface TitleData {
  titulo: string;
  canal: string;
  data_publicacao: string;
  visualizacoes: number;
}

/**
 * Interface para título com score de inovação
 */
export interface TitleWithScore {
  titulo: string;
  repeticoes: number;
  score_inovacao: number;
}

/**
 * Extrai títulos concorrentes de um subnicho específico
 * @param subnicho Subnicho para buscar
 * @param idioma Idioma dos vídeos
 * @param max_videos Número máximo de vídeos para analisar
 * @param apiKey Chave da API do YouTube
 * @returns Lista de títulos com metadados
 */
export const extrairTitulosConcorrentes = async (
  subnicho: string,
  idioma: string,
  max_videos: number,
  apiKey: string
): Promise<TitleData[]> => {
  try {
    // Buscar vídeos usando a API do YouTube
    const searchQuery = `${subnicho} ${idioma}`;
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${max_videos}&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Falha ao buscar vídeos');
    }
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId);
    
    if (videoIds.length === 0) {
      return [];
    }
    
    // Buscar detalhes dos vídeos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Falha ao buscar detalhes dos vídeos');
    }
    
    const videosData = await videosResponse.json();
    
    // Processar dados dos vídeos
    const titulos: TitleData[] = videosData.items.map((video: any) => {
      return {
        titulo: video.snippet.title,
        canal: video.snippet.channelTitle,
        data_publicacao: video.snippet.publishedAt,
        visualizacoes: parseInt(video.statistics.viewCount) || 0
      };
    });
    
    // Ordenar por visualizações em ordem decrescente
    return titulos.sort((a, b) => b.visualizacoes - a.visualizacoes);
    
  } catch (error) {
    console.error("Erro ao extrair títulos concorrentes:", error);
    throw error;
  }
};

/**
 * Função temporária para simular a extração de títulos (para desenvolvimento)
 */
export const simularExtrairTitulosConcorrentes = (
  subnicho: string,
  idioma: string,
  max_videos: number
): TitleData[] => {
  const titulosExemplo = [
    "Millionaire Obsessed by a Woman Gives Her Everything",
    "Rich CEO Falls for Poor Girl - True Story",
    "Wealthy Man's Secret Double Life Revealed",
    "Millionaire's Revenge on Gold Digger",
    "I Pretended to be Poor but I'm Actually a Millionaire",
    "Billionaire's Daughter Lives as a Normal Person",
    "Rich vs Poor - Social Experiment Gone Wrong",
    "Millionaire Gives Away His Fortune to Strangers",
    "How I Became a Millionaire Before 30",
    "The Secret Life of Ultra Wealthy People"
  ];
  
  return Array.from({length: Math.min(max_videos, titulosExemplo.length)}, (_, i) => {
    const randomViews = Math.floor(Math.random() * 1000000) + 10000;
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365));
    
    return {
      titulo: titulosExemplo[i],
      canal: `Canal ${i+1}`,
      data_publicacao: randomDate.toISOString(),
      visualizacoes: randomViews
    };
  });
};

/**
 * Avalia e prioriza títulos com base em critérios de saturação
 * @param titulos Lista de títulos para avaliar
 * @param criterios Critérios para avaliação
 * @returns Lista de títulos priorizados
 */
export const avaliarEPriorizarTitulos = (
  titulos: string[],
  titulosConcorrentes: TitleData[],
  criterios: {max_repeticoes: number, min_score_inovacao: number}
): TitleWithScore[] => {
  const titulosAvaliados: TitleWithScore[] = titulos.map(titulo => {
    // Calcular repetições (títulos similares)
    const repeticoes = contarTitulosSimilares(titulo, titulosConcorrentes);
    
    // Calcular score de inovação
    const score_inovacao = calcularScoreInovacao(titulo, titulosConcorrentes);
    
    return {
      titulo,
      repeticoes,
      score_inovacao
    };
  });
  
  // Filtrar títulos que atendem aos critérios
  const titulosFiltrados = titulosAvaliados.filter(
    titulo => titulo.repeticoes <= criterios.max_repeticoes && 
    titulo.score_inovacao >= criterios.min_score_inovacao
  );
  
  // Ordenar por score de inovação
  const titulosOrdenados = titulosFiltrados.sort(
    (a, b) => b.score_inovacao - a.score_inovacao
  );
  
  // Retornar os 5 melhores
  return titulosOrdenados.slice(0, 5);
};

/**
 * Conta quantos títulos similares existem na lista de concorrentes
 */
function contarTitulosSimilares(titulo: string, titulosConcorrentes: TitleData[]): number {
  // Em uma implementação real, usaria um algoritmo de similaridade de texto
  // Por simplicidade, vamos apenas contar palavras-chave em comum
  const palavrasChave = extrairPalavrasChave(titulo);
  
  return titulosConcorrentes.reduce((count, concorrente) => {
    const palavrasConcorrente = extrairPalavrasChave(concorrente.titulo);
    const palavrasComuns = palavrasChave.filter(p => palavrasConcorrente.includes(p));
    
    // Se houver pelo menos 2 palavras-chave em comum, consideramos similar
    if (palavrasComuns.length >= 2) {
      return count + 1;
    }
    return count;
  }, 0);
}

/**
 * Calcula o score de inovação de um título
 */
function calcularScoreInovacao(titulo: string, titulosConcorrentes: TitleData[]): number {
  // Em uma implementação real, usaria um algoritmo para calcular 
  // a distância semântica/originalidade do título
  // Por simplicidade, vamos simular esse cálculo
  
  const totalConcorrentes = titulosConcorrentes.length;
  if (totalConcorrentes === 0) return 1.0; // Totalmente inovador se não há concorrentes
  
  const titulosPalavras = extrairPalavrasChave(titulo);
  
  let somaScores = 0;
  titulosConcorrentes.forEach(concorrente => {
    const concorrentePalavras = extrairPalavrasChave(concorrente.titulo);
    const palavrasComuns = titulosPalavras.filter(p => concorrentePalavras.includes(p));
    
    // Calcular similaridade como proporção de palavras em comum
    const similaridade = palavrasComuns.length / Math.max(titulosPalavras.length, concorrentePalavras.length);
    somaScores += similaridade;
  });
  
  // Score de inovação é o inverso da média de similaridade
  const scoreSimilaridade = somaScores / totalConcorrentes;
  return 1 - scoreSimilaridade;
}

/**
 * Extrai palavras-chave de um título
 */
function extrairPalavrasChave(titulo: string): string[] {
  // Remover caracteres especiais, converter para minúsculas e dividir em palavras
  const palavras = titulo.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(p => p.length > 2); // Ignorar palavras muito curtas
  
  // Remover stopwords
  const stopwords = ['the', 'and', 'for', 'but', 'this', 'that', 'with', 'como', 'por', 'para', 'que', 'uma', 'com'];
  return palavras.filter(p => !stopwords.includes(p));
}
