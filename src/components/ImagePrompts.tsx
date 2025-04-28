
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
        
        // Parse English and Portuguese sections
        let englishPrompt = '';
        let portuguesePrompt = '';
        
        if (prompt.includes("[EN]") && prompt.includes("[PT-BR]")) {
          const enParts = prompt.split("[EN]");
          const ptParts = prompt.split("[PT-BR]");
          
          englishPrompt = enParts[1]?.split("[PT-BR]")[0].trim() || prompt;
          portuguesePrompt = ptParts[1]?.trim() || "Tradução não disponível";
        } else {
          englishPrompt = prompt;
          portuguesePrompt = "Tradução não disponível";
        }
        
        return (
          <div 
            key={id}
            className="p-3 rounded-md bg-muted/50 border hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm whitespace-pre-wrap">[EN] {englishPrompt}</p>
                
                <div className="pt-2 border-t border-dashed border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Tradução:</p>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {portuguesePrompt}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(englishPrompt, id)}
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
