
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TranslationIcon from '../icons/TranslationIcon';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

interface TitleVariationsLevelsProps {
  variations: {
    light: TitleVariation[];
    medium: TitleVariation[];
    bold: TitleVariation[];
  };
}

const TitleVariationsLevels: React.FC<TitleVariationsLevelsProps> = ({ variations }) => {
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Geração de variações em camadas</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowTranslations(!showTranslations)}
          className="flex items-center gap-1"
        >
          <Globe className="h-4 w-4" />
          <span>{showTranslations ? "Ocultar traduções" : "Mostrar traduções"}</span>
        </Button>
      </div>

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
                    showTranslation={showTranslations}
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
  showTranslation: boolean;
}

const TitleVariationCard: React.FC<TitleVariationCardProps> = ({ 
  variation, 
  badgeColor,
  showTranslation
}) => {
  const hasTranslation = variation.translation && variation.translation.trim() !== '';
  
  // Map for badge classes based on color
  const badgeClassMap = {
    'blue': 'bg-blue-50 text-blue-700 border-blue-200',
    'yellow': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'green': 'bg-green-50 text-green-700 border-green-200'
  };
  
  // Language indicators
  const languageNames: Record<string, string> = {
    'pt': 'PT',
    'es': 'ES',
    'en': 'EN',
    'fr': 'FR'
  };

  return (
    <div className="border p-3 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-md">{variation.title}</h4>
          {variation.language && (
            <Badge className={
              variation.language === 'pt' ? "bg-green-100 text-green-600" :
              variation.language === 'es' ? "bg-blue-100 text-blue-600" :
              variation.language === 'en' ? "bg-purple-100 text-purple-600" :
              "bg-amber-100 text-amber-600"
            }>
              {languageNames[variation.language] || variation.language}
            </Badge>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={badgeClassMap[badgeColor]}
        >
          {variation.viralPotential}%
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground">{variation.explanation}</p>
      
      {hasTranslation && showTranslation && (
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
