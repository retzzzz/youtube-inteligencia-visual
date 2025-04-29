
import { SupportedLanguage } from "../types";

/**
 * Utility functions for light variations
 */

/**
 * Gets the appropriate competition level text based on language
 */
export function getCompetitionLevelByLanguage(language: SupportedLanguage): string {
  switch(language) {
    case "es": return "baja";
    case "en": return "low";
    case "fr": return "faible";
    default: return "baixa"; // pt
  }
}

/**
 * Gets the appropriate explanation text for synonym substitutions based on language
 */
export function getSynonymExplanationByLanguage(language: SupportedLanguage): string {
  switch(language) {
    case "es": return "Sustitución de palabras clave por sinónimos";
    case "en": return "Substitution of keywords with synonyms";
    case "fr": return "Substitution de mots-clés par des synonymes";
    default: return "Substituição de palavras-chave por sinônimos";
  }
}
