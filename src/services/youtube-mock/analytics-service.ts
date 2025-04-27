
import { VideoResult } from "@/types/youtube-types";
import { LanguageDistribution, ViewRange, EarningsRange, NicheAnalysis } from './types';

// Analyze language distribution in search results
export const getLanguageDistributionData = (results: VideoResult[]): LanguageDistribution[] => {
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
    // Melhorar identificação de idiomas
    let languageKey = video.language;
    if (languageKey === "unknown") {
      // Tentar inferir idioma pelo canal ou usar código genérico
      languageKey = video.channel.includes("BR") ? "pt-BR" : "en-US";
    }
    
    const languageName = languageNames[languageKey] || languageKey;
    distribution[languageName] = (distribution[languageName] || 0) + 1;
  });

  return Object.entries(distribution)
    .map(([language, count]) => ({
      language,
      count
    }))
    .sort((a, b) => b.count - a.count);
};

// Get view range distribution data
export const getViewRangeData = (results: VideoResult[]): ViewRange[] => {
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

// Get earnings distribution data
export const getEarningsData = (results: VideoResult[]): EarningsRange[] => {
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

// Analysis of trends and niches
export const getTrendAnalysis = (results: VideoResult[]): NicheAnalysis[] => {
  // Agrupa vídeos por nicho principal e calcula métricas
  const nicheData = results.reduce((acc, video) => {
    const niche = video.mainNiche || "Diversos";
    
    if (!acc[niche]) {
      acc[niche] = {
        count: 0,
        avgViralScore: 0,
        totalViews: 0,
        totalEngagement: 0,
        subniches: new Set()
      };
    }
    
    acc[niche].count++;
    acc[niche].avgViralScore += video.viralScore;
    acc[niche].totalViews += video.views;
    acc[niche].totalEngagement += video.engagement;
    
    if (video.subNiche) {
      acc[niche].subniches.add(video.subNiche);
    }
    
    return acc;
  }, {} as Record<string, {
    count: number, 
    avgViralScore: number, 
    totalViews: number, 
    totalEngagement: number,
    subniches: Set<string>
  }>);
  
  // Calcular médias e formatar dados para visualização
  return Object.entries(nicheData).map(([niche, data]) => ({
    niche,
    videoCount: data.count,
    avgViralScore: Math.round(data.avgViralScore / data.count),
    avgViews: Math.round(data.totalViews / data.count),
    avgEngagement: Math.round(data.totalEngagement / data.count),
    subniches: Array.from(data.subniches).slice(0, 3) // Top 3 subnichos
  })).sort((a, b) => b.avgViralScore - a.avgViralScore);
};
