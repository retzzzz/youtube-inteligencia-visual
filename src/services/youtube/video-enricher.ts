
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import { detectNiche, calculateViralScore, estimateCPM } from '../youtube-mock/metrics';
import { isMusicVideo } from '../youtube-mock/utils';

export const enrichVideoData = (
  items: any[],
  videoStats: Record<string, any>,
  channelStats: Record<string, any>,
  params: YoutubeSearchParams
): VideoResult[] => {
  const results = items
    .map((item: any) => {
      const videoId = item.id.videoId || null;
      const channelId = item.snippet.channelId;
      
      const videoStat = videoId ? videoStats[videoId] || {} : {};
      const channelStat = channelStats[channelId] || {};
      
      const views = videoStat.views || 0;
      const likes = videoStat.likes || 0;
      const comments = videoStat.comments || 0;
      const engagement = Math.round(((likes + comments) / Math.max(1, views)) * 100);
      
      // Calculate video age
      let videoAge = 0;
      if (videoStat.publishedAt) {
        const publishDate = new Date(videoStat.publishedAt);
        const now = new Date();
        videoAge = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
      }
      
      // Check period filter
      if (params.period !== "all") {
        const maxAgeInDays = {
          "24h": 1,
          "48h": 2,
          "72h": 3,
          "7d": 7,
          "30d": 30,
          "90d": 90,
          "180d": 180,
        }[params.period];
        
        if (maxAgeInDays && videoAge > maxAgeInDays) return null;
      }
      
      // Check music filter
      if (params.excludeMusic && isMusicVideo(item.snippet.title, videoStat.category, videoStat.tags)) {
        return null;
      }
      
      const subscribers = channelStat.subscribers || 0;
      
      // Check subscriber filters
      if ((params.minSubscribers && subscribers < params.minSubscribers) ||
          (params.maxSubscribers && subscribers > params.maxSubscribers) ||
          (params.minViews && views < params.minViews) ||
          (params.maxViews && views > params.maxViews)) {
        return null;
      }
      
      // Calculate metrics
      const tagsString = (videoStat.tags || []).join(" ");
      const nicheInfo = detectNiche(item.snippet.title, tagsString + " " + (videoStat.description || ""));
      const viralScore = calculateViralScore(views, engagement, videoAge, subscribers);
      const estimatedCPM = estimateCPM(
        item.snippet.defaultLanguage || params.language || "en",
        nicheInfo.mainNiche,
        views,
        engagement
      );
      
      return {
        videoId: videoId || null,
        id: videoId || item.id.channelId || item.id.playlistId || Math.random().toString(36).substring(2, 15),
        title: item.snippet.title || "",
        description: item.snippet.description || "",
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        channelId,
        channelTitle: item.snippet.channelTitle || "",
        publishTime: item.snippet.publishedAt || new Date().toISOString(),
        viewCount: views,
        likeCount: likes,
        commentCount: comments,
        channelViewCount: channelStat.viewCount || 0,
        channelSubscriberCount: subscribers,
        channelVideoCount: channelStat.videoCount || 0,
        
        // Additional properties
        channel: item.snippet.channelTitle,
        channelUrl: channelId ? `https://www.youtube.com/channel/${channelId}` : undefined,
        videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined,
        views,
        engagement,
        viralScore,
        estimatedCPM,
        estimatedRPM: Number((estimatedCPM * 0.55).toFixed(2)),
        estimatedEarnings: Number(((views / 1000) * (estimatedCPM * 0.55)).toFixed(2)),
        subscribers,
        videoAge,
        channelDate: channelStat.publishedAt || new Date().toISOString(),
        language: item.snippet.defaultLanguage || item.snippet.defaultAudioLanguage || params.language || "unknown",
        mainNiche: nicheInfo.mainNiche,
        subNiche: nicheInfo.subNiche,
        category: videoStat.category
      };
    })
    .filter(Boolean) as VideoResult[];

  // Apply language filter if specified
  if (params.language && params.language !== "any") {
    return results.filter(video => 
      video.language.toLowerCase().includes(params.language!.toLowerCase())
    );
  }

  return results;
};
