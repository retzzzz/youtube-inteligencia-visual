
import React from "react";
import { VideoResult } from "@/types/youtube-types";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, ThumbsUp, MessageCircle, Users } from "lucide-react";

interface VideoMetricsProps {
  video: VideoResult;
}

const VideoMetrics: React.FC<VideoMetricsProps> = ({ video }) => {
  const formatVideoAge = (days: number): string => {
    if (days < 1) {
      const hours = Math.round(days * 24);
      return `${hours} horas`;
    } else if (days < 30) {
      return `${Math.round(days)} dias`;
    } else {
      const months = Math.round(days / 30);
      return `${months} meses`;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Badge variant="outline" className="bg-blue-100">
        <Clock className="h-3 w-3 mr-1" /> 
        {formatVideoAge(video.videoAge)}
      </Badge>
      <Badge variant="outline" className="bg-green-100">
        <TrendingUp className="h-3 w-3 mr-1" /> 
        {new Intl.NumberFormat().format(video.viewsPerHour || 0)} views/h
      </Badge>
      {video.likes && (
        <Badge variant="outline" className="bg-red-100">
          <ThumbsUp className="h-3 w-3 mr-1" /> 
          {new Intl.NumberFormat().format(video.likes)}
        </Badge>
      )}
      {video.comments && (
        <Badge variant="outline" className="bg-purple-100">
          <MessageCircle className="h-3 w-3 mr-1" /> 
          {new Intl.NumberFormat().format(video.comments)}
        </Badge>
      )}
      <Badge variant="outline" className="bg-yellow-100">
        <Users className="h-3 w-3 mr-1" /> 
        {new Intl.NumberFormat().format(video.subscribers)}
      </Badge>
    </div>
  );
};

export default VideoMetrics;

