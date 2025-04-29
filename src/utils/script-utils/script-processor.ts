
import { ScriptConfig, ScriptBlock, ProcessedScript, ScriptStats } from "@/hooks/script-generator/types";
import { calculateScriptStats, extractKeywords, calculateStatsFromContent } from "./script-analyzer";
import { generateTitle, generateHook, generateIntroduction, generateConclusion } from "./script-generator";
import { generateCTA, generateMiniCTA, generateImagePrompt, generateMasterPrompt } from "./script-formatter";
import { convertToSrt, convertRemodeledScriptToSrt } from "./srt-formatter";
import { remodelScriptBlock } from "./script-block-templates";

/**
 * Process a simple script by dividing it into blocks
 */
export const processSimpleScript = (text: string, config: ScriptConfig): ProcessedScript => {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const blocksCount = config.blocks;
  const wordsPerBlock = Math.ceil(words.length / blocksCount);
  
  const blocks: ScriptBlock[] = [];
  
  for (let i = 0; i < blocksCount; i++) {
    const startIdx = i * wordsPerBlock;
    const endIdx = Math.min(startIdx + wordsPerBlock, words.length);
    
    if (startIdx >= words.length) break;
    
    const blockText = words.slice(startIdx, endIdx).join(" ");
    
    blocks.push({
      text: blockText,
      imagePrompt: config.generateImagePrompts 
        ? generateImagePrompt(blockText) 
        : undefined
    });
  }
  
  if (config.ctaStyle) {
    const ctaText = generateCTA(config.ctaStyle);
    blocks.push({
      text: ctaText,
      imagePrompt: config.generateImagePrompts 
        ? "Professional content creator speaking directly to camera, warm lighting, emotional connection, call to action moment" 
        : undefined
    });
  }
  
  let srtContent: string | undefined = undefined;
  if (config.convertToSrt) {
    srtContent = convertToSrt(blocks);
  }
  
  return {
    originalText: text,
    blocks: blocks,
    stats: calculateScriptStats(text),
    masterPrompt: config.generateMasterPrompt 
      ? generateMasterPrompt(text) 
      : undefined,
    srtContent: srtContent
  };
};

/**
 * Remodel a script by generating new content based on the original
 */
export const remodelScript = (text: string, config: ScriptConfig): ProcessedScript => {
  const nicho = config.autoIdentifiedNiche?.niche || "Desenvolvimento Pessoal";
  const subnicho = config.autoIdentifiedNiche?.subniche || "Crescimento";
  const microSubnicho = config.autoIdentifiedNiche?.microSubniche || `${subnicho} especializado`;
  
  const titulo = generateTitle(nicho, subnicho, microSubnicho, config.language);
  
  const hook = generateHook(microSubnicho, config.language);
  
  const introducao = generateIntroduction(text, microSubnicho, config.language);
  
  const blocks: ScriptBlock[] = [];
  
  const keywords = extractKeywords(text, 10);
  
  for (let i = 0; i < config.blocks; i++) {
    const remodelado = remodelScriptBlock(
      keywords.join(" "),
      i + 1,
      config.blocks,
      microSubnicho,
      config.language
    );
    
    const miniCta = generateMiniCTA(i + 1, config.blocks, config.language);
    
    blocks.push({
      text: remodelado,
      mini_cta: miniCta,
      imagePrompt: config.generateImagePrompts 
        ? generateImagePrompt(remodelado) 
        : undefined
    });
  }
  
  const conclusao = generateConclusion(microSubnicho, config.ctaStyle, config.language);
  
  const newStats = calculateStatsFromContent(titulo, hook, introducao, blocks, conclusao);
  
  let srtContent: string | undefined = undefined;
  if (config.convertToSrt) {
    srtContent = convertRemodeledScriptToSrt(titulo, hook, introducao, blocks, conclusao);
  }
  
  return {
    originalText: text,
    blocks: blocks,
    stats: newStats,
    masterPrompt: config.generateMasterPrompt 
      ? generateMasterPrompt(text) 
      : undefined,
    srtContent: srtContent,
    remodeled: {
      title: titulo,
      hook: hook,
      introduction: introducao,
      conclusion: conclusao
    }
  };
};

/**
 * Process a script based on configuration
 */
export const processScript = (text: string, config: ScriptConfig): ProcessedScript => {
  if (config.processingType === "simple") {
    return processSimpleScript(text, config);
  } else {
    return remodelScript(text, config);
  }
};
