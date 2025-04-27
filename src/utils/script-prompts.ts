
import { ScriptPrompts, TitleVariation, TopicGeneration, Introduction, Section, Duration } from "../types/script-generator-types";

const CHARS_PER_MINUTE = 800; // Approximate characters spoken per minute

export const scriptPrompts: ScriptPrompts = {
  generateTitleVariations: async (baseTitle: string): Promise<TitleVariation> => {
    // Implementation would connect to AI service
    // For now returning mock data
    return {
      original: baseTitle,
      variations: [
        `${baseTitle} (Revelado Hoje)`,
        `A Verdade Sobre ${baseTitle}`,
        `${baseTitle}: O Que Ninguém Te Conta`,
      ].filter(title => title.length <= 100)
    };
  },

  generateTopics: async (title: string, count: number): Promise<TopicGeneration> => {
    // Implementation would connect to AI service
    return {
      title,
      topicsCount: count,
      topics: [
        "Introdução ao conceito principal",
        "Contextualização histórica",
        "Aplicações práticas",
        "Exemplos do dia-a-dia",
        "Conclusões importantes"
      ].slice(0, count)
    };
  },

  generateIntroduction: async (title: string): Promise<Introduction> => {
    // Implementation would connect to AI service
    return {
      title,
      text: "Você já parou para pensar sobre isso? Hoje vamos explorar um tema que mudará sua perspectiva para sempre.",
      callToAction: "Deixe nos comentários sua experiência com esse tema"
    };
  },

  generateSection: async (topic: string, includeEngagement: boolean): Promise<Section> => {
    // Implementation would connect to AI service
    const baseContent = `Vamos falar sobre ${topic}. Este é um aspecto fundamental que precisa ser compreendido em profundidade.`;
    const engagement = includeEngagement ? "\n\nComente ▪️ se você concorda!" : "";
    
    return {
      topic,
      includeEngagement,
      content: baseContent + engagement
    };
  },

  estimateDuration: async (text: string): Promise<Duration> => {
    const characters = text.length;
    const estimatedMinutes = characters / CHARS_PER_MINUTE;
    
    return {
      characters,
      estimatedMinutes: Number(estimatedMinutes.toFixed(2))
    };
  }
};

export const PROMPT_TEMPLATES = {
  titleVariations: `
Receba:
  titulo_base: string
Etapas:
  1. Crie 3 variações únicas que mantenham estrutura e significado.
  2. Cada título ≤ 100 caracteres.
Retorne: [string]
  `,
  
  topics: `
Receba:
  titulo: string
  num_topicos: integer
Etapas:
  1. Liste 'num_topicos' frases curtas que cubram os subtemas do título.
  2. Mantenha coerência e progressão lógica.
Retorne: [string]
  `,
  
  introduction: `
Receba:
  titulo: string
Etapas:
  1. Escreva 2–3 frases de introdução ao tema.
  2. Inclua uma pergunta ou call-to-action para comentários.
Retorne: string
  `,
  
  section: `
Receba:
  topico: string
  incluir_engajamento: boolean
Etapas:
  1. Escreva um parágrafo explicativo sobre 'topico'.
  2. Se incluir_engajamento=true, adicione um convite a comentar no final.
Retorne: string
  `,
  
  duration: `
Receba:
  texto: string
Etapas:
  1. Conte caracteres de 'texto'.
  2. Calcule a duração aproximada em minutos (ex: 1 min ≈ 800 caracteres).
Retorne: { caracteres: integer, minutos_estimados: float }
  `
};
