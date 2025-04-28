
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TitleVariationFiltersProps {
  variations: Array<any>;
  filterType: string;
  setFilterType: (filter: string) => void;
}

const TitleVariationFilters = ({ 
  variations, 
  filterType, 
  setFilterType 
}: TitleVariationFiltersProps) => {
  return (
    <Tabs defaultValue="all" className="mb-4">
      <TabsList className="mb-4">
        <TabsTrigger 
          value="all" 
          onClick={() => setFilterType("all")}
        >
          Todos ({variations.length})
        </TabsTrigger>
        <TabsTrigger 
          value="dor" 
          onClick={() => setFilterType("dor")}
        >
          Dor ({variations.filter(v => v.type === "dor").length})
        </TabsTrigger>
        <TabsTrigger 
          value="esperanca" 
          onClick={() => setFilterType("esperanca")}
        >
          Esperança ({variations.filter(v => v.type === "esperanca").length})
        </TabsTrigger>
        <TabsTrigger 
          value="curiosidade" 
          onClick={() => setFilterType("curiosidade")}
        >
          Curiosidade ({variations.filter(v => v.type === "curiosidade").length})
        </TabsTrigger>
        <TabsTrigger 
          value="low" 
          onClick={() => setFilterType("low")}
        >
          Baixa Saturação ({variations.filter(v => v.saturation === "low").length})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TitleVariationFilters;
