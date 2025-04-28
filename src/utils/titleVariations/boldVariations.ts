
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
    
    if (langType === "es") {
      boldTitle = `${structure.character} ${mysticAdj} y la ${capitalizedMysticAdj} ${structure.action?.split(" ").slice(-1)[0] || "historia"}`;
    } else if (langType === "en") {
      boldTitle = `${structure.character} the ${mysticAdj} and the ${objectAdj} ${structure.action?.split(" ").slice(-1)[0] || "story"}`;
    } else {
      boldTitle = `${structure.character} ${mysticAdj} e a ${structure.action?.split(" ").slice(-1)[0] || "história"} ${capitalizedMysticAdj}`;
    }
    
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
    const humbleWord = langType === "es" ? "humilde" : 
                        langType === "en" ? "humble" : "humilde";
    const discoveredWord = langType === "es" ? "descubrió" : 
                          langType === "en" ? "discovered" : "descobriu";
    const ofTheWord = langType === "es" ? "de los" : 
                      langType === "en" ? "of the" : "dos";
                      
    if (langType === "es") {
      legendaryTitle = `Cuando el ${humbleWord} ${structure.character.split(" ")[0]} ${discoveredWord} el ${structure.action.split(" ").slice(-1)[0]} ${ofTheWord} ${randomLegendWord}s`;
    } else if (langType === "en") {
      legendaryTitle = `When the ${humbleWord} ${structure.character.split(" ")[0]} ${discoveredWord} the ${randomLegendWord} ${structure.action.split(" ").slice(-1)[0]}`;
    } else {
      legendaryTitle = `Quando o ${humbleWord} ${structure.character.split(" ")[0]} ${discoveredWord} o ${structure.action.split(" ").slice(-1)[0]} ${ofTheWord} ${randomLegendWord}s`;
    }
  } else {
    const storyWord = langType === "es" ? "historia" : 
                      langType === "en" ? "story" : "história";
    const ofWord = langType === "es" ? "de" : 
                  langType === "en" ? "of" : "de";
    
    legendaryTitle = `A ${storyWord} ${randomLegendWord} ${ofWord} ${title}`;
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
    
    if (langType === "es") {
      mysteryTitle = `La profecía ${randomMysteryWord} de la ${actionKeyword} según ${structure.character}`;
    } else if (langType === "en") {
      mysteryTitle = `The ${randomMysteryWord} prophecy of the ${actionKeyword} according to ${structure.character}`;
    } else {
      mysteryTitle = `A profecia ${randomMysteryWord} da ${actionKeyword} segundo ${structure.character}`;
    }
  } else {
    if (langType === "es") {
      mysteryTitle = `El secreto ${randomMysteryWord} detrás de ${title}`;
    } else if (langType === "en") {
      mysteryTitle = `The ${randomMysteryWord} secret behind ${title}`;
    } else {
      mysteryTitle = `O segredo ${randomMysteryWord} por trás de ${title}`;
    }
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
