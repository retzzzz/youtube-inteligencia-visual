
export const fetchChannelStats = async (channelIds: string[], apiKey: string) => {
  if (!channelIds.length) return {};

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelIds.join(",")}&key=${apiKey}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro ao buscar estatísticas de canais:", errorData);
    throw new Error(`Erro ao buscar estatísticas de canais: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return (data.items || []).reduce((acc: Record<string, any>, item: any) => {
    acc[item.id] = {
      subscribers: parseInt(item.statistics.subscriberCount) || 0,
      videoCount: parseInt(item.statistics.videoCount) || 0,
      publishedAt: item.snippet.publishedAt
    };
    return acc;
  }, {});
};
