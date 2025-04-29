
import { TitleVariation, SupportedLanguage } from "../types";
import { TitleStructure } from "../../titleStructuralAnalysis";
import { getLanguageTemplate } from "../translations/templates";
import { getPortugueseTranslation } from "../translations/translators";

/**
 * Generates character-based title variations (light level)
 */
export function generateCharacterVariations(
  title: string,
  structure: TitleStructure,
  language: SupportedLanguage
): TitleVariation[] {
  const variations: TitleVariation[] = [];
  
  // Only generate if we have a character in the structure
  if (!structure.character) {
    return variations;
  }
  
  // Get language-specific character templates
  const characterTemplates = getLanguageTemplate("character", language);
  
  // 1. Worker type variation
  let characterType = "";
  let newTitle = "";
  let explanation = "";
  
  // Determine rural worker variation based on language
  switch(language) {
    case "es":
      newTitle = "El trabajador rural que le pidió a Dios mucho ganado";
      characterType = "trabajador rural";
      explanation = `Cambio de personaje a "${characterType}"`;
      break;
    case "en":
      newTitle = "The field worker who asked God for much cattle";
      characterType = "field worker";
      explanation = `Character changed to "${characterType}"`;
      break;
    case "fr":
      newTitle = "Le travailleur rural qui a demandé à Dieu beaucoup de bétail";
      characterType = "travailleur rural";
      explanation = `Personnage changé en "${characterType}"`;
      break;
    default: // pt
      newTitle = "O trabalhador rural que pediu a Deus muito gado";
      characterType = "trabalhador rural";
      explanation = `Personagem alterado para "${characterType}"`;
  }
  
  // Add Portuguese translation if not in Portuguese
  const ptTranslation = language !== "pt" ? getPortugueseTranslation(newTitle, language) : "";
  
  // Add to variations
  variations.push({
    title: newTitle,
    explanation: explanation,
    competitionLevel: getCompetitionLevelText(language),
    viralPotential: 60 + Math.floor(Math.random() * 10),
    language: language,
    translation: ptTranslation
  });
  
  // 2. Laborer/farmhand variation
  switch(language) {
    case "es":
      newTitle = "El labrador que le pidió a Dios mucho ganado";
      characterType = "labrador";
      explanation = `Cambio de personaje a "${characterType}"`;
      break;
    case "en":
      newTitle = "The farmhand who asked God for much cattle";
      characterType = "farmhand";
      explanation = `Character changed to "${characterType}"`;
      break;
    case "fr":
      newTitle = "Le laboureur qui a demandé à Dieu beaucoup de bétail";
      characterType = "laboureur";
      explanation = `Personnage changé en "${characterType}"`;
      break;
    default: // pt
      newTitle = "O lavrador que pediu a Deus muito gado";
      characterType = "lavrador";
      explanation = `Personagem alterado para "${characterType}"`;
  }
  
  // Add Portuguese translation if not in Portuguese
  const ptTranslation2 = language !== "pt" ? getPortugueseTranslation(newTitle, language) : "";
  
  // Add to variations
  variations.push({
    title: newTitle,
    explanation: explanation,
    competitionLevel: getCompetitionLevelText(language),
    viralPotential: 60 + Math.floor(Math.random() * 10),
    language: language,
    translation: ptTranslation2
  });
  
  // 3. Respected character variation
  switch(language) {
    case "es":
      newTitle = "El respetado campesino que le pidió a Dios mucho ganado";
      characterType = "respetado campesino";
      explanation = `Adición del adjetivo "respetado" al personaje`;
      break;
    case "en":
      newTitle = "The respected farmer who asked God for much cattle";
      characterType = "respected farmer";
      explanation = `Addition of "respected" adjective to character`;
      break;
    case "fr":
      newTitle = "Le respecté paysan qui a demandé à Dieu beaucoup de bétail";
      characterType = "respecté paysan";
      explanation = `Ajout de l'adjectif "respecté" au personnage`;
      break;
    default: // pt
      newTitle = "O respeitado fazendeiro que pediu a Deus muito gado";
      characterType = "respeitado fazendeiro";
      explanation = `Adicionado adjetivo "respeitado" ao personagem`;
  }
  
  // Add Portuguese translation if not in Portuguese
  const ptTranslation3 = language !== "pt" ? getPortugueseTranslation(newTitle, language) : "";
  
  // Add to variations
  variations.push({
    title: newTitle,
    explanation: explanation,
    competitionLevel: getCompetitionLevelText(language),
    viralPotential: 60 + Math.floor(Math.random() * 10),
    language: language,
    translation: ptTranslation3
  });
  
  return variations;
}

/**
 * Helper function to get competition level text based on language
 */
function getCompetitionLevelText(language: SupportedLanguage): string {
  switch(language) {
    case "es": return "baja";
    case "en": return "low";
    case "fr": return "faible";
    default: return "baixa";
  }
}
