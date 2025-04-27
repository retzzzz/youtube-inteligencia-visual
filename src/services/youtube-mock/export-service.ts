
import { VideoResult } from "@/types/youtube-types";

// Function to export results to CSV
export const exportToCSV = (data: VideoResult[]) => {
  // Preparar cabeçalhos
  const headers = [
    "Título", "Canal", "Visualizações", "Engajamento (%)", 
    "Pontuação Viral", "CPM Estimado", "RPM Estimado", 
    "Ganhos Estimados", "Inscritos", "Idade do Vídeo (dias)", 
    "Data do Canal", "Idioma", "Nicho Principal", "Subnicho",
    "Link do Vídeo", "Link do Canal"
  ];
  
  // Preparar dados das linhas
  const rows = data.map(item => [
    item.title,
    item.channel,
    item.views,
    `${item.engagement}%`,
    item.viralScore,
    `$${item.estimatedCPM}`,
    `$${item.estimatedRPM}`,
    `$${item.estimatedEarnings}`,
    item.subscribers,
    item.videoAge,
    new Date(item.channelDate).toLocaleDateString('pt-BR'),
    item.language,
    item.mainNiche,
    item.subNiche,
    item.videoUrl || "",
    item.channelUrl || ""
  ]);
  
  // Combinar cabeçalhos e linhas
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Criar blob e baixar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `youtube-dados-${new Date().toISOString().slice(0, 10)}.csv`);
  link.click();
  URL.revokeObjectURL(url);
};
