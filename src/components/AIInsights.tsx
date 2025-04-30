
import { useState } from 'react';
import { VideoResult } from '@/types/youtube-types';
import { analyzeSearchResults, AIAnalysis } from '@/services/youtube/ai-insights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Sparkles, List, Grid3X3, AlertCircle, RefreshCw, LineChart, Flame, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CopyableText from './script-generator/output/CopyableText';
import { Badge } from './ui/badge';

interface AIInsightsProps {
  results: VideoResult[];
  searchTerms: string;
}

const AIInsights = ({ results, searchTerms }: AIInsightsProps) => {
  const [insights, setInsights] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeContent = async () => {
    setIsLoading(true);
    try {
      const analysis = await analyzeSearchResults(searchTerms, results);
      setInsights(analysis);
    } catch (error) {
      console.error('Erro ao analisar conteúdo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format text sections properly
  const formatSection = (text: string) => {
    // Format titles and subtitles for better readability
    const formattedText = text
      .replace(/(\*\*[\w\s]+:?\*\*)/g, '<h4 class="font-bold text-primary my-3">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/([\d]+\.)/g, '<span class="text-primary font-bold">$1</span>')
      .replace(/^-\s(.*)/gm, '<li class="ml-4">$1</li>')
      .replace(/^([•●])\s(.*)/gm, '<li class="ml-4">$2</li>');
      
    return formattedText;
  };

  return (
    <Card className="p-4 md:p-6 space-y-4 overflow-hidden shadow-lg">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="text-primary h-6 w-6" />
            <CardTitle className="text-xl">Insights de IA</CardTitle>
          </div>
          
          {!insights && !isLoading && (
            <Button onClick={handleAnalyzeContent} size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Analisar com IA
            </Button>
          )}
        </div>
      </CardHeader>

      {isLoading ? (
        <div className="space-y-4 py-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      ) : insights?.error ? (
        <div className="text-center py-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="ml-2">
              {insights.error.includes("cota") || insights.error.includes("quota") ? (
                <>
                  <span className="font-medium">Erro de cota na API:</span> A cota da API foi excedida. 
                  Verifique sua assinatura ou atualize sua chave API nas configurações.
                </>
              ) : (
                insights.error
              )}
            </AlertDescription>
          </Alert>
          <Button variant="outline" size="sm" onClick={handleAnalyzeContent} className="mt-2">
            <RefreshCw className="h-3 w-3 mr-2" />
            Tentar novamente
          </Button>
        </div>
      ) : insights ? (
        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="mb-4 bg-muted/60 w-full grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="patterns" className="flex items-center gap-1">
              <List className="h-3 w-3" /> Padrões
            </TabsTrigger>
            <TabsTrigger value="hooks" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Ganchos
            </TabsTrigger>
            <TabsTrigger value="structures" className="flex items-center gap-1">
              <Grid3X3 className="h-3 w-3" /> Estruturas
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Sugestões
            </TabsTrigger>
            <TabsTrigger value="niches" className="flex items-center gap-1">
              <Flame className="h-3 w-3" /> Nichos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patterns">
            <CardContent className="px-0 pt-0">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <List className="h-4 w-4 mr-2" />
                Padrões Observados
              </h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: formatSection(insights.patterns) }}
              />
              <CopyableText 
                text={insights.patterns.replace(/\*\*/g, '')} 
                id="patterns" 
                className="hidden" 
              />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="hooks">
            <CardContent className="px-0 pt-0">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ganchos Emocionais
              </h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: formatSection(insights.emotionalHooks) }}
              />
              <CopyableText 
                text={insights.emotionalHooks.replace(/\*\*/g, '')} 
                id="hooks" 
                className="hidden" 
              />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="structures">
            <CardContent className="px-0 pt-0">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Estruturas de Títulos Eficazes
              </h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: formatSection(insights.titleStructures) }}
              />
              <CopyableText 
                text={insights.titleStructures.replace(/\*\*/g, '')} 
                id="structures" 
                className="hidden" 
              />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <CardContent className="px-0 pt-0">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Sugestões de Títulos
              </h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: formatSection(insights.titleSuggestions) }}
              />
              <CopyableText 
                text={insights.titleSuggestions.replace(/\*\*/g, '')} 
                id="suggestions" 
                className="hidden" 
              />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="niches">
            <CardContent className="px-0 pt-0">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <Flame className="h-4 w-4 mr-2" />
                Categorização de Nichos
              </h3>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: formatSection(insights.niches) }}
              />
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Subnichos em Crescimento:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {insights.niches.match(/([^:,\n]+?)(?=,|\n|$)/g)?.filter(niche => 
                    !niche.includes("Categorização") && 
                    niche.trim().length > 0 && 
                    !niche.match(/^[\d\.]+$/)
                  ).map((niche, i) => (
                    <Badge key={i} className="bg-primary/10 text-primary border-primary hover:bg-primary/20">
                      {niche.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              <CopyableText 
                text={insights.niches.replace(/\*\*/g, '')} 
                id="niches" 
                className="hidden" 
              />
            </CardContent>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Clique em "Analisar com IA" para obter insights sobre os resultados desta pesquisa.</p>
          <p className="text-xs mt-2">A análise focará em canais novos em crescimento, tendências, nichos e micronichos relacionados à sua pesquisa.</p>
        </div>
      )}
    </Card>
  );
};

export default AIInsights;
