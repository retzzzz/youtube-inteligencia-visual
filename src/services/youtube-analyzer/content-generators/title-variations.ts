
/**
 * Functions for generating title variations
 */
import { isSpanish, isEnglish, isFrench, isItalian } from '../translation-utils';

/**
 * Generates title variations based on video title and language
 * @param title Video title
 * @param language Video language
 * @returns Object with different title variation categories
 */
export function generateTitleVariations(title: string, language: string) {
  // Determine base language for titles
  const baseLanguage = isSpanish(language) ? 'es' : 
                     isEnglish(language) ? 'en' :
                     isFrench(language) ? 'fr' : 
                     isItalian(language) ? 'it' : 'pt';
                     
  // Emotional titles in Portuguese
  const ptEmotional = [
    `Como ${title} mudou minha vida`,
    `O incrível segredo por trás de ${title}`,
    `A verdade chocante sobre ${title} que ninguém conta`,
    `Por que ${title} me fez chorar`,
    `A jornada inspiradora para descobrir ${title}`
  ];
  
  // Structural titles in Portuguese
  const ptStructural = [
    `7 maneiras de dominar ${title} em 30 dias`,
    `${title}: o guia definitivo para iniciantes`,
    `Você está fazendo ${title} errado? 5 erros comuns`,
    `Antes e depois: como ${title} transformou meus resultados`,
    `${title} explicado em apenas 5 minutos`
  ];
  
  // Titles in Spanish
  const esEmotional = [
    `Cómo ${title} cambió mi vida PT-BR: Como ${title} mudou minha vida`,
    `El increíble secreto detrás de ${title} PT-BR: O incrível segredo por trás de ${title}`,
    `La impactante verdad sobre ${title} que nadie te cuenta PT-BR: A verdade chocante sobre ${title} que ninguém conta`,
    `Por qué ${title} me hizo llorar PT-BR: Por que ${title} me fez chorar`,
    `El viaje inspirador para descubrir ${title} PT-BR: A jornada inspiradora para descobrir ${title}`
  ];
  
  const esStructural = [
    `7 formas de dominar ${title} en 30 días PT-BR: 7 maneiras de dominar ${title} em 30 dias`,
    `${title}: la guía definitiva para principiantes PT-BR: ${title}: o guia definitivo para iniciantes`,
    `¿Estás haciendo ${title} mal? 5 errores comunes PT-BR: Você está fazendo ${title} errado? 5 erros comuns`,
    `Antes y después: cómo ${title} transformó mis resultados PT-BR: Antes e depois: como ${title} transformou meus resultados`,
    `${title} explicado en solo 5 minutos PT-BR: ${title} explicado em apenas 5 minutos`
  ];
  
  // Titles in English
  const enEmotional = [
    `How ${title} changed my life PT-BR: Como ${title} mudou minha vida`,
    `The incredible secret behind ${title} PT-BR: O incrível segredo por trás de ${title}`,
    `The shocking truth about ${title} nobody tells you PT-BR: A verdade chocante sobre ${title} que ninguém conta`,
    `Why ${title} made me cry PT-BR: Por que ${title} me fez chorar`,
    `The inspiring journey to discover ${title} PT-BR: A jornada inspiradora para descobrir ${title}`
  ];
  
  const enStructural = [
    `7 ways to master ${title} in 30 days PT-BR: 7 maneiras de dominar ${title} em 30 dias`,
    `${title}: the ultimate guide for beginners PT-BR: ${title}: o guia definitivo para iniciantes`,
    `Are you doing ${title} wrong? 5 common mistakes PT-BR: Você está fazendo ${title} errado? 5 erros comuns`,
    `Before and after: how ${title} transformed my results PT-BR: Antes e depois: como ${title} transformou meus resultados`,
    `${title} explained in just 5 minutes PT-BR: ${title} explicado em apenas 5 minutos`
  ];
  
  // Select titles based on language
  let emotional, structural;
  if (baseLanguage === 'es') {
    emotional = esEmotional;
    structural = esStructural;
  } else if (baseLanguage === 'en') {
    emotional = enEmotional;
    structural = enStructural;
  } else {
    emotional = ptEmotional;
    structural = ptStructural;
  }
  
  // Multilingual always uses other languages
  const multilingual = [
    `[English] The ultimate guide to ${title} PT-BR: O guia definitivo para ${title}`,
    `[Español] Todo lo que necesitas saber sobre ${title} PT-BR: Tudo o que você precisa saber sobre ${title}`,
    `[Français] Les secrets de ${title} révélés PT-BR: Os segredos de ${title} revelados`,
    `[Italiano] Come padroneggiare ${title} in 30 giorni PT-BR: Como dominar ${title} em 30 dias`,
    `[Deutsch] ${title} leicht gemacht PT-BR: ${title} facilitado`
  ];

  return {
    emotional,
    structural,
    multilingual
  };
}
