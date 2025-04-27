/**
 * Interface para estruturas de recorrência identificadas
 */
export interface RecurrenceStructure {
  tipo_estrutura: string;
  estrutura_titulo: string;
  frequencia: number;
  descricao: string;
  exemplo_titulo: string;
  canais_exemplos: string[];
}

/**
 * Interface para gatilhos de recorrência
 */
export interface RecurrenceTrigger {
  gatilho: string;
  tipo_gatilho: string;
  descricao: string;
  peso: number;
  eficacia: string;
}

/**
 * Interface para cronograma de publicação
 */
export interface PublicationSchedule {
  titulo: string;
  data_publicacao: string;
  elemento_recorrente: string;
}

/**
 * Extrai estruturas de recorrência de canais populares
 * @param nicho Nicho principal a ser analisado
 * @param formato_canal Formato dos canais a serem analisados
 * @param idioma Idioma dos canais
 * @param max_canais Número máximo de canais para análise
 * @param apiKey Chave da API do YouTube
 * @returns Estruturas de recorrência identificadas
 */
export const extrairEstruturasRecorrencia = async (
  nicho: string,
  formato_canal: string,
  idioma: string,
  max_canais: number,
  apiKey?: string
): Promise<RecurrenceStructure[]> => {
  try {
    if (!apiKey) {
      return simularExtrairEstruturasRecorrencia(nicho, formato_canal, idioma, max_canais);
    }
    
    // Aqui iria a implementação real usando a API do YouTube
    // Por enquanto, retornamos dados simulados
    return simularExtrairEstruturasRecorrencia(nicho, formato_canal, idioma, max_canais);
  } catch (error) {
    console.error("Erro ao extrair estruturas de recorrência:", error);
    throw error;
  }
};

/**
 * Simula a extração de estruturas de recorrência
 */
export const simularExtrairEstruturasRecorrencia = (
  nicho: string,
  formato_canal: string,
  idioma: string,
  max_canais: number
): RecurrenceStructure[] => {
  const estruturasComuns: RecurrenceStructure[] = [
    {
      tipo_estrutura: "Episódio",
      estrutura_titulo: "Episódio X: [Tema]",
      frequencia: 78,
      descricao: "Indicação clara de continuidade usando numeração de episódios",
      exemplo_titulo: "Ep. 1: [Tema]",
      canais_exemplos: ["Canal Storytelling", "Histórias Incríveis", "Contos da Vida Real"]
    },
    {
      tipo_estrutura: "Parte",
      estrutura_titulo: "Parte X - [Tema]",
      frequencia: 65,
      descricao: "Segmentação de conteúdo em partes numeradas",
      exemplo_titulo: "Parte 1 - [Tema]",
      canais_exemplos: ["Viagens Pelo Mundo", "Exploradores", "Lugares Incríveis"]
    },
    {
      tipo_estrutura: "Título",
      estrutura_titulo: "[Tema] #X",
      frequencia: 55,
      descricao: "Uso de hashtag com número para indicar sequência",
      exemplo_titulo: "#1 [Tema]",
      canais_exemplos: ["Tutorial Master", "Aprenda Comigo", "Dicas e Truques"]
    },
    {
      tipo_estrutura: "Série",
      estrutura_titulo: "Série: [Tema] - Capítulo X",
      frequencia: 48,
      descricao: "Estrutura de livro/história aplicada a vídeos",
      exemplo_titulo: "Série: [Tema] - Capítulo 1",
      canais_exemplos: ["Documentários HD", "História Real", "Investigação Profunda"]
    },
    {
      tipo_estrutura: "Temporada",
      estrutura_titulo: "[Tema] (Temporada X, Ep. Y)",
      frequencia: 42,
      descricao: "Organização de conteúdo em formato de programa de TV",
      exemplo_titulo: "[Tema] (Temporada 1, Ep. 1)",
      canais_exemplos: ["Conteúdo Premium", "Shows da Semana", "Top Entretenimento"]
    },
    {
      tipo_estrutura: "Dias",
      estrutura_titulo: "X Dias de [Tema]: Dia Y",
      frequencia: 38,
      descricao: "Formato de desafio com prazo definido",
      exemplo_titulo: "5 Dias de [Tema]: Dia 1",
      canais_exemplos: ["Desafios Semanais", "Projetos DIY", "Transformação Total"]
    },
    {
      tipo_estrutura: "Continuação",
      estrutura_titulo: "CONTINUAÇÃO: [Tema] X",
      frequencia: 35,
      descricao: "Indicador explícito de que o conteúdo é continuação",
      exemplo_titulo: "CONTINUAÇÃO: [Tema] 1",
      canais_exemplos: ["Notícias de Última Hora", "Atualidades", "Fatos Recentes"]
    }
  ];
  
  // Filtrar baseado no nicho e formato
  const palavrasChaveNicho = nicho.toLowerCase().split(' ');
  
  return estruturasComuns
    .sort((a, b) => b.frequencia - a.frequencia)
    .slice(0, Math.min(max_canais, estruturasComuns.length));
};

/**
 * Identifica gatilhos de recorrência com base nas estruturas identificadas
 * @param estruturas Estruturas de recorrência identificadas
 * @returns Gatilhos de recorrência com pesos
 */
export const identificarGatilhosRecorrencia = (
  estruturas: RecurrenceStructure[]
): RecurrenceTrigger[] => {
  const gatilhos: RecurrenceTrigger[] = [
    {
      gatilho: "Episódio X",
      tipo_gatilho: "Episódio",
      descricao: "Indicação clara de continuidade usando numeração de episódios",
      peso: 0.9,
      eficacia: "Alta"
    },
    {
      gatilho: "Parte X",
      tipo_gatilho: "Parte",
      descricao: "Segmentação de conteúdo em partes numeradas",
      peso: 0.85,
      eficacia: "Alta"
    },
    {
      gatilho: "Capítulo X",
      tipo_gatilho: "Título",
      descricao: "Estrutura de livro/história aplicada a vídeos",
      peso: 0.8,
      eficacia: "Alta"
    },
    {
      gatilho: "Série:",
      tipo_gatilho: "Série",
      descricao: "Indicador explícito de que o conteúdo faz parte de uma série",
      peso: 0.75,
      eficacia: "Alta"
    },
    {
      gatilho: "Temporada X",
      tipo_gatilho: "Temporada",
      descricao: "Organização de conteúdo em formato de programa de TV",
      peso: 0.7,
      eficacia: "Alta"
    },
    {
      gatilho: "#X",
      tipo_gatilho: "Título",
      descricao: "Uso de hashtag com número para indicar sequência",
      peso: 0.65,
      eficacia: "Alta"
    },
    {
      gatilho: "Dia X de Y",
      tipo_gatilho: "Dias",
      descricao: "Formato de desafio com prazo definido",
      peso: 0.6,
      eficacia: "Alta"
    },
    {
      gatilho: "CONTINUAÇÃO:",
      tipo_gatilho: "Continuação",
      descricao: "Indicador explícito de que o conteúdo é continuação",
      peso: 0.55,
      eficacia: "Alta"
    },
    {
      gatilho: "Atualização:",
      tipo_gatilho: "Continuação",
      descricao: "Indica novidades sobre um tópico anterior",
      peso: 0.5,
      eficacia: "Alta"
    }
  ];

  // Ajustar pesos baseado nas estruturas encontradas
  const gatilhosAjustados = gatilhos.map(gatilho => {
    // Procurar nas estruturas por correspondências para ajustar o peso
    const estruturaCorrespondente = estruturas.find(
      estrutura => estrutura.estrutura_titulo.includes(gatilho.gatilho)
    );
    
    if (estruturaCorrespondente) {
      // Normalizar a frequência para um valor entre 0 e 0.5 e adicionar ao peso base
      const ajuste = Math.min(estruturaCorrespondente.frequencia / 200, 0.5);
      return {
        ...gatilho,
        peso: Math.min(gatilho.peso + ajuste, 1.0)
      };
    }
    
    return gatilho;
  });

  return gatilhosAjustados.sort((a, b) => b.peso - a.peso);
};

/**
 * Gera títulos com elementos de recorrência
 * @param gatilhos Gatilhos de recorrência identificados
 * @param assunto Assunto principal dos títulos
 * @param n_variacoes Número de variações a gerar
 * @returns Lista de títulos com elementos de recorrência
 */
export const gerarTitulosRecorrencia = (
  gatilhos: RecurrenceTrigger[],
  assunto: string,
  n_variacoes: number = 5
): string[] => {
  // Gatilhos de alta prioridade (peso > 0.7)
  const gatilhosPrioritarios = gatilhos.filter(g => g.peso > 0.7);
  
  // Modelos de títulos com slots para gatilhos e assunto
  const modelos = [
    "{gatilho}: {assunto} que você precisa ver",
    "{gatilho}: {assunto} revelado finalmente",
    "{gatilho} | {assunto} como você nunca viu",
    "{assunto} - {gatilho} (Imperdível)",
    "{gatilho}: {assunto} com revelações surpreendentes",
    "{gatilho} de {assunto}: o que ninguém te contou",
    "{assunto} {gatilho}: a jornada continua",
    "{gatilho}: {assunto} com final inesperado",
    "A saga continua: {gatilho} - {assunto}",
    "Não perca o {gatilho}: {assunto} e suas consequências"
  ];
  
  const titulos: string[] = [];
  let contador = 0;
  
  // Gerar títulos enquanto não atingirmos o número desejado
  while (titulos.length < n_variacoes && contador < 50) {
    contador++;
    
    // Selecionar um gatilho aleatório dos prioritários
    const gatilho = gatilhosPrioritarios[Math.floor(Math.random() * gatilhosPrioritarios.length)];
    
    // Extrair apenas o texto do gatilho
    const textoGatilho = gatilho.gatilho.replace('X', String(Math.floor(Math.random() * 10) + 1));
    
    // Selecionar um modelo aleatório
    const modelo = modelos[Math.floor(Math.random() * modelos.length)];
    
    // Substituir os placeholders no modelo
    const titulo = modelo
      .replace('{gatilho}', textoGatilho)
      .replace('{assunto}', assunto);
    
    // Adicionar o título se for único
    if (!titulos.includes(titulo)) {
      titulos.push(titulo);
    }
  }
  
  return titulos;
};

/**
 * Planejar ciclo de publicação para títulos com recorrência
 * @param titulos Títulos gerados com elementos de recorrência
 * @param frequencia Frequência de publicação
 * @param periodo Número de ciclos a planejar
 * @returns Cronograma de publicação
 */
export const planejarCicloRecorrencia = (
  titulos: string[],
  frequencia: string,
  periodo: number
): PublicationSchedule[] => {
  // Data inicial (hoje)
  const dataInicial = new Date();
  
  // Definir incremento baseado na frequência
  let incrementoDias: number;
  switch (frequencia.toLowerCase()) {
    case 'diária':
      incrementoDias = 1;
      break;
    case 'semanal':
      incrementoDias = 7;
      break;
    case 'quinzenal':
      incrementoDias = 14;
      break;
    case 'mensal':
      incrementoDias = 30;
      break;
    default:
      incrementoDias = 7; // Padrão: semanal
  }
  
  // Melhores dias para publicação baseado em análise genérica
  const melhoresDias = ['quinta', 'sexta', 'sábado', 'domingo']; // Exemplo simplificado
  
  const cronograma: PublicationSchedule[] = [];
  
  // Ajustar data inicial para o próximo "melhor dia"
  const ajustarParaMelhorDia = (data: Date): Date => {
    const diaDaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda, ...
    const diasMelhores = [0, 4, 5, 6]; // Domingo, Quinta, Sexta, Sábado
    
    if (diasMelhores.includes(diaDaSemana)) {
      return data; // Já é um bom dia
    }
    
    // Avançar para o próximo bom dia
    const diasAteProximo = Math.min(...diasMelhores.map(dia => {
      const diff = dia - diaDaSemana;
      return diff > 0 ? diff : diff + 7;
    }));
    
    const novaData = new Date(data);
    novaData.setDate(data.getDate() + diasAteProximo);
    return novaData;
  };
  
  // Gerar o cronograma
  for (let i = 0; i < periodo && i < titulos.length; i++) {
    const dataBase = new Date(dataInicial);
    dataBase.setDate(dataBase.getDate() + i * incrementoDias);
    
    const dataMelhor = ajustarParaMelhorDia(dataBase);
    
    // Adicionar número do episódio ao título, se não existir
    let tituloAjustado = titulos[i];
    if (!tituloAjustado.match(/Ep\.\s*\d+|Episódio\s*\d+|Parte\s*\d+|#\d+/i)) {
      tituloAjustado = `Ep. ${i+1}: ${tituloAjustado}`;
    }
    
    // Fix: Define the element if available in the title or use a default value
    const elementoRecorrente = tituloAjustado.split(' ')[0] || "Episódio";
    
    cronograma.push({
      titulo: tituloAjustado,
      data_publicacao: dataMelhor.toISOString(),
      elemento_recorrente: elementoRecorrente
    });
  }
  
  return cronograma;
};
