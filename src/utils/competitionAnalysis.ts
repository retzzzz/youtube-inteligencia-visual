
import { CompetitionData, EntryTimingData, ComparisonData, RecommendationData } from '@/types/youtube-types';

export const extrairConcorrenciaSubnicho = async (
  subnicho: string,
  idioma: string,
  max_videos: number,
  apiKey?: string
): Promise<CompetitionData> => {
  // This is a mock implementation
  // In production, use the YouTube API to get real data
  console.log(`Extraindo concorrência para '${subnicho}' em ${idioma}`, {max_videos, apiKey});
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate random data for demonstration
  const num_canais = Math.floor(Math.random() * 30) + 1;
  const idade_media = Math.floor(Math.random() * 12) + 1;
  const media_visualizacoes = Math.floor(Math.random() * 1000000) + 10000;
  
  return {
    idioma,
    subnicho,
    num_canais_concorrentes: num_canais,
    idade_media_canais: idade_media,
    media_visualizacoes_dos_top: media_visualizacoes,
    canais_exemplos: [
      `Canal ${idioma} 1`,
      `Canal ${idioma} 2`, 
      `Canal ${idioma} 3`
    ]
  };
};

export const calcularTempoEntrada = (
  competicao: CompetitionData,
  thresholds: { 
    max_canais_para_entrada_facil: number, 
    max_idade_media_canais: number 
  } = { 
    max_canais_para_entrada_facil: 10, 
    max_idade_media_canais: 3 
  }
): EntryTimingData => {
  const isPortaAberta = 
    competicao.num_canais_concorrentes <= thresholds.max_canais_para_entrada_facil && 
    competicao.idade_media_canais <= thresholds.max_idade_media_canais;
    
  const diasRestantes = 
    isPortaAberta ? 0 : 
    Math.max(0, Math.floor((thresholds.max_idade_media_canais * 30) - (competicao.idade_media_canais * 30)));
    
  return {
    idioma: competicao.idioma,
    status_entrada: isPortaAberta ? "porta_aberta" : "porta_fechada",
    dias_restantes_para_porta_fechada: diasRestantes,
    recomendacao_acao: isPortaAberta ? 
      "Entre agora neste subnicho!" : 
      `Aguarde ${diasRestantes} dias ou considere outro subnicho menos competitivo`
  };
};

export const compararConcorrenciaIdiomas = async (
  subnicho: string,
  idiomas: string[],
  max_videos: number,
  apiKey?: string
): Promise<ComparisonData[]> => {
  const results: ComparisonData[] = [];
  
  for (const idioma of idiomas) {
    const competicao = await extrairConcorrenciaSubnicho(subnicho, idioma, max_videos, apiKey);
    const timing = calcularTempoEntrada(competicao);
    
    results.push({
      ...competicao,
      ...timing
    });
  }
  
  // Sort by entry status (open doors first) and then by number of competitors
  return results.sort((a, b) => {
    if (a.status_entrada === "porta_aberta" && b.status_entrada !== "porta_aberta") return -1;
    if (a.status_entrada !== "porta_aberta" && b.status_entrada === "porta_aberta") return 1;
    return a.num_canais_concorrentes - b.num_canais_concorrentes;
  });
};

export const recomendarIdiomaETiming = (
  comparativo: ComparisonData[]
): RecommendationData => {
  // If no data available, return default recommendation
  if (comparativo.length === 0) {
    return {
      idioma_recomendado: "português",
      prazo_sugerido: "dados insuficientes",
      estrategia_titulo: "Foco em títulos diretos com palavras-chave principais"
    };
  }
  
  const portasAbertas = comparativo.filter(item => item.status_entrada === "porta_aberta");
  let melhorOpcao;
  
  if (portasAbertas.length > 0) {
    // Get the one with fewest competitors
    melhorOpcao = portasAbertas.reduce((min, current) => 
      current.num_canais_concorrentes < min.num_canais_concorrentes ? current : min, portasAbertas[0]);
  } else {
    // If no open doors, get the one with fewest competitors
    melhorOpcao = comparativo.reduce((min, current) => 
      current.num_canais_concorrentes < min.num_canais_concorrentes ? current : min, comparativo[0]);
  }
  
  return {
    idioma_recomendado: melhorOpcao.idioma,
    prazo_sugerido: melhorOpcao.status_entrada === "porta_aberta" ? 
      "hoje" : `em ${melhorOpcao.dias_restantes_para_porta_fechada} dias`,
    estrategia_titulo: melhorOpcao.num_canais_concorrentes < 5 ? 
      "Foco em títulos diretos com palavras-chave principais" : 
      "Inovar com micro-subnichos específicos para se diferenciar da concorrência"
  };
};
