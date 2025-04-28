
import React from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VideoTranslations } from '@/types/youtube-types';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import TranslationIcon from './icons/TranslationIcon';
import { useToast } from '@/hooks/use-toast';

interface TranslationSectionProps {
  translations: VideoTranslations;
  originalLanguage: string;
}

const TranslationSection = ({ translations, originalLanguage }: TranslationSectionProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${type} copiado para área de transferência.`,
    });
  };

  const getLanguageLabel = (code: string): string => {
    switch(code.toLowerCase()) {
      case 'es': return 'Espanhol';
      case 'en': return 'Inglês';
      case 'fr': return 'Francês';
      case 'it': return 'Italiano';
      case 'pt': return 'Português';
      default: return code;
    }
  };

  const isOriginalLanguage = (code: string): boolean => {
    return originalLanguage.toLowerCase().startsWith(code.toLowerCase());
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
            isOriginal={isOriginalLanguage('es')}
          />
        </TabsContent>
        
        <TabsContent value="ingles">
          <TranslationContent 
            title={translations.english.title} 
            description={translations.english.description} 
            onCopy={copyToClipboard} 
            language="inglês"
            isOriginal={isOriginalLanguage('en')}
          />
        </TabsContent>
        
        <TabsContent value="frances">
          <TranslationContent 
            title={translations.french.title} 
            description={translations.french.description} 
            onCopy={copyToClipboard} 
            language="francês"
            isOriginal={isOriginalLanguage('fr')}
          />
        </TabsContent>
        
        <TabsContent value="italiano">
          <TranslationContent 
            title={translations.italian.title} 
            description={translations.italian.description} 
            onCopy={copyToClipboard} 
            language="italiano"
            isOriginal={isOriginalLanguage('it')}
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
  isOriginal: boolean;
}

const TranslationContent = ({ title, description, onCopy, language, isOriginal }: TranslationContentProps) => {
  // Clean the title, removing any prefix markers like [lang]:
  const cleanTitle = title.replace(/^\[(.*?)\]\s*/, '');
  
  // Extract Portuguese translation if present
  const hasPortuguese = title.includes('PT-BR:');
  const portugueseTitle = hasPortuguese 
    ? title.split('PT-BR:')[1].trim() 
    : '';
  
  const shouldShowTranslation = !isOriginal && language.toLowerCase() !== 'português';
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {isOriginal ? `Título original (${language})` : `Título em ${language}`}
          </h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onCopy(cleanTitle, `Título em ${language}`)}
            className="h-7 px-2"
          >
            <Copy className="h-3.5 w-3.5 mr-1" /> Copiar
          </Button>
        </div>
        <p className="font-medium">{cleanTitle}</p>
        
        {shouldShowTranslation && (
          <div className="mt-2 flex items-start gap-2">
            <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground mt-1" />
            <p className="text-sm text-muted-foreground">
              Tradução: {portugueseTitle || "Tradução não disponível"}
            </p>
          </div>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {isOriginal ? `Descrição original (${language})` : `Descrição em ${language}`}
          </h4>
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
        
        {shouldShowTranslation && (
          <div className="mt-2">
            <div className="flex items-start gap-2 mb-1">
              <TranslationIcon className="h-3.5 w-3.5 text-muted-foreground mt-1" />
              <p className="text-sm text-muted-foreground">Tradução:</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-md text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
              {description.includes('PT-BR:') 
                ? description.split('PT-BR:')[1].trim() 
                : 'Tradução não disponível'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationSection;
