
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Languages } from 'lucide-react';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';
import TitleBadges from './TitleBadges';
import TranslatedTitle from './TranslatedTitle';

interface TitleItemProps {
  variation: TitleVariation;
  index: number;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  onTranslate: (variation: TitleVariation, index: number) => void;
}

const TitleItem = ({ 
  variation, 
  index, 
  copiedId, 
  onCopy,
  onTranslate 
}: TitleItemProps) => {
  const id = `title-${index}`;
  const isCopied = copiedId === id;
  const titleText = variation.text || variation.title;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors">
        <div className="flex-1 mr-4">
          <TitleBadges 
            type={variation.type}
            saturation={variation.saturation}
            language={variation.language}
          />
          <p className="text-base">{titleText}</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTranslate(variation, index)}
            className="h-8 px-2"
          >
            <Languages className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(titleText, id)}
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
            <TranslatedTitle
              key={`${id}-translation-${tIndex}`}
              translation={translation}
              id={id}
              copiedId={copiedId}
              onCopy={onCopy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleItem;
