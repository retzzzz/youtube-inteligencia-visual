
import { TitleVariation, SupportedLanguage, AllTitleVariations } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { generateLightVariations } from "./lightVariations";
import { generateMediumVariations } from "./mediumVariations";
import { generateBoldVariations } from "./boldVariations";
import { convertToSupportedLanguage } from "./languageUtils";
import { getPortugueseTranslation } from "./translationUtils";

/**
 * Gera todas as variações do título em três níveis
 */
export function generateAllVariationLevels(
  title: string,
  structure: TitleStructure,
  language: string = "pt"
): AllTitleVariations {
  return {
    light: generateLightVariations(title, structure, language),
    medium: generateMediumVariations(title, structure, language),
    bold: generateBoldVariations(title, structure, language)
  };
}

// Re-export all the necessary functions and types for backwards compatibility
export {
  generateLightVariations,
  generateMediumVariations, 
  generateBoldVariations,
  convertToSupportedLanguage,
  getPortugueseTranslation,
  type TitleVariation,
  type SupportedLanguage,
  type AllTitleVariations
};
