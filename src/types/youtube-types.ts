
export interface YoutubeSearchParams {
  keywords: string;
  searchType: "videos" | "channels" | "playlists";
  language: string;
  minViews: number;
  maxViews: number | null;
  minSubscribers: number | null;
  maxSubscribers: number | null;
  period: "7d" | "30d" | "1y" | "all";
  maxResults: number;
}

export interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelId: string;
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
