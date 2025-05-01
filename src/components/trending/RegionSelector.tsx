
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, RefreshCw } from 'lucide-react';
import { regions, TrendingRegion } from './types';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  selectedRegion, 
  onRegionChange, 
  onRefresh, 
  isLoading 
}) => {
  return (
    <div className="flex items-center gap-1">
      {regions.map(region => (
        <Button 
          key={region.code}
          size="sm"
          variant={selectedRegion === region.code ? "secondary" : "ghost"}
          className="flex items-center gap-1 text-xs"
          onClick={() => onRegionChange(region.code)}
          style={{ pointerEvents: 'auto' }}
        >
          <Globe className="h-3.5 w-3.5" />
          {region.name}
        </Button>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="text-xs"
        onClick={onRefresh}
        disabled={isLoading}
        style={{ pointerEvents: 'auto' }}
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
};

export default RegionSelector;
