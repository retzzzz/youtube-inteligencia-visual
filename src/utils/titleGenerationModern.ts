
/**
 * Modern title generation utilities
 */
import { TitleVariation } from "@/types/youtube-types";

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
      // Create a variation message based on emotion type and saturation
      const variationTitle = `${type.toUpperCase()}: ${keyword} (${saturation})`;
      
      // Generate dynamic explanation based on type and saturation
      let explanation = `Title variation using ${type} emotion with ${saturation} saturation.`;
      if (type === 'dor') {
        explanation = `Pain-point focused title highlighting the problem "${keyword}" with ${saturation} emotional intensity.`;
      } else if (type === 'esperanca') {
        explanation = `Hope-focused title presenting "${keyword}" as a solution with ${saturation} emotional appeal.`;
      } else if (type === 'curiosidade') {
        explanation = `Curiosity-triggering title about "${keyword}" with ${saturation} intrigue factor.`;
      }
      
      // Calculate competition level based on type and saturation
      let competitionLevel: "baixa" | "média" | "alta" = "média";
      if (type === 'curiosidade' && saturation === 'high') {
        competitionLevel = "alta";
      } else if (type === 'dor' && saturation === 'low') {
        competitionLevel = "baixa";
      }
      
      // Calculate viral potential based on emotion type and saturation
      let viralPotential = 50; // Default medium potential
      if (saturation === 'high') {
        viralPotential += 25;
      } else if (saturation === 'low') {
        viralPotential -= 15;
      }
      
      // Curiosity tends to be more viral
      if (type === 'curiosidade') {
        viralPotential += 10;
      }
      
      titleVariations.push({
        title: variationTitle,
        text: variationTitle,
        explanation,
        competitionLevel,
        viralPotential,
        type: type as "dor" | "esperanca" | "curiosidade",
        saturation: saturation as "low" | "medium" | "high",
        language: language as "pt" | "es" | "en" | "fr"
      });
    }
  }
  
  // Add translations if requested
  if (language === 'auto') {
    const languages = ['pt', 'es', 'en', 'fr'] as const;
    const defaultLanguage = 'pt';
    
    for (let i = 0; i < titleVariations.length; i++) {
      const variation = titleVariations[i];
      variation.translations = languages
        .filter(lang => lang !== defaultLanguage)
        .map(lang => ({
          text: `[${lang.toUpperCase()}] ${variation.title}`,
          language: lang
        }));
    }
  }
  
  return titleVariations;
};
