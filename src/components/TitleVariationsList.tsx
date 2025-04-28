
import React, { useState } from 'react';
import { Card } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { TitleVariation } from '@/types/youtube-types';
import { translateText } from './title-variations/titleUtils';
import TitleVariationHeader from './title-variations/TitleVariationHeader';
import TitleVariationFilters from './title-variations/TitleVariationFilters';
import TitleItem from './title-variations/TitleItem';
import TitleFooter from './title-variations/TitleFooter';

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
        const satOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
        return (satOrder[a.saturation || 'medium'] || 0) - (satOrder[b.saturation || 'medium'] || 0);
      }
      return 0;
    });
    
    return filtered;
  };

  const filteredVariations = getFilteredAndSortedVariations();

  return (
    <Card className="p-6">
      <TitleVariationHeader 
        variationsCount={variations.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCopyAllTitles={copyAllTitles}
      />
      
      <TitleVariationFilters 
        variations={variations}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {filteredVariations.length > 0 ? (
        <div className="space-y-3">
          {filteredVariations.map((variation, index) => (
            <TitleItem 
              key={`title-${index}`}
              variation={variation}
              index={index}
              copiedId={copiedId}
              onCopy={copyToClipboard}
              onTranslate={translateTitle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Nenhuma variação encontrada com os filtros atuais
        </div>
      )}
      
      <TitleFooter
        variationsCount={filteredVariations.length}
        totalCount={totalCount}
        onGenerateMore={onGenerateMore}
      />
    </Card>
  );
};

export default TitleVariationsList;
