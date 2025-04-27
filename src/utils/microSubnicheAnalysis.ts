
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";

export interface MicroSubnicho {
  microsubnicho: string;
  ocorrencias: number;
  titulos_exemplo: string[];
}

export interface MicroSubnichoAvaliado extends MicroSubnicho {
  total_visualizacoes: number;
  media_inscritos_por_video: number;
  growth_rate: number;
  status: "em_alta" | "estavel" | "em_queda";
}

export interface MicroSubnichoRecomendado {
  microsubnicho: string;
  growth_rate: number;
  insight: string;
}

export interface PlanejamentoCiclo {
  microsubnicho: string;
  titulo_sugerido: string;
  data_publicacao: string;
}

/**
 * Extrai micro-subnichos de um canal com base em seus vídeos recentes
 */
export const extrairMicroSubnichos = async (
  canalId: string,
  subnichoFrincipal: string,
  maxVideos: number,
  apiKey?: string
): Promise<MicroSubnicho[]> => {
  try {
    // Em um ambiente de produção, devemos usar a API do YouTube
    // Como isso é uma simulação, vamos gerar dados fictícios
    const microSubnichos: MicroSubnicho[] = [
      {
        microsubnicho: "finanças pessoais",
        ocorrencias: 12,
        titulos_exemplo: [
          "Como organizar suas finanças pessoais em 3 passos",
          "Finanças pessoais: o método que mudou minha vida",
          "7 erros de finanças pessoais que você comete sem perceber"
        ]
      },
      {
        microsubnicho: "investimentos iniciantes",
        ocorrencias: 8,
        titulos_exemplo: [
          "Investimentos para iniciantes: por onde começar",
          "O primeiro investimento que todo iniciante deveria fazer",
          "Guia completo de investimentos para quem está começando"
        ]
      },
      {
        microsubnicho: "independência financeira",
        ocorrencias: 6,
        titulos_exemplo: [
          "O caminho para a independência financeira antes dos 40",
          "3 hábitos que aceleram sua independência financeira",
          "Independência financeira: quanto dinheiro você realmente precisa?"
        ]
      },
      {
        microsubnicho: "renda passiva",
        ocorrencias: 5,
        titulos_exemplo: [
          "5 fontes de renda passiva que você pode começar hoje",
          "Como criei R$3.000 de renda passiva em 6 meses",
          "Renda passiva: mitos e verdades que ninguém conta"
        ]
      }
    ];
    
    return microSubnichos;
  } catch (error) {
    console.error("Erro ao extrair micro-subnichos:", error);
    throw error;
  }
};

/**
 * Avalia micro-subnichos com base em métricas de crescimento
 */
export const avaliarMicroSubnichos = async (
  microSubnichos: MicroSubnicho[],
  canalId: string,
  periodoDias: number,
  apiKey?: string
): Promise<MicroSubnichoAvaliado[]> => {
  try {
    // Em um ambiente de produção, devemos usar a API do YouTube
    // Como isso é uma simulação, vamos gerar dados fictícios
    const microSubnichosAvaliados: MicroSubnichoAvaliado[] = microSubnichos.map(subnicho => {
      const visualizacoes = Math.floor(Math.random() * 50000) + 1000;
      const mediaInscritos = Math.floor(Math.random() * 100) + 10;
      const growthRate = Math.random() * 60 - 10; // -10% a +50%
      
      let status: "em_alta" | "estavel" | "em_queda";
      if (growthRate >= 20 && visualizacoes >= 5000) {
        status = "em_alta";
      } else if (growthRate >= 0) {
        status = "estavel";
      } else {
        status = "em_queda";
      }
      
      return {
        ...subnicho,
        total_visualizacoes: visualizacoes,
        media_inscritos_por_video: mediaInscritos,
        growth_rate: parseFloat(growthRate.toFixed(2)),
        status
      };
    });
    
    return microSubnichosAvaliados;
  } catch (error) {
    console.error("Erro ao avaliar micro-subnichos:", error);
    throw error;
  }
};

/**
 * Recomenda os melhores micro-subnichos para focar
 */
export const recomendarMicroSubnicho = (
  microSubnichosAvaliados: MicroSubnichoAvaliado[],
  topN: number = 3
): MicroSubnichoRecomendado[] => {
  // Filtrar apenas os micro-subnichos em alta
  const emAlta = microSubnichosAvaliados.filter(subnicho => subnicho.status === "em_alta");
  
  // Ordenar por taxa de crescimento (decrescente)
  const ordenados = [...emAlta].sort((a, b) => b.growth_rate - a.growth_rate);
  
  // Selecionar os top N
  const recomendados = ordenados.slice(0, topN).map(subnicho => {
    let insight = "";
    
    if (subnicho.growth_rate > 40) {
      insight = `Crescimento explosivo de +${subnicho.growth_rate}% recentemente`;
    } else if (subnicho.growth_rate > 20) {
      insight = `Tendência de alta com +${subnicho.growth_rate}% de crescimento`;
    } else {
      insight = `Oportunidade promissora com crescimento estável`;
    }
    
    return {
      microsubnicho: subnicho.microsubnicho,
      growth_rate: subnicho.growth_rate,
      insight
    };
  });
  
  return recomendados;
};

/**
 * Gera variações de títulos focados em um micro-subnicho específico
 */
export const gerarTitulosMicroSubnicho = (
  microsubnicho: string,
  tituloBase: string,
  nVariacoes: number = 5
): string[] => {
  const estruturas = [
    `${microsubnicho.toUpperCase()}: ${tituloBase}`,
    `${microsubnicho} - ${tituloBase} (VOCÊ PRECISA VER ISSO)`,
    `REVELADO: Como ${microsubnicho} pode ${tituloBase.toLowerCase()}`,
    `O segredo do ${microsubnicho} para ${tituloBase.toLowerCase()}`,
    `${tituloBase} através do ${microsubnicho} [MÉTODO COMPROVADO]`,
    `Por que ${microsubnicho} é essencial para ${tituloBase.toLowerCase()}`,
    `7 dicas de ${microsubnicho} para ${tituloBase.toLowerCase()}`,
    `${microsubnicho} URGENTE: ${tituloBase}`,
    `Como dominar ${microsubnicho} e ${tituloBase.toLowerCase()}`,
    `O guia definitivo de ${microsubnicho} para ${tituloBase.toLowerCase()}`
  ];
  
  // Embaralhar as estruturas
  const embaralhadas = [...estruturas].sort(() => Math.random() - 0.5);
  
  // Pegar as N primeiras estruturas
  return embaralhadas.slice(0, nVariacoes).map(titulo => {
    // Garantir que o título não ultrapasse 100 caracteres
    if (titulo.length > 97) {
      return titulo.substring(0, 97) + '...';
    }
    return titulo;
  });
};

/**
 * Planeja um ciclo de publicações focado em micro-subnichos recomendados
 */
export const planejarCicloMicroSubnicho = (
  microsubnichosFoco: MicroSubnichoRecomendado[],
  frequencia: string,
  ciclos: number
): PlanejamentoCiclo[] => {
  const cronograma: PlanejamentoCiclo[] = [];
  
  // Determinar intervalo com base na frequência
  const intervaloDias = frequencia === 'diario' ? 1 :
                        frequencia === 'semanal' ? 7 :
                        frequencia === 'bisemanal' ? 3 : 7; // padrão: semanal
  
  const dataAtual = new Date();
  
  // Criar slots para cada ciclo
  for (let i = 0; i < ciclos; i++) {
    // Determinar qual micro-subnicho usar (rotacionando pela lista)
    const microSubnichoIndex = i % microsubnichosFoco.length;
    const microSubnicho = microsubnichosFoco[microSubnichoIndex].microsubnicho;
    
    // Gerar um título aleatório para esse micro-subnicho
    const tituloBase = "alcançar sucesso rápido";
    const titulosGerados = gerarTitulosMicroSubnicho(microSubnicho, tituloBase, 1);
    
    // Calcular a data de publicação
    const dataPublicacao = new Date(dataAtual);
    dataPublicacao.setDate(dataPublicacao.getDate() + (i * intervaloDias));
    
    // Definir horário ideal (18h)
    dataPublicacao.setHours(18, 0, 0, 0);
    
    cronograma.push({
      microsubnicho,
      titulo_sugerido: titulosGerados[0],
      data_publicacao: dataPublicacao.toISOString()
    });
  }
  
  return cronograma;
};
