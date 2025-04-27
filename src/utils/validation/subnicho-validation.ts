
import { 
  MetricasSubnicho, 
  SubnichoValidado, 
  CriteriosValidacao 
} from '../types/youtube-types';
import { calcularMetricasSubnicho } from '../metrics/subnicho-metrics';

export const validarSubnicho = (
  metricas_subniches: MetricasSubnicho[],
  criterios: CriteriosValidacao
): SubnichoValidado[] => {
  return metricas_subniches.map(subnicho => {
    const { 
      taxa_crescimento_inscritos_mensal, 
      media_visualizacoes_por_video, 
      idade_media_canais 
    } = subnicho;
    
    const razoes: string[] = [];
    let validado = true;
    
    if (taxa_crescimento_inscritos_mensal < criterios.min_taxa_crescimento) {
      razoes.push(`Taxa de crescimento (${taxa_crescimento_inscritos_mensal.toFixed(1)}%) abaixo do mínimo (${criterios.min_taxa_crescimento}%)`);
      validado = false;
    }
    
    if (media_visualizacoes_por_video < criterios.min_media_visualizacoes) {
      razoes.push(`Média de visualizações (${media_visualizacoes_por_video.toFixed(0)}) abaixo do mínimo (${criterios.min_media_visualizacoes})`);
      validado = false;
    }
    
    if (idade_media_canais > criterios.max_idade_media_canais) {
      razoes.push(`Idade média dos canais (${idade_media_canais.toFixed(1)} meses) acima do máximo (${criterios.max_idade_media_canais} meses)`);
      validado = false;
    }
    
    return {
      ...subnicho,
      validado,
      razoes
    };
  });
};
