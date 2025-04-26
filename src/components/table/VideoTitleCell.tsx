
import { VideoResult } from "@/types/youtube-types";

interface VideoTitleCellProps {
  video: VideoResult;
  onClick?: () => void;
}

const VideoTitleCell = ({ video, onClick }: VideoTitleCellProps) => {
  return (
    <div className="flex items-center gap-3 w-full">
      {video.thumbnail && (
        <div className="w-12 h-8 flex-shrink-0">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="truncate w-full">
        {video.videoUrl ? (
          <a 
            href={video.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline text-blue-600 hover:text-blue-800 truncate"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            title={video.title}
          >
            {video.title}
          </a>
        ) : video.title}
      </div>
    </div>
  );
};

export default VideoTitleCell;
