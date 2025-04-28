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
  
  // Additional properties used in components
  views: number;
  videoAge: number;
  viralScore: number;
  mainNiche?: string;
  subNiche?: string;
  language?: string;
  channel?: string;
  channelUrl?: string;
  subscribers?: number;
  engagement?: number;
  viewsPerHour?: number;
  estimatedCPM?: number;
  estimatedEarnings?: number;
  estimatedRPM?: number;
  escalabilityScore?: number;
  videoUrl?: string;
  likes?: number;
  comments?: number;
  id?: string;
  growthType?: string;
  channelSize?: 'small' | 'medium' | 'large';
  category?: string;
  channelDate?: string;
}

export interface YoutubeSearchParams {
  keywords: string;
  language: string;
  searchType: string;
  period: string;
  orderBy: string;
  maxResults: number;
  apiKey: string;
  
  // Additional properties used in search components
  minViews?: number;
  maxViews?: number;
  minSubscribers?: number;
  maxSubscribers?: number;
  excludeMusic?: boolean;
  excludeKeywords?: string;
}

// Competition analysis interfaces
export interface CompetitionData {
  idioma: string;
  subnicho: string;
  num_canais_concorrentes: number;
  idade_media_canais: number;
  media_visualizacoes_dos_top: number;
  canais_exemplos: string[];
}

export interface EntryTimingData {
  idioma: string;
  status_entrada: "porta_aberta" | "porta_fechada";
  dias_restantes_para_porta_fechada: number;
  recomendacao_acao: string;
}

export interface ComparisonData extends CompetitionData, EntryTimingData {}

export interface RecommendationData {
  idioma_recomendado: string;
  prazo_sugerido: string;
  estrategia_titulo: string;
}

// Column definition for ResultsTable
export interface ColumnDefinition {
  id: string;
  label: string;
  sortable: boolean;
}

// SavedSearch interface
export interface SavedSearch {
  id: string;
  name: string;
  params: YoutubeSearchParams;
  date?: string;
  dateCreated?: string;
  userId?: string;
  results?: VideoResult[];
}

// VideoTranslations interface
export interface VideoTranslations {
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
}

// BasicVideoInfo interface
export interface BasicVideoInfo {
  title: string;
  description: string;
  views: number;
  publishDate: string;
  language?: string;
  duration: string;
  category: string;
  tags: string[];
}

/**
 * Interface do Analisador de Vídeos do YouTube
 */
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

// Update TitleVariation to include all needed properties
export interface TitleVariation {
  title: string;
  explanation: string;
  competitionLevel: string;
  viralPotential: number;
  text?: string;
  type?: "dor" | "esperanca" | "curiosidade";
  saturation?: 'low' | 'medium' | 'high';
  language?: "pt" | "en" | "es" | "fr";
  translations?: Array<{
    text: string;
    language: "pt" | "en" | "es" | "fr";
  }>;
}

// Adding SavedSearch from youtube-mock types
export interface SavedSearchMock {
  id: string;
  name: string;
  date: string;
  params: YoutubeSearchParams;
  userId: string;
}
