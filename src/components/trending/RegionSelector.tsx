
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, RefreshCw } from 'lucide-react';
import { regions } from './types';

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
  const handleRegionClick = (regionCode: string) => {
    console.log("Region button clicked:", regionCode);
    onRegionChange(regionCode);
  };

  const handleRefreshClick = () => {
    console.log("Refresh button clicked");
    onRefresh();
  };

  return (
    <div className="flex items-center gap-1">
      {regions.map(region => (
        <Button 
          key={region.code}
          size="sm"
          variant={selectedRegion === region.code ? "secondary" : "ghost"}
          className="flex items-center gap-1 text-xs"
          onClick={() => handleRegionClick(region.code)}
          type="button"
        >
          <Globe className="h-3.5 w-3.5" />
          {region.name}
        </Button>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="text-xs"
        onClick={handleRefreshClick}
        disabled={isLoading}
        type="button"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
};

export default RegionSelector;
