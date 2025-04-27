
import { Canal } from '../types/channel-types';
import { extrairSubnichos } from './subnicho-extractor';

export async function extrairCanaisPromissores(
  nicho_principal: string,
  idioma: string,
  max_canais: number,
  youtubeApiKey: string
): Promise<Canal[]> {
  try {
    const subnichos = await extrairSubnichos(nicho_principal, idioma, max_canais, youtubeApiKey);
    
    const canaisFlatList: Canal[] = [];
    subnichos.forEach(subnicho => {
      subnicho.canais_exemplos.forEach(canal => {
        if (!canaisFlatList.some(c => c.nome_do_canal === canal.nome_do_canal)) {
          canaisFlatList.push(canal);
        }
      });
    });
    
    const hoje = new Date();
    return canaisFlatList.filter(canal => {
      const dataCriacao = new Date(canal.data_de_criacao);
      const idadeMeses = (hoje.getFullYear() - dataCriacao.getFullYear()) * 12 + 
                        (hoje.getMonth() - dataCriacao.getMonth());
      
      const ratioInscritosVideos = canal.total_inscritos / (canal.total_videos || 1);
      
      return idadeMeses <= 6 && ratioInscritosVideos >= 100;
    });
  } catch (error) {
    console.error("Erro ao extrair canais promissores:", error);
    throw error;
  }
}
