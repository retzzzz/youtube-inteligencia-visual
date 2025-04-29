
import { SupportedLanguage } from "../types";

/**
 * Comprehensive dictionary collections for translations between languages
 */
export type TranslationDictionary = Record<string, string>;

export const spanishToPortuguese: TranslationDictionary = {
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

export const englishToPortuguese: TranslationDictionary = {
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

export const frenchToPortuguese: TranslationDictionary = {
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
