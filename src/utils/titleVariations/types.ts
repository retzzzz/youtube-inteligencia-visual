
// Define the supported language types
export type SupportedLanguage = "pt" | "en" | "es" | "fr";

// Import from TitleStructuralAnalysis to avoid circular dependencies
import { TitleStructure } from "../titleStructuralAnalysis";

// Base Title Variation interface 
export interface TitleVariation {
  title: string;
  explanation: string;
  competitionLevel: string;
  viralPotential: number;
  text?: string;
  type?: "dor" | "esperanca" | "curiosidade";
  saturation?: 'low' | 'medium' | 'high';
  language?: SupportedLanguage;
  translation?: string;
  translations?: Array<{
    text: string;
    language: SupportedLanguage;
  }>;
}

// Export the interface for the combination of all variations
export interface AllTitleVariations {
  light: TitleVariation[];
  medium: TitleVariation[];
  bold: TitleVariation[];
}
