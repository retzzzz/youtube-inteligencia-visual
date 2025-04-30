
import { useState } from 'react';
import { VideoResult } from '@/types/youtube-types';
import { analyzeSearchResults, AIAnalysis } from '@/services/youtube/ai-insights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Sparkles, List, Grid3X3, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

  return (
    <Card className="p-4 md:p-6 space-y-4 overflow-hidden backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="text-primary h-6 w-6" />
          <h3 className="text-xl font-bold">Insights de IA</h3>
        </div>
        
        {!insights && !isLoading && (
          <Button onClick={handleAnalyzeContent}>
            <Sparkles className="h-4 w-4 mr-2" />
            Analisar com IA
          </Button>
        )}
      </div>

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
                  <span className="font-medium">Erro de cota na OpenAI:</span> A cota da API foi excedida. 
                  Verifique sua assinatura OpenAI ou atualize sua chave API nas configurações.
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
          <TabsList className="mb-4 bg-muted/60">
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
          </TabsList>
          
          <TabsContent value="patterns" className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-sm whitespace-pre-line">
              {insights.patterns}
            </div>
          </TabsContent>
          
          <TabsContent value="hooks" className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-sm whitespace-pre-line">
              {insights.emotionalHooks}
            </div>
          </TabsContent>
          
          <TabsContent value="structures" className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-sm whitespace-pre-line">
              {insights.titleStructures}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-sm whitespace-pre-line">
              {insights.titleSuggestions}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Clique em "Analisar com IA" para obter insights sobre os resultados desta pesquisa.</p>
          <p className="text-xs mt-2">A análise inclui padrões de conteúdo, ganchos emocionais, estruturas de título e sugestões.</p>
        </div>
      )}
    </Card>
  );
};

export default AIInsights;
