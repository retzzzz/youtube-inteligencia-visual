
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
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Geração de variações em camadas</h3>

      <Tabs defaultValue="light" className="mb-4">
        <TabsList>
          <TabsTrigger value="light">Variações Leves</TabsTrigger>
          <TabsTrigger value="medium">Variações Médias</TabsTrigger>
          <TabsTrigger value="bold">Variações Ousadas</TabsTrigger>
        </TabsList>

        <TabsContent value="light" className="pt-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Trocas sutis com sinônimos, mantendo a estrutura original.
            </p>

            <div className="space-y-3">
              {variations.light.map((variation, index) => (
                <TitleVariationCard 
                  key={`light-${index}`} 
                  variation={variation} 
                  badgeColor="blue"
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medium" className="pt-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Reorganização de estrutura, transformação em pergunta ou lista numerada.
            </p>

            <div className="space-y-3">
              {variations.medium.map((variation, index) => (
                <TitleVariationCard 
                  key={`medium-${index}`} 
                  variation={variation}
                  badgeColor="yellow"
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bold" className="pt-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Inovação completa com micro-subnichos, mantendo o gancho emocional.
            </p>

            <div className="space-y-3">
              {variations.bold.map((variation, index) => (
                <TitleVariationCard 
                  key={`bold-${index}`} 
                  variation={variation}
                  badgeColor="green"
                />
              ))}
            </div>
          </div>
        </TabsContent>
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
  // Extract language from variation if available, default to Portuguese
  const language = variation.language || 'pt';
  const isNotPortuguese = language !== 'pt';

  // Get the title text, handling different properties
  const originalTitle = variation.title || '';
  
  // Check if there's a Portuguese translation embedded in the title
  let portugueseTranslation = '';
  if (originalTitle.includes('PT-BR:')) {
    const parts = originalTitle.split('PT-BR:');
    portugueseTranslation = parts[1].trim();
  }

  return (
    <div className="border p-3 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-md">{originalTitle.split('PT-BR:')[0].trim()}</h4>
        <Badge 
          variant="outline" 
          className={`bg-${badgeColor}-50 text-${badgeColor}-700`}
        >
          {variation.viralPotential}%
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">{variation.explanation}</p>
      
      {isNotPortuguese && (
        <div className="mt-2 pt-2 border-t border-dashed border-border">
          <div className="flex items-center gap-1">
            <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Tradução: {portugueseTranslation || 'Tradução não disponível'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleVariationsLevels;
