import { VideoResult } from "@/types/youtube-types";

interface NicheAnalysis {
  niche: string;
  country: string;
  avgCPM: number;
  avgRPM: number;
  potentialScore: number;
  videoCount: number;
}

export const analyzeNichePerformance = (videos: VideoResult[]): NicheAnalysis[] => {
  const nicheMap = new Map<string, Map<string, number[]>>();
  
  videos.forEach(video => {
    if (!video.mainNiche || !video.language) return;
    
    if (!nicheMap.has(video.mainNiche)) {
      nicheMap.set(video.mainNiche, new Map());
    }
    
    const countryMap = nicheMap.get(video.mainNiche)!;
    if (!countryMap.has(video.language)) {
      countryMap.set(video.language, []);
    }
    
    countryMap.get(video.language)!.push(video.estimatedCPM);
  });
  
  const analysis: NicheAnalysis[] = [];
  
  nicheMap.forEach((countryData, niche) => {
    countryData.forEach((cpmValues, country) => {
      const avgCPM = cpmValues.reduce((a, b) => a + b, 0) / cpmValues.length;
      const avgRPM = avgCPM * 0.65; // Estimated RPM based on typical YouTube revenue share
      
      analysis.push({
        niche,
        country,
        avgCPM,
        avgRPM,
        potentialScore: calculatePotentialScore(avgCPM, cpmValues.length),
        videoCount: cpmValues.length
      });
    });
  });
  
  return analysis.sort((a, b) => b.potentialScore - a.potentialScore);
};

const calculatePotentialScore = (avgCPM: number, sampleSize: number): number => {
  const baseScore = avgCPM * 10;
  const sampleBonus = Math.min(sampleSize / 10, 1) * 20;
  return Math.round(baseScore + sampleBonus);
};

export const generateChannelSuggestions = (videos: VideoResult[]): string[] => {
  const topNiches = analyzeNichePerformance(videos)
    .filter(analysis => analysis.videoCount >= 3)
    .slice(0, 3);
    
  return topNiches.map(niche => {
    const estimatedEarnings = Math.round(niche.avgRPM * 10000) / 100;
    return `Canal de ${niche.niche} para ${niche.country}: Potencial de R$${estimatedEarnings} por 1000 visualizações`;
  });
};

export const analyzeGrowthPotential = (video: VideoResult) => {
  const isSmallChannel = video.subscribers < 100000;
  const hasHighEngagement = video.engagement > 7;
  const hasHighViewRate = (video.views / (video.videoAge * 24)) > 100;
  const isNewVideo = video.videoAge < 7;
  
  const growthScore = [
    isSmallChannel && 20,
    hasHighEngagement && 30,
    hasHighViewRate && 30,
    isNewVideo && 20
  ].filter(Boolean).reduce((a, b) => a + (b || 0), 0);
  
  let growthType: "explosive" | "emerging" | "latent" | undefined;
  
  if (growthScore >= 80 && hasHighViewRate) {
    growthType = "explosive";
  } else if (growthScore >= 60) {
    growthType = "emerging";
  } else if (isSmallChannel && hasHighEngagement) {
    growthType = "latent";
  }
  
  return {
    growthScore,
    growthType,
    isSmallChannel,
    hasHighEngagement
  };
};
