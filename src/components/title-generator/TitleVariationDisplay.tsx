import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export interface TitleVariation {
  title: string;
  explanation: string;
  competitionLevel: string;
  viralPotential: number;
  text?: string;
  type?: "dor" | "esperanca" | "curiosidade";
  saturation?: 'low' | 'medium' | 'high';
  language?: "pt" | "en" | "es" | "fr";
  translations?: Array<{
    text: string;
    language: "pt" | "en" | "es" | "fr";
  }>;
}

interface TitleVariationDisplayProps {
  variation: TitleVariation;
  isSelected?: boolean;
  onSelect?: () => void;
}

const TitleVariationDisplay: React.FC<TitleVariationDisplayProps> = ({
  variation,
  isSelected = false,
  onSelect
}) => {
  const getCompetitionColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'baixa': return 'bg-green-50 text-green-700 border-green-200';
      case 'média': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'alta': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected ? 'border-2 border-primary' : 'border'}`}
      onClick={onSelect}
    >
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{variation.title}</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className={getCompetitionColor(variation.competitionLevel)}>
              {variation.competitionLevel}
            </Badge>
            <Badge variant={isSelected ? "default" : "outline"} className="bg-primary/10 text-primary">
              {variation.viralPotential}%
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          {variation.explanation}
        </p>
      </CardContent>
    </Card>
  );
};

export default TitleVariationDisplay;
