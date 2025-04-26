import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, Check, Languages, ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TitleVariation } from '@/pages/TitleGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TitleVariationsListProps {
  variations: TitleVariation[];
  onGenerateMore: () => void;
  totalCount: number;
  setVariations: (variations: TitleVariation[]) => void;
  keyword: string;
}

const TitleVariationsList = ({ 
  variations, 
  onGenerateMore, 
  totalCount,
  setVariations,
  keyword
}: TitleVariationsListProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("emotion");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Título copiado para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const translateTitle = (variation: TitleVariation, index: number) => {
    const languages: Array<"pt" | "es" | "en" | "fr"> = ["pt", "es", "en", "fr"].filter(
      lang => lang !== variation.language
    );

    const translations = languages.map(lang => {
      let translatedText = "";
      if (lang === "pt") {
        translatedText = `[Português] ${variation.text.replace(/^(\[.*?\])?/, '')}`;
      } else if (lang === "es") {
        translatedText = `[Español] ${variation.text.replace(/^(\[.*?\])?/, '')}`;
      } else if (lang === "en") {
        translatedText = `[English] ${variation.text.replace(/^(\[.*?\])?/, '')}`;
      } else {
        translatedText = `[Français] ${variation.text.replace(/^(\[.*?\])?/, '')}`;
      }
      return { text: translatedText, language: lang };
    });

    const updatedVariations = [...variations];
    updatedVariations[index] = {
      ...variation,
      translations: translations
    };
    setVariations(updatedVariations);
  };

  const copyAllTitles = () => {
    const titlesToDisplay = getFilteredAndSortedVariations();
    const titleText = titlesToDisplay.map(v => v.text).join('\n\n');
    navigator.clipboard.writeText(titleText);
    toast({
      title: "Todos os títulos copiados!",
      description: `${titlesToDisplay.length} títulos copiados para área de transferência.`
    });
  };
  
  const getFilteredAndSortedVariations = () => {
    let filtered = [...variations];
    
    if (filterType !== "all") {
      filtered = filtered.filter(v => {
        if (filterType === "dor") return v.type === "dor";
        if (filterType === "esperanca") return v.type === "esperanca";
        if (filterType === "curiosidade") return v.type === "curiosidade";
        if (filterType === "low") return v.saturation === "low";
        return true;
      });
    }
    
    filtered.sort((a, b) => {
      if (sortBy === "emotion") {
        return a.type.localeCompare(b.type);
      } else if (sortBy === "saturation") {
        const satOrder = { low: 1, medium: 2, high: 3 };
        return satOrder[a.saturation] - satOrder[b.saturation];
      }
      return 0;
    });
    
    return filtered;
  };

  const filteredVariations = getFilteredAndSortedVariations();

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-bold mb-2 sm:mb-0">Variações de Título</h3>
        
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSortBy(sortBy === "emotion" ? "saturation" : "emotion")}
          >
            {sortBy === "emotion" ? (
              <>Ordenar por Saturação <ArrowDownIcon className="ml-1 h-3.5 w-3.5" /></>
            ) : (
              <>Ordenar por Emoção <ArrowUpIcon className="ml-1 h-3.5 w-3.5" /></>
            )}
          </Button>
          
          <Button variant="outline" size="sm" onClick={copyAllTitles}>
            <Copy className="mr-1 h-3.5 w-3.5" /> Copiar todos
          </Button>
        </div>
      </div>
      
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

      {filteredVariations.length > 0 ? (
        <div className="space-y-3">
          {filteredVariations.map((variation, index) => {
            const id = `title-${index}`;
            const isCopied = copiedId === id;
            
            return (
              <div key={id} className="space-y-3">
                <div className="flex justify-between items-center p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className="flex-1 mr-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {variation.type === "dor" && (
                        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                          Dor
                        </Badge>
                      )}
                      {variation.type === "esperanca" && (
                        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                          Esperança
                        </Badge>
                      )}
                      {variation.type === "curiosidade" && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          Curiosidade
                        </Badge>
                      )}
                      
                      {variation.saturation === "low" && (
                        <Badge className="bg-green-100 text-green-800">
                          Baixa Saturação
                        </Badge>
                      )}
                      {variation.saturation === "medium" && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Média Saturação
                        </Badge>
                      )}
                      {variation.saturation === "high" && (
                        <Badge className="bg-red-100 text-red-800">
                          Alta Saturação
                        </Badge>
                      )}
                      
                      {variation.language === "pt" && (
                        <Badge variant="secondary" className="text-xs">
                          Português
                        </Badge>
                      )}
                      {variation.language === "en" && (
                        <Badge variant="secondary" className="text-xs">
                          Inglês
                        </Badge>
                      )}
                      {variation.language === "es" && (
                        <Badge variant="secondary" className="text-xs">
                          Espanhol
                        </Badge>
                      )}
                      {variation.language === "fr" && (
                        <Badge variant="secondary" className="text-xs">
                          Francês
                        </Badge>
                      )}
                    </div>
                    <p className="text-base">{variation.text}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => translateTitle(variation, index)}
                      className="h-8 px-2"
                    >
                      <Languages className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(variation.text, id)}
                      className="h-8 w-8 p-0"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {variation.translations && variation.translations.length > 0 && (
                  <div className="ml-4 space-y-2">
                    {variation.translations.map((translation, tIndex) => (
                      <div 
                        key={`${id}-translation-${tIndex}`}
                        className="flex justify-between items-center p-3 rounded-md bg-muted/30"
                      >
                        <p className="flex-1 mr-4 text-sm">{translation.text}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(translation.text, `${id}-translation-${tIndex}`)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedId === `${id}-translation-${tIndex}` ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma variação encontrada com os filtros atuais
        </div>
      )}
      
      {filteredVariations.length > 0 && (
        <div className="mt-6 text-center">
          <Button onClick={onGenerateMore} variant="outline">
            Gerar mais 10 variações
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Total: {totalCount} títulos gerados
          </p>
        </div>
      )}
    </Card>
  );
};

export default TitleVariationsList;
