export interface YoutubeSearchParams {
  keywords: string;
  searchType: "videos" | "shorts" | "channels" | "playlists";
  language: string;
  minViews: number;
  maxViews: number | null;
  minSubscribers: number | null;
  maxSubscribers: number | null;
  period: "24h" | "48h" | "72h" | "7d" | "30d" | "90d" | "180d" | "all";
  maxResults: number;
  apiKey?: string;
  excludeMusic?: boolean;
  excludeKeywords?: string;
}

export interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelId: string;
  channelUrl?: string;
  videoUrl?: string;
  views: number;
  engagement: number;
  viralScore: number;
  estimatedCPM: number;
  estimatedRPM: number;
  estimatedEarnings: number;
  subscribers: number;
  videoAge: number; // in days
  channelDate: string; // ISO date string
  language: string;
  mainNiche?: string;
  subNiche?: string;
  category?: string;
  remodelingIdeas?: string[];
  alternativeTitles?: string[];
  targetAudience?: string;
  escalabilityScore?: number;
  viewsPerHour?: number;
  channelSize?: "small" | "medium" | "large";
  viralityPotential?: "low" | "medium" | "high";
  viralityReason?: string;
  likes?: number;
  comments?: number;
  growthType?: "explosive" | "emerging" | "latent";
  growthData?: {
    timestamp: string; // ISO date string
    views: number;
  }[];
}

export interface SavedSearch {
  id: string;
  name: string;
  date: string;
  params: YoutubeSearchParams;
}

export interface ColumnDefinition {
  id: keyof VideoResult;
  label: string;
  sortable: boolean;
}

export interface RemodelingIdea {
  originalTitle: string;
  remodeledTitle: string;
  targetNiche: string;
  alternativeSubniche: string;
  thumbnailIdea?: string;
}

export interface BasicVideoInfo {
  title: string;
  description: string;
  views?: number;
  publishDate?: string;
  language: string;
  duration?: string;
  category?: string;
  tags?: string[];
}

export interface VideoTranslation {
  title: string;
  description: string;
}

export interface VideoTranslations {
  english: VideoTranslation;
  spanish: VideoTranslation;
  french: VideoTranslation;
  italian: VideoTranslation;
}

export interface SaturationAnalysis {
  status: 'high' | 'medium' | 'low';
  message: string;
  count: number;
}

export interface SubNicheIdea {
  name: string;
  description: string;
  examples: string[];
}

export interface VideoAnalysis {
  basicInfo: BasicVideoInfo;
  translations: VideoTranslations;
  titleVariations: {
    emotional: string[];
    structural: string[];
    multilingual: string[];
  };
  scriptIdeas: string[];
  thumbnailPrompts: string[];
  supportImagePrompts: string[];
  subNicheIdeas: SubNicheIdea[];
  saturation?: SaturationAnalysis;
}
