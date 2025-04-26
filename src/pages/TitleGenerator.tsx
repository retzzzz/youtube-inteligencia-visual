
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Translate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import ApiKeyDialog from "@/components/ApiKeyDialog";

const TitleGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<{ [key: string]: string[] }>({
    emotional: [],
    curiosity: [],
    translated: []
  });
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  const generateTitles = async () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulated title generation - replace with API call later
      const emotionalTitles = [
        `7 sinais misteriosos de que ${keyword}`,
        `A verdade surpreendente sobre ${keyword}`,
        `O que ninguém te contou sobre ${keyword}`,
      ];
      
      const curiosityTitles = [
        `Descubra por que ${keyword} pode mudar sua vida`,
        `O segredo que ${keyword} esconde de você`,
        `Como ${keyword} afeta seu destino?`,
      ];
      
      const translatedTitles = [
        `The hidden truth about ${keyword}`,
        `Why ${keyword} matters more than you think`,
        `7 signs that ${keyword} is affecting you`,
      ];
      
      setTitles({
        emotional: emotionalTitles,
        curiosity: curiosityTitles,
        translated: translatedTitles
      });
      
      toast({
        title: "Títulos gerados!",
        description: "Confira as sugestões abaixo.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar títulos",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Título copiado para área de transferência!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <ApiKeyDialog />
      <Header />
      
      <Card className="p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Gerador de Títulos Inteligentes</h1>
        <p className="text-muted-foreground mb-6">
          Digite uma palavra-chave ou ideia para gerar variações criativas de títulos em diferentes formatos e idiomas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Digite uma palavra-chave ou ideia..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow"
            disabled={isGenerating}
          />
          <Button 
            onClick={generateTitles}
            disabled={!keyword.trim() || isGenerating}
            className="min-w-[120px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              "Gerar Títulos"
            )}
          </Button>
        </div>
      </Card>

      {(titles.emotional.length > 0 || titles.curiosity.length > 0 || titles.translated.length > 0) && (
        <Card className="p-6">
          <Tabs defaultValue="emotional">
            <TabsList className="mb-4">
              <TabsTrigger value="emotional">😊 Emocionais</TabsTrigger>
              <TabsTrigger value="curiosity">🤔 Curiosidade</TabsTrigger>
              <TabsTrigger value="translated">🌎 Em Inglês</TabsTrigger>
            </TabsList>
            
            {Object.entries({
              emotional: "Títulos com Apelo Emocional",
              curiosity: "Títulos que Despertam Curiosidade",
              translated: "Títulos em Inglês"
            }).map(([key, label]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium mb-3">{label}</h3>
                  {titles[key].map((title, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <p className="flex-1">{title}</p>
                      <div className="flex gap-2">
                        {key === "translated" && (
                          <Badge variant="outline" className="mr-2">
                            <Translate className="h-3 w-3 mr-1" />
                            EN
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(title)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default TitleGenerator;
