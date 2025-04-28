
import { TitleVariation } from "@/components/title-generator/TitleVariationDisplay";
import { TitleStructure } from "./titleStructuralAnalysis";

// Define the supported language types to match the interface
type SupportedLanguage = "pt" | "en" | "es" | "fr";

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
  
  const synonymMaps: Record<SupportedLanguage, Record<string, string[]>> = {
    pt: {
      'campesino': ['lavrador', 'agricultor', 'trabalhador rural', 'homem do campo'],
      'pizza': ['massa', 'torta', 'receita', 'prato'],
      'infinita': ['sem fim', 'eterna', 'interminável', 'ilimitada'],
      'história': ['relato', 'conto', 'narrativa', 'caso'],
      'incrível': ['surpreendente', 'impressionante', 'inacreditável', 'extraordinário']
    },
    es: {
      'campesino': ['labrador', 'granjero', 'agricultor', 'jornalero'],
      'pizza': ['masa', 'torta', 'receta', 'plato'],
      'infinita': ['sin fin', 'eterna', 'interminable', 'ilimitada'],
      'historia': ['relato', 'cuento', 'narración', 'caso'],
      'increíble': ['sorprendente', 'impresionante', 'extraordinario', 'asombroso']
    },
    en: {
      'farmer': ['peasant', 'countryman', 'field worker', 'farmhand'],
      'pizza': ['pie', 'dish', 'recipe', 'meal'],
      'infinite': ['endless', 'limitless', 'eternal', 'unending'],
      'story': ['tale', 'account', 'narrative', 'chronicle'],
      'incredible': ['amazing', 'astonishing', 'remarkable', 'astounding']
    },
    fr: {
      'paysan': ['agriculteur', 'cultivateur', 'fermier', 'laboureur'],
      'pizza': ['tarte', 'plat', 'recette', 'galette'],
      'infinie': ['sans fin', 'éternelle', 'interminable', 'illimitée'],
      'histoire': ['récit', 'conte', 'narration', 'chronique'],
      'incroyable': ['étonnant', 'impressionnant', 'remarquable', 'extraordinaire']
    }
  };
  
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
          const randomAdjective = langType === "es" ? 
            ["famoso", "conocido", "respetado", "humilde", "honesto"][i % 5] :
            langType === "en" ? 
            ["famous", "known", "respected", "humble", "honest"][i % 5] :
            ["famoso", "conhecido", "respeitado", "humilde", "honesto"][i % 5];

          newTitle = newTitle.replace(
            structure.character, 
            langType === "es" ? 
              `${characterParts[0]}, el ${randomAdjective} ${characterParts.slice(1).join(" ")}` :
            langType === "en" ? 
              `${characterParts[0]}, the ${randomAdjective} ${characterParts.slice(1).join(" ")}` :
              `${characterParts[0]}, o ${randomAdjective} ${characterParts.slice(1).join(" ")}`
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

/**
 * Gera variações médias do título (mudar ordem, incluir número ou pergunta)
 */
export function generateMediumVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  // Convert language to supported type
  const langType = convertToSupportedLanguage(language);
  
  const variations: TitleVariation[] = [];
  
  // Variação 1: Inverter a ordem (ação primeiro, depois personagem)
  if (structure.action && structure.character) {
    const actionPhrase = langType === "es" ? 
      "que desafió a" : 
      langType === "en" ? 
      "that challenged" : 
      "que desafiou";
      
    const invertedTitle = `${structure.action} ${actionPhrase} ${structure.character}`;
    
    // Adicionar tradução se não for português
    const ptTranslation = langType !== "pt" ? 
      getPortugueseTranslation(invertedTitle, langType) : "";
    
    variations.push({
      title: invertedTitle,
      explanation: "Inversão da estrutura: Ação primeiro, depois personagem",
      competitionLevel: "média",
      viralPotential: 70 + Math.floor(Math.random() * 15),
      language: langType,
      translation: ptTranslation
    });
  }
  
  // Variação 2: Transformar em pergunta
  const questionWords = langType === "es" ? 
    ["¿Qué pasó cuando", "¿Sabías que", "¿Te imaginas cómo"] : 
    langType === "en" ? 
    ["What happened when", "Did you know that", "Can you imagine how"] :
    ["O que aconteceu quando", "Você sabia que", "Você imagina como"];
  
  const questionWord = questionWords[Math.floor(Math.random() * questionWords.length)];
  const questionMark = langType === "es" ? "?" : "?";
  
  let questionTitle = "";
  if (structure.character && structure.action) {
    questionTitle = `${questionWord} ${structure.character} ${structure.action}${questionMark}`;
  } else {
    questionTitle = `${questionWord} ${title}${questionMark}`;
  }
  
  // Adicionar tradução se não for português
  const questionTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(questionTitle, langType) : "";
    
  variations.push({
    title: questionTitle,
    explanation: "Transformação em pergunta para despertar curiosidade",
    competitionLevel: "média",
    viralPotential: 75 + Math.floor(Math.random() * 10),
    language: langType,
    translation: questionTitleTranslation
  });
  
  // Variação 3: Adicionar número
  const numbers = [3, 5, 7, 10];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
  const reasons = langType === "es" ? 
    "razones por las que" : 
    langType === "en" ? 
    "reasons why" :
    "motivos pelos quais";
  
  const surprise = langType === "es" ? 
    "te sorprenderá" : 
    langType === "en" ? 
    "will surprise you" :
    "te surpreenderá";
    
  const numberTitle = `${randomNumber} ${reasons} ${structure.character || title} ${surprise}`;
  
  // Adicionar tradução se não for português
  const numberTitleTranslation = langType !== "pt" ? 
    getPortugueseTranslation(numberTitle, langType) : "";
    
  variations.push({
    title: numberTitle,
    explanation: "Adição de número para aumentar o apelo clickbait",
    competitionLevel: "alta",
    viralPotential: 80 + Math.floor(Math.random() * 10),
    language: langType,
    translation: numberTitleTranslation
  });
  
  return variations;
}

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

/**
 * Helper function to convert any string language code to supported language type
 */
function convertToSupportedLanguage(language: string): SupportedLanguage {
  if (language.startsWith('es')) return "es";
  if (language.startsWith('en')) return "en";
  if (language.startsWith('fr')) return "fr";
  return "pt"; // Default to Portuguese
}

/**
 * Função para gerar traduções para o português
 * Em um ambiente de produção, isto seria feito com uma API de tradução
 */
function getPortugueseTranslation(text: string, sourceLanguage: SupportedLanguage): string {
  if (sourceLanguage === "pt") return ""; // Se já é português, não traduz
  
  // Traduções básicas de espanhol para portugués
  if (sourceLanguage === "es") {
    // Mapeamento básico de palavras comuns espanhol -> português
    const translations: Record<string, string> = {
      "campesino": "fazendeiro",
      "pidió": "pediu",
      "Dios": "Deus",
      "mucho": "muito",
      "ganado": "gado",
      "cuando": "quando",
      "humilde": "humilde",
      "descubrió": "descobriu",
      "historia": "história",
      "secreto": "secreto",
      "detrás": "por trás",
      "razones": "motivos",
      "sorprenderá": "surpreenderá",
      "por las que": "pelos quais",
      "te": "te",
      "según": "segundo",
      "profecía": "profecia",
      "qué pasó": "o que aconteceu",
      "sabías que": "você sabia que",
      "te imaginas": "você imagina",
      "cómo": "como",
      "el": "o",
      "la": "a",
      "los": "os",
      "las": "as",
      "y": "e",
      "con": "com",
      "de": "de",
      "en": "em",
      "que": "que"
    };
    
    // Substituição básica de palavras
    let translation = text;
    
    // Primeiro tenta traduzir frases completas frequentes
    if (text.includes("¿Qué pasó cuando")) {
      translation = translation.replace("¿Qué pasó cuando", "O que aconteceu quando");
    }
    if (text.includes("¿Sabías que")) {
      translation = translation.replace("¿Sabías que", "Você sabia que");
    }
    if (text.includes("¿Te imaginas cómo")) {
      translation = translation.replace("¿Te imaginas cómo", "Você imagina como");
    }
    
    // Remove pontuação espanhola
    translation = translation.replace("¿", "").replace("¡", "");
    
    // Traduz palavra por palavra para frases específicas
    if (text.includes("El campesino que le pidió a Dios mucho ganado")) {
      return "O fazendeiro que pediu a Deus muito gado";
    }
    
    // Para outros casos, faz substituições palavra por palavra
    Object.keys(translations).forEach(spanishWord => {
      const regex = new RegExp(`\\b${spanishWord}\\b`, 'gi');
      translation = translation.replace(regex, translations[spanishWord]);
    });
    
    return translation;
  }
  
  // Traduções básicas de inglês para portugués
  if (sourceLanguage === "en") {
    // Mapeamento básico de palavras comuns inglês -> português
    const translations: Record<string, string> = {
      "farmer": "fazendeiro",
      "asked": "pediu",
      "God": "Deus", 
      "many": "muitos",
      "cattle": "gados",
      "when": "quando",
      "humble": "humilde",
      "discovered": "descobriu",
      "story": "história",
      "secret": "secreto",
      "behind": "por trás",
      "reasons": "motivos",
      "why": "por que",
      "will": "vai",
      "surprise": "surpreender",
      "you": "você",
      "according": "de acordo com",
      "prophecy": "profecia",
      "what happened": "o que aconteceu",
      "did you know": "você sabia",
      "can you imagine": "você consegue imaginar",
      "how": "como",
      "the": "o",
      "and": "e",
      "with": "com",
      "of": "de",
      "in": "em",
      "that": "que",
      "who": "quem"
    };
    
    // Substituição básica de palavras
    let translation = text;
    
    // Primeiro tenta traduzir frases completas frequentes
    if (text.includes("What happened when")) {
      translation = translation.replace("What happened when", "O que aconteceu quando");
    }
    if (text.includes("Did you know that")) {
      translation = translation.replace("Did you know that", "Você sabia que");
    }
    if (text.includes("Can you imagine how")) {
      translation = translation.replace("Can you imagine how", "Você consegue imaginar como");
    }
    
    // Para títulos específicos
    if (text.includes("The farmer who asked God for many cattle")) {
      return "O fazendeiro que pediu a Deus muito gado";
    }
    
    // Para outros casos, faz substituições palavra por palavra
    Object.keys(translations).forEach(englishWord => {
      const regex = new RegExp(`\\b${englishWord}\\b`, 'gi');
      translation = translation.replace(regex, translations[englishWord]);
    });
    
    return translation;
  }

  // Basic translations from French to Portuguese
  if (sourceLanguage === "fr") {
    // Basic mapping of common French -> Portuguese words
    const translations: Record<string, string> = {
      "paysan": "fazendeiro",
      "demandé": "pediu",
      "Dieu": "Deus",
      "beaucoup": "muito",
      "bétail": "gado",
      "quand": "quando",
      "humble": "humilde",
      "découvert": "descobriu",
      "histoire": "história",
      "secret": "secreto",
      "derrière": "por trás",
      "raisons": "motivos",
      "pourquoi": "por que",
      "surprendra": "surpreenderá",
      "tu": "você",
      "selon": "segundo",
      "prophétie": "profecia",
      "ce qui s'est passé": "o que aconteceu",
      "savais-tu que": "você sabia que",
      "peux-tu imaginer": "você consegue imaginar",
      "comment": "como",
      "le": "o",
      "la": "a",
      "les": "os",
      "et": "e",
      "avec": "com",
      "de": "de",
      "en": "em",
      "que": "que",
      "qui": "quem"
    };
    
    let translation = text;
    
    // Try to translate complete frequent phrases first
    if (text.includes("Ce qui s'est passé quand")) {
      translation = translation.replace("Ce qui s'est passé quand", "O que aconteceu quando");
    }
    
    // For specific titles
    if (text.includes("Le paysan qui a demandé à Dieu beaucoup de bétail")) {
      return "O fazendeiro que pediu a Deus muito gado";
    }
    
    // For other cases, make word-by-word substitutions
    Object.keys(translations).forEach(frenchWord => {
      const regex = new RegExp(`\\b${frenchWord}\\b`, 'gi');
      translation = translation.replace(regex, translations[frenchWord]);
    });
    
    return translation;
  }
  
  // Caso não consiga traduzir, retorna indicando que é uma tradução automática
  return `[Tradução automática] ${text}`;
}

/**
 * Gera todas as variações do título em três níveis
 */
export function generateAllVariationLevels(
  title: string,
  structure: TitleStructure,
  language: string = "pt"
): {
  light: TitleVariation[];
  medium: TitleVariation[];
  bold: TitleVariation[];
} {
  return {
    light: generateLightVariations(title, structure, language),
    medium: generateMediumVariations(title, structure, language),
    bold: generateBoldVariations(title, structure, language)
  };
}
