
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage } from "./languageUtils";
import { getPortugueseTranslation, getLanguageTemplate } from "./translationUtils";

/**
 * Gera variações ousadas/subinichadas do título (inova mantendo o gancho)
 */
export function generateBoldVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = convertToSupportedLanguage(language);
  
  const variations: TitleVariation[] = [];
  
  // Get language templates
  const mysticalTemplates = getLanguageTemplate("mystical", langType);
  const historicalTemplates = getLanguageTemplate("historical", langType);
  
  // Language-specific competition levels
  const competitionLevels: Record<SupportedLanguage, {low: string, medium: string}> = {
    "es": {low: "baja", medium: "media"},
    "en": {low: "low", medium: "medium"},
    "fr": {low: "faible", medium: "moyenne"},
    "pt": {low: "baixa", medium: "média"}
  };
  
  // Language-specific explanations
  const explanations: Record<SupportedLanguage, {
    divine: string,
    ancient: string, 
    prophecy: string
  }> = {
    es: {
      divine: "Adición de elemento místico divino al personaje y objeto",
      ancient: "Incorporación de elemento histórico ancestral",
      prophecy: "Creación de narrativa profética con el personaje"
    },
    en: {
      divine: "Addition of divine mystical element to character and object",
      ancient: "Incorporation of ancestral historical element",
      prophecy: "Creation of prophetic narrative with the character"
    },
    fr: {
      divine: "Ajout d'élément mystique divin au personnage et objet",
      ancient: "Incorporation d'élément historique ancestral",
      prophecy: "Création de récit prophétique avec le personnage"
    },
    pt: {
      divine: "Adição de elemento místico divino ao personagem e objeto",
      ancient: "Incorporação de elemento histórico ancestral",
      prophecy: "Criação de narrativa profética com o personagem"
    }
  };
  
  const competitionLevel = competitionLevels[langType] || competitionLevels.pt;
  const explanationObj = explanations[langType] || explanations.pt;
  
  // Variação 1: Divino/Místico - "El campesino que le pidió divino e a ganado Divino"
  let divineTitle = mysticalTemplates.divine || "";
  
  if (!divineTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        divineTitle = "El campesino que le pidió divino e a ganado Divino";
        break;
      case "en":
        divineTitle = "The farmer who asked divine and the Divine cattle";
        break;
      case "fr":
        divineTitle = "Le paysan qui a demandé divin et le bétail Divin";
        break;
      default:
        divineTitle = "O fazendeiro que pediu divino e o gado Divino";
    }
  }
  
  // Adicionar tradução se não for português
  const divineTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(divineTitle, langType) : "";
    
  variations.push({
    title: divineTitle,
    explanation: explanationObj.divine,
    competitionLevel: competitionLevel.low,
    viralPotential: 85 + Math.floor(Math.random() * 10),
    language: langType,
    translation: divineTitleTranslation
  });
  
  // Variação 2: Histórico/Antigo - "Quando o humilde campesino descobriu o gado dos milenars"
  let ancientTitle = historicalTemplates.ancient || "";
  
  if (!ancientTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        ancientTitle = "Cuando el humilde El descubrió el ganado de los milenars";
        break;
      case "en":
        ancientTitle = "When the humble farmer discovered the cattle of millennials";
        break;
      case "fr":
        ancientTitle = "Quand l'humble paysan a découvert le bétail des millénaires";
        break;
      default:
        ancientTitle = "Quando o humilde fazendeiro descobriu o gado dos milenares";
    }
  }
  
  // Adicionar tradução se não for português
  const ancientTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(ancientTitle, langType) : "";
    
  variations.push({
    title: ancientTitle,
    explanation: explanationObj.ancient,
    competitionLevel: competitionLevel.medium,
    viralPotential: 90 + Math.floor(Math.random() * 5),
    language: langType,
    translation: ancientTitleTranslation
  });
  
  // Variação 3: Profecia - "La profecia secreto da ganado según El campesino que le pidió"
  let prophecyTitle = mysticalTemplates.prophecy || "";
  
  if (!prophecyTitle) {
    // Fallback if template is missing
    switch(langType) {
      case "es":
        prophecyTitle = "La profecía secreto de la ganado según El campesino que le pidió";
        break;
      case "en":
        prophecyTitle = "The secret prophecy of the cattle according to the farmer who asked";
        break;
      case "fr":
        prophecyTitle = "La prophétie secret de la bétail selon le paysan qui a demandé";
        break;
      default:
        prophecyTitle = "A profecia secreto da gado segundo o fazendeiro que pediu";
    }
  }
  
  // Adicionar tradução se não for português
  const prophecyTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(prophecyTitle, langType) : "";
    
  variations.push({
    title: prophecyTitle,
    explanation: explanationObj.prophecy,
    competitionLevel: competitionLevel.medium,
    viralPotential: 88 + Math.floor(Math.random() * 7),
    language: langType,
    translation: prophecyTitleTranslation
  });
  
  return variations;
}
