
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

export interface MetricasSubnicho extends Subnicho {
  media_inscritos_por_video: number;
  taxa_crescimento_inscritos_mensal: number;
  media_visualizacoes_por_video: number;
  idade_media_canais: number;
  variancia_visualizacoes: number;
}

export interface SubnichoValidado extends MetricasSubnicho {
  validado: boolean;
  razoes?: string[];
}

export interface SubnichoPriorizado extends SubnichoValidado {
  pontuacao: number;
  pontos_fortes: string;
  riscos: string;
}

export interface CriteriosValidacao {
  min_taxa_crescimento: number;
  min_media_visualizacoes: number;
  max_idade_media_canais: number;
}
