
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage } from "./languageUtils";
import { getPortugueseTranslation, getLanguageTemplate } from "./translationUtils";

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
  
  // Get language templates
  const questionTemplates = getLanguageTemplate("question", langType);
  const listTemplates = getLanguageTemplate("list", langType);
  
  // Language-specific competition levels
  const competitions: Record<SupportedLanguage, string> = {
    "es": "media",
    "en": "medium",
    "fr": "moyenne",
    "pt": "média"
  };
  
  // Variação 1: Transformar em pergunta usando "Você sabia que"
  // Use the appropriate language template for "Did you know" question
  let questionTitle = questionTemplates.did_you_know || "";
  
  if (!questionTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        questionTitle = "¿Sabías que El campesino que le pidió a Dios mucho ganado?";
        break;
      case "en":
        questionTitle = "Did you know that the farmer asked God for much cattle?";
        break;
      case "fr":
        questionTitle = "Savais-tu que le paysan a demandé à Dieu beaucoup de bétail?";
        break;
      default:
        questionTitle = "Você sabia que o fazendeiro pediu a Deus muito gado?";
    }
  }
  
  // Language-specific explanations
  const questionExplanations: Record<SupportedLanguage, string> = {
    "es": "Transformación en pregunta para despertar curiosidad",
    "en": "Transformation into question to spark curiosity",
    "fr": "Transformation en question pour éveiller la curiosité",
    "pt": "Transformação em pergunta para despertar curiosidade"
  };
  
  // Adicionar tradução se não for português
  const questionTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(questionTitle, langType) : "";
    
  variations.push({
    title: questionTitle,
    explanation: questionExplanations[langType] || questionExplanations.pt,
    competitionLevel: competitions[langType] || competitions.pt,
    viralPotential: 75 + Math.floor(Math.random() * 10),
    language: langType,
    translation: questionTitleTranslation
  });
  
  // Variação 2: Adicionar número usando template de lista
  let listTitle = listTemplates.reasons || "";
  
  if (!listTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        listTitle = "10 motivos por las que El campesino que le pidió te sorprenderá";
        break;
      case "en":
        listTitle = "10 reasons why the farmer who asked will surprise you";
        break; 
      case "fr":
        listTitle = "10 raisons pour lesquelles le paysan qui a demandé te surprendra";
        break;
      default:
        listTitle = "10 motivos pelos quais o fazendeiro que pediu te surpreenderá";
    }
  }
  
  // Language-specific explanations for numbered lists
  const numberExplanations: Record<SupportedLanguage, string> = {
    "es": "Adición de número para aumentar el atractivo clickbait",
    "en": "Addition of number to increase clickbait appeal",
    "fr": "Ajout de nombre pour augmenter l'attrait de clickbait",
    "pt": "Adição de número para aumentar o apelo clickbait"
  };
  
  // Adicionar tradução se não for português
  const listTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(listTitle, langType) : "";
    
  variations.push({
    title: listTitle,
    explanation: numberExplanations[langType] || numberExplanations.pt,
    competitionLevel: competitions[langType] || competitions.pt,
    viralPotential: 80 + Math.floor(Math.random() * 10),
    language: langType,
    translation: listTitleTranslation
  });
  
  // Variação 3: O que aconteceu quando... (What happened when...)
  let whatHappenedTitle = questionTemplates.what_happened || "";
  
  if (!whatHappenedTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        whatHappenedTitle = "¿Qué pasó cuando El campesino le pidió a Dios mucho ganado?";
        break;
      case "en":
        whatHappenedTitle = "What happened when the farmer asked God for much cattle?";
        break;
      case "fr":
        whatHappenedTitle = "Qu'est-ce qui s'est passé quand le paysan a demandé à Dieu beaucoup de bétail?";
        break;
      default:
        whatHappenedTitle = "O que aconteceu quando o fazendeiro pediu a Deus muito gado?";
    }
  }
  
  // Adicionar tradução se não for português
  const whatHappenedTranslation = langType !== "pt" ? 
    getPortugueseTranslation(whatHappenedTitle, langType) : "";
  
  // Language-specific explanation for "what happened" question
  const whatHappenedExplanations: Record<SupportedLanguage, string> = {
    "es": "Uso de la estructura de intriga para generar curiosidad",
    "en": "Use of intrigue structure to generate curiosity",
    "fr": "Utilisation de la structure d'intrigue pour générer la curiosité",
    "pt": "Uso da estrutura de intriga para gerar curiosidade"
  };
    
  variations.push({
    title: whatHappenedTitle,
    explanation: whatHappenedExplanations[langType] || whatHappenedExplanations.pt,
    competitionLevel: competitions[langType] || competitions.pt,
    viralPotential: 78 + Math.floor(Math.random() * 10),
    language: langType,
    translation: whatHappenedTranslation
  });
  
  return variations;
}
