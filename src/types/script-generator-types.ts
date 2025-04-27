
export interface TitleVariation {
  original: string;
  variations: string[];
}

export interface TopicGeneration {
  title: string;
  topicsCount: number;
  topics: string[];
}

export interface Introduction {
  title: string;
  text: string;
  callToAction: string;
}

export interface Section {
  topic: string;
  includeEngagement: boolean;
  content: string;
}

export interface Duration {
  characters: number;
  estimatedMinutes: number;
}

export interface ScriptPrompts {
  generateTitleVariations: (baseTitle: string) => Promise<TitleVariation>;
  generateTopics: (title: string, count: number) => Promise<TopicGeneration>;
  generateIntroduction: (title: string) => Promise<Introduction>;
  generateSection: (topic: string, includeEngagement: boolean) => Promise<Section>;
  estimateDuration: (text: string) => Promise<Duration>;
}
