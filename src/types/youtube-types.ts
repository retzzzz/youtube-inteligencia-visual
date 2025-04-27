
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

export interface Canal {
  nome_do_canal: string;
  data_de_criacao: string;
  total_videos: number;
  total_inscritos: number;
  titulos_recentes: string[];
}

export interface Subnicho {
  subnicho: string;
  canais_exemplos: Canal[];
}

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
