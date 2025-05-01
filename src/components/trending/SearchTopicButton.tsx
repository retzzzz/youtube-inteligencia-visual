
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchTopicButtonProps {
  topic: string;
  onSearch: (topic: string) => void;
}

const SearchTopicButton: React.FC<SearchTopicButtonProps> = ({ topic, onSearch }) => {
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Search button clicked for topic:", topic);
    if (topic) {
      onSearch(topic);
    }
  };

  return (
    <div className="flex items-center justify-center pt-2 z-10">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-blue-900/20 border-blue-700/30 hover:bg-blue-900/40 cursor-pointer z-10"
        onClick={handleSearchClick}
        type="button"
      >
        <Search className="h-3.5 w-3.5 mr-1" />
        Pesquisar "{topic || "YouTube"}"
      </Button>
    </div>
  );
};

export default SearchTopicButton;
