
import { TitleVariation, SupportedLanguage } from "../types";
import { TitleStructure } from "../../titleStructuralAnalysis";
import { generateCharacterVariations } from "./characterVariations";
import { generateSynonymVariations } from "./synonymVariations";

/**
 * Gera variações leves do título (sinônimos e trocas sutis)
 */
export function generateLightVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = language as SupportedLanguage;
  const variations: TitleVariation[] = [];
  
  // Generate character variations if structure has character
  if (structure.character) {
    const characterVars = generateCharacterVariations(title, structure, langType);
    variations.push(...characterVars);
  }
  
  // Add synonym variations if we need more to reach 3 total variations
  if (variations.length < 3) {
    const synonymVars = generateSynonymVariations(title, langType);
    variations.push(...synonymVars);
  }
  
  // We want exactly 3 variations
  return variations.slice(0, 3);
}

// Re-export the utility functions for use elsewhere
export * from "./characterVariations";
export * from "./synonymVariations";
export * from "./utils";
