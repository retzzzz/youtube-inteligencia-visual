
/**
 * Extract utilities for YouTube analyzer
 */

/**
 * Extracts the YouTube video ID from a URL
 * @param url The YouTube video URL
 * @returns The video ID or null if not found
 */
export function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}
