
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TitleVariationsProps {
  variations: {
    emotional: string[];
    structural: string[];
    multilingual: string[];
  };
}

const TitleVariations = ({ variations }: TitleVariationsProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Variações de Título</h3>
      
      <div className="space-y-6">
        <TitleVariationSection 
          title="Variações Emocionais" 
          description="Títulos que enfatizam diferentes emoções"
          variations={variations.emotional}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
        
        <TitleVariationSection 
          title="Variações Estruturais" 
          description="Títulos com estruturas diferentes (números, perguntas, etc.)"
          variations={variations.structural}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
        
        <TitleVariationSection 
          title="Variações Multilíngue" 
          description="Títulos alternativos em outros idiomas"
          variations={variations.multilingual}
          copyToClipboard={copyToClipboard}
          copiedId={copiedId}
        />
      </div>
    </Card>
  );
};

interface TitleVariationSectionProps {
  title: string;
  description: string;
  variations: string[];
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
}

const TitleVariationSection = ({ 
  title, 
  description, 
  variations, 
  copyToClipboard,
  copiedId
}: TitleVariationSectionProps) => {
  return (
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      <div className="space-y-2">
        {variations.map((variation, index) => {
          const id = `${title}-${index}`;
          const isCopied = copiedId === id;
          
          return (
            <div 
              key={id}
              className="flex justify-between items-center p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <p className="flex-1 mr-2">{variation}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(variation, id)}
                className="h-8 w-8 p-0"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleVariations;
