
import React from 'react';
import { Card } from '@/components/ui/card';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
                <div key={`light-${index}`} className="border p-3 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-md">{variation.title}</h4>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {variation.viralPotential}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{variation.explanation}</p>
                </div>
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
                <div key={`medium-${index}`} className="border p-3 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-md">{variation.title}</h4>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                      {variation.viralPotential}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{variation.explanation}</p>
                </div>
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
                <div key={`bold-${index}`} className="border p-3 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-md">{variation.title}</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {variation.viralPotential}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{variation.explanation}</p>
                </div>
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

export default TitleVariationsLevels;
