
import { analyzeSaturation } from "@/utils/formatters";

/**
 * Tipos para as funcionalidades de validação de subnicho
 */
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

/**
 * Extrai subnichos de canais relevantes com base em um nicho principal
 * @param nicho_principal O nicho principal a ser analisado
 * @param idioma O idioma dos canais a serem analisados
 * @param max_canais Número máximo de canais a serem analisados
 * @returns Lista de subnichos identificados com os canais de exemplo
 */
export const extrairSubnichos = async (
  nicho_principal: string,
  idioma: string,
  max_canais: number
): Promise<Subnicho[]> => {
  try {
    // Simulação de dados - em uma implementação real, isso viria da API do YouTube
    // Aqui estamos simulando a busca no YouTube e a coleta de dados
    const canaisSimulados: Canal[] = gerarCanaisSimulados(nicho_principal, idioma, max_canais);
    
    // Extração de palavras-chave dos títulos para identificar subnichos recorrentes
    const subnichos = extrairPalavrasChave(canaisSimulados);
    
    return subnichos;
  } catch (error) {
    console.error("Erro ao extrair subnichos:", error);
    throw new Error(`Falha ao extrair subnichos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

/**
 * Função auxiliar para simular canais para demonstração
 */
function gerarCanaisSimulados(nicho_principal: string, idioma: string, max_canais: number): Canal[] {
  const canais: Canal[] = [];
  const hoje = new Date();
  
  const subnichos = obterSubnichosPorNicho(nicho_principal);
  
  for (let i = 0; i < max_canais; i++) {
    const subnichoIndex = i % subnichos.length;
    const subnicho = subnichos[subnichoIndex];
    
    // Gerar uma data de criação aleatória entre 6 meses e 5 anos atrás
    const dataInicio = new Date(hoje);
    const mesesAtras = Math.floor(Math.random() * 54) + 6; // Entre 6 e 60 meses atrás
    dataInicio.setMonth(dataInicio.getMonth() - mesesAtras);
    
    // Gerar total de vídeos entre 50 e 500
    const totalVideos = Math.floor(Math.random() * 450) + 50;
    
    // Gerar total de inscritos entre 1000 e 1 milhão
    const totalInscritos = Math.floor(Math.random() * 999000) + 1000;
    
    // Gerar títulos recentes baseados no subnicho
    const titulosRecentes = gerarTitulosSimulados(subnicho, idioma);
    
    canais.push({
      nome_do_canal: `Canal ${subnicho} ${i+1}`,
      data_de_criacao: dataInicio.toISOString(),
      total_videos: totalVideos,
      total_inscritos: totalInscritos,
      titulos_recentes: titulosRecentes
    });
  }
  
  return canais;
}

/**
 * Função auxiliar para gerar títulos simulados com base no subnicho
 */
function gerarTitulosSimulados(subnicho: string, idioma: string): string[] {
  const titulos: string[] = [];
  const prefixos = idioma === 'português' ? 
    ["Como", "Tutorial", "Aprenda", "O segredo para", "10 dicas de", "Guia completo", "Minha experiência com"] :
    ["How to", "Tutorial", "Learn", "The secret to", "10 tips for", "Complete guide", "My experience with"];
    
  for (let i = 0; i < 10; i++) {
    const prefixoIndex = Math.floor(Math.random() * prefixos.length);
    titulos.push(`${prefixos[prefixoIndex]} ${subnicho} - Parte ${i+1}`);
  }
  
  return titulos;
}

/**
 * Função auxiliar para obter lista de subnichos com base no nicho principal
 */
function obterSubnichosPorNicho(nicho_principal: string): string[] {
  const nichos: Record<string, string[]> = {
    'religioso cristão': [
      'estudos bíblicos',
      'orações diárias',
      'testemunhos de fé',
      'louvor e adoração',
      'vida cristã'
    ],
    'finanças pessoais': [
      'investimentos',
      'economia doméstica',
      'independência financeira',
      'dívidas',
      'educação financeira'
    ],
    'tecnologia': [
      'programação',
      'gadgets',
      'inteligência artificial',
      'aplicativos',
      'segurança digital'
    ],
    'saúde': [
      'alimentação saudável',
      'exercícios físicos',
      'saúde mental',
      'medicina preventiva',
      'suplementação'
    ]
  };
  
  return nichos[nicho_principal] || ['subnicho genérico 1', 'subnicho genérico 2', 'subnicho genérico 3'];
}

/**
 * Simula a extração de palavras-chave para identificar subnichos
 */
function extrairPalavrasChave(canais: Canal[]): Subnicho[] {
  // Agrupar canais por possíveis subnichos usando os títulos dos vídeos
  const subnichoMap: Map<string, Canal[]> = new Map();
  
  canais.forEach(canal => {
    // Simulação: usamos o primeiro título como identificador de subnicho
    // Em um cenário real, usaríamos um algoritmo de extração de palavras-chave
    const primeiroTitulo = canal.titulos_recentes[0] || '';
    const palavras = primeiroTitulo.split(' ');
    
    // Consideramos a terceira palavra como o subnicho (simplificação)
    // Em uma implementação real, isso seria muito mais sofisticado
    const subnicho = palavras.length > 2 ? palavras[2] : 'geral';
    
    if (!subnichoMap.has(subnicho)) {
      subnichoMap.set(subnicho, []);
    }
    
    subnichoMap.get(subnicho)?.push(canal);
  });
  
  // Converter o mapa para a lista de objetos Subnicho
  const resultado: Subnicho[] = [];
  
  subnichoMap.forEach((canaisDoSubnicho, nomeSubnicho) => {
    resultado.push({
      subnicho: nomeSubnicho,
      canais_exemplos: canaisDoSubnicho
    });
  });
  
  return resultado;
}

/**
 * Calcula métricas detalhadas para cada subnicho
 * @param lista_subniches Lista de subnichos identificados
 * @returns Lista de subnichos com métricas detalhadas
 */
export const calcularMetricasSubnicho = (
  lista_subniches: Subnicho[]
): MetricasSubnicho[] => {
  return lista_subniches.map(subnicho => {
    const { canais_exemplos } = subnicho;
    
    // Calcular média de inscritos por vídeo
    let totalInscritos = 0;
    let totalVideos = 0;
    
    canais_exemplos.forEach(canal => {
      totalInscritos += canal.total_inscritos;
      totalVideos += canal.total_videos;
    });
    
    const mediaInscritosPorVideo = totalVideos > 0 ? totalInscritos / totalVideos : 0;
    
    // Simular taxa de crescimento (em uma implementação real, isso viria dos dados históricos)
    const taxaCrescimentoInscritosMensal = Math.random() * 20; // Entre 0% e 20%
    
    // Simular média de visualizações por vídeo
    const mediaVisualizacoesPorVideo = Math.floor(Math.random() * 15000) + 1000; // Entre 1K e 16K
    
    // Calcular idade média dos canais
    const hoje = new Date();
    let somaIdadeMeses = 0;
    
    canais_exemplos.forEach(canal => {
      const dataCriacao = new Date(canal.data_de_criacao);
      const idadeMeses = (hoje.getFullYear() - dataCriacao.getFullYear()) * 12 + 
                         (hoje.getMonth() - dataCriacao.getMonth());
      somaIdadeMeses += idadeMeses;
    });
    
    const idadeMediaCanais = canais_exemplos.length > 0 ? somaIdadeMeses / canais_exemplos.length : 0;
    
    // Simular variância das visualizações (em uma implementação real, isso viria dos dados reais)
    const varianciaVisualizacoes = Math.random() * 0.5; // Entre 0 e 0.5 (normalizada)
    
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

/**
 * Valida subnichos com base em critérios específicos
 * @param metricas_subniches Lista de subnichos com métricas
 * @param criterios Critérios de validação
 * @returns Lista de subnichos validados
 */
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
    
    // Verificar taxa de crescimento
    if (taxa_crescimento_inscritos_mensal < criterios.min_taxa_crescimento) {
      razoes.push(`Taxa de crescimento (${taxa_crescimento_inscritos_mensal.toFixed(1)}%) abaixo do mínimo (${criterios.min_taxa_crescimento}%)`);
      validado = false;
    }
    
    // Verificar média de visualizações
    if (media_visualizacoes_por_video < criterios.min_media_visualizacoes) {
      razoes.push(`Média de visualizações (${media_visualizacoes_por_video.toFixed(0)}) abaixo do mínimo (${criterios.min_media_visualizacoes})`);
      validado = false;
    }
    
    // Verificar idade média dos canais
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

/**
 * Prioriza e recomenda subnichos para nova criação de canal
 * @param subniches_validacao Lista de subnichos validados
 * @returns Lista priorizada de subnichos recomendados
 */
export const priorizarSubniches = (
  subniches_validacao: SubnichoValidado[]
): SubnichoPriorizado[] => {
  // Filtrar apenas subnichos validados
  const subnichesFiltrados = subniches_validacao.filter(subnicho => subnicho.validado);
  
  // Encontrar valores máximos para normalização
  const maxTaxaCrescimento = Math.max(...subnichesFiltrados.map(s => s.taxa_crescimento_inscritos_mensal));
  const maxMediaVisualizacoes = Math.max(...subnichesFiltrados.map(s => s.media_visualizacoes_por_video));
  
  // Calcular pontuação para cada subnicho
  const subnichesPontuados = subnichesFiltrados.map(subnicho => {
    // Normalizar valores entre 0 e 1
    const taxaCrescimentoNormalizada = maxTaxaCrescimento > 0 ? 
      subnicho.taxa_crescimento_inscritos_mensal / maxTaxaCrescimento : 0;
    
    const mediaVisualizacoesNormalizada = maxMediaVisualizacoes > 0 ? 
      subnicho.media_visualizacoes_por_video / maxMediaVisualizacoes : 0;
    
    // Calcular pontuação composta
    const pontuacao = (taxaCrescimentoNormalizada + mediaVisualizacoesNormalizada) / 2;
    
    // Gerar textos de pontos fortes e riscos
    const pontos_fortes = gerarPontosFortes(subnicho);
    const riscos = gerarRiscos(subnicho);
    
    return {
      ...subnicho,
      pontuacao,
      pontos_fortes,
      riscos
    };
  });
  
  // Ordenar por pontuação em ordem decrescente
  const subnichesPriorizados = subnichesPontuados.sort((a, b) => b.pontuacao - a.pontuacao);
  
  // Retornar os 5 melhores
  return subnichesPriorizados.slice(0, 5);
};

/**
 * Funções auxiliares para gerar textos de análise
 */
function gerarPontosFortes(subnicho: SubnichoValidado): string {
  if (subnicho.taxa_crescimento_inscritos_mensal > 15) {
    return `Crescimento acelerado (${subnicho.taxa_crescimento_inscritos_mensal.toFixed(1)}% ao mês) e boa média de visualizações.`;
  } else if (subnicho.media_visualizacoes_por_video > 10000) {
    return `Alta taxa de engajamento com média de ${subnicho.media_visualizacoes_por_video.toFixed(0)} visualizações por vídeo.`;
  } else {
    return `Nicho relativamente novo (média de ${subnicho.idade_media_canais.toFixed(1)} meses) com bom potencial de crescimento.`;
  }
}

function gerarRiscos(subnicho: SubnichoValidado): string {
  if (subnicho.variancia_visualizacoes > 0.3) {
    return `Alta variabilidade nas visualizações (${(subnicho.variancia_visualizacoes * 100).toFixed(1)}%), indicando possível instabilidade no nicho.`;
  } else if (subnicho.idade_media_canais < 6) {
    return `Nicho muito recente (${subnicho.idade_media_canais.toFixed(1)} meses), pode ser tendência temporária.`;
  } else {
    return `Crescimento moderado de ${subnicho.taxa_crescimento_inscritos_mensal.toFixed(1)}% ao mês, pode exigir mais tempo para resultados significativos.`;
  }
}
