
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchTopicButtonProps {
  topic: string;
  onSearch: (topic: string) => void;
}

const SearchTopicButton: React.FC<SearchTopicButtonProps> = ({ topic, onSearch }) => {
  return (
    <div className="flex items-center justify-center pt-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-blue-900/20 border-blue-700/30 hover:bg-blue-900/40"
        onClick={() => onSearch(topic)}
      >
        <Search className="h-3.5 w-3.5 mr-1" />
        Pesquisar "{topic || "YouTube"}"
      </Button>
    </div>
  );
};

export default SearchTopicButton;
