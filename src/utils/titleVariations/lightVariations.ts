
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage, synonymMaps } from "./languageUtils";
import { getPortugueseTranslation } from "./translationUtils";

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
  
  // Gerar 3 variações leves
  for (let i = 0; i < 3; i++) {
    let newTitle = title;
    let explanation = "";
    let modified = false;
    
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
      // Se nenhuma palavra-chave foi encontrada, faz mudanças mínimas
      if (structure.character) {
        const characterParts = structure.character.split(" ");
        if (characterParts.length > 1) {
          const adjectiveMap: Record<SupportedLanguage, string[]> = {
            "es": ["famoso", "conocido", "respetado", "humilde", "honesto"],
            "en": ["famous", "known", "respected", "humble", "honest"],
            "fr": ["célèbre", "connu", "respecté", "humble", "honnête"],
            "pt": ["famoso", "conhecido", "respeitado", "humilde", "honesto"]
          };
          
          const structureMap: Record<SupportedLanguage, (firstName: string, adj: string, restName: string) => string> = {
            "es": (first, adj, rest) => `${first}, el ${adj} ${rest}`,
            "en": (first, adj, rest) => `${first}, the ${adj} ${rest}`,
            "fr": (first, adj, rest) => `${first}, le ${adj} ${rest}`,
            "pt": (first, adj, rest) => `${first}, o ${adj} ${rest}`
          };

          const adjectives = adjectiveMap[langType] || adjectiveMap.pt;
          const randomAdjective = adjectives[i % adjectives.length];
          const structureFn = structureMap[langType] || structureMap.pt;
          
          newTitle = newTitle.replace(
            structure.character, 
            structureFn(
              characterParts[0], 
              randomAdjective, 
              characterParts.slice(1).join(" ")
            )
          );
          
          // Update explanation based on language
          switch(langType) {
            case "es":
              explanation = `Adjetivo "${randomAdjective}" añadido al personaje`;
              break;
            case "en":
              explanation = `Adjective "${randomAdjective}" added to the character`;
              break;
            case "fr":
              explanation = `Adjectif "${randomAdjective}" ajouté au personnage`;
              break;
            default:
              explanation = `Adicionado adjetivo "${randomAdjective}" ao personagem`;
          }
        }
      }
    }

    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? getPortugueseTranslation(newTitle, langType) : "";
    
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
