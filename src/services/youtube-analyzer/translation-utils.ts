
/**
 * Utilities for content translation
 */

/**
 * Determines whether a language code represents Portuguese
 * @param language Language code
 * @returns Boolean indicating if language is Portuguese
 */
export function isPortuguese(language: string): boolean {
  return language.startsWith('pt');
}

/**
 * Determines whether a language code represents Spanish
 * @param language Language code
 * @returns Boolean indicating if language is Spanish
 */
export function isSpanish(language: string): boolean {
  return language.startsWith('es');
}

/**
 * Determines whether a language code represents English
 * @param language Language code
 * @returns Boolean indicating if language is English
 */
export function isEnglish(language: string): boolean {
  return language.startsWith('en');
}

/**
 * Determines whether a language code represents French
 * @param language Language code
 * @returns Boolean indicating if language is French
 */
export function isFrench(language: string): boolean {
  return language.startsWith('fr');
}

/**
 * Determines whether a language code represents Italian
 * @param language Language code
 * @returns Boolean indicating if language is Italian
 */
export function isItalian(language: string): boolean {
  return language.startsWith('it');
}

/**
 * Generates translations with PT-BR included
 * @param title Original title
 * @param description Original description
 * @param language Original language code
 * @returns Object with translations
 */
export function generateTranslations(title: string, description: string, language: string) {
  // Determine if original language is Portuguese
  const originalIsPortuguese = isPortuguese(language);
  const originalIsSpanish = isSpanish(language);
  const originalIsEnglish = isEnglish(language);
  const originalIsFrench = isFrench(language);
  const originalIsItalian = isItalian(language);
  
  // Example of title in Portuguese (to simulate translations)
  const titleInPortuguese = originalIsPortuguese 
    ? title 
    : `Tradução para português do título em ${originalIsEnglish ? 'inglês' : originalIsSpanish ? 'espanhol' : originalIsFrench ? 'francês' : 'italiano'}`;
  
  // Example of description in Portuguese
  const descriptionInPortuguese = originalIsPortuguese
    ? description
    : `Tradução para português da descrição em ${originalIsEnglish ? 'inglês' : originalIsSpanish ? 'espanhol' : originalIsFrench ? 'francês' : 'italiano'}`;
    
  const translations = {
    english: {
      title: originalIsEnglish 
        ? title 
        : `[English] ${title} PT-BR: ${titleInPortuguese}`,
      description: originalIsEnglish 
        ? description 
        : `This is a translation of the description to English. PT-BR: ${descriptionInPortuguese}`
    },
    spanish: {
      title: originalIsSpanish 
        ? title 
        : `[Español] ${title} PT-BR: ${titleInPortuguese}`,
      description: originalIsSpanish 
        ? description 
        : `Esta es una traducción de la descripción al español. PT-BR: ${descriptionInPortuguese}`
    },
    french: {
      title: originalIsFrench 
        ? title 
        : `[Français] ${title} PT-BR: ${titleInPortuguese}`,
      description: originalIsFrench 
        ? description 
        : `Ceci est une traduction de la description en français. PT-BR: ${descriptionInPortuguese}`
    },
    italian: {
      title: originalIsItalian 
        ? title 
        : `[Italiano] ${title} PT-BR: ${titleInPortuguese}`,
      description: originalIsItalian 
        ? description 
        : `Questa è una traduzione della descrizione in italiano. PT-BR: ${descriptionInPortuguese}`
    }
  };

  return translations;
}
