
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingTopic } from './types';

interface TopicsListProps {
  topics: TrendingTopic[];
  selectedTopic: number;
  onSelectTopic: (index: number) => void;
}

const TopicsList: React.FC<TopicsListProps> = ({ 
  topics, 
  selectedTopic, 
  onSelectTopic 
}) => {
  const handleTopicClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Topic badge clicked:", index);
    onSelectTopic(index);
  };

  return (
    <div className="flex flex-wrap gap-2 z-10">
      {topics.slice(0, 10).map((topic, index) => (
        <Badge 
          key={index} 
          className={`${
            selectedTopic === index 
              ? 'bg-blue-500/40 text-blue-100 border-blue-400' 
              : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'
          } cursor-pointer flex items-center gap-1 transition-colors z-10`}
          onClick={(e) => handleTopicClick(e, index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTopicClick(e as unknown as React.MouseEvent, index);
            }
          }}
        >
          <span className="text-xs font-normal">{index + 1}</span>
          <span>{topic.title}</span>
        </Badge>
      ))}
    </div>
  );
};

export default TopicsList;
