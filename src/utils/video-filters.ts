
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";

export const filterVideosByLanguage = (videos: VideoResult[], language: string): VideoResult[] => {
  if (language === "any") return videos;
  return videos.filter(video => video.language === language);
};

export const filterVideosByPeriod = (videos: VideoResult[], period: YoutubeSearchParams["period"]): VideoResult[] => {
  if (period === "all") return videos;
  
  const getPeriodInDays = (period: string): number => {
    switch (period) {
      case "24h": return 1;
      case "48h": return 2;
      case "72h": return 3;
      case "7d": return 7;
      case "30d": return 30;
      case "90d": return 90;
      case "180d": return 180;
      default: return Infinity;
    }
  };

  const maxAge = getPeriodInDays(period);
  return videos.filter(video => video.videoAge <= maxAge);
};

export const filterMusicVideos = (videos: VideoResult[]): VideoResult[] => {
  return videos.filter(video => video.category !== "Music" && !isLikelyMusic(video.title));
};

const isLikelyMusic = (title: string): boolean => {
  const musicKeywords = [
    "official video", "lyrics", "music video", "official music", "official audio",
    "videoclip", "video clip", "ft.", "feat", "official lyric", "audio oficial", "clipe oficial"
  ];
  
  title = title.toLowerCase();
  return musicKeywords.some(keyword => title.includes(keyword));
};

export const filterByKeywords = (videos: VideoResult[], excludeKeywords?: string): VideoResult[] => {
  if (!excludeKeywords) return videos;
  
  const keywords = excludeKeywords.toLowerCase().split(',').map(k => k.trim());
  return videos.filter(video => {
    const videoTitle = video.title.toLowerCase();
    return !keywords.some(keyword => videoTitle.includes(keyword));
  });
};

export const filterByViews = (
  videos: VideoResult[],
  minViews?: number,
  maxViews?: number
): VideoResult[] => {
  let filtered = videos;
  
  if (minViews) {
    filtered = filtered.filter(video => video.views >= minViews);
  }
  
  if (maxViews) {
    filtered = filtered.filter(video => video.views <= maxViews);
  }
  
  return filtered;
};

export const filterBySubscribers = (
  videos: VideoResult[],
  minSubscribers?: number,
  maxSubscribers?: number
): VideoResult[] => {
  let filtered = videos;
  
  if (minSubscribers) {
    filtered = filtered.filter(video => video.subscribers >= minSubscribers);
  }
  
  if (maxSubscribers) {
    filtered = filtered.filter(video => video.subscribers <= maxSubscribers);
  }
  
  return filtered;
};
