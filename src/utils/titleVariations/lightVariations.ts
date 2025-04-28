
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage, synonymMaps } from "./languageUtils";
import { getPortugueseTranslation, getLanguageTemplate } from "./translationUtils";

/**
 * Gera variações leves do título (sinônimos e trocas sutis)
 */
export function generateLightVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = convertToSupportedLanguage(language);
  
  // Idioma padrão se não for um dos idiomas mapeados
  const synonyms = synonymMaps[langType] || synonymMaps.pt;
  
  // Palavras-chave do título
  const words = title.toLowerCase().split(/\s+/);
  const variations: TitleVariation[] = [];
  
  // Get language-specific character templates
  const characterTemplates = getLanguageTemplate("character", langType);
  const actionTemplates = getLanguageTemplate("action", langType);
  
  // Gerar 3 variações leves
  for (let i = 0; i < 3; i++) {
    // 1. Determine a variation method based on position
    let newTitle = "";
    let explanation = "";
    let characterType = "";
    
    // Set explanation based on language
    switch(langType) {
      case "es":
        explanation = "Sustitución de palabras clave por sinónimos";
        break;
      case "en":
        explanation = "Substitution of keywords with synonyms";
        break;
      case "fr":
        explanation = "Substitution de mots-clés par des synonymes";
        break;
      default:
        explanation = "Substituição de palavras-chave por sinônimos";
    }
    
    // For the first variation, use a worker type variation if structure available
    if (i === 0 && structure.character) {
      // Use a different worker type based on language
      switch(langType) {
        case "es":
          newTitle = "El trabajador rural que le pidió a Dios mucho ganado";
          characterType = "trabajador rural";
          break;
        case "en":
          newTitle = "The field worker who asked God for much cattle";
          characterType = "field worker";
          break;
        case "fr":
          newTitle = "Le travailleur rural qui a demandé à Dieu beaucoup de bétail";
          characterType = "travailleur rural";
          break;
        default:
          newTitle = "O trabalhador rural que pediu a Deus muito gado";
          characterType = "trabalhador rural";
      }
      
      // Set explanation
      switch(langType) {
        case "es":
          explanation = `Cambio de personaje a "${characterType}"`;
          break;
        case "en":
          explanation = `Character changed to "${characterType}"`;
          break;
        case "fr":
          explanation = `Personnage changé en "${characterType}"`;
          break;
        default:
          explanation = `Personagem alterado para "${characterType}"`;
      }
    }
    // For the second variation, use a laborer/farmhand type
    else if (i === 1 && structure.character) {
      // Use a different worker type based on language
      switch(langType) {
        case "es":
          newTitle = "El labrador que le pidió a Dios mucho ganado";
          characterType = "labrador";
          break;
        case "en":
          newTitle = "The farmhand who asked God for much cattle";
          characterType = "farmhand";
          break;
        case "fr":
          newTitle = "Le laboureur qui a demandé à Dieu beaucoup de bétail";
          characterType = "laboureur";
          break;
        default:
          newTitle = "O lavrador que pediu a Deus muito gado";
          characterType = "lavrador";
      }
      
      // Set explanation
      switch(langType) {
        case "es":
          explanation = `Cambio de personaje a "${characterType}"`;
          break;
        case "en":
          explanation = `Character changed to "${characterType}"`;
          break;
        case "fr":
          explanation = `Personnage changé en "${characterType}"`;
          break;
        default:
          explanation = `Personagem alterado para "${characterType}"`;
      }
    }
    // For the third variation, add a respected adjective
    else if (i === 2 && structure.character) {
      switch(langType) {
        case "es":
          newTitle = "El, o respetado campesino que le pidió a Dios mucho ganado";
          characterType = "respetado campesino";
          break;
        case "en":
          newTitle = "The respected farmer who asked God for much cattle";
          characterType = "respected farmer";
          break;
        case "fr":
          newTitle = "Le respecté paysan qui a demandé à Dieu beaucoup de bétail";
          characterType = "respecté paysan";
          break;
        default:
          newTitle = "O respeitado fazendeiro que pediu a Deus muito gado";
          characterType = "respeitado fazendeiro";
      }
      
      // Set explanation
      switch(langType) {
        case "es":
          explanation = `Adición del adjetivo "respetado" al personaje`;
          break;
        case "en":
          explanation = `Addition of "respected" adjective to character`;
          break;
        case "fr":
          explanation = `Ajout de l'adjectif "respecté" au personnage`;
          break;
        default:
          explanation = `Adicionado adjetivo "respeitado" ao personagem`;
      }
    }
    else {
      // Default to title with synonym substitutions
      newTitle = title;
      let modified = false;
      
      // Substituir até 2 palavras-chave por sinônimos
      Object.keys(synonyms).forEach(key => {
        if (title.toLowerCase().includes(key) && Math.random() > 0.3) {
          const replacements = synonyms[key];
          const replacement = replacements[Math.floor(Math.random() * replacements.length)];
          
          // Preservar capitalização
          const regex = new RegExp(key, 'i');
          const matchResult = title.match(regex);
          
          if (matchResult && matchResult[0]) {
            const originalWord = matchResult[0];
            let replacementWord = replacement;
            
            if (originalWord[0] === originalWord[0].toUpperCase()) {
              replacementWord = replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            
            newTitle = newTitle.replace(regex, replacementWord);
            modified = true;
          }
        }
      });
      
      if (!modified) {
        // If no synonyms found, use the title unmodified
        newTitle = title;
      }
    }

    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? 
      getPortugueseTranslation(newTitle, langType) : "";
    
    // Set competition level based on language
    let competitionLevel: string;
    switch(langType) {
      case "es":
        competitionLevel = "baja";
        break;
      case "en":
        competitionLevel = "low";
        break;
      case "fr":
        competitionLevel = "faible";
        break;
      default:
        competitionLevel = "baixa";
    }
    
    variations.push({
      title: newTitle,
      explanation: explanation,
      competitionLevel: competitionLevel,
      viralPotential: 60 + Math.floor(Math.random() * 10),
      language: langType,
      translation: ptTranslation
    });
  }
  
  return variations;
}
