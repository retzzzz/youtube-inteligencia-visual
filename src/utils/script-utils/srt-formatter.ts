
import { ScriptBlock } from "@/hooks/script-generator/types";

/**
 * Format seconds to SRT time format
 */
export const formatSrtTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
};

/**
 * Convert script blocks to SRT format
 */
export const convertToSrt = (blocks: ScriptBlock[]): string => {
  let srt = "";
  let index = 1;
  let currentTime = 0;
  
  blocks.forEach(block => {
    const startTime = formatSrtTime(currentTime);
    currentTime += 10;
    const endTime = formatSrtTime(currentTime);
    
    srt += `${index}\n${startTime} --> ${endTime}\n${block.text}\n\n`;
    index++;
  });
  
  return srt;
};

/**
 * Convert remodeled script to SRT format
 */
export const convertRemodeledScriptToSrt = (
  title: string,
  hook: string,
  introduction: string,
  blocks: ScriptBlock[],
  conclusion: string
): string => {
  let srt = "";
  let index = 1;
  let currentTime = 0;
  
  const titleStartTime = formatSrtTime(currentTime);
  currentTime += 3;
  const titleEndTime = formatSrtTime(currentTime);
  srt += `${index}\n${titleStartTime} --> ${titleEndTime}\n${title}\n\n`;
  index++;
  
  const hookStartTime = formatSrtTime(currentTime);
  currentTime += 7;
  const hookEndTime = formatSrtTime(currentTime);
  srt += `${index}\n${hookStartTime} --> ${hookEndTime}\n${hook}\n\n`;
  index++;
  
  const introStartTime = formatSrtTime(currentTime);
  currentTime += 15;
  const introEndTime = formatSrtTime(currentTime);
  srt += `${index}\n${introStartTime} --> ${introEndTime}\n${introduction}\n\n`;
  index++;
  
  blocks.forEach(block => {
    const blockStartTime = formatSrtTime(currentTime);
    const blockDuration = Math.max(10, Math.ceil(block.text.length / 40));
    currentTime += blockDuration;
    const blockEndTime = formatSrtTime(currentTime);
    
    srt += `${index}\n${blockStartTime} --> ${blockEndTime}\n${block.text}\n\n`;
    index++;
    
    if (block.mini_cta) {
      const miniCtaStartTime = formatSrtTime(currentTime);
      currentTime += 5;
      const miniCtaEndTime = formatSrtTime(currentTime);
      
      srt += `${index}\n${miniCtaStartTime} --> ${miniCtaEndTime}\n${block.mini_cta}\n\n`;
      index++;
    }
  });
  
  const conclusionStartTime = formatSrtTime(currentTime);
  currentTime += 20;
  const conclusionEndTime = formatSrtTime(currentTime);
  srt += `${index}\n${conclusionStartTime} --> ${conclusionEndTime}\n${conclusion}\n\n`;
  
  return srt;
};
