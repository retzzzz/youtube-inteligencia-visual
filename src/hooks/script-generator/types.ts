
export interface ScriptStats {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
}

export interface ScriptBlock {
  text: string;
  imagePrompt?: string;
  mini_cta?: string;
}

export interface ScriptConfig {
  blocks: number;
  charactersPerBlock: number;
  targetDuration: number;
  ctaStyle: "emocional" | "apelativo" | "reflexivo" | null;
  generateMasterPrompt: boolean;
  generateImagePrompts: boolean;
  convertToSrt: boolean;
  processingType: "simple" | "remodel";
  language: "pt" | "en" | "es" | "de" | "fr";
  autoIdentifiedNiche?: {
    niche: string;
    subniche: string;
    microSubniche: string;
  };
}

export interface ProcessedScript {
  originalText: string;
  blocks: ScriptBlock[];
  stats: ScriptStats;
  masterPrompt?: string;
  srtContent?: string;
  remodeled?: {
    title?: string;
    hook?: string;
    introduction?: string;
    conclusion?: string;
  };
}

export interface TemplateSection {
  situacao: string[];
  conflito: string[];
  solucao: string[];
  pergunta: string[];
  promessa: string[];
}

export interface LanguageTemplates {
  [key: string]: TemplateSection;
}
