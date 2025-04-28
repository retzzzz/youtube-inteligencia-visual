
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
    const actionPhrase = langType === "es" ? 
      "que desafió a" : 
      langType === "en" ? 
      "that challenged" : 
      "que desafiou";
      
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
  const questionWords = langType === "es" ? 
    ["¿Qué pasó cuando", "¿Sabías que", "¿Te imaginas cómo"] : 
    langType === "en" ? 
    ["What happened when", "Did you know that", "Can you imagine how"] :
    ["O que aconteceu quando", "Você sabia que", "Você imagina como"];
  
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
  
  const reasons = langType === "es" ? 
    "razones por las que" : 
    langType === "en" ? 
    "reasons why" :
    "motivos pelos quais";
  
  const surprise = langType === "es" ? 
    "te sorprenderá" : 
    langType === "en" ? 
    "will surprise you" :
    "te surpreenderá";
    
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
