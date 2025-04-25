
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { format, formatDistanceToNow, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função para gerar um valor aleatório dentro de um intervalo
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Lista de idiomas mais comuns
const languages = [
  "pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", 
  "it-IT", "ja-JP", "ko-KR", "ru-RU", "zh-CN"
];

// Nomes de canais fictícios
const channelNames = [
  "TechMaster BR", "Dicas Diárias", "Game Play Total",
  "Análise Tech", "Tutoriais Incríveis", "Vídeos Virais",
  "Notícias Agora", "Entretenimento BR", "Educação Online",
  "Marketing Digital", "Viagens Incríveis", "Culinária Fácil"
];

// Títulos fictícios para vídeos
const generateVideoTitle = (keyword: string): string => {
  const prefixes = [
    "Como fazer", "Tutorial", "Análise", "Revisão de",
    "O melhor", "10 dicas para", "Guia completo", 
    "Aprenda", "Tudo sobre", "Descubra"
  ];
  
  const suffixes = [
    "em 2023", "- passo a passo", "que você precisa ver",
    "explicado", "definitivo", "para iniciantes",
    "profissional", "rápido", "fácil", "incrível"
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${keyword} ${suffix}`;
};

// Calcula o Viral Score com base em visualizações, engajamento e idade do vídeo
const calculateViralScore = (views: number, engagement: number, ageInDays: number): number => {
  // Videos mais recentes têm maior peso
  const freshnessMultiplier = Math.max(1, 30 / Math.max(0.1, ageInDays));
  
  // Taxa de crescimento: mais visualizações em menos tempo = maior pontuação
  const growthRate = views / Math.max(0.1, ageInDays);
  
  // Engajamento tem peso importante para viralização
  const engagementScore = engagement * 2;
  
  // Combinar os fatores com pesos específicos
  return Math.round((growthRate * 0.4 + engagementScore * 0.4 + freshnessMultiplier * 0.2) * 100);
};

// Estimar CPM com base em idioma, visualizações e engajamento
const estimateCPM = (language: string, views: number, engagement: number): number => {
  let baseCPM = 0;
  
  // CPM base por idioma (valores mais realistas baseados em dados de mercado)
  if (language.startsWith("en")) baseCPM = 6.50;
  else if (language.startsWith("pt")) baseCPM = 3.20;
  else if (language.startsWith("de")) baseCPM = 5.80;
  else if (language.startsWith("fr")) baseCPM = 5.20;
  else if (language.startsWith("ja")) baseCPM = 4.80;
  else if (language.startsWith("es")) baseCPM = 3.80;
  else baseCPM = 3.00;
  
  // Ajustar com base no engajamento (engajamento maior = maior CPM)
  const engagementMultiplier = 1 + (engagement / 50);
  
  // Ajustar com base nas visualizações (canais maiores geralmente têm CPMs melhores devido à demanda dos anunciantes)
  let viewsAdjustment = 1.0;
  if (views > 1000000) viewsAdjustment = 1.15;
  else if (views > 500000) viewsAdjustment = 1.1;
  else if (views > 100000) viewsAdjustment = 1.05;
  else if (views < 10000) viewsAdjustment = 0.9;
  
  return Number((baseCPM * engagementMultiplier * viewsAdjustment).toFixed(2));
};

// Função para calcular a idade do vídeo baseado no período selecionado
const calculateVideoAge = (period: YoutubeSearchParams["period"]): number => {
  switch (period) {
    case "24h": return randomBetween(1, 24) / 24; // Entre 1 e 24 horas (fração de dia)
    case "48h": return randomBetween(24, 48) / 24; // Entre 24 e 48 horas
    case "72h": return randomBetween(48, 72) / 24; // Entre 48 e 72 horas
    case "7d": return randomBetween(3, 7); // Entre 3 e 7 dias
    case "30d": return randomBetween(7, 30); // Entre 7 e 30 dias
    case "90d": return randomBetween(30, 90); // Entre 30 e 90 dias
    case "180d": return randomBetween(90, 180); // Entre 90 e 180 dias
    case "all":
    default: return randomBetween(1, 1095); // Até 3 anos
  }
};

// Função para buscar dados reais da API do YouTube
const fetchYouTubeData = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
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
      videoDuration: params.searchType === "shorts" ? "short" : "any",
    });
    
    // Para shorts, adicionar filtro específico
    if (params.searchType === "shorts") {
      searchParams.append("videoDuration", "short");
      searchParams.append("videoType", "any");
    }
    
    // Adicionar filtro de idioma se especificado
    if (params.language && params.language !== "any") {
      searchParams.append("relevanceLanguage", params.language);
    }
    
    // Fazer solicitação para a API de pesquisa do YouTube
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`
    );
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      throw new Error(`Erro na API do YouTube: ${errorData.error?.message || searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    const items = searchData.items || [];
    
    if (items.length === 0) {
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
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(",")}&key=${params.apiKey}`
      );
      
      if (videoStatsResponse.ok) {
        const videoStatsData = await videoStatsResponse.json();
        videoStatsMap = (videoStatsData.items || []).reduce((acc: Record<string, any>, item: any) => {
          acc[item.id] = {
            views: parseInt(item.statistics.viewCount) || 0,
            likes: parseInt(item.statistics.likeCount) || 0,
            comments: parseInt(item.statistics.commentCount) || 0,
            duration: item.contentDetails.duration
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
      const views = videoStats.views || randomBetween(params.minViews || 1000, 1000000);
      const likes = videoStats.likes || Math.floor(views * randomBetween(2, 10) / 100);
      const engagement = Math.round((likes / Math.max(1, views)) * 100);
      
      // Calcular idade do vídeo baseado na data de publicação ou no período selecionado
      let videoAge;
      if (item.snippet.publishedAt) {
        const publishDate = new Date(item.snippet.publishedAt);
        const now = new Date();
        videoAge = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
      } else {
        videoAge = calculateVideoAge(params.period);
      }
      
      // Obter inscritos ou gerar valor aleatório
      const subscribers = channelStats.subscribers || randomBetween(
        params.minSubscribers || 100,
        params.maxSubscribers || 5000000
      );
      
      // Calcular métricas
      const viralScore = calculateViralScore(views, engagement, videoAge);
      const estimatedCPM = estimateCPM(
        item.snippet.defaultLanguage || params.language || "en", 
        views, 
        engagement
      );
      const estimatedRPM = Number((estimatedCPM * 0.55).toFixed(2)); // YouTubers geralmente recebem 55% do CPM
      const estimatedEarnings = Number(((views / 1000) * estimatedRPM).toFixed(2));
      
      // Construir URLs
      const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined;
      const channelUrl = channelId ? `https://www.youtube.com/channel/${channelId}` : undefined;
      
      // Obter o idioma do vídeo do snippet ou usar o parâmetro language
      const videoLanguage = item.snippet.defaultLanguage || params.language || "unknown";
      
      return {
        id: videoId || item.id.channelId || item.id.playlistId || Math.random().toString(36).substring(2, 15),
        title: item.snippet.title || generateVideoTitle(params.keywords),
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
        channelDate: channelStats.publishedAt || new Date(new Date().setFullYear(new Date().getFullYear() - randomBetween(1, 10))).toISOString(),
        language: videoLanguage
      };
    });
    
    return results;
  } catch (error) {
    console.error("Erro ao buscar dados do YouTube:", error);
    throw error;
  }
};

// Função principal que simula ou busca dados reais do YouTube
export const searchYouTubeVideos = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  // Se uma chave de API foi fornecida, use a API real
  if (params.apiKey && params.apiKey.trim()) {
    try {
      const data = await fetchYouTubeData(params);
      
      // Filtrar por idioma se especificado
      if (params.language && params.language !== "any") {
        return data.filter(video => video.language === params.language);
      }
      
      return data;
    } catch (error) {
      console.error("Erro na API do YouTube. Retornando dados simulados:", error);
    }
  }

  // Simulação de tempo de carregamento da API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const results: VideoResult[] = [];
  const resultCount = params.maxResults || 100; // Default para 100 resultados

  // Filtrar por idioma se especificado
  const availableLanguages = params.language && params.language !== "any" 
    ? [params.language] 
    : languages;

  for (let i = 0; i < resultCount; i++) {
    const language = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
    const videoAge = calculateVideoAge(params.period);
    
    // Gerar views com base na idade do vídeo para simular crescimento viral
    const baseViews = randomBetween(100, 10000);
    const growthMultiplier = Math.max(1, 30 / Math.max(0.1, videoAge));
    const views = Math.round(baseViews * growthMultiplier);
    
    const engagement = randomBetween(5, 25); // Aumentado para refletir melhor engagement viral
    
    const viralScore = calculateViralScore(views, engagement, videoAge);
    const estimatedCPM = estimateCPM(language, views, engagement);
    const estimatedRPM = Number((estimatedCPM * 0.55).toFixed(2));
    const estimatedEarnings = Number(((views / 1000) * estimatedRPM).toFixed(2));
    
    results.push({
      id: Math.random().toString(36).substring(2, 15),
      title: generateVideoTitle(params.keywords),
      thumbnail: `https://i.ytimg.com/vi/${Math.random().toString(36).substring(2, 15)}/hqdefault.jpg`,
      channel: channelNames[Math.floor(Math.random() * channelNames.length)],
      channelId: Math.random().toString(36).substring(2, 15),
      channelUrl: `https://www.youtube.com/channel/${Math.random().toString(36).substring(2, 15)}`,
      videoUrl: `https://www.youtube.com/watch?v=${Math.random().toString(36).substring(2, 15)}`,
      views,
      engagement,
      viralScore,
      estimatedCPM,
      estimatedRPM,
      estimatedEarnings,
      subscribers: randomBetween(
        params.minSubscribers || 100,
        params.maxSubscribers || 5000000
      ),
      videoAge,
      channelDate: new Date(new Date().setFullYear(new Date().getFullYear() - randomBetween(1, 10))).toISOString(),
      language
    });
  }

  // Ordenar por potencial viral (considerando views recentes e engagement)
  return results.sort((a, b) => b.viralScore - a.viralScore);
};

// Função para salvar uma busca no armazenamento local
export const saveSearch = (name: string, params: YoutubeSearchParams) => {
  // Recupera buscas salvas do armazenamento local
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  
  // Adiciona nova busca
  const newSearch = {
    id: Math.random().toString(36).substring(2, 15),
    name,
    date: new Date().toISOString(),
    params
  };
  
  savedSearches.push(newSearch);
  
  // Salva no armazenamento local
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  
  return newSearch;
};

// Função para obter buscas salvas do armazenamento local
export const getSavedSearches = () => {
  return JSON.parse(localStorage.getItem('savedSearches') || '[]');
};

// Função para apagar uma busca salva
export const deleteSavedSearch = (id: string) => {
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  const updatedSearches = savedSearches.filter((search: any) => search.id !== id);
  localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
};

// Dados para gráficos
export const getLanguageDistributionData = (results: VideoResult[]) => {
  const distribution: Record<string, number> = {};
  const languageNames: Record<string, string> = {
    "pt-BR": "Português (BR)",
    "en-US": "Inglês (EUA)",
    "es-ES": "Espanhol",
    "fr-FR": "Francês",
    "de-DE": "Alemão",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "ko-KR": "Coreano",
    "ru-RU": "Russo",
    "zh-CN": "Chinês"
  };

  results.forEach(video => {
    const languageName = languageNames[video.language] || video.language;
    distribution[languageName] = (distribution[languageName] || 0) + 1;
  });

  return Object.entries(distribution)
    .map(([language, count]) => ({
      language,
      count
    }))
    .sort((a, b) => b.count - a.count);
};

export const getViewRangeData = (results: VideoResult[]) => {
  const ranges = [
    { min: 0, max: 1000, label: '0-1K' },
    { min: 1000, max: 10000, label: '1K-10K' },
    { min: 10000, max: 100000, label: '10K-100K' },
    { min: 100000, max: 1000000, label: '100K-1M' },
    { min: 1000000, max: Infinity, label: '1M+' }
  ];
  
  const distribution = ranges.map(range => ({
    label: range.label,
    count: results.filter(video => video.views >= range.min && video.views < range.max).length
  }));
  
  return distribution;
};

export const getEarningsData = (results: VideoResult[]) => {
  const ranges = [
    { min: 0, max: 10, label: '$0-$10' },
    { min: 10, max: 100, label: '$10-$100' },
    { min: 100, max: 1000, label: '$100-$1K' },
    { min: 1000, max: 10000, label: '$1K-$10K' },
    { min: 10000, max: Infinity, label: '$10K+' }
  ];
  
  const distribution = ranges.map(range => ({
    label: range.label,
    count: results.filter(video => video.estimatedEarnings >= range.min && video.estimatedEarnings < range.max).length
  }));
  
  return distribution;
};

// Função para exportar resultados em CSV
export const exportToCSV = (data: VideoResult[]) => {
  // Preparar cabeçalhos
  const headers = [
    "Título", "Canal", "Visualizações", "Engajamento (%)", 
    "Pontuação Viral", "CPM Estimado", "RPM Estimado", 
    "Ganhos Estimados", "Inscritos", "Idade do Vídeo (dias)", 
    "Data do Canal", "Idioma"
  ];
  
  // Preparar dados das linhas
  const rows = data.map(item => [
    item.title,
    item.channel,
    item.views,
    `${item.engagement}%`,
    item.viralScore,
    `$${item.estimatedCPM}`,
    `$${item.estimatedRPM}`,
    `$${item.estimatedEarnings}`,
    item.subscribers,
    item.videoAge,
    new Date(item.channelDate).toLocaleDateString('pt-BR'),
    item.language
  ]);
  
  // Combinar cabeçalhos e linhas
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Criar blob e baixar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `youtube-dados-${new Date().toISOString().slice(0, 10)}.csv`);
  link.click();
  URL.revokeObjectURL(url);
};
