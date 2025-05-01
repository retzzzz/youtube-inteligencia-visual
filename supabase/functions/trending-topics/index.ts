
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { region = 'BR' } = await req.json();
    
    console.log(`Fetching trending topics for region: ${region}`);
    
    // For demonstration - Mock trending topics if region is GLOBAL (since Google Trends API doesn't have a global endpoint)
    if (region === 'GLOBAL') {
      const mockGlobalTopics = [
        { title: "Tecnologia Emergente", value: 450000, category: "Tecnologia" },
        { title: "Inteligência Artificial", value: 380000, category: "Tecnologia" },
        { title: "Mudanças Climáticas", value: 320000, category: "Ciência" },
        { title: "Finanças Pessoais", value: 290000, category: "Finanças" },
        { title: "Desenvolvimento Web", value: 275000, category: "Tecnologia" },
        { title: "Saúde Mental", value: 265000, category: "Saúde" },
        { title: "Marketing Digital", value: 245000, category: "Negócios" },
        { title: "Produtividade", value: 220000, category: "Estilo de Vida" },
        { title: "Investimentos", value: 210000, category: "Finanças" },
        { title: "Design UX", value: 190000, category: "Tecnologia" },
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

    // Use the YouTube Data API to get trending videos - simpler than Google Trends API
    const youtubeApiKey = Deno.env.get('GEMINI_API_KEY'); // Reusing the Gemini API key slot
    
    if (!youtubeApiKey) {
      throw new Error("YouTube API key not configured");
    }
    
    // For Brazil or US
    let geoParam = "";
    if (region === 'BR') {
      geoParam = "&regionCode=BR";
    } else if (region === 'US') {
      geoParam = "&regionCode=US";
    }
    
    // Get trending videos from YouTube
    const youtubeUrl = `${YOUTUBE_API_BASE_URL}?part=snippet&maxResults=10&type=video&videoCategoryId=0&chart=mostPopular${geoParam}&key=${youtubeApiKey}`;
    
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
    
    // Transform YouTube response into our trending topics format
    const trendingTopics = data.items.map((item, index) => {
      // Extract useful information from each video
      return {
        title: item.snippet.title.split('|')[0].split('-')[0].split('(')[0].trim(),
        value: 10000 - (index * 1000), // Fake value for sorting/display
        category: item.snippet.categoryId,
        videoId: item.id.videoId || item.id,
        channelTitle: item.snippet.channelTitle,
        thumbnails: item.snippet.thumbnails,
        publishedAt: item.snippet.publishedAt
      };
    });
    
    // Sometimes YouTube titles can be very specific, so let's try to extract keywords as topics
    const topicsFromTitles = new Set();
    trendingTopics.forEach((video) => {
      const words = video.title.split(' ');
      
      // Extract potential topics (words with 4+ characters, max 3 words)
      if (words.length > 2) {
        const potentialTopic = words.slice(0, 3).join(' ');
        if (potentialTopic.length > 10) {
          topicsFromTitles.add(potentialTopic);
        }
      }
      
      // Look for important words
      words.forEach((word) => {
        if (word.length > 5 && /^[A-Za-zÀ-ú]+$/.test(word)) {
          topicsFromTitles.add(word);
        }
      });
    });
    
    // Combine extracted topics with trending videos
    const topics = Array.from(topicsFromTitles).slice(0, 10).map((topic, i) => {
      return {
        title: topic,
        value: 10000 - (i * 800),
        relatedVideos: trendingTopics.filter((video) => 
          video.title.toLowerCase().includes(topic.toLowerCase())
        ).slice(0, 3)
      };
    });
    
    return new Response(
      JSON.stringify({ 
        topics: topics.length > 0 ? topics : trendingTopics,
        region 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in trending-topics function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Falha ao buscar tópicos em alta",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
