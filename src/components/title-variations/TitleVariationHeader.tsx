
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ArrowDown, ArrowUp } from 'lucide-react';

interface TitleVariationHeaderProps {
  variationsCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onCopyAllTitles: () => void;
}

const TitleVariationHeader = ({
  variationsCount,
  sortBy,
  setSortBy,
  onCopyAllTitles
}: TitleVariationHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
      <h3 className="text-lg font-bold mb-2 sm:mb-0">Variações de Título</h3>
      
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSortBy(sortBy === "emotion" ? "saturation" : "emotion")}
        >
          {sortBy === "emotion" ? (
            <>Ordenar por Saturação <ArrowDown className="ml-1 h-3.5 w-3.5" /></>
          ) : (
            <>Ordenar por Emoção <ArrowUp className="ml-1 h-3.5 w-3.5" /></>
          )}
        </Button>
        
        <Button variant="outline" size="sm" onClick={onCopyAllTitles}>
          <Copy className="mr-1 h-3.5 w-3.5" /> Copiar todos
        </Button>
      </div>
    </div>
  );
};

export default TitleVariationHeader;
