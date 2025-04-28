
import React, { useState } from 'react';
import { TitleVariation } from './TitleVariationDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TitleVariationDisplay from './TitleVariationDisplay';

export interface ProcessedTitleData {
  originalTitle: string;
  structureVariations?: TitleVariation[];
  keywordSubniche?: TitleVariation[];
  totalInnovation?: TitleVariation[];
  bestVariation?: TitleVariation;
}

interface TitleProcessingResultsProps {
  data: ProcessedTitleData;
}

const TitleProcessingResults: React.FC<TitleProcessingResultsProps> = ({ data }) => {
  const [selectedVariation, setSelectedVariation] = useState<TitleVariation | null>(
    data.bestVariation || null
  );
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };
  
  const allVariations = [
    ...(data.structureVariations || []),
    ...(data.keywordSubniche || []),
    ...(data.totalInnovation || [])
  ];
  
  // Sort variations by viral potential descending
  const sortedVariations = [...allVariations].sort(
    (a, b) => b.viralPotential - a.viralPotential
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Título Original</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-muted/50 rounded-md">
            <p className="font-medium">{data.originalTitle}</p>
          </div>
        </CardContent>
      </Card>

      {data.bestVariation && (
        <Card className="border-t-4 border-t-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              Melhor Variação Sugerida
              <Badge variant="default" className="bg-green-500">
                {data.bestVariation.viralPotential}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-md">
                <p className="font-medium">{data.bestVariation.title}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.bestVariation.explanation}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(data.bestVariation!.title)}
              >
                Copiar Título
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Todas as Variações ({allVariations.length})</h3>
      
        {data.structureVariations && data.structureVariations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Variações da Estrutura</h4>
            <div className="space-y-2">
              {data.structureVariations.map((variation, i) => (
                <TitleVariationDisplay
                  key={`structure-${i}`}
                  variation={variation}
                  isSelected={selectedVariation === variation}
                  onSelect={() => setSelectedVariation(variation)}
                />
              ))}
            </div>
          </div>
        )}

        {data.keywordSubniche && data.keywordSubniche.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Subnichos de Palavras-Chave</h4>
            <div className="space-y-2">
              {data.keywordSubniche.map((variation, i) => (
                <TitleVariationDisplay
                  key={`subniche-${i}`}
                  variation={variation}
                  isSelected={selectedVariation === variation}
                  onSelect={() => setSelectedVariation(variation)}
                />
              ))}
            </div>
          </div>
        )}

        {data.totalInnovation && data.totalInnovation.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Inovações Totais</h4>
            <div className="space-y-2">
              {data.totalInnovation.map((variation, i) => (
                <TitleVariationDisplay
                  key={`innovation-${i}`}
                  variation={variation}
                  isSelected={selectedVariation === variation}
                  onSelect={() => setSelectedVariation(variation)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedVariation && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center justify-between z-10">
          <div className="mr-4">
            <p className="font-medium truncate max-w-[300px] md:max-w-none">
              {selectedVariation.title}
            </p>
            <p className="text-xs text-muted-foreground">
              Potencial: {selectedVariation.viralPotential}% | Concorrência: {selectedVariation.competitionLevel}
            </p>
          </div>
          <Button onClick={() => copyToClipboard(selectedVariation.title)}>
            Copiar Título
          </Button>
        </div>
      )}
    </div>
  );
};

export default TitleProcessingResults;
