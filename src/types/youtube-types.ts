export interface VideoResult {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishTime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  channelViewCount: number;
  channelSubscriberCount: number;
  channelVideoCount: number;
  relevanceScore?: number;
  tags?: string[];
}

export interface YoutubeSearchParams {
  keywords: string;
  language: string;
  searchType: string;
  period: string;
  orderBy: string;
  maxResults: number;
  apiKey: string;
}

/**
 * Interface do Analisador de Vídeos do YouTube
 */
export interface VideoAnalysis {
  basicInfo: {
    title: string;
    description: string;
    views: number;
    publishDate: string;
    language?: string;
    duration: string;
    category: string;
    tags: string[];
  };
  translations: {
    english: {
      title: string;
      description: string;
    };
    spanish: {
      title: string;
      description: string;
    };
    french: {
      title: string;
      description: string;
    };
    italian: {
      title: string;
      description: string;
    };
  };
  titleVariations: {
    emotional: string[];
    structural: string[];
    multilingual: string[];
  };
  scriptIdeas: string[];
  thumbnailPrompts: string[];
  supportImagePrompts: string[];
  subNicheIdeas: {
    name: string;
    description: string;
    examples: string[];
  }[];
  saturation?: {
    status: "high" | "medium" | "low";
    message: string;
    count: number;
  };
}
