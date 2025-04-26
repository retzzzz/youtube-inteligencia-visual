
import { VideoResult } from "@/types/youtube-types";

export const getChannelSize = (subscribers: number): "small" | "medium" | "large" => {
  if (subscribers < 100000) return "small";
  if (subscribers < 1000000) return "medium";
  return "large";
};

export const calculateViewsPerHour = (views: number, ageInDays: number): number => {
  const ageInHours = ageInDays * 24;
  return ageInHours > 0 ? Math.round(views / ageInHours) : 0;
};

export const assessViralityPotential = (video: VideoResult): {
  potential: "low" | "medium" | "high";
  reason: string;
} => {
  const viewsPerHour = video.viewsPerHour || calculateViewsPerHour(video.views, video.videoAge);
  const channelSize = video.channelSize || getChannelSize(video.subscribers);
  
  const isNew = video.videoAge < 3;
  const hasHighEngagement = video.engagement > 7;
  const hasHighViewRate = viewsPerHour > 200;
  const isSmallChannel = channelSize === "small";
  const hasHighViralScore = video.viralScore > 700;
  
  let positiveFactors = 0;
  let reasons = [];
  
  if (isNew) {
    positiveFactors++;
    reasons.push("vídeo recente");
  }
  if (hasHighEngagement) {
    positiveFactors += 2;
    reasons.push(`alto engajamento (${video.engagement}%)`);
  }
  if (hasHighViewRate) {
    positiveFactors += 2;
    reasons.push(`crescimento rápido (${viewsPerHour} views/h)`);
  }
  if (isSmallChannel) {
    positiveFactors++;
    reasons.push("canal em crescimento");
  }
  if (hasHighViralScore) {
    positiveFactors++;
    reasons.push("pontuação viral alta");
  }
  
  let potential: "low" | "medium" | "high" = "low";
  if (positiveFactors >= 4) {
    potential = "high";
  } else if (positiveFactors >= 2) {
    potential = "medium";
  }
  
  return {
    potential,
    reason: reasons.length > 0 ? reasons.join(", ") : "análise baseada em métricas de crescimento e engajamento"
  };
};

