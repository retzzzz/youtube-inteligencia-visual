
import { VideoResult } from "@/types/youtube-types";

// Utility functions used across multiple files

// Function to generate a random value within a range
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Common data arrays
export const languages = [
  "pt-BR", "en-US", "es-ES", "fr-FR", "de-DE", 
  "it-IT", "ja-JP", "ko-KR", "ru-RU", "zh-CN"
];

export const channelNames = [
  "TechMaster BR", "Dicas Diárias", "Game Play Total",
  "Análise Tech", "Tutoriais Incríveis", "Vídeos Virais",
  "Notícias Agora", "Entretenimento BR", "Educação Online",
  "Marketing Digital", "Viagens Incríveis", "Culinária Fácil"
];

// Verify if the title indicates a music video
export const isMusicVideo = (title: string, category?: string, tags?: string[]): boolean => {
  // Verificar categoria do YouTube (10 = Música)
  if (category === "10") return true;
  
  // Verificar palavras-chave comuns em vídeos musicais
  const musicKeywords = [
    "official video", "official music video", "lyrics", "music video",
    "official audio", "lyric video", "song", "música", "videoclipe",
    "official", "ft.", "feat", "featuring", "remix", "cover"
  ];
  
  const lowerTitle = title.toLowerCase();
  if (musicKeywords.some(keyword => lowerTitle.includes(keyword.toLowerCase()))) {
    return true;
  }
  
  // Verificar tags
  if (tags && tags.length > 0) {
    const musicTags = ["music", "song", "lyrics", "audio", "música"];
    if (tags.some(tag => musicTags.some(musicTag => tag.toLowerCase().includes(musicTag)))) {
      return true;
    }
  }
  
  return false;
};

// Generate a title for a video based on a keyword
export const generateVideoTitle = (keyword: string): string => {
  const prefixes = [
    "Como fazer", "Tutorial", "Análise", "Revisão de",
    "O melhor", "10 dicas para", "Guia completo", 
    "Aprenda", "Tudo sobre", "Descubra"
  ];
  
  const suffixes = [
    "em 2023", "- passo a passo", "que você precisa ver",
    "explicado", "definitivo", "para iniciantes",
    "profissional", "rápido", "fácil", "incrível"
  ];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${keyword} ${suffix}`;
};
