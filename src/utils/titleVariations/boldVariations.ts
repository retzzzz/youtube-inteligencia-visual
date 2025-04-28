
import { TitleVariation, SupportedLanguage } from "./types";
import { TitleStructure } from "../titleStructuralAnalysis";
import { convertToSupportedLanguage } from "./languageUtils";
import { getPortugueseTranslation } from "./translationUtils";

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
  
  // Subnichos específicos para diferentes temas
  const subniches: Record<SupportedLanguage, string[][]> = {
    pt: [
      ["místico", "celestial", "divino", "sobrenatural", "mágico"],
      ["lendário", "ancestral", "milenar", "profético", "sagrado"],
      ["secreto", "oculto", "proibido", "misterioso", "desconhecido"]
    ],
    es: [
      ["místico", "celestial", "divino", "sobrenatural", "mágico"],
      ["legendario", "ancestral", "milenario", "profético", "sagrado"],
      ["secreto", "oculto", "prohibido", "misterioso", "desconocido"]
    ],
    en: [
      ["mystical", "celestial", "divine", "supernatural", "magical"],
      ["legendary", "ancient", "millennial", "prophetic", "sacred"],
      ["secret", "hidden", "forbidden", "mysterious", "unknown"]
    ],
    fr: [
      ["mystique", "céleste", "divin", "surnaturel", "magique"],
      ["légendaire", "ancestral", "millénaire", "prophétique", "sacré"],
      ["secret", "caché", "interdit", "mystérieux", "inconnu"]
    ]
  };
  
  const subnichesList = subniches[langType] || subniches.pt;
  
  // Variação 1: Adjetivo místico para o personagem
  if (structure.character) {
    const mysticAdj = subnichesList[0][Math.floor(Math.random() * subnichesList[0].length)];
    const objectAdj = subnichesList[0][Math.floor(Math.random() * subnichesList[0].length)];
    
    // Adapta a capitalização
    const capitalizedMysticAdj = mysticAdj.charAt(0).toUpperCase() + mysticAdj.slice(1);
    let boldTitle = "";
    
    const templates: Record<SupportedLanguage, (character: string, mystic: string, capitalizedMystic: string, lastWord: string) => string> = {
      "es": (char, mystic, capMystic, lastWord) => `${char} ${mystic} y la ${capMystic} ${lastWord || "historia"}`,
      "en": (char, mystic, capMystic, lastWord) => `${char} the ${mystic} and the ${objectAdj} ${lastWord || "story"}`,
      "fr": (char, mystic, capMystic, lastWord) => `${char} ${mystic} et l'${capMystic} ${lastWord || "histoire"}`,
      "pt": (char, mystic, capMystic, lastWord) => `${char} ${mystic} e a ${lastWord || "história"} ${capMystic}`
    };
    
    const templateFn = templates[langType] || templates.pt;
    const lastActionWord = structure.action?.split(" ").slice(-1)[0] || "";
    
    boldTitle = templateFn(structure.character, mysticAdj, capitalizedMysticAdj, lastActionWord);
    
    // Adicionar tradução se não for português
    const boldTitleTranslation = langType !== "pt" ? 
      getPortugueseTranslation(boldTitle, langType) : "";
      
    variations.push({
      title: boldTitle,
      explanation: `Adição de elemento místico "${mysticAdj}" ao personagem e objeto`,
      competitionLevel: "baixa",
      viralPotential: 85 + Math.floor(Math.random() * 10),
      language: langType,
      translation: boldTitleTranslation
    });
  }
  
  // Variação 2: Referência a elemento lendário/ancestral
  const legendaryWords = subnichesList[1];
  const randomLegendWord = legendaryWords[Math.floor(Math.random() * legendaryWords.length)];
  
  let legendaryTitle = "";
  if (structure.character && structure.action) {
    const phraseMap: Record<SupportedLanguage, {
      humble: string;
      discovered: string;
      ofThe: string;
    }> = {
      "es": { humble: "humilde", discovered: "descubrió", ofThe: "de los" },
      "en": { humble: "humble", discovered: "discovered", ofThe: "of the" },
      "fr": { humble: "humble", discovered: "a découvert", ofThe: "des" },
      "pt": { humble: "humilde", discovered: "descobriu", ofThe: "dos" }
    };
    
    const phrases = phraseMap[langType] || phraseMap.pt;
    const characterFirstName = structure.character.split(" ")[0];
    const actionLastWord = structure.action.split(" ").slice(-1)[0];
                      
    const templates: Record<SupportedLanguage, (humble: string, char: string, discovered: string, action: string, ofThe: string, legendary: string) => string> = {
      "es": (humble, char, discovered, action, ofThe, legendary) => 
        `Cuando el ${humble} ${char} ${discovered} el ${action} ${ofThe} ${legendary}s`,
      "en": (humble, char, discovered, action, ofThe, legendary) => 
        `When the ${humble} ${char} ${discovered} the ${legendary} ${action}`,
      "fr": (humble, char, discovered, action, ofThe, legendary) => 
        `Quand le ${humble} ${char} ${discovered} le ${action} ${ofThe} ${legendary}s`,
      "pt": (humble, char, discovered, action, ofThe, legendary) => 
        `Quando o ${humble} ${char} ${discovered} o ${action} ${ofThe} ${legendary}s`
    };
    
    const templateFn = templates[langType] || templates.pt;
    legendaryTitle = templateFn(phrases.humble, characterFirstName, phrases.discovered, actionLastWord, phrases.ofThe, randomLegendWord);
  } else {
    const storyPhraseMap: Record<SupportedLanguage, {
      story: string;
      of: string;
    }> = {
      "es": { story: "historia", of: "de" },
      "en": { story: "story", of: "of" },
      "fr": { story: "histoire", of: "de" },
      "pt": { story: "história", of: "de" }
    };
    
    const phrases = storyPhraseMap[langType] || storyPhraseMap.pt;
    legendaryTitle = `A ${phrases.story} ${randomLegendWord} ${phrases.of} ${title}`;
  }
  
  // Adicionar tradução se não for português
  const legendaryTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(legendaryTitle, langType) : "";
    
  variations.push({
    title: legendaryTitle,
    explanation: `Adição de elemento lendário/ancestral "${randomLegendWord}"`,
    competitionLevel: "média",
    viralPotential: 90 + Math.floor(Math.random() * 5),
    language: langType,
    translation: legendaryTitleTranslation
  });
  
  // Variação 3: Elemento secreto/misterioso
  const mysteryWords = subnichesList[2];
  const randomMysteryWord = mysteryWords[Math.floor(Math.random() * mysteryWords.length)];
  
  let mysteryTitle = "";
  if (structure.action && structure.character) {
    const actionKeyword = structure.action.split(" ").slice(-1)[0];
    
    const templates: Record<SupportedLanguage, (mystery: string, action: string, character: string) => string> = {
      "es": (mystery, action, character) => `La profecía ${mystery} de la ${action} según ${character}`,
      "en": (mystery, action, character) => `The ${mystery} prophecy of the ${action} according to ${character}`,
      "fr": (mystery, action, character) => `La prophétie ${mystery} de la ${action} selon ${character}`,
      "pt": (mystery, action, character) => `A profecia ${mystery} da ${action} segundo ${character}`
    };
    
    const templateFn = templates[langType] || templates.pt;
    mysteryTitle = templateFn(randomMysteryWord, actionKeyword, structure.character);
  } else {
    const templates: Record<SupportedLanguage, (mystery: string, titleText: string) => string> = {
      "es": (mystery, titleText) => `El secreto ${mystery} detrás de ${titleText}`,
      "en": (mystery, titleText) => `The ${mystery} secret behind ${titleText}`,
      "fr": (mystery, titleText) => `Le secret ${mystery} derrière ${titleText}`,
      "pt": (mystery, titleText) => `O segredo ${mystery} por trás de ${titleText}`
    };
    
    const templateFn = templates[langType] || templates.pt;
    mysteryTitle = templateFn(randomMysteryWord, title);
  }
  
  // Adicionar tradução se não for português
  const mysteryTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(mysteryTitle, langType) : "";
    
  variations.push({
    title: mysteryTitle,
    explanation: `Adição de elemento misterioso/secreto "${randomMysteryWord}"`,
    competitionLevel: "média",
    viralPotential: 88 + Math.floor(Math.random() * 7),
    language: langType,
    translation: mysteryTitleTranslation
  });
  
  return variations;
}
