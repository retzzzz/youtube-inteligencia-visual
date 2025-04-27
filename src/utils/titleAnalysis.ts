import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { analyzeSaturation } from "@/utils/formatters";

/**
 * Interface para título com metadados
 */
export interface TitleData {
  titulo: string;
  canal: string;
  data_publicacao: string;
  visualizacoes: number;
}

/**
 * Interface para título com score de inovação
 */
export interface TitleWithScore {
  titulo: string;
  repeticoes: number;
  score_inovacao: number;
}

/**
 * Interface para padrões de títulos
 */
export interface TitlePattern {
  padrao_exemplo: string;
  frequencia: number;
  descricao_curta: string;
}

/**
 * Interface para títulos multilíngues
 */
export interface MultilingualTitle {
  titulo_original: string;
  idioma: string;
  titulo_adaptado: string;
}

/**
 * Extrai títulos concorrentes de um subnicho específico
 * @param subnicho Subnicho para buscar
 * @param idioma Idioma dos vídeos
 * @param max_videos Número máximo de vídeos para analisar
 * @param apiKey Chave da API do YouTube
 * @returns Lista de títulos com metadados
 */
export const extrairTitulosConcorrentes = async (
  subnicho: string,
  idioma: string,
  max_videos: number,
  apiKey: string
): Promise<TitleData[]> => {
  try {
    // Buscar vídeos usando a API do YouTube
    const searchQuery = `${subnicho} ${idioma}`;
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${max_videos}&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Falha ao buscar vídeos');
    }
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId);
    
    if (videoIds.length === 0) {
      return [];
    }
    
    // Buscar detalhes dos vídeos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Falha ao buscar detalhes dos vídeos');
    }
    
    const videosData = await videosResponse.json();
    
    // Processar dados dos vídeos
    const titulos: TitleData[] = videosData.items.map((video: any) => {
      return {
        titulo: video.snippet.title,
        canal: video.snippet.channelTitle,
        data_publicacao: video.snippet.publishedAt,
        visualizacoes: parseInt(video.statistics.viewCount) || 0
      };
    });
    
    // Ordenar por visualizações em ordem decrescente
    return titulos.sort((a, b) => b.visualizacoes - a.visualizacoes);
    
  } catch (error) {
    console.error("Erro ao extrair títulos concorrentes:", error);
    throw error;
  }
};

/**
 * Extrai títulos virais (>1M views) de um nicho específico
 * @param nicho Nicho principal
 * @param subnicho Subnicho específico
 * @param idioma Idioma dos vídeos
 * @param min_views Número mínimo de visualizações
 * @param max_videos Número máximo de vídeos para analisar
 * @param apiKey Chave da API do YouTube
 * @returns Lista de títulos virais com metadados
 */
export const extrairTitulosVirais = async (
  nicho: string,
  subnicho: string,
  idioma: string,
  min_views: number = 1000000,
  max_videos: number = 100,
  apiKey: string
): Promise<TitleData[]> => {
  try {
    // Buscar vídeos usando a API do YouTube
    const searchQuery = `${nicho} ${subnicho} ${idioma}`;
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${max_videos}&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Falha ao buscar vídeos virais');
    }
    
    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId);
    
    if (videoIds.length === 0) {
      return [];
    }
    
    // Buscar detalhes dos vídeos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Falha ao buscar detalhes dos vídeos');
    }
    
    const videosData = await videosResponse.json();
    
    // Processar dados dos vídeos e filtrar por min_views
    const titulos: TitleData[] = videosData.items
      .map((video: any) => {
        return {
          titulo: video.snippet.title,
          canal: video.snippet.channelTitle,
          data_publicacao: video.snippet.publishedAt,
          visualizacoes: parseInt(video.statistics.viewCount) || 0
        };
      })
      .filter((video: TitleData) => video.visualizacoes >= min_views);
    
    // Ordenar por visualizações em ordem decrescente
    return titulos.sort((a, b) => b.visualizacoes - a.visualizacoes);
    
  } catch (error) {
    console.error("Erro ao extrair títulos virais:", error);
    throw error;
  }
};

/**
 * Simula a extração de títulos virais (para desenvolvimento)
 */
export const simularExtrairTitulosVirais = (
  nicho: string,
  subnicho: string,
  idioma: string,
  min_views: number = 1000000,
  max_videos: number = 20
): TitleData[] => {
  const titulosExemplo = [
    "Millionaire Gives Away His Fortune to Strangers (10 Million Views)",
    "I Pretended to be Poor but I'm Actually a Millionaire (8.5M Views)",
    "Rich CEO Falls for Poor Girl - True Story That Changed Everything",
    "7 Secrets Millionaires Don't Want You To Know (EXPOSED)",
    "Billionaire's Daughter Lives as a Normal Person for 30 Days",
    "How I Became a Millionaire Before 25 - Not What You Think",
    "Rich vs Poor - Social Experiment Gone Wrong (Shocking Results)",
    "The Secret Life of Ultra Wealthy People - Revealed",
    "Millionaire Obsessed by a Woman Gives Her Everything",
    "Wealthy Man's Secret Double Life Revealed After 10 Years",
    "5 Things Rich People Never Buy - Financial Secrets",
    "From $0 to $1 Million in Just One Year - My Journey",
    "I Lived Like a Billionaire for 24 Hours (Unbelievable)",
    "Millionaire's Revenge on Gold Digger Caught on Camera",
    "The Truth About Rich People That Nobody Tells You"
  ];
  
  return Array.from({length: Math.min(max_videos, titulosExemplo.length)}, (_, i) => {
    const randomViews = Math.floor(Math.random() * 9000000) + 1000000;
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365));
    
    return {
      titulo: titulosExemplo[i],
      canal: `Canal Viral ${i+1}`,
      data_publicacao: randomDate.toISOString(),
      visualizacoes: randomViews
    };
  });
};

/**
 * Identifica padrões em títulos virais
 * @param titulos Lista de títulos para analisar
 * @returns Lista de padrões encontrados
 */
export const identificarPadroesTitulos = (
  titulos: TitleData[]
): TitlePattern[] => {
  // Definir padrões comuns para análise
  const padroes = [
    { 
      regex: /^\d+\s/i, 
      nome: "Número no início", 
      descricao: "Inicia com número (ex: '5 maneiras de...', '7 segredos...')" 
    },
    { 
      regex: /\?$/i, 
      nome: "Termina com pergunta", 
      descricao: "Finaliza com uma pergunta para gerar curiosidade" 
    },
    { 
      regex: /como|how/i, 
      nome: "Tutorial/How-to", 
      descricao: "Frases do tipo 'Como fazer' ou 'How to'" 
    },
    { 
      regex: /segredo|secret|exposed|revelado/i, 
      nome: "Segredo revelado", 
      descricao: "Menciona segredos ou informações exclusivas" 
    },
    { 
      regex: /nunca|never|don't/i, 
      nome: "Negação enfática", 
      descricao: "Usa negações para criar contraste (ex: 'nunca faça isso')" 
    },
    { 
      regex: /vs|versus/i, 
      nome: "Comparação/Versus", 
      descricao: "Compara dois conceitos opostos (ex: 'rico vs pobre')" 
    },
    { 
      regex: /shocking|surpreendente|chocante|unbelievable|incrível/i, 
      nome: "Elemento surpresa", 
      descricao: "Menciona elementos surpreendentes ou chocantes" 
    },
    { 
      regex: /\(.*\)/i, 
      nome: "Texto entre parênteses", 
      descricao: "Adiciona informação complementar entre parênteses" 
    },
    { 
      regex: /before|depois|after|antes/i, 
      nome: "Antes/Depois", 
      descricao: "Contrasta um estado antes e depois" 
    },
    { 
      regex: /you|você|tu/i, 
      nome: "Direcionamento ao espectador", 
      descricao: "Fala diretamente com o espectador usando 'você'" 
    }
  ];

  // Analisar frequência dos padrões
  const resultados = padroes.map(padrao => {
    let contador = 0;
    let exemplo = "";
    
    titulos.forEach(item => {
      if (padrao.regex.test(item.titulo)) {
        contador++;
        if (!exemplo) exemplo = item.titulo;
      }
    });
    
    const frequencia = titulos.length > 0 ? contador / titulos.length : 0;
    
    return {
      padrao_exemplo: exemplo,
      frequencia: parseFloat((frequencia * 100).toFixed(1)),
      descricao_curta: padrao.nome + ": " + padrao.descricao
    };
  });
  
  // Ordenar por frequência descendente e filtrar padrões sem ocorrências
  return resultados
    .filter(item => item.frequencia > 0)
    .sort((a, b) => b.frequencia - a.frequencia);
};

/**
 * Gera títulos virais com base em padrões identificados
 * @param padroes Lista de padrões encontrados
 * @param termos_chave Lista de termos-chave para incluir
 * @param n_variacoes Número de variações a gerar
 * @returns Lista de títulos gerados
 */
export const gerarTitulosVirais = (
  padroes: TitlePattern[],
  termos_chave: string[],
  n_variacoes: number = 10
): string[] => {
  // Templates de títulos baseados nos padrões mais comuns
  const templates = [
    // Número no início
    `{num} {termo1} que {termo2} não querem que você saiba`,
    `{num} maneiras de {termo1} e {termo2} rápido`,
    `{num} segredos de {termo1} revelados por {termo2}`,
    
    // Perguntas
    `E se {termo1} for a chave para {termo2}?`,
    `Por que {termo1} está mudando tudo sobre {termo2}?`,
    `{termo1} realmente funciona para {termo2}?`,
    
    // Revelações
    `A verdade sobre {termo1} que {termo2} escondem`,
    `{termo1} revelado: o que {termo2} não contam`,
    `O segredo de {termo1} para {termo2} rápido`,
    
    // Comparações
    `{termo1} vs {termo2}: qual realmente funciona`,
    `Antes e depois: de {termo2} para {termo1} em 30 dias`,
    `{termo1} ou {termo2}? A resposta vai te surpreender`,
    
    // Direcionamento ao espectador
    `Como você pode {termo1} mesmo sem {termo2}`,
    `O que você não sabe sobre {termo1} está arruinando seu {termo2}`,
    `Você está fazendo {termo1} de forma errada (e {termo2} é a prova)`,
    
    // Elementos surpresa
    `{termo1} chocante transformou {termo2} completamente`,
    `Inacreditável: {termo1} descoberto em {termo2}`,
    `Ninguém esperava que {termo1} pudesse {termo2} (até agora)`
  ];
  
  // Números para variar nos templates
  const numeros = ["3", "5", "7", "10", "12"];
  
  // Gerar variações de títulos
  let titulosGerados: string[] = [];
  
  while (titulosGerados.length < n_variacoes) {
    // Selecionar template aleatório
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Selecionar termos aleatórios
    const termo1 = termos_chave[Math.floor(Math.random() * termos_chave.length)];
    const termo2 = termos_chave[Math.floor(Math.random() * termos_chave.length)];
    
    // Evitar repetição do mesmo termo
    if (termo1 === termo2 && termos_chave.length > 1) continue;
    
    // Selecionar número aleatório
    const num = numeros[Math.floor(Math.random() * numeros.length)];
    
    // Construir título
    let titulo = template
      .replace("{termo1}", termo1)
      .replace("{termo2}", termo2)
      .replace("{num}", num);
    
    // Adicionar à lista se não for duplicado
    if (!titulosGerados.includes(titulo)) {
      titulosGerados.push(titulo);
    }
  }
  
  return titulosGerados;
};

/**
 * Adapta títulos para múltiplos idiomas
 * @param titulos Lista de títulos originais
 * @param idiomas Lista de idiomas de destino
 * @returns Lista de títulos adaptados
 */
export const gerarTitulosMultilingues = (
  titulos: string[],
  idiomas: string[]
): MultilingualTitle[] => {
  // Dicionário de traduções para termos comuns
  const traducoes: Record<string, Record<string, string>> = {
    "segredo": {
      "inglês": "secret",
      "espanhol": "secreto",
      "francês": "secret",
      "alemão": "Geheimnis"
    },
    "maneiras": {
      "inglês": "ways",
      "espanhol": "maneras",
      "francês": "façons",
      "alemão": "Wege"
    },
    "revelado": {
      "inglês": "revealed",
      "espanhol": "revelado",
      "francês": "révélé",
      "alemão": "enthüllt"
    },
    "surpreendente": {
      "inglês": "surprising",
      "espanhol": "sorprendente",
      "francês": "surprenant",
      "alemão": "überraschend"
    },
    "verdade": {
      "inglês": "truth",
      "espanhol": "verdad",
      "francês": "vérité",
      "alemão": "Wahrheit"
    }
  };
  
  // Função para substituir termos comuns
  const substituirTermos = (texto: string, idioma: string): string => {
    let resultado = texto;
    
    // Processar cada termo do dicionário
    Object.keys(traducoes).forEach(termo => {
      const regex = new RegExp(termo, 'gi');
      if (regex.test(texto)) {
        resultado = resultado.replace(regex, traducoes[termo][idioma] || termo);
      }
    });
    
    return resultado;
  };
  
  // Gerar títulos adaptados para cada idioma
  let titulosMultilingues: MultilingualTitle[] = [];
  
  titulos.forEach(tituloOriginal => {
    idiomas.forEach(idioma => {
      // Adaptar título para o idioma de destino
      let tituloAdaptado = substituirTermos(tituloOriginal, idioma);
      
      // Prefixo específico para o idioma (caso título original seja muito similar)
      const prefixos: Record<string, string> = {
        "inglês": "[EN] ",
        "espanhol": "[ES] ",
        "francês": "[FR] ",
        "português": "[PT] ",
        "alemão": "[DE] "
      };
      
      // Adicionar prefixo se o título adaptado for muito similar ao original
      if (tituloAdaptado === tituloOriginal && idioma in prefixos) {
        tituloAdaptado = prefixos[idioma] + tituloAdaptado;
      }
      
      titulosMultilingues.push({
        titulo_original: tituloOriginal,
        idioma: idioma,
        titulo_adaptado: tituloAdaptado
      });
    });
  });
  
  return titulosMultilingues;
};

/**
 * Função temporária para simular a extração de títulos (para desenvolvimento)
 */
export const simularExtrairTitulosConcorrentes = (
  subnicho: string,
  idioma: string,
  max_videos: number
): TitleData[] => {
  const titulosExemplo = [
    "Millionaire Obsessed by a Woman Gives Her Everything",
    "Rich CEO Falls for Poor Girl - True Story",
    "Wealthy Man's Secret Double Life Revealed",
    "Millionaire's Revenge on Gold Digger",
    "I Pretended to be Poor but I'm Actually a Millionaire",
    "Billionaire's Daughter Lives as a Normal Person",
    "Rich vs Poor - Social Experiment Gone Wrong",
    "Millionaire Gives Away His Fortune to Strangers",
    "How I Became a Millionaire Before 30",
    "The Secret Life of Ultra Wealthy People"
  ];
  
  return Array.from({length: Math.min(max_videos, titulosExemplo.length)}, (_, i) => {
    const randomViews = Math.floor(Math.random() * 1000000) + 10000;
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365));
    
    return {
      titulo: titulosExemplo[i],
      canal: `Canal ${i+1}`,
      data_publicacao: randomDate.toISOString(),
      visualizacoes: randomViews
    };
  });
};

/**
 * Avalia e prioriza títulos com base em critérios de saturação
 * @param titulos Lista de títulos para avaliar
 * @param criterios Critérios para avaliação
 * @returns Lista de títulos priorizados
 */
export const avaliarEPriorizarTitulos = (
  titulos: string[],
  titulosConcorrentes: TitleData[],
  criterios: {max_repeticoes: number, min_score_inovacao: number}
): TitleWithScore[] => {
  const titulosAvaliados: TitleWithScore[] = titulos.map(titulo => {
    // Calcular repetições (títulos similares)
    const repeticoes = contarTitulosSimilares(titulo, titulosConcorrentes);
    
    // Calcular score de inovação
    const score_inovacao = calcularScoreInovacao(titulo, titulosConcorrentes);
    
    return {
      titulo,
      repeticoes,
      score_inovacao
    };
  });
  
  // Filtrar títulos que atendem aos critérios
  const titulosFiltrados = titulosAvaliados.filter(
    titulo => titulo.repeticoes <= criterios.max_repeticoes && 
    titulo.score_inovacao >= criterios.min_score_inovacao
  );
  
  // Ordenar por score de inovação
  const titulosOrdenados = titulosFiltrados.sort(
    (a, b) => b.score_inovacao - a.score_inovacao
  );
  
  // Retornar os 5 melhores
  return titulosOrdenados.slice(0, 5);
};

/**
 * Conta quantos títulos similares existem na lista de concorrentes
 */
function contarTitulosSimilares(titulo: string, titulosConcorrentes: TitleData[]): number {
  // Em uma implementação real, usaria um algoritmo de similaridade de texto
  // Por simplicidade, vamos apenas contar palavras-chave em comum
  const palavrasChave = extrairPalavrasChave(titulo);
  
  return titulosConcorrentes.reduce((count, concorrente) => {
    const palavrasConcorrente = extrairPalavrasChave(concorrente.titulo);
    const palavrasComuns = palavrasChave.filter(p => palavrasConcorrente.includes(p));
    
    // Se houver pelo menos 2 palavras-chave em comum, consideramos similar
    if (palavrasComuns.length >= 2) {
      return count + 1;
    }
    return count;
  }, 0);
}

/**
 * Calcula o score de inovação de um título
 */
function calcularScoreInovacao(titulo: string, titulosConcorrentes: TitleData[]): number {
  // Em uma implementação real, usaria um algoritmo para calcular 
  // a distância semântica/originalidade do título
  // Por simplicidade, vamos simular esse cálculo
  
  const totalConcorrentes = titulosConcorrentes.length;
  if (totalConcorrentes === 0) return 1.0; // Totalmente inovador se não há concorrentes
  
  const titulosPalavras = extrairPalavrasChave(titulo);
  
  let somaScores = 0;
  titulosConcorrentes.forEach(concorrente => {
    const concorrentePalavras = extrairPalavrasChave(concorrente.titulo);
    const palavrasComuns = titulosPalavras.filter(p => concorrentePalavras.includes(p));
    
    // Calcular similaridade como proporção de palavras em comum
    const similaridade = palavrasComuns.length / Math.max(titulosPalavras.length, concorrentePalavras.length);
    somaScores += similaridade;
  });
  
  // Score de inovação é o inverso da média de similaridade
  const scoreSimilaridade = somaScores / totalConcorrentes;
  return 1 - scoreSimilaridade;
}

/**
 * Extrai palavras-chave de um título
 */
function extrairPalavrasChave(titulo: string): string[] {
  // Remover caracteres especiais, converter para minúsculas e dividir em palavras
  const palavras = titulo.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(p => p.length > 2); // Ignorar palavras muito curtas
  
  // Remover stopwords
  const stopwords = ['the', 'and', 'for', 'but', 'this', 'that', 'with', 'como', 'por', 'para', 'que', 'uma', 'com'];
  return palavras.filter(p => !stopwords.includes(p));
}
