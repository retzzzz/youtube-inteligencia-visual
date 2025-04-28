
import { SupportedLanguage } from "./types";

/**
 * Helper function to convert any string language code to supported language type
 */
export function convertToSupportedLanguage(language: string): SupportedLanguage {
  if (language.startsWith('es')) return "es";
  if (language.startsWith('en')) return "en";
  if (language.startsWith('fr')) return "fr";
  return "pt"; // Default to Portuguese
}

/**
 * A map of synonym words for different languages
 */
export const synonymMaps: Record<SupportedLanguage, Record<string, string[]>> = {
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
