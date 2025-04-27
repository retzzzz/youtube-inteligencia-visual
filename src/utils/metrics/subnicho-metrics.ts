
import { Subnicho, MetricasSubnicho } from '../types/youtube-types';

export const calcularMetricasSubnicho = (
  lista_subniches: Subnicho[]
): MetricasSubnicho[] => {
  return lista_subniches.map(subnicho => {
    const { canais_exemplos } = subnicho;
    
    let totalInscritos = 0;
    let totalVideos = 0;
    
    canais_exemplos.forEach(canal => {
      totalInscritos += canal.total_inscritos;
      totalVideos += canal.total_videos;
    });
    
    const mediaInscritosPorVideo = totalVideos > 0 ? totalInscritos / totalVideos : 0;
    const taxaCrescimentoInscritosMensal = Math.random() * 20;
    const mediaVisualizacoesPorVideo = Math.floor(Math.random() * 15000) + 1000;
    
    const hoje = new Date();
    let somaIdadeMeses = 0;
    
    canais_exemplos.forEach(canal => {
      const dataCriacao = new Date(canal.data_de_criacao);
      const idadeMeses = (hoje.getFullYear() - dataCriacao.getFullYear()) * 12 + 
                         (hoje.getMonth() - dataCriacao.getMonth());
      somaIdadeMeses += idadeMeses;
    });
    
    const idadeMediaCanais = canais_exemplos.length > 0 ? somaIdadeMeses / canais_exemplos.length : 0;
    const varianciaVisualizacoes = Math.random() * 0.5;
    
    return {
      ...subnicho,
      media_inscritos_por_video: mediaInscritosPorVideo,
      taxa_crescimento_inscritos_mensal: taxaCrescimentoInscritosMensal,
      media_visualizacoes_por_video: mediaVisualizacoesPorVideo,
      idade_media_canais: idadeMediaCanais,
      variancia_visualizacoes: varianciaVisualizacoes
    };
  });
};
