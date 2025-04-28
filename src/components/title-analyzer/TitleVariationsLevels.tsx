
import React from 'react';
import { Card } from '@/components/ui/card';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TranslationIcon from '../icons/TranslationIcon';

interface TitleVariationsLevelsProps {
  variations: {
    light: TitleVariation[];
    medium: TitleVariation[];
    bold: TitleVariation[];
  };
}

const TitleVariationsLevels: React.FC<TitleVariationsLevelsProps> = ({ variations }) => {
  const getLevelName = (level: string): string => {
    switch(level) {
      case "light": return "Variações Leves";
      case "medium": return "Variações Médias";
      case "bold": return "Variações Ousadas";
      default: return "Variações";
    }
  };
  
  const getLevelDescription = (level: string): string => {
    switch(level) {
      case "light": return "Trocas sutis com sinônimos, mantendo a estrutura original.";
      case "medium": return "Reorganização de estrutura, transformação em pergunta ou lista numerada.";
      case "bold": return "Inovação completa com micro-subnichos, mantendo o gancho emocional.";
      default: return "";
    }
  };
  
  const getBadgeColor = (level: string): "blue" | "yellow" | "green" => {
    switch(level) {
      case "light": return "blue";
      case "medium": return "yellow";
      case "bold": return "green";
      default: return "blue";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Geração de variações em camadas</h3>

      <Tabs defaultValue="light" className="mb-4">
        <TabsList>
          <TabsTrigger value="light">Variações Leves</TabsTrigger>
          <TabsTrigger value="medium">Variações Médias</TabsTrigger>
          <TabsTrigger value="bold">Variações Ousadas</TabsTrigger>
        </TabsList>

        {["light", "medium", "bold"].map(level => (
          <TabsContent key={level} value={level} className="pt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {getLevelDescription(level)}
              </p>

              <div className="space-y-3">
                {variations[level as keyof typeof variations].map((variation, index) => (
                  <TitleVariationCard 
                    key={`${level}-${index}`} 
                    variation={variation} 
                    badgeColor={getBadgeColor(level)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-sm text-muted-foreground mt-4 p-3 bg-slate-50 rounded-md">
        <p>A modificação do título é o primeiro passo na remodelagem de qualquer conteúdo. 
        Teste cada variação com o analisador de concorrência para identificar a melhor opção.</p>
      </div>
    </Card>
  );
};

interface TitleVariationCardProps {
  variation: TitleVariation;
  badgeColor: 'blue' | 'yellow' | 'green';
}

const TitleVariationCard: React.FC<TitleVariationCardProps> = ({ variation, badgeColor }) => {
  const hasTranslation = variation.translation && variation.translation.trim() !== '';

  return (
    <div className="border p-3 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-md">{variation.title}</h4>
        <Badge 
          variant="outline" 
          className={`bg-${badgeColor}-50 text-${badgeColor}-700`}
        >
          {variation.viralPotential}%
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{variation.explanation}</p>
      
      {hasTranslation && (
        <div className="mt-2 pt-2 border-t border-dashed border-border">
          <div className="flex items-center gap-1">
            <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Tradução: {variation.translation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleVariationsLevels;
