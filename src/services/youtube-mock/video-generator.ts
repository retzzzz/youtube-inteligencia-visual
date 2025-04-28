import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { randomBetween, languages, channelNames, generateVideoTitle, isMusicVideo } from './utils';
import { calculateViralScore, estimateCPM, detectNiche } from './metrics';

// Calculate the age of a video based on the selected period
export const calculateVideoAge = (period: YoutubeSearchParams["period"]): number => {
  switch (period) {
    case "24h": 
      // Entre 1 e 24 horas (Valores precisos em fração de dia)
      return randomBetween(1, 24) / 24; 
    case "48h": 
      // Entre 24 e 48 horas (Valores precisos em fração de dia)
      return randomBetween(24, 48) / 24; 
    case "72h": 
      // Entre 48 e 72 horas (Valores precisos em fração de dia)
      return randomBetween(48, 72) / 24;
    case "7d": return randomBetween(1, 7); // Entre 1 e 7 dias
    case "30d": return randomBetween(1, 30); // Entre 1 e 30 dias
    case "90d": return randomBetween(1, 90); // Entre 1 e 90 dias
    case "180d": return randomBetween(1, 180); // Entre 1 e 180 dias
    case "all":
    default: return randomBetween(1, 365); // Até 1 ano
  }
};

// Generate a mock video result
export const generateMockVideo = (params: YoutubeSearchParams, language: string): VideoResult | null => {
  const videoAge = calculateVideoAge(params.period);
  
  // Gerar views com base na idade do vídeo para simular crescimento viral
  const baseViews = randomBetween(params.minViews || 100, 10000);
  const growthMultiplier = Math.max(1, 30 / Math.max(0.1, videoAge));
  const views = Math.round(baseViews * growthMultiplier);
  
  // Aumentar engajamento para vídeos mais recentes
  const baseEngagement = randomBetween(5, 15);
  const engagementBoost = videoAge <= 3 ? randomBetween(5, 15) : 0; // Boost para vídeos recentes (72h)
  const engagement = baseEngagement + engagementBoost;
  
  // Gerar título e verificar se é um vídeo musical
  const title = generateVideoTitle(params.keywords);
  
  // Excluir vídeos de música se especificado
  if (params.excludeMusic && isMusicVideo(title, undefined, [])) {
    return null;
  }
  
  // Detectar nicho
  const nicheInfo = detectNiche(title, params.keywords);
  
  // Gerar inscritos aleatórios para o canal
  const subscribers = randomBetween(
    params.minSubscribers || 100,
    params.maxSubscribers || 5000000
  );
  
  // Verificar se o número de inscritos está dentro dos limites definidos
  if ((params.minSubscribers && subscribers < params.minSubscribers) || 
      (params.maxSubscribers && subscribers > params.maxSubscribers)) {
    return null;
  }
  
  // Verificar se o número de views está dentro dos limites definidos
  if ((params.minViews && views < params.minViews) || 
      (params.maxViews && views > params.maxViews)) {
    return null;
  }
  
  // Calcular métricas
  const viralScore = calculateViralScore(views, engagement, videoAge, subscribers);
  const estimatedCPM = estimateCPM(language, nicheInfo.mainNiche, views, engagement);
  const estimatedRPM = Number((estimatedCPM * 0.55).toFixed(2));
  const estimatedEarnings = Number(((views / 1000) * estimatedRPM).toFixed(2));
  
  const videoId = Math.random().toString(36).substring(2, 15);
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    videoId,
    title,
    description: `Description for video ${title}`,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelId: Math.random().toString(36).substring(2, 15),
    channelTitle: channelNames[Math.floor(Math.random() * channelNames.length)],
    publishTime: new Date(new Date().getTime() - videoAge * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: views,
    likeCount: Math.floor(views * (engagement / 100) * 0.7),
    commentCount: Math.floor(views * (engagement / 100) * 0.3),
    channelViewCount: Math.floor(Math.random() * 10000000),
    channelSubscriberCount: subscribers,
    channelVideoCount: Math.floor(Math.random() * 500),
    
    // Additional properties
    channel: channelNames[Math.floor(Math.random() * channelNames.length)],
    channelUrl: `https://www.youtube.com/channel/${Math.random().toString(36).substring(2, 15)}`,
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    views,
    engagement,
    viralScore,
    estimatedCPM,
    estimatedRPM,
    estimatedEarnings,
    subscribers,
    videoAge,
    channelDate: new Date(new Date().setFullYear(new Date().getFullYear() - randomBetween(1, 10))).toISOString(),
    language,
    mainNiche: nicheInfo.mainNiche,
    subNiche: nicheInfo.subNiche,
    category: "Entertainment"
  };
};
