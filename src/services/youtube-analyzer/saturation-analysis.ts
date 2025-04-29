
/**
 * Functions for analyzing content saturation
 */

/**
 * Analyzes content saturation for a given title
 * @param title Video title to analyze
 * @param apiKey YouTube API key
 * @returns Saturation analysis data
 */
export async function analyzeSaturation(title: string, apiKey: string) {
  // Get videos from the last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  
  const saturationResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title)}&type=video&publishedAfter=${encodeURIComponent(thirtyDaysAgo)}&key=${apiKey}`
  );
  
  const saturationData = await saturationResponse.json();
  const videoCount = saturationData.pageInfo?.totalResults || 0;
  
  let status: "high" | "medium" | "low";
  let message = "";
  
  if (videoCount > 20) {
    status = "high";
    message = "Alta saturação detectada";
  } else if (videoCount > 10) {
    status = "medium";
    message = "Saturação média detectada";
  } else {
    status = "low";
    message = "Baixa saturação, boa oportunidade";
  }
  
  return {
    status,
    message,
    count: videoCount
  };
}
