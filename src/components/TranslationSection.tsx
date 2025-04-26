
import React from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VideoTranslations } from '@/types/youtube-types';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TranslationSectionProps {
  translations: VideoTranslations;
}

const TranslationSection = ({ translations }: TranslationSectionProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${type} copiado para área de transferência.`,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Traduções</h3>
      
      <Tabs defaultValue="espanhol">
        <TabsList className="mb-4">
          <TabsTrigger value="espanhol">Espanhol</TabsTrigger>
          <TabsTrigger value="ingles">Inglês</TabsTrigger>
          <TabsTrigger value="frances">Francês</TabsTrigger>
          <TabsTrigger value="italiano">Italiano</TabsTrigger>
        </TabsList>
        
        <TabsContent value="espanhol">
          <TranslationContent 
            title={translations.spanish.title} 
            description={translations.spanish.description} 
            onCopy={copyToClipboard} 
            language="espanhol"
          />
        </TabsContent>
        
        <TabsContent value="ingles">
          <TranslationContent 
            title={translations.english.title} 
            description={translations.english.description} 
            onCopy={copyToClipboard} 
            language="inglês"
          />
        </TabsContent>
        
        <TabsContent value="frances">
          <TranslationContent 
            title={translations.french.title} 
            description={translations.french.description} 
            onCopy={copyToClipboard} 
            language="francês"
          />
        </TabsContent>
        
        <TabsContent value="italiano">
          <TranslationContent 
            title={translations.italian.title} 
            description={translations.italian.description} 
            onCopy={copyToClipboard} 
            language="italiano"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface TranslationContentProps {
  title: string;
  description: string;
  onCopy: (text: string, type: string) => void;
  language: string;
}

const TranslationContent = ({ title, description, onCopy, language }: TranslationContentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">Título em {language}</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onCopy(title, `Título em ${language}`)}
            className="h-7 px-2"
          >
            <Copy className="h-3.5 w-3.5 mr-1" /> Copiar
          </Button>
        </div>
        <p className="font-medium">{title}</p>
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">Descrição em {language}</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onCopy(description, `Descrição em ${language}`)}
            className="h-7 px-2"
          >
            <Copy className="h-3.5 w-3.5 mr-1" /> Copiar
          </Button>
        </div>
        <div className="bg-muted/50 p-3 rounded-md text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
          {description}
        </div>
      </div>
    </div>
  );
};

export default TranslationSection;
