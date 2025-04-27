
import { Canal } from '../types/channel-types';

export async function fetchChannelData(channelId: string, apiKey: string): Promise<Canal | null> {
  try {
    // Buscar vídeos recentes do canal
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=5&key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      console.warn(`Não foi possível obter vídeos para o canal ${channelId}`);
      return null;
    }
    
    const videosData = await videosResponse.json();
    
    // Buscar detalhes do canal
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
    );
    
    if (!channelResponse.ok) {
      return null;
    }
    
    const channelData = await channelResponse.json();
    const channel = channelData.items[0];
    
    return {
      nome_do_canal: channel.snippet.title,
      data_de_criacao: channel.snippet.publishedAt,
      total_videos: parseInt(channel.statistics.videoCount || "0"),
      total_inscritos: parseInt(channel.statistics.subscriberCount || "0"),
      titulos_recentes: (videosData.items || []).map((video: any) => video.snippet.title)
    };
  } catch (error) {
    console.warn(`Erro ao processar canal ${channelId}:`, error);
    return null;
  }
}
