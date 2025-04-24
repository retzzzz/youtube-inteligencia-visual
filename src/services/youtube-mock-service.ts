
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";

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
  const freshnessMultiplier = Math.max(1, 30 / Math.max(1, ageInDays));
  return Math.round((views * engagement * freshnessMultiplier) / 10000);
};

// Estimar CPM com base em idioma, visualizações e engajamento
const estimateCPM = (language: string, views: number, engagement: number): number => {
  let baseCPM = 0;
  
  if (language.startsWith("en")) baseCPM = 4.50;
  else if (language.startsWith("pt")) baseCPM = 2.20;
  else if (["de", "fr", "jp"].some(lang => language.startsWith(lang))) baseCPM = 3.80;
  else baseCPM = 2.00;
  
  // Ajustar com base no engajamento
  const engagementMultiplier = 1 + (engagement / 100);
  
  // Ajustar com base nas visualizações (canais maiores têm CPMs menores)
  const viewsAdjustment = views > 1000000 ? 0.85 : views > 100000 ? 0.95 : 1;
  
  return Number((baseCPM * engagementMultiplier * viewsAdjustment).toFixed(2));
};

// Função principal que simula uma busca na API do YouTube
export const searchYouTubeVideos = async (params: YoutubeSearchParams): Promise<VideoResult[]> => {
  // Simulação de tempo de carregamento da API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const results: VideoResult[] = [];
  const resultCount = params.maxResults || 25;
  
  // Filtrar por idioma se especificado
  const availableLanguages = params.language ? [params.language] : languages;
  
  for (let i = 0; i < resultCount; i++) {
    const views = randomBetween(
      params.minViews || 1000, 
      params.maxViews || 10000000
    );
    
    const subscribers = randomBetween(
      params.minSubscribers || 100,
      params.maxSubscribers || 5000000
    );
    
    const engagement = randomBetween(1, 15);
    const videoAge = randomBetween(1, 365);
    const language = availableLanguages[Math.floor(Math.random() * availableLanguages.length)];
    const channel = channelNames[Math.floor(Math.random() * channelNames.length)];
    
    const viralScore = calculateViralScore(views, engagement, videoAge);
    const estimatedCPM = estimateCPM(language, views, engagement);
    const estimatedRPM = Number((estimatedCPM * 0.68).toFixed(2));
    const estimatedEarnings = Number(((views / 1000) * estimatedRPM).toFixed(2));
    
    // Data de criação do canal (entre 1 e 10 anos atrás)
    const channelCreationDate = new Date();
    channelCreationDate.setFullYear(channelCreationDate.getFullYear() - randomBetween(1, 10));
    
    // Gerar ID aleatório para o vídeo
    const videoId = Math.random().toString(36).substring(2, 15);
    const channelId = Math.random().toString(36).substring(2, 15);
    
    results.push({
      id: videoId,
      title: generateVideoTitle(params.keywords),
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      channel,
      channelId,
      views,
      engagement,
      viralScore,
      estimatedCPM,
      estimatedRPM,
      estimatedEarnings,
      subscribers,
      videoAge,
      channelDate: channelCreationDate.toISOString(),
      language
    });
  }
  
  return results;
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
  
  results.forEach(video => {
    if (distribution[video.language]) {
      distribution[video.language]++;
    } else {
      distribution[video.language] = 1;
    }
  });
  
  return Object.entries(distribution).map(([language, count]) => ({
    language,
    count
  })).sort((a, b) => b.count - a.count);
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
