
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleVariationDisplay, { TitleVariation } from "./TitleVariationDisplay";

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

const TitleProcessingResults = ({ data }: TitleProcessingResultsProps) => {
  const hasStructureVariations = data.structureVariations && data.structureVariations.length > 0;
  const hasKeywordSubniche = data.keywordSubniche && data.keywordSubniche.length > 0;
  const hasTotalInnovation = data.totalInnovation && data.totalInnovation.length > 0;

  if (!hasStructureVariations && !hasKeywordSubniche && !hasTotalInnovation) {
    return null;
  }

  // Get initial tab value based on available data
  let initialTabValue = "best";
  if (hasStructureVariations) initialTabValue = "structure";
  else if (hasKeywordSubniche) initialTabValue = "subniche";
  else if (hasTotalInnovation) initialTabValue = "innovation";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Resultados para: "{data.originalTitle}"</h2>
      
      <Tabs defaultValue={initialTabValue} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          {data.bestVariation && (
            <TabsTrigger value="best">Melhor Opção</TabsTrigger>
          )}
          {hasStructureVariations && (
            <TabsTrigger value="structure">🅐 Variações da Estrutura</TabsTrigger>
          )}
          {hasKeywordSubniche && (
            <TabsTrigger value="subniche">🅑 Subniche do Termo-chave</TabsTrigger>
          )}
          {hasTotalInnovation && (
            <TabsTrigger value="innovation">🅒 Inovação Total</TabsTrigger>
          )}
        </TabsList>
        
        {data.bestVariation && (
          <TabsContent value="best">
            <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Variação Recomendada</h3>
              <TitleVariationDisplay 
                variations={[data.bestVariation]}
                strategyName="Melhor opção"
                strategyDescription="Esta variação tem o melhor balanço entre originalidade e potencial viral"
              />
            </div>
          </TabsContent>
        )}
        
        {hasStructureVariations && (
          <TabsContent value="structure">
            <TitleVariationDisplay 
              variations={data.structureVariations}
              strategyName="🅐 Variações da Estrutura"
              strategyDescription="Títulos que mantêm a estrutura original, mas variam palavras e expressões"
            />
          </TabsContent>
        )}
        
        {hasKeywordSubniche && (
          <TabsContent value="subniche">
            <TitleVariationDisplay 
              variations={data.keywordSubniche}
              strategyName="🅑 Subniche do Termo-chave"
              strategyDescription="Títulos que substituem termos principais por subnichos mais específicos"
            />
          </TabsContent>
        )}
        
        {hasTotalInnovation && (
          <TabsContent value="innovation">
            <TitleVariationDisplay 
              variations={data.totalInnovation}
              strategyName="🅒 Inovação Total"
              strategyDescription="Títulos completamente novos que mantêm a promessa central do original"
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default TitleProcessingResults;
