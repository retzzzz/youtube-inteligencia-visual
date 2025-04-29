
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage } from "./languageUtils";
import { generateLightVariations as newGenerateLightVariations } from "./light";

/**
 * Gera variações leves do título (sinônimos e trocas sutis)
 * This file now acts as a facade to maintain compatibility with existing code
 */
export function generateLightVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = convertToSupportedLanguage(language);
  
  // Call the new implementation
  return newGenerateLightVariations(title, structure, langType);
}
