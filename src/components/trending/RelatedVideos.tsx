
import React from 'react';
import { TrendingTopic } from './types';

interface RelatedVideosProps {
  topic: TrendingTopic;
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ topic }) => {
  if (!topic?.relatedVideos?.length) {
    return null;
  }

  return (
    <div className="pt-2">
      <h3 className="text-sm font-medium mb-2">Vídeos populares sobre "{topic.title}"</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {topic.relatedVideos.slice(0, 2).map((video, idx) => (
          <a 
            key={idx}
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 p-2 rounded-md hover:bg-white/5 transition-colors"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex-shrink-0 w-16 h-10 bg-gray-800 rounded overflow-hidden">
              {video.thumbnail && (
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs line-clamp-2">{video.title}</p>
              <p className="text-[10px] text-blue-300/60">{video.channelTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
