
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import TranslationIcon from './icons/TranslationIcon';
import { useToast } from '@/hooks/use-toast';

interface ScriptIdeasProps {
  ideas: string[];
  language?: string;
}

const ScriptIdeas = ({ ideas, language = 'pt' }: ScriptIdeasProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Ideia de roteiro copiada para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Check if the language is not Portuguese to determine if we need translations
  const needsTranslation = !language.toLowerCase().startsWith('pt');

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Ideias de Roteiro</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Sugestões para desenvolver roteiros baseados no tema do vídeo original.
      </p>
      
      <div className="space-y-4">
        {ideas.map((idea, index) => {
          const id = `idea-${index}`;
          const isCopied = copiedId === id;
          
          // Split the idea into original and translation if it contains "Tradução:"
          const hasTranslation = idea.includes("Tradução:");
          const [originalIdea, translation] = hasTranslation 
            ? idea.split("Tradução:") 
            : [idea, null];
          
          return (
            <div 
              key={id}
              className="p-4 rounded-md bg-muted/50 border hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <h4 className="font-medium">Ideia {index + 1}</h4>
                  <p className="text-sm whitespace-pre-wrap">{originalIdea.trim()}</p>
                  
                  {needsTranslation && (
                    <div className="mt-2 pt-2 border-t border-dashed border-border">
                      <div className="flex items-center gap-1 mb-1">
                        <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Tradução:</p>
                      </div>
                      <p className="text-sm whitespace-pre-wrap italic">
                        {translation ? translation.trim() : "Tradução não disponível"}
                      </p>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(originalIdea.trim(), id)}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ScriptIdeas;
