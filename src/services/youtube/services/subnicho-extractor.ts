
import { Canal, Subnicho } from '../types/channel-types';
import { fetchChannelData } from './channel-extractor';
import { extrairPalavrasChave } from '../utils/keyword-extractor';

export async function extrairSubnichos(
  nicho_principal: string,
  idioma: string,
  max_canais: number,
  apiKey: string
): Promise<Subnicho[]> {
  try {
    console.log(`Extraindo subnichos para '${nicho_principal}' em ${idioma} (máximo: ${max_canais} canais)`);
    
    // Buscar canais usando a API do YouTube
    const searchQuery = `${nicho_principal} ${idioma}`;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=channel&maxResults=${max_canais}&key=${apiKey}`;
    console.log("Buscando canais com URL:", searchUrl.replace(apiKey, "API_KEY_HIDDEN"));
    
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      throw new Error(`Falha ao buscar canais: ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();
    console.log(`Encontrados ${searchData.items?.length || 0} canais iniciais`);
    
    if (!searchData.items?.length) {
      return [];
    }
    
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId);
    const canais: Canal[] = [];
    
    // Processar cada canal individualmente
    for (const channelId of channelIds) {
      const canalData = await fetchChannelData(channelId, apiKey);
      if (canalData) {
        canais.push(canalData);
      }
    }
    
    console.log(`Processados com sucesso ${canais.length} canais`);
    
    // Agrupar canais por subnichos usando os títulos dos vídeos
    const subnichoMap = new Map<string, Canal[]>();
    
    canais.forEach(canal => {
      const palavrasChave = extrairPalavrasChave(canal.titulos_recentes);
      palavrasChave.forEach(subnicho => {
        if (!subnichoMap.has(subnicho)) {
          subnichoMap.set(subnicho, []);
        }
        subnichoMap.get(subnicho)?.push(canal);
      });
    });
    
    const resultado = Array.from(subnichoMap.entries()).map(([subnicho, canais]) => ({
      subnicho,
      canais_exemplos: canais
    }));
    
    console.log(`Identificados ${resultado.length} subnichos potenciais`);
    return resultado;
    
  } catch (error) {
    console.error("Erro ao extrair subnichos:", error);
    throw error;
  }
}
