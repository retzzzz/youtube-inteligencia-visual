
/**
 * Functions for generating script ideas
 */
import { isSpanish, isEnglish, isFrench, isItalian } from '../translation-utils';

/**
 * Generates script ideas based on video title and language
 * @param title Video title
 * @param language Video language
 * @returns Array of script ideas
 */
export function generateScriptIdeas(title: string, language: string): string[] {
  // Determine base language for ideas
  const baseLanguage = isSpanish(language) ? 'es' : 
                     isEnglish(language) ? 'en' :
                     isFrench(language) ? 'fr' : 
                     isItalian(language) ? 'it' : 'pt';
  
  // Ideas base in Portuguese
  const ptIdeas = [
    `História pessoal: Minha jornada com ${title} e como isso mudou minha perspectiva.`,
    `Análise aprofundada: Os 5 princípios fundamentais de ${title} que ninguém explica.`,
    `Guia passo a passo: Como implementar ${title} em sua rotina diária.`,
    `Debate: Prós e contras de diferentes abordagens para ${title}.`,
    `Entrevista com especialista: Conversando com um profissional sobre ${title}.`
  ];
  
  // Ideas in Spanish
  const esIdeas = [
    `Historia personal: Mi jornada con ${title} y cómo cambió mi perspectiva.`,
    `Análisis profundo: Los 5 principios fundamentales de ${title} que nadie explica.`,
    `Guía paso a paso: Cómo implementar ${title} en tu rutina diaria.`,
    `Debate: Pros y contras de diferentes enfoques para ${title}.`,
    `Entrevista con un experto: Conversando con un profesional sobre ${title}.`
  ];
  
  // Ideas in English
  const enIdeas = [
    `Personal story: My journey with ${title} and how it changed my perspective.`,
    `Deep analysis: The 5 fundamental principles of ${title} that nobody explains.`,
    `Step-by-step guide: How to implement ${title} in your daily routine.`,
    `Debate: Pros and cons of different approaches to ${title}.`,
    `Expert interview: Talking with a professional about ${title}.`
  ];
  
  // Ideas in French
  const frIdeas = [
    `Histoire personnelle: Mon voyage avec ${title} et comment cela a changé ma perspective.`,
    `Analyse approfondie: Les 5 principes fondamentaux de ${title} que personne n'explique.`,
    `Guide étape par étape: Comment mettre en œuvre ${title} dans votre routine quotidienne.`,
    `Débat: Avantages et inconvénients de différentes approches pour ${title}.`,
    `Entretien avec un expert: Conversation avec un professionnel sur ${title}.`
  ];
  
  // Ideas in Italian
  const itIdeas = [
    `Storia personale: Il mio viaggio con ${title} e come ha cambiato la mia prospettiva.`,
    `Analisi approfondita: I 5 principi fondamentali di ${title} che nessuno spiega.`,
    `Guida passo passo: Come implementare ${title} nella tua routine quotidiana.`,
    `Dibattito: Pro e contro di diversi approcci a ${title}.`,
    `Intervista con un esperto: Conversazione con un professionista su ${title}.`
  ];
  
  let ideas: string[] = [];
  
  if (baseLanguage === 'es') {
    ideas = esIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
  } else if (baseLanguage === 'en') {
    ideas = enIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
  } else if (baseLanguage === 'fr') {
    ideas = frIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
  } else if (baseLanguage === 'it') {
    ideas = itIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
  } else {
    ideas = ptIdeas;
  }
  
  return ideas;
}
