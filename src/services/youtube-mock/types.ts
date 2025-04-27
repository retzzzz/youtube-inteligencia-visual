
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";

// Interface for analytics data
export interface LanguageDistribution {
  language: string;
  count: number;
}

export interface ViewRange {
  label: string;
  count: number;
}

export interface EarningsRange {
  label: string;
  count: number;
}

export interface NicheAnalysis {
  niche: string;
  videoCount: number;
  avgViralScore: number;
  avgViews: number;
  avgEngagement: number;
  subniches: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  date: string;
  params: YoutubeSearchParams;
}
