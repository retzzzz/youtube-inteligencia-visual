
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
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
        
        return (
          <div 
            key={id}
            className="p-3 rounded-md bg-muted/50 border hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm flex-1 whitespace-pre-wrap">{prompt}</p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(prompt, id)}
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
