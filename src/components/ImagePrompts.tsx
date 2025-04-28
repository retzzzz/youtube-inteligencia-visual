
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import TranslationIcon from './icons/TranslationIcon';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ImagePromptsProps {
  thumbnailPrompts: string[];
  supportPrompts: string[];
}

const ImagePrompts = ({ thumbnailPrompts, supportPrompts }: ImagePromptsProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Prompt de imagem copiado para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Convert prompts to English and add Portuguese translation
  const formatPromptWithTranslation = (prompt: string): { english: string, portuguese: string } => {
    // If the prompt already has a translation marked
    if (prompt.includes("[EN]") && prompt.includes("[PT-BR]")) {
      const parts = prompt.split("[PT-BR]");
      return {
        english: parts[0].replace("[EN]", "").trim(),
        portuguese: parts[1].trim()
      };
    }
    
    // Default case - return the original as English and add a placeholder translation
    return {
      english: `[EN] ${prompt}`,
      portuguese: `[PT-BR] Traduza este prompt para português`
    };
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Prompts para Imagens</h3>
      
      <Tabs defaultValue="thumbnails">
        <TabsList className="mb-4">
          <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
          <TabsTrigger value="support">Imagens de Apoio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="thumbnails">
          <div className="space-y-1 mb-4">
            <h4 className="font-medium">Prompts para Thumbnails</h4>
            <p className="text-sm text-muted-foreground">Use estes prompts para gerar thumbnails chamativas para seu vídeo.</p>
          </div>
          
          <PromptList
            prompts={thumbnailPrompts}
            copyToClipboard={copyToClipboard}
            copiedId={copiedId}
            prefix="thumb"
          />
        </TabsContent>
        
        <TabsContent value="support">
          <div className="space-y-1 mb-4">
            <h4 className="font-medium">Prompts para Imagens de Apoio</h4>
            <p className="text-sm text-muted-foreground">Use estes prompts para gerar imagens que podem ser usadas no interior do vídeo.</p>
          </div>
          
          <PromptList
            prompts={supportPrompts}
            copyToClipboard={copyToClipboard}
            copiedId={copiedId}
            prefix="support"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface PromptListProps {
  prompts: string[];
  copyToClipboard: (text: string, id: string) => void;
  copiedId: string | null;
  prefix: string;
}

const PromptList = ({ prompts, copyToClipboard, copiedId, prefix }: PromptListProps) => {
  return (
    <div className="space-y-3">
      {prompts.map((prompt, index) => {
        const id = `${prefix}-${index}`;
        const isCopied = copiedId === id;
        
        // Format prompt to have English and Portuguese versions
        const formattedPrompt = prompt.includes("[EN]") ? 
          prompt : `[EN] ${prompt}`;
        
        // Extract Portuguese translation if it exists
        const translation = prompt.includes("[PT-BR]") ? 
          prompt.split("[PT-BR]")[1].trim() : 
          "Tradução não disponível";
        
        return (
          <div 
            key={id}
            className="p-3 rounded-md bg-muted/50 border hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm whitespace-pre-wrap">{formattedPrompt}</p>
                
                <div className="pt-2 border-t border-dashed border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Tradução:</p>
                  </div>
                  <p className="text-sm whitespace-pre-wrap italic">
                    {translation}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(formattedPrompt, id)}
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
  );
};

export default ImagePrompts;
