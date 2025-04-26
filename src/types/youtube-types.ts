
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
