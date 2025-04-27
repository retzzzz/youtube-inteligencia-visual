
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { fetchYouTubeData } from './api-service';
import { languages, randomBetween } from './utils';
import { generateMockVideo } from './video-generator';
import { SavedSearch } from './types';

// Main function to search YouTube videos (real or mock)
export const searchYouTubeVideos = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  // Se uma chave de API foi fornecida, use a API real
  if (params.apiKey && params.apiKey.trim()) {
    try {
      console.log("Tentando usar a API real do YouTube com a chave fornecida");
      const data = await fetchYouTubeData(params);
      console.log(`API do YouTube retornou ${data.length} resultados`);
      return data;
    } catch (error) {
      console.error("Erro na API do YouTube:", error);
      console.warn("Retornando para dados simulados devido ao erro na API");
      // Se houver erro na API, não retornamos dados simulados automaticamente
      // Em vez disso, propagamos o erro para tratamento adequado
      throw new Error(`Erro na API do YouTube: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  } else {
    console.log("Nenhuma chave de API fornecida ou chave inválida. Usando dados simulados.");
  }

  // Simulação de tempo de carregamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const results: VideoResult[] = [];
  const resultCount = params.maxResults || 100; // Default para 100 resultados

  // Filtrar por idioma se especificado
  const availableLanguages = params.language && params.language !== "any" 
    ? [params.language] 
    : languages;

  // Generate mock video results
  let attemptsCount = 0;
  const maxAttempts = resultCount * 3; // Limite de tentativas para evitar loop infinito

  while (results.length < resultCount && attemptsCount < maxAttempts) {
    attemptsCount++;
    
    // Escolher um idioma aleatório da lista de idiomas disponíveis
    const language = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
    
    // Gerar um vídeo simulado
    const video = generateMockVideo(params, language);
    
    // Se o vídeo for válido (passou todos os filtros), adicionar aos resultados
    if (video) {
      results.push(video);
    }
  }

  // Ordenar por pontuação viral
  return results.sort((a, b) => b.viralScore - a.viralScore);
};

// Local storage functions for saved searches
export const saveSearch = (name: string, params: YoutubeSearchParams, userId: string): SavedSearch => {
  // Recupera buscas salvas do armazenamento local
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  
  // Adiciona nova busca com ID do usuário
  const newSearch = {
    id: Math.random().toString(36).substring(2, 15),
    name,
    date: new Date().toISOString(),
    params,
    userId // Adicionando o ID do usuário
  };
  
  savedSearches.push(newSearch);
  
  // Salva no armazenamento local
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  
  return newSearch;
};

export const getSavedSearches = (): SavedSearch[] => {
  return JSON.parse(localStorage.getItem('savedSearches') || '[]');
};

export const deleteSavedSearch = (id: string): void => {
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  const updatedSearches = savedSearches.filter((search: SavedSearch) => search.id !== id);
  localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
};
