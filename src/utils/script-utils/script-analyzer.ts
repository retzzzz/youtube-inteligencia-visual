
import { ScriptStats } from "@/hooks/script-generator/types";

/**
 * Calculate basic statistics about a script text
 */
export const calculateScriptStats = (text: string): ScriptStats => {
  return {
    charactersWithSpaces: text.length,
    charactersWithoutSpaces: text.replace(/\s/g, "").length,
    words: text.split(/\s+/).filter(word => word.length > 0).length,
    lines: text.split(/\r\n|\r|\n/).length,
  };
};

/**
 * Extract keywords from text, excluding common stopwords
 */
export const extractKeywords = (text: string, count: number): string[] => {
  const stopwords = ["de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "com", "não", "uma", "os", "no", "se", "na", "por", "mais", "as", "dos", "como", "mas"];
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopwords.includes(word));
  
  const wordFreq: {[key: string]: number} = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  return Object.keys(wordFreq)
    .sort((a, b) => wordFreq[b] - wordFreq[a])
    .slice(0, count);
};

/**
 * Calculate statistics from multiple content parts
 */
export const calculateStatsFromContent = (
  title: string, 
  hook: string, 
  intro: string, 
  blocks: { text: string; mini_cta?: string }[], 
  conclusion: string
): ScriptStats => {
  let fullText = title + " " + hook + " " + intro;
  
  blocks.forEach(block => {
    fullText += " " + block.text;
    if (block.mini_cta) {
      fullText += " " + block.mini_cta;
    }
  });
  
  fullText += " " + conclusion;
  
  return calculateScriptStats(fullText);
};
