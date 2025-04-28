
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage } from "./languageUtils";
import { getPortugueseTranslation } from "./translationUtils";

/**
 * Gera variações médias do título (mudar ordem, incluir número ou pergunta)
 */
export function generateMediumVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = convertToSupportedLanguage(language);
  
  const variations: TitleVariation[] = [];
  
  // Variação 1: Inverter a ordem (ação primeiro, depois personagem)
  if (structure.action && structure.character) {
    const actionPhrases: Record<SupportedLanguage, string> = {
      "es": "que desafió a",
      "en": "that challenged",
      "fr": "qui a défié",
      "pt": "que desafiou"
    };
    
    const actionPhrase = actionPhrases[langType] || actionPhrases.pt;
    const invertedTitle = `${structure.action} ${actionPhrase} ${structure.character}`;
    
    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? 
      getPortugueseTranslation(invertedTitle, langType) : "";
    
    variations.push({
      title: invertedTitle,
      explanation: "Inversão da estrutura: Ação primeiro, depois personagem",
      competitionLevel: "média",
      viralPotential: 70 + Math.floor(Math.random() * 15),
      language: langType,
      translation: ptTranslation
    });
  }
  
  // Variação 2: Transformar em pergunta
  const questionWordsMap: Record<SupportedLanguage, string[]> = {
    "es": ["¿Qué pasó cuando", "¿Sabías que", "¿Te imaginas cómo"],
    "en": ["What happened when", "Did you know that", "Can you imagine how"],
    "fr": ["Qu'est-ce qui s'est passé quand", "Savais-tu que", "Peux-tu imaginer comment"],
    "pt": ["O que aconteceu quando", "Você sabia que", "Você imagina como"]
  };
  
  const questionWords = questionWordsMap[langType] || questionWordsMap.pt;
  const questionWord = questionWords[Math.floor(Math.random() * questionWords.length)];
  const questionMark = langType === "es" ? "?" : "?";
  
  let questionTitle = "";
  if (structure.character && structure.action) {
    questionTitle = `${questionWord} ${structure.character} ${structure.action}${questionMark}`;
  } else {
    questionTitle = `${questionWord} ${title}${questionMark}`;
  }
  
  // Adicionar tradução se não for português
  const questionTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(questionTitle, langType) : "";
    
  variations.push({
    title: questionTitle,
    explanation: "Transformação em pergunta para despertar curiosidade",
    competitionLevel: "média",
    viralPotential: 75 + Math.floor(Math.random() * 10),
    language: langType,
    translation: questionTitleTranslation
  });
  
  // Variação 3: Adicionar número
  const numbers = [3, 5, 7, 10];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
  const reasonsMap: Record<SupportedLanguage, string> = {
    "es": "razones por las que",
    "en": "reasons why",
    "fr": "raisons pour lesquelles", 
    "pt": "motivos pelos quais"
  };
  
  const surpriseMap: Record<SupportedLanguage, string> = {
    "es": "te sorprenderá",
    "en": "will surprise you",
    "fr": "te surprendra",
    "pt": "te surpreenderá"
  };
  
  const reasons = reasonsMap[langType] || reasonsMap.pt;
  const surprise = surpriseMap[langType] || surpriseMap.pt;
  
  const numberTitle = `${randomNumber} ${reasons} ${structure.character || title} ${surprise}`;
  
  // Adicionar tradução se não for português
  const numberTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(numberTitle, langType) : "";
    
  variations.push({
    title: numberTitle,
    explanation: "Adição de número para aumentar o apelo clickbait",
    competitionLevel: "alta",
    viralPotential: 80 + Math.floor(Math.random() * 10),
    language: langType,
    translation: numberTitleTranslation
  });
  
  return variations;
}
