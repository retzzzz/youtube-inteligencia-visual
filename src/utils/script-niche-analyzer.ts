
/**
 * Utility functions for analyzing scripts and identifying their niche
 */

interface NicheInfo {
  niche: string;
  subniche: string;
  microSubniche: string;
}

// Principais nichos e seus respectivos subnichos
const nicheMap: Record<string, string[]> = {
  "Desenvolvimento Pessoal": ["Produtividade", "Autoconhecimento", "Motivação", "Hábitos", "Meditação", "Mindfulness"],
  "Finanças": ["Investimentos", "Economia", "Empreendedorismo", "Criptomoedas", "Day Trade", "Renda Passiva"],
  "Saúde": ["Nutrição", "Fitness", "Bem-estar", "Saúde Mental", "Yoga", "Suplementação"],
  "Tecnologia": ["Programação", "Inteligência Artificial", "Gadgets", "Startups", "Redes Sociais", "Cibersegurança"],
  "Educação": ["Idiomas", "Vestibular", "Concursos", "Carreira", "Técnicas de Estudo", "Desenvolvimento Profissional"],
  "Entretenimento": ["Filmes", "Séries", "Jogos", "Música", "Celebridades", "Reviews"]
};

// Palavras-chave associadas a cada nicho
const nicheKeywords: Record<string, string[]> = {
  "Desenvolvimento Pessoal": ["crescimento", "evolução", "melhorar", "potencial", "mindset", "hábitos", "rotina", "produtividade", "foco", "disciplina", "meta", "objetivo", "autoconhecimento", "meditação", "mindfulness"],
  "Finanças": ["dinheiro", "investimento", "renda", "economia", "financeiro", "bolsa", "ações", "bitcoin", "criptomoeda", "empreender", "negócio", "lucro", "patrimônio", "poupar", "ganhar"],
  "Saúde": ["saúde", "bem-estar", "dieta", "nutrição", "exercício", "fitness", "treino", "academia", "alimentação", "suplemento", "corpo", "mente", "energia", "disposição", "imunidade"],
  "Tecnologia": ["tecnologia", "app", "software", "hardware", "programação", "código", "digital", "online", "internet", "computador", "smartphone", "gadget", "inovação", "startup", "inteligência artificial"],
  "Educação": ["aprender", "estudar", "conhecimento", "educação", "curso", "aula", "ensino", "escola", "faculdade", "universidade", "professor", "aluno", "concurso", "idioma", "língua"],
  "Entretenimento": ["diversão", "entretenimento", "filme", "série", "jogo", "música", "show", "artista", "ator", "atriz", "cinema", "teatro", "streaming", "televisão", "celebridade"]
};

/**
 * Analisa um texto de roteiro para identificar seu nicho, subnicho e micro-subnicho
 * @param scriptText O texto do roteiro a ser analisado
 * @returns Informações sobre o nicho identificado
 */
export const analyzeScriptNiche = (scriptText: string): NicheInfo => {
  const normalizedText = scriptText.toLowerCase();
  
  // Contagem de palavras-chave por nicho
  const nicheCounts = Object.entries(nicheKeywords).map(([niche, keywords]) => {
    const count = keywords.reduce((sum, keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = normalizedText.match(regex);
      return sum + (matches ? matches.length : 0);
    }, 0);
    return { niche, count };
  });
  
  // Ordenar por contagem descendente
  nicheCounts.sort((a, b) => b.count - a.count);
  
  // O nicho principal é o que tem mais correspondências
  const mainNiche = nicheCounts[0].count > 0 ? nicheCounts[0].niche : "Desenvolvimento Pessoal";
  
  // Identificar subnicho
  let subniche = "";
  if (mainNiche in nicheMap) {
    const subnicheKeywords: Record<string, number> = {};
    
    // Contar ocorrências de cada subnicho
    nicheMap[mainNiche].forEach(sub => {
      const regex = new RegExp(`\\b${sub.toLowerCase()}\\b`, 'gi');
      const matches = normalizedText.match(regex);
      subnicheKeywords[sub] = matches ? matches.length : 0;
    });
    
    // Identificar o subnicho com mais ocorrências
    const sortedSubniches = Object.entries(subnicheKeywords)
      .sort((a, b) => b[1] - a[1]);
    
    subniche = sortedSubniches[0][1] > 0 
      ? sortedSubniches[0][0] 
      : nicheMap[mainNiche][0]; // Usar o primeiro subnicho como padrão
  }
  
  // Identificar micro-subnicho (simplificado)
  // Extrair frases curtas que contêm palavras do nicho e subnicho
  const sentences = normalizedText.split(/[.!?]+/);
  const relevantSentences = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    // Verificar se a frase contém palavras-chave do nicho ou subnicho
    return nicheKeywords[mainNiche].some(keyword => 
      lowerSentence.includes(keyword.toLowerCase())
    ) || lowerSentence.includes(subniche.toLowerCase());
  });
  
  // Extrair potenciais micro-subnichos
  let microSubniche = "";
  if (relevantSentences.length > 0) {
    // Usar a frase mais relevante como base para o micro-subnicho
    const bestSentence = relevantSentences[0].trim();
    
    if (bestSentence.length > 10) {
      // Extrair até 5 palavras significativas
      const words = bestSentence.split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 5)
        .join(" ");
      
      microSubniche = `${subniche} para ${words}`;
    } else {
      microSubniche = `${subniche} avançado`;
    }
  } else {
    microSubniche = `${subniche} especializado`;
  }
  
  return {
    niche: mainNiche,
    subniche: subniche,
    microSubniche: microSubniche
  };
};

/**
 * Estima o número ideal de blocos para um roteiro
 * @param scriptText Texto do roteiro
 * @returns Número recomendado de blocos
 */
export const estimateOptimalBlocksCount = (scriptText: string): number => {
  const wordCount = scriptText.split(/\s+/).length;
  
  // Lógica simplificada para determinar número de blocos
  if (wordCount < 300) return 3;
  if (wordCount < 600) return 4;
  if (wordCount < 900) return 5;
  if (wordCount < 1200) return 6;
  return 7;
};

/**
 * Estima o número ideal de caracteres por bloco
 * @param scriptText Texto do roteiro
 * @param blocksCount Número de blocos
 * @returns Número recomendado de caracteres por bloco
 */
export const estimateOptimalCharsPerBlock = (scriptText: string, blocksCount: number): number => {
  const totalChars = scriptText.length;
  const charsPerBlock = Math.ceil(totalChars / blocksCount);
  
  // Garantir que está dentro dos limites recomendados (300-800)
  if (charsPerBlock < 300) return 300;
  if (charsPerBlock > 800) return 800;
  
  return charsPerBlock;
};

/**
 * Identifica o tom predominante do roteiro
 */
export const identifyScriptTone = (scriptText: string): "emocional" | "apelativo" | "reflexivo" => {
  const normalizedText = scriptText.toLowerCase();
  
  // Palavras-chave associadas a cada tom
  const emotionalKeywords = ["sentimento", "emoção", "coração", "alma", "paixão", "amor", "tristeza", "alegria", "felicidade", "sonho"];
  const appealingKeywords = ["incrível", "surpreendente", "chocante", "inacreditável", "melhor", "exclusivo", "único", "revolucionário", "urgente", "limitado"];
  const reflectiveKeywords = ["pensar", "refletir", "considerar", "analisar", "questionar", "ponderar", "examinar", "avaliar", "meditar", "filosofar"];
  
  // Contar ocorrências de cada tipo
  let emotionalCount = 0;
  let appealingCount = 0;
  let reflectiveCount = 0;
  
  emotionalKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) emotionalCount += matches.length;
  });
  
  appealingKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) appealingCount += matches.length;
  });
  
  reflectiveKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}`, 'gi');
    const matches = normalizedText.match(regex);
    if (matches) reflectiveCount += matches.length;
  });
  
  // Determinar o tom predominante
  if (emotionalCount >= appealingCount && emotionalCount >= reflectiveCount) {
    return "emocional";
  } else if (appealingCount >= emotionalCount && appealingCount >= reflectiveCount) {
    return "apelativo";
  } else {
    return "reflexivo";
  }
};
