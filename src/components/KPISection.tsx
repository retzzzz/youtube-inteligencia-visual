
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
  
  // Encontrar vídeos com crescimento mais rápido (views por dia)
  const sortedByGrowthRate = [...results].sort((a, b) => 
    (b.views / Math.max(0.1, b.videoAge)) - (a.views / Math.max(0.1, a.videoAge))
  );
  const fastestGrowingVideo = sortedByGrowthRate[0];
  
  // Encontrar vídeos emergentes (alto potencial viral + idade recente)
  const emergingVideos = results
    .filter(video => video.videoAge <= 3) // Vídeos dos últimos 3 dias
    .sort((a, b) => b.viralScore - a.viralScore);
  const topEmergingVideo = emergingVideos.length > 0 ? emergingVideos[0] : sortedByViralScore[0];
  
  // Encontrar nicho mais promissor baseado em viral scores
  const nichePerformance = results.reduce((acc, video) => {
    const niche = video.mainNiche || "Diversos";
    if (!acc[niche]) {
      acc[niche] = {
        videos: 1,
        totalViralScore: video.viralScore,
        avgVideoAge: video.videoAge
      };
    } else {
      acc[niche].videos++;
      acc[niche].totalViralScore += video.viralScore;
      acc[niche].avgVideoAge += video.videoAge;
    }
    return acc;
  }, {} as Record<string, {videos: number, totalViralScore: number, avgVideoAge: number}>);

  const bestNiches = Object.entries(nichePerformance)
    .filter(([_, stats]) => stats.videos >= 2) // Pelo menos 2 vídeos no nicho
    .map(([niche, stats]) => ({
      niche,
      avgViralScore: stats.totalViralScore / stats.videos,
      avgVideoAge: stats.avgVideoAge / stats.videos,
      // Dar mais peso a nichos com vídeos recentes
      weightedScore: (stats.totalViralScore / stats.videos) * (1 + (30 / Math.max(1, stats.avgVideoAge / stats.videos)))
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore);

  const bestNiche = bestNiches.length > 0 ? bestNiches[0] : { niche: "Diversos", avgViralScore: 0 };
  
  // Identificar subnichos emergentes
  const subnicheMap = new Map<string, number>();
  results.forEach(video => {
    if (video.subNiche && video.videoAge <= 30) { // Foco em subnichos recentes
      const currentScore = subnicheMap.get(video.subNiche) || 0;
      subnicheMap.set(video.subNiche, currentScore + video.viralScore);
    }
  });
  
  const topSubniches = Array.from(subnicheMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  const topSubniche = topSubniches.length > 0 ? topSubniches[0][0] : "N/A";

  // Calcular taxa de crescimento
  const avgViewsPerDay = results.reduce((sum, video) => 
    sum + (video.views / Math.max(1, video.videoAge)), 0) / results.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Vídeo Emergente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topEmergingVideo.viralScore}</div>
          <p className="text-sm text-muted-foreground truncate" title={topEmergingVideo.title}>
            {topEmergingVideo.title.length > 40 ? 
              `${topEmergingVideo.title.substring(0, 40)}...` : topEmergingVideo.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(topEmergingVideo.videoAge * 24)}h • {formatNumber(topEmergingVideo.views)} views
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
            {formatNumber(Math.round(fastestGrowingVideo.views / Math.max(0.1, fastestGrowingVideo.videoAge)))}
          </div>
          <p className="text-sm text-muted-foreground">
            views/dia
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {fastestGrowingVideo.channel}
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
          <div className="text-2xl font-bold truncate" title={bestNiche.niche}>
            {bestNiche.niche}
          </div>
          <p className="text-sm text-muted-foreground">
            Score: {Math.round(bestNiche.avgViralScore)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Subniche: {topSubniche !== bestNiche.niche ? topSubniche : "N/A"}
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
