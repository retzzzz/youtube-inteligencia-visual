
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoResult } from "@/types/youtube-types";
import { Lightbulb, Sparkles, Tag } from "lucide-react";
import VideoMetrics from "./VideoMetrics";
import { assessViralityPotential } from "@/utils/videoAnalytics";
import { 
  generateRemodelingIdeas, 
  generateAlternativeTitles, 
  estimateTargetAudience 
} from "@/utils/contentSuggestions";

interface RemodelingIdeasProps {
  video: VideoResult;
}

const RemodelingIdeas: React.FC<RemodelingIdeasProps> = ({ video }) => {
  const virality = assessViralityPotential(video);
  const remodelingIdeas = generateRemodelingIdeas(video.title, video.mainNiche);
  const alternativeTitles = generateAlternativeTitles(video.title, video.language);
  const targetAudience = estimateTargetAudience(video.title, video.mainNiche, video.language);
  
  const getViralityColor = (potential: string): string => {
    switch (potential) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Análise Detalhada e Sugestões de Remodelagem
            <Badge 
              className={`ml-auto ${getViralityColor(virality.potential)}`} 
              variant="default"
            >
              Potencial: {video.escalabilityScore || 0}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="border rounded-md p-4 bg-slate-50">
            <h3 className="text-md font-semibold mb-3">Análise do Vídeo</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground font-medium">Motivo da Avaliação:</span>
                <p className="mt-1">{virality.reason}</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4 bg-amber-50/50">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Sugestões de Remodelagem
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-1">Ideias de Remodelagem:</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {remodelingIdeas.map((idea, index) => (
                    <li key={index} className="text-sm">{idea}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Títulos Alternativos:</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {alternativeTitles.map((title, index) => (
                    <li key={index} className="text-sm">{title}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-slate-500" />
                  Público-alvo Estimado:
                </h4>
                <p className="text-sm">{targetAudience}</p>
              </div>
            </div>
          </div>
          
          <VideoMetrics video={video} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RemodelingIdeas;

