
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
