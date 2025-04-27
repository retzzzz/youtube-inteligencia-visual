
export const fetchVideoStats = async (videoIds: string[], apiKey: string) => {
  if (!videoIds.length) return {};

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet,topicDetails&id=${videoIds.join(",")}&key=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar estatísticas de vídeos:", errorData);
      
      // Verificar se é um erro de chave nova
      if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        throw new Error("Quota excedida ao buscar estatísticas de vídeos. Se a chave foi criada recentemente, aguarde alguns minutos.");
      }
      
      throw new Error(`Erro ao buscar estatísticas de vídeos: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return (data.items || []).reduce((acc: Record<string, any>, item: any) => {
      acc[item.id] = {
        views: parseInt(item.statistics.viewCount) || 0,
        likes: parseInt(item.statistics.likeCount) || 0,
        comments: parseInt(item.statistics.commentCount) || 0,
        duration: item.contentDetails.duration,
        publishedAt: item.snippet.publishedAt,
        tags: item.snippet.tags || [],
        description: item.snippet.description || "",
        category: item.snippet.categoryId,
        topicDetails: item.topicDetails
      };
      return acc;
    }, {});
  } catch (error) {
    console.error("Erro ao processar estatísticas de vídeo:", error);
    throw error;
  }
};
