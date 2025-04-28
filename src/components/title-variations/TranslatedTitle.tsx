
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface TranslatedTitleProps {
  translation: {
    text: string;
    language: string;
  };
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

const TranslatedTitle = ({ translation, id, copiedId, onCopy }: TranslatedTitleProps) => {
  const translationId = `${id}-translation-${translation.language}`;
  
  return (
    <div 
      className="flex justify-between items-center p-3 rounded-md bg-muted/30"
    >
      <p className="flex-1 mr-4 text-sm">{translation.text}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onCopy(translation.text, translationId)}
        className="h-8 w-8 p-0"
      >
        {copiedId === translationId ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default TranslatedTitle;
