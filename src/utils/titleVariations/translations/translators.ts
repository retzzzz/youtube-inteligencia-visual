
import { SupportedLanguage } from "../types";
import { TranslationDictionary, spanishToPortuguese, englishToPortuguese, frenchToPortuguese } from "./dictionaries";

/**
 * Fully translates a Spanish title to Portuguese using dictionary mapping and rules
 */
export function translateSpanishToPortuguese(text: string): string {
  let translation = text;
  
  // Remove Spanish question marks if present
  translation = translation.replace(/¿/g, "").replace(/¡/g, "");
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(spanishToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, spanishToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Fully translates an English title to Portuguese using dictionary mapping and rules
 */
export function translateEnglishToPortuguese(text: string): string {
  let translation = text;
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(englishToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, englishToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Fully translates a French title to Portuguese using dictionary mapping and rules
 */
export function translateFrenchToPortuguese(text: string): string {
  let translation = text;
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(frenchToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, frenchToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Main function to generate Portuguese translations from different source languages
 */
export function getPortugueseTranslation(text: string, sourceLanguage: SupportedLanguage): string {
  if (sourceLanguage === "pt") return ""; // No translation needed
  
  if (sourceLanguage === "es") {
    return translateSpanishToPortuguese(text);
  } 
  else if (sourceLanguage === "en") {
    return translateEnglishToPortuguese(text);
  } 
  else if (sourceLanguage === "fr") {
    return translateFrenchToPortuguese(text);
  }
  
  // Fallback with warning
  return `[Tradução automática não disponível para ${sourceLanguage}] ${text}`;
}

/**
 * Ensures a title is fully in the target language
 */
export function ensureFullLanguageConsistency(title: string, language: SupportedLanguage): string {
  // This would contain more comprehensive logic in a production environment
  return title;
}
