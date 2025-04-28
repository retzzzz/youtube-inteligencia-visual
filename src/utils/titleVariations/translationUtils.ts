
import { SupportedLanguage } from "./types";

/**
 * Comprehensive dictionary collections for translations between languages
 */
type TranslationDictionary = Record<string, string>;

const spanishToPortuguese: TranslationDictionary = {
  // Characters and roles
  "campesino": "fazendeiro",
  "El campesino": "O fazendeiro",
  "agricultor": "agricultor",
  "trabajador rural": "trabalhador rural",
  "granjero": "fazendeiro",
  "labrador": "lavrador",
  "jornalero": "diarista",
  "El agricultor": "O agricultor",
  "El trabajador rural": "O trabalhador rural",
  "El granjero": "O fazendeiro",
  "El labrador": "O lavrador",
  "El jornalero": "O diarista",
  "El humilde": "O humilde",
  "conocido": "conhecido",
  "respetado": "respeitado",
  "El respetado": "O respeitado",
  
  // Actions and objects
  "pidió": "pediu",
  "le pidió": "pediu",
  "que le pidió": "que pediu",
  "desafió": "desafiou",
  "que desafió": "que desafiou",
  "descubrió": "descobriu",
  "ganado": "gado",
  "mucho ganado": "muito gado",
  "divino": "divino",
  "Divino": "Divino",
  
  // Connectors and prepositions
  "a": "a",
  "que": "que",
  "cuando": "quando",
  "según": "segundo",
  "por las que": "pelos quais",
  "te sorprenderá": "te surpreenderá",
  "de los": "dos",
  "de la": "da",
  "con": "com",
  "en": "em",
  "para": "para",
  "y": "e",
  "o": "ou",
  "el": "o",
  "la": "a",
  "los": "os",
  "las": "as",
  "del": "do",
  
  // Religious/mystical terms
  "Dios": "Deus",
  "místico": "místico",
  "sagrados": "sagrados",
  "profecía": "profecia",
  "prohibido": "proibido",
  "secreto": "secreto",
  
  // Question patterns
  "¿": "",
  "?": "?",
  "Qué pasó cuando": "O que aconteceu quando",
  "Sabías que": "Você sabia que",
  "Te imaginas cómo": "Você imagina como",
  "Te imaginas": "Você imagina",
  "como": "como",
  "cómo": "como",
  
  // List patterns
  "razones": "motivos",
  "motivos": "motivos",
  
  // Number words
  "10": "10",
  "5": "5",
  "7": "7",
  "3": "3",
  
  // Special terms
  "milenars": "milenares",
  "dos milenars": "dos milenares"
};

const englishToPortuguese: TranslationDictionary = {
  // Characters and roles
  "farmer": "fazendeiro",
  "The farmer": "O fazendeiro",
  "peasant": "camponês",
  "countryman": "homem do campo",
  "field worker": "trabalhador rural",
  "farmhand": "trabalhador rural",
  "The peasant": "O camponês",
  "The countryman": "O homem do campo",
  "The field worker": "O trabalhador rural",
  "The farmhand": "O trabalhador rural",
  "the humble": "o humilde",
  "humble": "humilde",
  "known": "conhecido",
  "respected": "respeitado",
  "The respected": "O respeitado",
  
  // Actions and objects
  "asked": "pediu",
  "who asked": "que pediu",
  "that asked": "que pediu",
  "challenged": "desafiou",
  "that challenged": "que desafiou",
  "discovered": "descobriu",
  "cattle": "gado",
  "many cattle": "muito gado",
  "much cattle": "muito gado",
  "divine": "divino",
  "Divine": "Divino",
  
  // Connectors and prepositions
  "to": "a",
  "for": "para",
  "that": "que",
  "who": "que",
  "when": "quando",
  "according to": "segundo",
  "why": "por que",
  "will surprise you": "te surpreenderá",
  "of the": "dos",
  "with": "com",
  "in": "em",
  "and": "e",
  "or": "ou",
  "the": "o",
  
  // Religious/mystical terms
  "God": "Deus",
  "mystical": "místico",
  "sacred": "sagrado",
  "prophecy": "profecia",
  "forbidden": "proibido",
  "secret": "secreto",
  
  // Question patterns
  "What happened when": "O que aconteceu quando",
  "Did you know that": "Você sabia que",
  "Can you imagine how": "Você imagina como",
  "Can you imagine": "Você imagina",
  "how": "como",
  
  // List patterns
  "reasons": "motivos",
  
  // Number words
  "10": "10",
  "5": "5",
  "7": "7",
  "3": "3",
  
  // Special terms
  "millennial": "milenar",
  "of millennials": "dos milenares"
};

const frenchToPortuguese: TranslationDictionary = {
  // Characters and roles
  "paysan": "fazendeiro",
  "Le paysan": "O fazendeiro",
  "agriculteur": "agricultor",
  "cultivateur": "cultivador",
  "fermier": "fazendeiro",
  "laboureur": "lavrador",
  "L'agriculteur": "O agricultor",
  "Le fermier": "O fazendeiro",
  "Le laboureur": "O lavrador",
  "Le cultivateur": "O cultivador",
  "L'humble": "O humilde",
  "humble": "humilde",
  "connu": "conhecido",
  "respecté": "respeitado",
  "Le respecté": "O respeitado",
  
  // Actions and objects
  "demandé": "pediu",
  "a demandé": "pediu",
  "qui a demandé": "que pediu",
  "défié": "desafiou",
  "qui a défié": "que desafiou",
  "découvert": "descobriu",
  "bétail": "gado",
  "beaucoup de bétail": "muito gado",
  "divin": "divino",
  "Divin": "Divino",
  
  // Connectors and prepositions
  "à": "a",
  "que": "que",
  "qui": "que",
  "quand": "quando",
  "selon": "segundo",
  "pourquoi": "por que",
  "te surprendra": "te surpreenderá",
  "des": "dos",
  "avec": "com",
  "en": "em",
  "pour": "para",
  "et": "e",
  "ou": "ou",
  "le": "o",
  "la": "a",
  "les": "os",
  "du": "do",
  
  // Religious/mystical terms
  "Dieu": "Deus",
  "mystique": "místico",
  "sacrés": "sagrados",
  "prophétie": "profecia",
  "interdit": "proibido",
  "secret": "secreto",
  
  // Question patterns
  "Qu'est-ce qui s'est passé quand": "O que aconteceu quando",
  "Savais-tu que": "Você sabia que",
  "Peux-tu imaginer comment": "Você imagina como",
  "Peux-tu imaginer": "Você imagina",
  "comment": "como",
  
  // List patterns
  "raisons": "motivos",
  
  // Number words
  "10": "10",
  "5": "5",
  "7": "7",
  "3": "3",
  
  // Special terms
  "millénaire": "milenar",
  "des millénaires": "dos milenares"
};

/**
 * Fully translates a Spanish title to Portuguese using dictionary mapping and rules
 */
function translateSpanishToPortuguese(text: string): string {
  let translation = text;
  
  // Remove Spanish question marks if present
  translation = translation.replace(/¿/g, "").replace(/¡/g, "");
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(spanishToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, spanishToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Fully translates an English title to Portuguese using dictionary mapping and rules
 */
function translateEnglishToPortuguese(text: string): string {
  let translation = text;
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(englishToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, englishToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Fully translates a French title to Portuguese using dictionary mapping and rules
 */
function translateFrenchToPortuguese(text: string): string {
  let translation = text;
  
  // Translate phrase-by-phrase for more coherence
  Object.keys(frenchToPortuguese)
    .sort((a, b) => b.length - a.length) // Sort by length to replace longer phrases first
    .forEach(phrase => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translation = translation.replace(regex, frenchToPortuguese[phrase]);
    });
  
  return translation;
}

/**
 * Main function to generate Portuguese translations from different source languages
 */
export function getPortugueseTranslation(text: string, sourceLanguage: SupportedLanguage): string {
  if (sourceLanguage === "pt") return ""; // No translation needed
  
  if (sourceLanguage === "es") {
    return translateSpanishToPortuguese(text);
  } 
  else if (sourceLanguage === "en") {
    return translateEnglishToPortuguese(text);
  } 
  else if (sourceLanguage === "fr") {
    return translateFrenchToPortuguese(text);
  }
  
  // Fallback with warning
  return `[Tradução automática não disponível para ${sourceLanguage}] ${text}`;
}

/**
 * Ensures a title is fully in the target language
 */
export function ensureFullLanguageConsistency(title: string, language: SupportedLanguage): string {
  // This would contain more comprehensive logic in a production environment
  return title;
}

/**
 * Creates language-specific template strings to ensure consistency
 */
export function getLanguageTemplate(
  templateKey: string, 
  language: SupportedLanguage
): Record<string, string> {
  const templates: Record<string, Record<SupportedLanguage, Record<string, string>>> = {
    // Character templates
    "character": {
      "es": {
        "basic": "El campesino",
        "humble": "El humilde campesino",
        "respected": "El respetado campesino" 
      },
      "en": { 
        "basic": "The farmer",
        "humble": "The humble farmer",
        "respected": "The respected farmer"
      },
      "fr": {
        "basic": "Le paysan",
        "humble": "L'humble paysan",
        "respected": "Le respecté paysan"
      },
      "pt": {
        "basic": "O fazendeiro",
        "humble": "O humilde fazendeiro",
        "respected": "O respeitado fazendeiro"
      }
    },
    
    // Action templates
    "action": {
      "es": {
        "asked": "que le pidió a Dios mucho ganado",
        "challenged": "que desafió a Dios por ganado"
      },
      "en": {
        "asked": "who asked God for much cattle",
        "challenged": "who challenged God for cattle"
      },
      "fr": {
        "asked": "qui a demandé à Dieu beaucoup de bétail",
        "challenged": "qui a défié Dieu pour du bétail"
      },
      "pt": {
        "asked": "que pediu a Deus muito gado",
        "challenged": "que desafiou Deus por gado"
      }
    },
    
    // Question templates
    "question": {
      "es": {
        "did_you_know": "¿Sabías que El campesino que le pidió a Dios mucho ganado?",
        "what_happened": "¿Qué pasó cuando El campesino le pidió a Dios mucho ganado?"
      },
      "en": {
        "did_you_know": "Did you know that the farmer asked God for much cattle?",
        "what_happened": "What happened when the farmer asked God for much cattle?"
      },
      "fr": {
        "did_you_know": "Savais-tu que le paysan a demandé à Dieu beaucoup de bétail?",
        "what_happened": "Qu'est-ce qui s'est passé quand le paysan a demandé à Dieu beaucoup de bétail?"
      },
      "pt": {
        "did_you_know": "Você sabia que o fazendeiro pediu a Deus muito gado?",
        "what_happened": "O que aconteceu quando o fazendeiro pediu a Deus muito gado?"
      }
    },
    
    // List templates
    "list": {
      "es": {
        "reasons": "10 motivos por las que El campesino que le pidió te sorprenderá",
        "secrets": "5 secretos de El campesino que nadie te contó"
      },
      "en": {
        "reasons": "10 reasons why the farmer who asked will surprise you",
        "secrets": "5 secrets of the farmer that nobody told you"
      },
      "fr": {
        "reasons": "10 raisons pour lesquelles le paysan qui a demandé te surprendra",
        "secrets": "5 secrets du paysan que personne ne t'a dit"
      },
      "pt": {
        "reasons": "10 motivos pelos quais o fazendeiro que pediu te surpreenderá",
        "secrets": "5 segredos do fazendeiro que ninguém te contou"
      }
    },
    
    // Mystical templates
    "mystical": {
      "es": {
        "prophecy": "La profecía secreto de la ganado según El campesino que le pidió",
        "divine": "El campesino que le pidió divino e a ganado Divino"
      },
      "en": {
        "prophecy": "The secret prophecy of the cattle according to the farmer who asked",
        "divine": "The farmer who asked divine and the Divine cattle"
      },
      "fr": {
        "prophecy": "La prophétie secret de la bétail selon le paysan qui a demandé",
        "divine": "Le paysan qui a demandé divin et le bétail Divin"
      },
      "pt": {
        "prophecy": "A profecia secreto da gado segundo o fazendeiro que pediu",
        "divine": "O fazendeiro que pediu divino e o gado Divino"
      }
    },
    
    // Historical templates
    "historical": {
      "es": {
        "ancient": "Cuando el humilde El descubrió el ganado de los milenars",
        "legendary": "La leyenda ancestral de El campesino y el ganado sagrado"
      },
      "en": {
        "ancient": "When the humble farmer discovered the cattle of millennials",
        "legendary": "The ancient legend of the farmer and the sacred cattle"
      },
      "fr": {
        "ancient": "Quand l'humble paysan a découvert le bétail des millénaires",
        "legendary": "La légende ancestrale du paysan et du bétail sacré"
      },
      "pt": {
        "ancient": "Quando o humilde fazendeiro descobriu o gado dos milenares",
        "legendary": "A lenda ancestral do fazendeiro e o gado sagrado"
      }
    }
  };
  
  return templates[templateKey]?.[language] || {};
}
