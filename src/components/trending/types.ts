
export interface TrendingTopic {
  title: string;
  value: number;
  category?: string;
  relatedVideos?: Array<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    views?: number;
    publishedAt?: string;
  }>;
}

export interface TrendingRegion {
  code: string;
  name: string;
}

export const regions: TrendingRegion[] = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'EUA' },
  { code: 'ES', name: 'Espanha' },
  { code: 'GLOBAL', name: 'Global' }
];
