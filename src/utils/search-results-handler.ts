
import { VideoResult } from "@/types/youtube-types";
import { toast } from "@/hooks/use-toast";

export const handleSearchResults = (enrichedData: VideoResult[]) => {
  if (enrichedData.length === 0) {
    toast({
      title: "Sem resultados",
      description: "Sua pesquisa não retornou resultados. Tente outros parâmetros.",
    });
    return null;
  }

  const emergingVideos = enrichedData.filter(video => video.videoAge <= 3 && video.viralScore > 700);
  
  toast({
    title: "Pesquisa concluída",
    description: `Encontrados ${enrichedData.length} resultados para sua busca${
      emergingVideos.length > 0 ? `, incluindo ${emergingVideos.length} vídeos emergentes` : ""
    }.`,
  });
  
  if (enrichedData.length > 0) {
    return [...enrichedData].sort((a, b) => b.viralScore - a.viralScore)[0];
  }

  return null;
};
