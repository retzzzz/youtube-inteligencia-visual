
import { SupportedLanguage } from "../types";

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
