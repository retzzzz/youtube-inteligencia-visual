
import { VideoResult } from "@/types/youtube-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPISectionProps {
  results: VideoResult[];
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("pt-BR").format(num);
};

const KPISection = ({ results }: KPISectionProps) => {
  // Se não houver resultados, retorne nulo
  if (!results.length) return null;
  
  // Calcular KPIs
  const totalVideos = results.length;
  
  const highestViralScore = Math.max(...results.map(video => video.viralScore));
  const videoWithHighestViralScore = results.find(video => video.viralScore === highestViralScore);
  
  const highestCPM = Math.max(...results.map(video => video.estimatedCPM));
  const videoWithHighestCPM = results.find(video => video.estimatedCPM === highestCPM);
  
  const totalViews = results.reduce((sum, video) => sum + video.views, 0);
  
  const totalEarnings = results.reduce((sum, video) => sum + video.estimatedEarnings, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Vídeos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="stat-value">{totalVideos}</div>
          <p className="stat-label">vídeos encontrados</p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Maior Pontuação Viral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="stat-value">{highestViralScore}</div>
          <p className="stat-label truncate" title={videoWithHighestViralScore?.title || ""}>
            {videoWithHighestViralScore?.title.substring(0, 25)}...
          </p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Maior CPM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="stat-value">${highestCPM.toFixed(2)}</div>
          <p className="stat-label">no canal {videoWithHighestCPM?.channel}</p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Visualizações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="stat-value">{formatNumber(totalViews)}</div>
          <p className="stat-label">ganhos estimados: ${totalEarnings.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISection;
