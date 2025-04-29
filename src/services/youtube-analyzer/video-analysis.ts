
/**
 * Main video analysis service
 */
import { extractVideoId } from './utils/extractors';
import { fetchVideoData, extractBasicInfo } from './video-data';
import { analyzeSaturation } from './saturation-analysis';
import { generateTranslations } from './translation-utils';
import { generateScriptIdeas } from './content-generators/script-ideas';
import { generateImagePrompts, generateSupportImagePrompts } from './content-generators/image-prompts';
import { generateTitleVariations } from './content-generators/title-variations';
import { generateSubNicheIdeas } from './content-generators/sub-niche-ideas';
import { VideoAnalysis } from '@/types/youtube-types';

/**
 * Main function to analyze a YouTube video
 * @param videoUrl YouTube video URL
 * @param apiKey YouTube API key
 * @returns Promise that resolves to VideoAnalysis object
 */
export const analyzeYoutubeVideo = async (videoUrl: string, apiKey: string): Promise<VideoAnalysis> => {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error("URL de vídeo inválido");
  }

  try {
    // Fetch basic video data
    const video = await fetchVideoData(videoId, apiKey);
    const basicInfo = extractBasicInfo(video);
    
    // Analyze saturation
    const saturation = await analyzeSaturation(basicInfo.title, apiKey);
    
    // Generate content suggestions
    const translations = generateTranslations(
      basicInfo.title,
      basicInfo.description,
      basicInfo.language
    );
    
    const scriptIdeas = generateScriptIdeas(basicInfo.title, basicInfo.language);
    const thumbnailPrompts = generateImagePrompts(basicInfo.title);
    const supportImagePrompts = generateSupportImagePrompts(basicInfo.title);
    const titleVariations = generateTitleVariations(basicInfo.title, basicInfo.language);
    const subNicheIdeas = generateSubNicheIdeas(basicInfo.title);
    
    // Return complete analysis
    return {
      basicInfo,
      translations,
      titleVariations,
      scriptIdeas,
      thumbnailPrompts,
      supportImagePrompts,
      subNicheIdeas,
      saturation
    };
    
  } catch (error) {
    console.error("Erro ao analisar vídeo:", error);
    throw new Error(`Falha ao analisar o vídeo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};
