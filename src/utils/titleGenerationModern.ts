
/**
 * Modern title generation utilities
 */
import { TitleVariation } from "@/components/title-generator/TitleVariationDisplay";

/**
 * Generates title variations based on keyword, language, and emotion
 * @param keyword The main keyword or topic
 * @param language The target language
 * @param emotion The desired emotional tone
 * @returns Array of title variations with different types and languages
 */
export const generateTitleVariations = (
  keyword: string,
  language: string,
  emotion: string
): TitleVariation[] => {
  const baseType = emotion === 'mix' ? ['dor', 'esperanca', 'curiosidade'] : [emotion];
  const baseSaturation = ['low', 'medium', 'high'];
  const titleVariations: TitleVariation[] = [];
  
  // Generate emotional variations
  for (const type of baseType) {
    for (const saturation of baseSaturation) {
      titleVariations.push({
        title: `${type.toUpperCase()}: ${keyword} (${saturation})`,
        text: `${type.toUpperCase()}: ${keyword} (${saturation})`,
        type: type as "dor" | "esperanca" | "curiosidade",
        saturation: saturation as "low" | "medium" | "high",
        language: language as "pt" | "es" | "en" | "fr"
      });
    }
  }
  
  // Add translations if requested
  if (language === 'auto') {
    const languages = ['pt', 'es', 'en', 'fr'];
    const defaultLanguage = 'pt';
    
    for (const variation of titleVariations) {
      variation.translations = languages
        .filter(lang => lang !== defaultLanguage)
        .map(lang => ({
          text: `[${lang.toUpperCase()}] ${variation.text}`,
          language: lang as "pt" | "es" | "en" | "fr"
        }));
    }
  }
  
  return titleVariations;
};
