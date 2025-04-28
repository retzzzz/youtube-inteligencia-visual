
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
    // Language-specific templates for action-first variation
    const actionPhrases: Record<SupportedLanguage, string> = {
      "es": "que desafió a",
      "en": "that challenged",
      "fr": "qui a défié",
      "pt": "que desafiou"
    };
    
    // Language-specific explanations
    const explanations: Record<SupportedLanguage, string> = {
      "es": "Inversión de la estructura: Acción primero, luego personaje",
      "en": "Structure inversion: Action first, then character",
      "fr": "Inversion de structure: Action d'abord, puis personnage",
      "pt": "Inversão da estrutura: Ação primeiro, depois personagem"
    };
    
    // Language-specific competition levels
    const competitions: Record<SupportedLanguage, string> = {
      "es": "media",
      "en": "medium",
      "fr": "moyenne",
      "pt": "média"
    };
    
    const actionPhrase = actionPhrases[langType] || actionPhrases.pt;
    const invertedTitle = `${structure.action} ${actionPhrase} ${structure.character}`;
    
    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? 
      getPortugueseTranslation(invertedTitle, langType) : "";
    
    variations.push({
      title: invertedTitle,
      explanation: explanations[langType] || explanations.pt,
      competitionLevel: competitions[langType] || competitions.pt,
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
  
  // Language-specific explanations
  const questionExplanations: Record<SupportedLanguage, string> = {
    "es": "Transformación en pregunta para despertar curiosidad",
    "en": "Transformation into question to spark curiosity",
    "fr": "Transformation en question pour éveiller la curiosité",
    "pt": "Transformação em pergunta para despertar curiosidade"
  };
  
  // Language-specific competition levels
  const questionCompetitions: Record<SupportedLanguage, string> = {
    "es": "media",
    "en": "medium",
    "fr": "moyenne",
    "pt": "média"
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
    explanation: questionExplanations[langType] || questionExplanations.pt,
    competitionLevel: questionCompetitions[langType] || questionCompetitions.pt,
    viralPotential: 75 + Math.floor(Math.random() * 10),
    language: langType,
    translation: questionTitleTranslation
  });
  
  // Variação 3: Adicionar número
  const numbers = [3, 5, 7, 10];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
  // Language-specific templates for numbered lists
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
  
  // Language-specific explanations
  const numberExplanations: Record<SupportedLanguage, string> = {
    "es": "Adición de número para aumentar el atractivo clickbait",
    "en": "Addition of number to increase clickbait appeal",
    "fr": "Ajout de nombre pour augmenter l'attrait de clickbait",
    "pt": "Adição de número para aumentar o apelo clickbait"
  };
  
  // Language-specific competition levels
  const numberCompetitions: Record<SupportedLanguage, string> = {
    "es": "alta",
    "en": "high",
    "fr": "haute",
    "pt": "alta"
  };
  
  const reasons = reasonsMap[langType] || reasonsMap.pt;
  const surprise = surpriseMap[langType] || surpriseMap.pt;
  
  const numberTitle = `${randomNumber} ${reasons} ${structure.character || title} ${surprise}`;
  
  // Adicionar tradução se não for português
  const numberTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(numberTitle, langType) : "";
    
  variations.push({
    title: numberTitle,
    explanation: numberExplanations[langType] || numberExplanations.pt,
    competitionLevel: numberCompetitions[langType] || numberCompetitions.pt,
    viralPotential: 80 + Math.floor(Math.random() * 10),
    language: langType,
    translation: numberTitleTranslation
  });
  
  return variations;
}
