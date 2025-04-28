
import { TitleVariation } from "@/components/title-generator/TitleVariationDisplay";
import { TitleStructure } from "./titleStructuralAnalysis";

/**
 * Gera variações leves do título (sinônimos e trocas sutis)
 */
export function generateLightVariations(
  title: string, 
  structure: TitleStructure,
  language: string = "pt"
): TitleVariation[] {
  const synonymMaps: Record<string, Record<string, string[]>> = {
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
    }
  };
  
  // Idioma padrão se não for um dos idiomas mapeados
  const synonyms = synonymMaps[language] || synonymMaps.pt;
  
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
          const randomAdjective = ["famoso", "conhecido", "respeitado", "humilde", "honesto"][i % 5];
          newTitle = newTitle.replace(
            structure.character, 
            `${characterParts[0]}, o ${randomAdjective} ${characterParts.slice(1).join(" ")}`
          );
          explanation = `Adicionado adjetivo "${randomAdjective}" ao personagem`;
        }
      }
    }
    
    variations.push({
      title: newTitle,
      explanation: explanation,
      competitionLevel: "baixa",
      viralPotential: 60 + Math.floor(Math.random() * 10)
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
  const variations: TitleVariation[] = [];
  
  // Variação 1: Inverter a ordem (ação primeiro, depois personagem)
  if (structure.action && structure.character) {
    const invertedTitle = `${structure.action} que desafiou ${structure.character}`;
    variations.push({
      title: invertedTitle,
      explanation: "Inversão da estrutura: Ação primeiro, depois personagem",
      competitionLevel: "média",
      viralPotential: 70 + Math.floor(Math.random() * 15)
    });
  }
  
  // Variação 2: Transformar em pergunta
  const questionWords = language === "es" ? 
    ["¿Qué pasó cuando", "¿Sabías que", "¿Te imaginas cómo"] : 
    language === "en" ? 
    ["What happened when", "Did you know that", "Can you imagine how"] :
    ["O que aconteceu quando", "Você sabia que", "Você imagina como"];
  
  const questionWord = questionWords[Math.floor(Math.random() * questionWords.length)];
  const questionMark = language === "es" ? "?" : "?";
  
  let questionTitle = "";
  if (structure.character && structure.action) {
    questionTitle = `${questionWord} ${structure.character} ${structure.action}${questionMark}`;
  } else {
    questionTitle = `${questionWord} ${title}${questionMark}`;
  }
  
  variations.push({
    title: questionTitle,
    explanation: "Transformação em pergunta para despertar curiosidade",
    competitionLevel: "média",
    viralPotential: 75 + Math.floor(Math.random() * 10)
  });
  
  // Variação 3: Adicionar número
  const numbers = [3, 5, 7, 10];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
  const reasons = language === "es" ? 
    "razones por las que" : 
    language === "en" ? 
    "reasons why" :
    "motivos pelos quais";
  
  const numberTitle = `${randomNumber} ${reasons} ${structure.character || title} te surpreenderá`;
  
  variations.push({
    title: numberTitle,
    explanation: "Adição de número para aumentar o apelo clickbait",
    competitionLevel: "alta",
    viralPotential: 80 + Math.floor(Math.random() * 10)
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
  const variations: TitleVariation[] = [];
  
  // Subnichos específicos para diferentes temas
  const subniches: Record<string, string[][]> = {
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
    ]
  };
  
  const subnichesList = subniches[language as keyof typeof subniches] || subniches.pt;
  
  // Variação 1: Adjetivo místico para o personagem
  if (structure.character) {
    const mysticAdj = subnichesList[0][Math.floor(Math.random() * subnichesList[0].length)];
    const objectAdj = subnichesList[0][Math.floor(Math.random() * subnichesList[0].length)];
    
    // Adapta a capitalização
    const capitalizedMysticAdj = mysticAdj.charAt(0).toUpperCase() + mysticAdj.slice(1);
    let boldTitle = "";
    
    if (language === "es") {
      boldTitle = `${structure.character} ${mysticAdj} y la ${capitalizedMysticAdj} ${structure.action.split(" ").slice(-1)[0]}`;
    } else if (language === "en") {
      boldTitle = `${structure.character} the ${mysticAdj} and the ${objectAdj} ${structure.action.split(" ").slice(-1)[0]}`;
    } else {
      boldTitle = `${structure.character} ${mysticAdj} e a ${structure.action.split(" ").slice(-1)[0]} ${capitalizedMysticAdj}`;
    }
    
    variations.push({
      title: boldTitle,
      explanation: `Adição de elemento místico "${mysticAdj}" ao personagem e objeto`,
      competitionLevel: "baixa",
      viralPotential: 85 + Math.floor(Math.random() * 10)
    });
  }
  
  // Variação 2: Referência a elemento lendário/ancestral
  const legendaryWords = subnichesList[1];
  const randomLegendWord = legendaryWords[Math.floor(Math.random() * legendaryWords.length)];
  
  let legendaryTitle = "";
  if (structure.character && structure.action) {
    if (language === "es") {
      legendaryTitle = `Cuando el humilde ${structure.character.split(" ")[0]} descubrió el ${structure.action.split(" ").slice(-1)[0]} de los ${randomLegendWord}s`;
    } else if (language === "en") {
      legendaryTitle = `When the humble ${structure.character.split(" ")[0]} discovered the ${randomLegendWord} ${structure.action.split(" ").slice(-1)[0]}`;
    } else {
      legendaryTitle = `Quando o humilde ${structure.character.split(" ")[0]} descobriu o ${structure.action.split(" ").slice(-1)[0]} dos ${randomLegendWord}s`;
    }
  } else {
    legendaryTitle = `A história ${randomLegendWord} de ${title}`;
  }
  
  variations.push({
    title: legendaryTitle,
    explanation: `Adição de elemento lendário/ancestral "${randomLegendWord}"`,
    competitionLevel: "média",
    viralPotential: 90 + Math.floor(Math.random() * 5)
  });
  
  // Variação 3: Elemento secreto/misterioso
  const mysteryWords = subnichesList[2];
  const randomMysteryWord = mysteryWords[Math.floor(Math.random() * mysteryWords.length)];
  
  let mysteryTitle = "";
  if (structure.action && structure.character) {
    const actionKeyword = structure.action.split(" ").slice(-1)[0];
    
    if (language === "es") {
      mysteryTitle = `La profecía ${randomMysteryWord} de la ${actionKeyword} según ${structure.character}`;
    } else if (language === "en") {
      mysteryTitle = `The ${randomMysteryWord} prophecy of the ${actionKeyword} according to ${structure.character}`;
    } else {
      mysteryTitle = `A profecia ${randomMysteryWord} da ${actionKeyword} segundo ${structure.character}`;
    }
  } else {
    if (language === "es") {
      mysteryTitle = `El secreto ${randomMysteryWord} detrás de ${title}`;
    } else if (language === "en") {
      mysteryTitle = `The ${randomMysteryWord} secret behind ${title}`;
    } else {
      mysteryTitle = `O segredo ${randomMysteryWord} por trás de ${title}`;
    }
  }
  
  variations.push({
    title: mysteryTitle,
    explanation: `Adição de elemento misterioso/secreto "${randomMysteryWord}"`,
    competitionLevel: "média",
    viralPotential: 88 + Math.floor(Math.random() * 7)
  });
  
  return variations;
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
