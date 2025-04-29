
/**
 * Functions for fetching and processing basic video data
 */

/**
 * Formats video duration from ISO 8601 format
 * @param duration ISO 8601 duration string
 * @returns Formatted duration string
 */
export function formatDuration(duration: string): string {
  let formattedDuration = duration.replace('PT', '');
  formattedDuration = formattedDuration.replace('H', ':').replace('M', ':').replace('S', '');
  if (formattedDuration.endsWith(':')) formattedDuration = formattedDuration.slice(0, -1);
  return formattedDuration;
}

/**
 * Fetches basic video data from the YouTube API
 * @param videoId YouTube video ID
 * @param apiKey YouTube API key
 * @returns Promise that resolves to video data
 */
export async function fetchVideoData(videoId: string, apiKey: string) {
  const videoResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${apiKey}`
  );
  
  if (!videoResponse.ok) {
    const errorData = await videoResponse.json();
    throw new Error(`Erro na API do YouTube: ${errorData.error?.message || 'Erro desconhecido'}`);
  }
  
  const videoData = await videoResponse.json();
  
  if (!videoData.items || videoData.items.length === 0) {
    throw new Error("Vídeo não encontrado ou indisponível");
  }
  
  return videoData.items[0];
}

/**
 * Extracts basic info from video data
 * @param video Video data object
 * @returns Basic info object
 */
export function extractBasicInfo(video: any) {
  const snippet = video.snippet;
  const statistics = video.statistics;
  const contentDetails = video.contentDetails;
  
  // Formatar a duração do vídeo
  const duration = formatDuration(contentDetails.duration);
  
  // Detectar idioma do vídeo
  const language = snippet.defaultLanguage || snippet.defaultAudioLanguage || 'und'; // und = undefined
  
  // Extrair tags (se disponíveis)
  const tags = snippet.tags || [];
  
  return {
    title: snippet.title,
    description: snippet.description,
    views: parseInt(statistics.viewCount, 10),
    publishDate: new Date(snippet.publishedAt).toLocaleDateString(),
    language: language,
    duration: duration,
    category: snippet.categoryId,
    tags: tags
  };
}
