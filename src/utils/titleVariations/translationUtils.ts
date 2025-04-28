
import { SupportedLanguage } from "./types";

/**
 * Função para gerar traduções para o português
 * Em um ambiente de produção, isto seria feito com uma API de tradução
 */
export function getPortugueseTranslation(text: string, sourceLanguage: SupportedLanguage): string {
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
