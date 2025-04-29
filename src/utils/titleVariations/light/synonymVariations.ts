
import { TitleVariation, SupportedLanguage } from "../types";
import { synonymMaps } from "../languageUtils";
import { getPortugueseTranslation } from "../translations/translators";

/**
 * Generates synonym-based title variations (light level)
 */
export function generateSynonymVariations(
  title: string,
  language: SupportedLanguage
): TitleVariation[] {
  // Idioma padrão se não for um dos idiomas mapeados
  const synonyms = synonymMaps[language] || synonymMaps.pt;
  const variations: TitleVariation[] = [];
  
  // Default explanation based on language
  let explanation: string;
  switch(language) {
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

  // Create a synonym variation
  let newTitle = title;
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
    // If no synonyms found, use the title with minimal changes
    // Add a minor change to avoid returning exactly the same title
    const words = title.split(' ');
    if (words.length > 3) {
      // Swap two words in the middle of the title
      const mid = Math.floor(words.length / 2);
      [words[mid], words[mid-1]] = [words[mid-1], words[mid]];
      newTitle = words.join(' ');
    }
  }

  // Add Portuguese translation if not in Portuguese
  const ptTranslation = language !== "pt" ? 
    getPortugueseTranslation(newTitle, language) : "";
  
  // Set competition level based on language
  let competitionLevel: string;
  switch(language) {
    case "es": competitionLevel = "baja"; break;
    case "en": competitionLevel = "low"; break;
    case "fr": competitionLevel = "faible"; break;
    default: competitionLevel = "baixa";
  }
  
  variations.push({
    title: newTitle,
    explanation: explanation,
    competitionLevel: competitionLevel,
    viralPotential: 60 + Math.floor(Math.random() * 10),
    language: language,
    translation: ptTranslation
  });
  
  return variations;
}
