
import { Youtube, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface VideoLinksCellProps {
  videoUrl?: string;
  channelUrl?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const VideoLinksCell = ({ videoUrl, channelUrl, onClick }: VideoLinksCellProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {videoUrl && (
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-youtube-red hover:text-red-700 p-1.5"
              title="Assistir no YouTube"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
            >
              <Youtube className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent>Assistir no YouTube</TooltipContent>
        </Tooltip>
      )}
      {channelUrl && (
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={channelUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-gray-500 hover:text-gray-700 p-1.5"
              title="Visitar Canal"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>Visitar Canal</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default VideoLinksCell;
