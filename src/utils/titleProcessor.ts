
import { TitleVariation } from "@/components/title-generator/TitleVariationDisplay";
import { ProcessedTitleData } from "@/components/title-generator/TitleProcessingResults";
import { TitleInputData } from "@/components/title-generator/TitleInputForm";
import { extrairTitulosConcorrentes, simularExtrairTitulosConcorrentes } from "./titleAnalysis";

/**
 * Extrai a estrutura básica de um título, identificando slots e componentes
 */
export const extractTitleStructure = (title: string) => {
  // Identificar padrões comuns em títulos
  const hasNumbers = /\d+/.test(title);
  const hasQuestion = /\?$/.test(title);
  const hasDash = /\s[-—]\s/.test(title);
  const hasColon = /:/.test(title);
  
  // Identificar sujeito e predicado (simplificado)
  const parts = title.split(/\s[-—:]\s|\?|:/);
  
  let subject = title;
  let predicate = "";
  
  if (parts.length > 1) {
    subject = parts[0].trim();
    predicate = parts.slice(1).join(" ").trim();
  } else {
    // Dividir aproximadamente ao meio para análise
    const words = title.split(" ");
    const midPoint = Math.floor(words.length / 2);
    subject = words.slice(0, midPoint).join(" ");
    predicate = words.slice(midPoint).join(" ");
  }
  
  // Identificar termos-chave potenciais (palavras não comuns)
  const commonWords = ["o", "a", "os", "as", "de", "da", "do", "das", "dos", "em", "para", "com", "que", "e", "é", "são"];
  const allWords = title.toLowerCase().split(/\W+/);
  const keywords = allWords.filter(word => 
    word.length > 3 && !commonWords.includes(word)
  );
  
  return {
    hasNumbers,
    hasQuestion,
    hasDash,
    hasColon,
    subject,
    predicate,
    keywords,
    structure: {
      beginning: subject,
      ending: predicate,
      pattern: hasDash ? "statement - hook" : 
               hasQuestion ? "question" :
               hasColon ? "statement: explanation" : "direct statement"
    }
  };
};

/**
 * Gera variações mantendo a estrutura do título
 */
export const generateStructureVariations = (
  titleStructure: ReturnType<typeof extractTitleStructure>,
  emotion: string,
  language: string
): TitleVariation[] => {
  // Aqui implementaríamos uma lógica complexa ou chamaríamos uma API
  // Por enquanto, vamos simular com variações pré-definidas
  
  const variations: TitleVariation[] = [];
  const { subject, predicate, structure, hasQuestion, hasDash } = titleStructure;
  
  // Variação 1: Sinônimos para palavras-chave
  if (language === "pt") {
    variations.push({
      title: subject + (hasDash ? " — " : hasQuestion ? "? " : " ") + 
             "você não vai acreditar no que aconteceu depois",
      explanation: "Mantive o início e adicionei um hook de curiosidade forte no final",
      competitionLevel: "baixa",
      viralPotential: 85
    });
  } else if (language === "es") {
    variations.push({
      title: subject + (hasDash ? " — " : hasQuestion ? "? " : " ") + 
             "no creerás lo que pasó después",
      explanation: "Mantuve el comienzo y añadí un gancho de curiosidad fuerte al final",
      competitionLevel: "baixa",
      viralPotential: 85
    });
  } else {
    variations.push({
      title: subject + (hasDash ? " — " : hasQuestion ? "? " : " ") + 
             "you won't believe what happened next",
      explanation: "Kept the beginning and added a strong curiosity hook at the end",
      competitionLevel: "baixa",
      viralPotential: 85
    });
  }
  
  // Variação 2: Inversão da estrutura
  if (hasDash || predicate) {
    if (language === "pt") {
      variations.push({
        title: "O inacreditável momento em que " + subject.toLowerCase() + " " + predicate,
        explanation: "Inverti a estrutura começando com uma promessa forte",
        competitionLevel: "média",
        viralPotential: 75
      });
    } else if (language === "es") {
      variations.push({
        title: "El increíble momento en que " + subject.toLowerCase() + " " + predicate,
        explanation: "Invertí la estructura empezando con una promesa fuerte",
        competitionLevel: "média",
        viralPotential: 75
      });
    } else {
      variations.push({
        title: "The unbelievable moment when " + subject.toLowerCase() + " " + predicate,
        explanation: "Inverted the structure starting with a strong promise",
        competitionLevel: "média", 
        viralPotential: 75
      });
    }
  }
  
  // Variação 3: Adicionar números
  if (!titleStructure.hasNumbers) {
    if (language === "pt") {
      variations.push({
        title: "3 segredos sobre " + subject + " que ninguém te contou",
        explanation: "Adicionei número para aumentar o apelo de listagem",
        competitionLevel: "alta",
        viralPotential: 65
      });
    } else if (language === "es") {
      variations.push({
        title: "3 secretos sobre " + subject + " que nadie te ha contado",
        explanation: "Agregué número para aumentar el atractivo del listado",
        competitionLevel: "alta",
        viralPotential: 65
      });
    } else {
      variations.push({
        title: "3 secrets about " + subject + " nobody told you about",
        explanation: "Added number to increase the list appeal",
        competitionLevel: "alta",
        viralPotential: 65
      });
    }
  }
  
  return variations;
};

/**
 * Gera variações com subnicho do termo-chave
 */
export const generateSubnicheVariations = (
  titleStructure: ReturnType<typeof extractTitleStructure>,
  emotion: string,
  language: string
): TitleVariation[] => {
  // Simulação básica de subnichos
  const keywords = titleStructure.keywords;
  if (keywords.length === 0) return [];
  
  const variations: TitleVariation[] = [];
  const mainKeyword = keywords[0];
  
  // Mapeamento de termos para subnichos
  const subnicheMap: Record<string, string[]> = {
    // Português
    "milionário": ["investidor bem-sucedido", "empresário de sucesso", "trader profissional"],
    "dinheiro": ["investimentos", "patrimônio", "ativos financeiros"],
    "saúde": ["bem-estar", "longevidade", "saúde mental"],
    "dieta": ["nutrição", "alimentação low-carb", "dieta cetogênica"],
    "exercício": ["treinamento funcional", "musculação", "yoga"],
    
    // Inglês
    "millionaire": ["successful investor", "business tycoon", "professional trader"],
    "money": ["investments", "wealth", "financial assets"],
    "health": ["wellness", "longevity", "mental health"],
    "diet": ["nutrition", "low-carb eating", "keto diet"],
    "exercise": ["functional training", "strength training", "yoga"],
    
    // Espanhol
    "millonario": ["inversor exitoso", "empresario de éxito", "trader profesional"],
    "dinero": ["inversiones", "patrimonio", "activos financieros"],
    "salud": ["bienestar", "longevidad", "salud mental"],
    "dieta": ["nutrición", "alimentación baja en carbohidratos", "dieta cetogénica"],
    "ejercicio": ["entrenamiento funcional", "musculación", "yoga"]
  };
  
  // Encontrar subnichos para a palavra-chave principal
  let foundSubniches: string[] = [];
  
  for (const key of keywords) {
    if (key.toLowerCase() in subnicheMap) {
      foundSubniches = subnicheMap[key.toLowerCase()];
      break;
    }
  }
  
  // Se não encontrou nenhum subnicho, criar genéricos
  if (foundSubniches.length === 0) {
    if (language === "pt") {
      foundSubniches = ["especializado", "avançado", "profissional"];
    } else if (language === "es") {
      foundSubniches = ["especializado", "avanzado", "profesional"];
    } else {
      foundSubniches = ["specialized", "advanced", "professional"];
    }
  }
  
  // Gerar título para cada subnicho
  foundSubniches.forEach((subniche, index) => {
    const originalText = titleStructure.subject + " " + titleStructure.predicate;
    
    // Regex que procura a palavra-chave com case-insensitive
    const keywordRegex = new RegExp(mainKeyword, 'i');
    
    // Substitui a palavra-chave pelo subnicho
    const newTitle = originalText.replace(keywordRegex, subniche);
    
    variations.push({
      title: newTitle,
      explanation: `Substituí "${mainKeyword}" por "${subniche}" para atingir um público mais nichado`,
      competitionLevel: index === 0 ? "média" : index === 1 ? "baixa" : "baixa",
      viralPotential: 70 - (index * 10)
    });
  });
  
  return variations;
};

/**
 * Gera títulos totalmente novos mantendo a promessa central
 */
export const generateTotalInnovation = (
  titleStructure: ReturnType<typeof extractTitleStructure>,
  emotion: string,
  language: string
): TitleVariation[] => {
  // Aqui usaríamos a IA para gerar títulos radicalmente diferentes
  // mas vamos simular com templates pré-definidos
  
  const variations: TitleVariation[] = [];
  const keywords = titleStructure.keywords;
  
  if (keywords.length === 0) return [];
  
  // Extrair conceito central do título
  const mainConcept = keywords.join(" ");
  
  if (language === "pt") {
    variations.push({
      title: `A verdade oculta sobre ${mainConcept} que ninguém tem coragem de revelar`,
      explanation: "Título completamente novo focado em revelação e exclusividade",
      competitionLevel: "média",
      viralPotential: 90
    });
    
    variations.push({
      title: `Como eu descobri o segredo de ${mainConcept} e transformei minha vida em 30 dias`,
      explanation: "História pessoal com promessa de transformação rápida",
      competitionLevel: "alta",
      viralPotential: 75
    });
  } else if (language === "es") {
    variations.push({
      title: `La verdad oculta sobre ${mainConcept} que nadie se atreve a revelar`,
      explanation: "Título completamente nuevo enfocado en revelación y exclusividad",
      competitionLevel: "média",
      viralPotential: 90
    });
    
    variations.push({
      title: `Cómo descubrí el secreto de ${mainConcept} y transformé mi vida en 30 días`,
      explanation: "Historia personal con promesa de transformación rápida",
      competitionLevel: "alta",
      viralPotential: 75
    });
  } else {
    variations.push({
      title: `The hidden truth about ${mainConcept} that nobody dares to reveal`,
      explanation: "Completely new title focused on revelation and exclusivity",
      competitionLevel: "média",
      viralPotential: 90
    });
    
    variations.push({
      title: `How I discovered the secret of ${mainConcept} and transformed my life in 30 days`,
      explanation: "Personal story with promise of quick transformation",
      competitionLevel: "alta",
      viralPotential: 75
    });
  }
  
  return variations;
};

/**
 * Função principal para processar títulos baseado na entrada do usuário
 */
export const processTitleInput = async (
  inputData: TitleInputData,
  youtubeApiKey?: string
): Promise<ProcessedTitleData> => {
  // Extrair estrutura do título original
  const titleStructure = extractTitleStructure(inputData.originalTitle);
  
  // Dados processados
  const processedData: ProcessedTitleData = {
    originalTitle: inputData.originalTitle
  };
  
  // Aplicar estratégias selecionadas
  if (inputData.strategies.structureVariations) {
    processedData.structureVariations = generateStructureVariations(
      titleStructure,
      inputData.emotion,
      inputData.language
    );
  }
  
  if (inputData.strategies.keywordSubniche) {
    processedData.keywordSubniche = generateSubnicheVariations(
      titleStructure,
      inputData.emotion,
      inputData.language
    );
  }
  
  if (inputData.strategies.totalInnovation) {
    processedData.totalInnovation = generateTotalInnovation(
      titleStructure,
      inputData.emotion,
      inputData.language
    );
  }
  
  // Determinar a melhor variação baseado no potencial viral
  let bestVariation: TitleVariation | undefined;
  let highestPotential = 0;
  
  // Checar todas as variações para encontrar a melhor
  [
    ...(processedData.structureVariations || []),
    ...(processedData.keywordSubniche || []),
    ...(processedData.totalInnovation || [])
  ].forEach(variation => {
    if (variation.viralPotential > highestPotential) {
      highestPotential = variation.viralPotential;
      bestVariation = variation;
    }
  });
  
  if (bestVariation) {
    processedData.bestVariation = bestVariation;
  }
  
  return processedData;
};
