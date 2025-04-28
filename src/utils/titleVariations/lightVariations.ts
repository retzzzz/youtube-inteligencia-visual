
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
    let explanation = "Substituição de palavras-chave por sinônimos";
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
          explanation = `Adicionado adjetivo "${randomAdjective}" ao personagem`;
        }
      }
    }

    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? getPortugueseTranslation(newTitle, langType) : "";
    
    variations.push({
      title: newTitle,
      explanation: explanation,
      competitionLevel: "baixa",
      viralPotential: 60 + Math.floor(Math.random() * 10),
      language: langType,
      translation: ptTranslation
    });
  }
  
  return variations;
}
