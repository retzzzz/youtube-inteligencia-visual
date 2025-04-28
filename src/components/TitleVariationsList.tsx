
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, Check, Languages, ArrowDown as ArrowDownIcon, ArrowUp as ArrowUpIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';

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
    // Remove language prefix when copying
    const cleanText = text.replace(/^\[.*?\]\s*/, '');
    
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Título copiado para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const translateText = (text: string, targetLanguage: string): string => {
    const isPainTitle = text.match(/verdade dolorosa|destruindo sua vida|luta silenciosa/i);
    const isHopeTitle = text.match(/maneiras de transformar|superei|poder transformador/i);
    const isCuriosityTitle = text.match(/segredo oculto|fatos surpreendentes|mistério não resolvido/i);
    
    if (targetLanguage === "es") {
      if (isPainTitle) {
        if (text.includes("verdade dolorosa")) {
          return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
            "La verdad dolorosa sobre $1 que nadie quiere admitir");
        } else if (text.includes("destruindo sua vida")) {
          return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
            "Por qué $1 puede estar destruyendo tu vida sin que lo sepas");
        } else {
          return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
            "La lucha silenciosa de vivir con $1 diariamente");
        }
      } else if (isHopeTitle) {
        if (text.includes("maneiras de transformar")) {
          return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
            "formas de transformar $1 en oportunidades de crecimiento");
        } else if (text.includes("superei")) {
          return text.replace(/Como superei (.*) e você também pode/i, 
            "Cómo superé $1 y tú también puedes");
        } else {
          return text.replace(/poder transformador de (.*) na sua jornada/i, 
            "El poder transformador de $1 en tu camino");
        }
      } else if (isCuriosityTitle) {
        if (text.includes("segredo oculto")) {
          return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
            "El secreto oculto detrás de $1 que nadie cuenta");
        } else if (text.includes("fatos surpreendentes")) {
          return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
            "¿Conocías estos 5 datos sorprendentes sobre $1?");
        } else {
          return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
            "El misterio sin resolver de $1 que los expertos no pueden explicar");
        }
      }
      return `El contenido sobre ${keyword} traducido al español`;
    } 
    else if (targetLanguage === "en") {
      if (isPainTitle) {
        if (text.includes("verdade dolorosa")) {
          return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
            "The painful truth about $1 that no one wants to admit");
        } else if (text.includes("destruindo sua vida")) {
          return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
            "Why $1 might be destroying your life without you knowing");
        } else {
          return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
            "The silent struggle of living with $1 daily");
        }
      } else if (isHopeTitle) {
        if (text.includes("maneiras de transformar")) {
          return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
            "ways to transform $1 into growth opportunities");
        } else if (text.includes("superei")) {
          return text.replace(/Como superei (.*) e você também pode/i, 
            "How I overcame $1 and you can too");
        } else {
          return text.replace(/poder transformador de (.*) na sua jornada/i, 
            "The transformative power of $1 in your journey");
        }
      } else if (isCuriosityTitle) {
        if (text.includes("segredo oculto")) {
          return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
            "The hidden secret behind $1 that no one tells");
        } else if (text.includes("fatos surpreendentes")) {
          return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
            "Did you know these 5 surprising facts about $1?");
        } else {
          return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
            "The unsolved mystery of $1 that experts can't explain");
        }
      }
      return `The content about ${keyword} translated to English`;
    } 
    else if (targetLanguage === "fr") {
      if (isPainTitle) {
        if (text.includes("verdade dolorosa")) {
          return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
            "La vérité douloureuse sur $1 que personne ne veut admettre");
        } else if (text.includes("destruindo sua vida")) {
          return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
            "Pourquoi $1 pourrait détruire votre vie sans que vous le sachiez");
        } else {
          return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
            "La lutte silencieuse de vivre avec $1 quotidiennement");
        }
      } else if (isHopeTitle) {
        if (text.includes("maneiras de transformar")) {
          return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
            "façons de transformer $1 en opportunités de croissance");
        } else if (text.includes("superei")) {
          return text.replace(/Como superei (.*) e você também pode/i, 
            "Comment j'ai surmonté $1 et vous pouvez aussi");
        } else {
          return text.replace(/poder transformador de (.*) na sua jornada/i, 
            "Le pouvoir transformateur de $1 dans votre voyage");
        }
      } else if (isCuriosityTitle) {
        if (text.includes("segredo oculto")) {
          return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
            "Le secret caché derrière $1 que personne ne dit");
        } else if (text.includes("fatos surpreendentes")) {
          return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
            "Connaissez-vous ces 5 faits surprenants sur $1?");
        } else {
          return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
            "Le mystère non résolu de $1 que les experts ne peuvent expliquer");
        }
      }
      return `Le contenu sur ${keyword} traduit en français`;
    }
    
    return text;
  };

  const translateTitle = (variation: TitleVariation, index: number) => {
    // Make sure we're accessing the right property for the title text
    const titleText = variation.text || variation.title;
    const currentLanguage = variation.language || "pt";
    
    const languages = (["pt", "es", "en", "fr"] as const).filter(
      lang => lang !== currentLanguage
    );

    const translations = languages.map(lang => {
      const translatedText = translateText(titleText, lang);
      let prefixedText = "";
      
      if (lang === "pt") {
        prefixedText = `[Português] ${translatedText}`;
      } else if (lang === "es") {
        prefixedText = `[Español] ${translatedText}`;
      } else if (lang === "en") {
        prefixedText = `[English] ${translatedText}`;
      } else {
        prefixedText = `[Français] ${translatedText}`;
      }
      
      return { text: prefixedText, language: lang };
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
    const titleText = titlesToDisplay.map(v => v.text || v.title).join('\n\n');
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
        return (a.type || '').localeCompare(b.type || '');
      } else if (sortBy === "saturation") {
        const satOrder = { low: 1, medium: 2, high: 3 };
        return satOrder[a.saturation || 'medium'] - satOrder[b.saturation || 'medium'];
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
            const titleText = variation.text || variation.title;
            
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
                    <p className="text-base">{titleText}</p>
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
                      onClick={() => copyToClipboard(titleText, id)}
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
