
import { SubnichoValidado, SubnichoPriorizado } from '../types/youtube-types';

const gerarPontosFortes = (subnicho: SubnichoValidado): string => {
  if (subnicho.taxa_crescimento_inscritos_mensal > 15) {
    return `Crescimento acelerado (${subnicho.taxa_crescimento_inscritos_mensal.toFixed(1)}% ao mês) e boa média de visualizações.`;
  } else if (subnicho.media_visualizacoes_por_video > 10000) {
    return `Alta taxa de engajamento com média de ${subnicho.media_visualizacoes_por_video.toFixed(0)} visualizações por vídeo.`;
  } else {
    return `Nicho relativamente novo (média de ${subnicho.idade_media_canais.toFixed(1)} meses) com bom potencial de crescimento.`;
  }
};

const gerarRiscos = (subnicho: SubnichoValidado): string => {
  if (subnicho.variancia_visualizacoes > 0.3) {
    return `Alta variabilidade nas visualizações (${(subnicho.variancia_visualizacoes * 100).toFixed(1)}%), indicando possível instabilidade no nicho.`;
  } else if (subnicho.idade_media_canais < 6) {
    return `Nicho muito recente (${subnicho.idade_media_canais.toFixed(1)} meses), pode ser tendência temporária.`;
  } else {
    return `Crescimento moderado de ${subnicho.taxa_crescimento_inscritos_mensal.toFixed(1)}% ao mês, pode exigir mais tempo para resultados significativos.`;
  }
};

export const priorizarSubniches = (
  subniches_validacao: SubnichoValidado[]
): SubnichoPriorizado[] => {
  const subnichesFiltrados = subniches_validacao.filter(subnicho => subnicho.validado);
  
  const maxTaxaCrescimento = Math.max(...subnichesFiltrados.map(s => s.taxa_crescimento_inscritos_mensal));
  const maxMediaVisualizacoes = Math.max(...subnichesFiltrados.map(s => s.media_visualizacoes_por_video));
  
  const subnichesPontuados = subnichesFiltrados.map(subnicho => {
    const taxaCrescimentoNormalizada = maxTaxaCrescimento > 0 ? 
      subnicho.taxa_crescimento_inscritos_mensal / maxTaxaCrescimento : 0;
    
    const mediaVisualizacoesNormalizada = maxMediaVisualizacoes > 0 ? 
      subnicho.media_visualizacoes_por_video / maxMediaVisualizacoes : 0;
    
    const pontuacao = (taxaCrescimentoNormalizada + mediaVisualizacoesNormalizada) / 2;
    
    return {
      ...subnicho,
      pontuacao,
      pontos_fortes: gerarPontosFortes(subnicho),
      riscos: gerarRiscos(subnicho)
    };
  });
  
  return subnichesPontuados
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, 5);
};
