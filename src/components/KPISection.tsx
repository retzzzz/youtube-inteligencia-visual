import { VideoResult } from "@/types/youtube-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPISectionProps {
  results: VideoResult[];
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("pt-BR").format(num);
};

const KPISection = ({ results }: KPISectionProps) => {
  if (!results.length) return null;
  
  // Encontrar vídeos com melhor potencial viral
  const sortedByViralScore = [...results].sort((a, b) => b.viralScore - a.viralScore);
  const topViralVideo = sortedByViralScore[0];
  
  // Encontrar vídeos com crescimento rápido
  const sortedByViews = [...results].sort((a, b) => (b.views / b.videoAge) - (a.views / a.videoAge));
  const fastestGrowingVideo = sortedByViews[0];
  
  // Calcular taxa média de visualizações por dia
  const avgViewsPerDay = results.reduce((sum, video) => 
    sum + (video.views / Math.max(1, video.videoAge)), 0) / results.length;
  
  // Encontrar nicho mais promissor baseado em engagement
  const nichePerformance = results.reduce((acc, video) => {
    const channel = video.channel;
    if (!acc[channel]) {
      acc[channel] = {
        videos: 1,
        totalEngagement: video.engagement,
        avgViralScore: video.viralScore
      };
    } else {
      acc[channel].videos++;
      acc[channel].totalEngagement += video.engagement;
      acc[channel].avgViralScore += video.viralScore;
    }
    return acc;
  }, {} as Record<string, {videos: number, totalEngagement: number, avgViralScore: number}>);

  const bestNiche = Object.entries(nichePerformance)
    .map(([channel, stats]) => ({
      channel,
      avgEngagement: stats.totalEngagement / stats.videos,
      avgViralScore: stats.avgViralScore / stats.videos
    }))
    .sort((a, b) => b.avgViralScore - a.avgViralScore)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Melhor Potencial Viral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topViralVideo.viralScore}</div>
          <p className="text-sm text-muted-foreground truncate" title={topViralVideo.title}>
            {topViralVideo.title.length > 40 ? 
              `${topViralVideo.title.substring(0, 40)}...` : topViralVideo.title}
          </p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Crescimento Mais Rápido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(Math.round(fastestGrowingVideo.views / fastestGrowingVideo.videoAge))}
          </div>
          <p className="text-sm text-muted-foreground">
            views/dia em {fastestGrowingVideo.channel}
          </p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Nicho Promissor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate" title={bestNiche.channel}>
            {bestNiche.channel}
          </div>
          <p className="text-sm text-muted-foreground">
            Score: {Math.round(bestNiche.avgViralScore)}
          </p>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Média de Crescimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(Math.round(avgViewsPerDay))}</div>
          <p className="text-sm text-muted-foreground">views/dia por vídeo</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISection;
