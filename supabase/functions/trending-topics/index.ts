
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_MOST_POPULAR_URL = "https://www.googleapis.com/youtube/v3/videos";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { region = 'BR' } = await req.json();
    
    console.log(`Fetching trending topics for region: ${region}`);
    
    // For demonstration - Mock trending topics if region is GLOBAL
    if (region === 'GLOBAL') {
      const mockGlobalTopics = [
        { title: "Inteligência Artificial", value: 450000, category: "Tecnologia" },
        { title: "Criptomoedas", value: 380000, category: "Finanças" },
        { title: "Desenvolvimento Web", value: 320000, category: "Tecnologia" },
        { title: "Marketing Digital", value: 290000, category: "Negócios" },
        { title: "Produção de Vídeos", value: 275000, category: "Mídia" },
        { title: "Monetização YouTube", value: 265000, category: "Conteúdo" },
        { title: "Edição de Vídeo", value: 245000, category: "Produção" },
        { title: "Growth Hacking", value: 220000, category: "Marketing" },
        { title: "Análise de Dados", value: 210000, category: "Tecnologia" },
        { title: "SEO YouTube", value: 190000, category: "Otimização" },
      ];
      
      return new Response(
        JSON.stringify({ 
          topics: mockGlobalTopics,
          source: "mockData",
          region: "GLOBAL" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use the YouTube Data API to get trending videos
    const youtubeApiKey = Deno.env.get('GEMINI_API_KEY'); // Using the existing API key slot
    
    if (!youtubeApiKey) {
      throw new Error("YouTube API key not configured");
    }
    
    // Set up region code parameter
    let geoParam = "";
    if (region === 'BR') {
      geoParam = "&regionCode=BR";
    } else if (region === 'US') {
      geoParam = "&regionCode=US";
    } else if (region === 'ES') {
      geoParam = "&regionCode=ES";
    }
    
    // Get trending videos from YouTube using most popular endpoint
    const youtubeUrl = `${YOUTUBE_MOST_POPULAR_URL}?part=snippet,statistics&chart=mostPopular&maxResults=15${geoParam}&key=${youtubeApiKey}`;
    
    console.log("Fetching data from YouTube API...");
    const response = await fetch(youtubeUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("YouTube API Error:", errorText);
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error("No trending videos found");
    }
    
    // Extract topics from video titles and categories
    const titleWords = data.items.flatMap(item => {
      const title = item.snippet.title || "";
      // Extract words with at least 4 characters that don't start with numbers
      return title.split(/\s+/)
        .filter(word => word.length > 4 && !/^\d/.test(word))
        .map(word => word.replace(/[,.;:!?()[\]{}'"]/g, ''))
        .filter(word => /^[A-Za-zÀ-ÿ]+$/.test(word));
    });
    
    // Count word frequency
    const wordCount = {};
    titleWords.forEach(word => {
      const lowerWord = word.toLowerCase();
      wordCount[lowerWord] = (wordCount[lowerWord] || 0) + 1;
    });
    
    // Extract top topics
    const topTopics = Object.entries(wordCount)
      .filter(([word, count]) => count > 1 && word.length > 4)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count], index) => {
        // Find videos related to this topic
        const relatedVideos = data.items
          .filter(item => item.snippet.title.toLowerCase().includes(word.toLowerCase()))
          .slice(0, 3)
          .map(item => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            views: parseInt(item.statistics?.viewCount || "0"),
            publishedAt: item.snippet.publishedAt
          }));
        
        return {
          title: word.charAt(0).toUpperCase() + word.slice(1),
          value: 10000 - (index * 500),
          category: "Trending",
          relatedVideos
        };
      });
      
    // If we couldn't extract good topics from titles, use videos directly
    if (topTopics.length < 5) {
      const videoTopics = data.items.slice(0, 10).map((item, index) => {
        const topic = {
          title: item.snippet.title.split(/[|\-:]/)[0].trim().slice(0, 30),
          value: 10000 - (index * 500),
          category: item.snippet.categoryId,
          relatedVideos: [{
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            views: parseInt(item.statistics?.viewCount || "0"),
            publishedAt: item.snippet.publishedAt
          }]
        };
        return topic;
      });
      
      return new Response(
        JSON.stringify({ 
          topics: videoTopics,
          region,
          source: "videos"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        topics: topTopics,
        region,
        source: "keywords" 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in trending-topics function:", error);
    
    // Provide fallback data when API fails
    const fallbackTopics = [
      { title: "YouTube Shorts", value: 9500, category: "Conteúdo" },
      { title: "Monetização", value: 9000, category: "Negócios" },
      { title: "Tutorial", value: 8500, category: "Educação" },
      { title: "Análise", value: 8000, category: "Opinião" },
      { title: "Reação", value: 7500, category: "Entretenimento" },
      { title: "Algoritmo", value: 7000, category: "Tecnologia" },
      { title: "Nicho", value: 6500, category: "Estratégia" },
      { title: "Crescimento", value: 6000, category: "Marketing" },
      { title: "Engajamento", value: 5500, category: "Métricas" },
      { title: "Thumbnail", value: 5000, category: "Design" }
    ];
    
    return new Response(
      JSON.stringify({ 
        topics: fallbackTopics,
        region: "fallback",
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
