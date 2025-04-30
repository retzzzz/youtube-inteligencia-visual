
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Sparkles, Search, Globe, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TrendingTopic {
  title: string;
  value: number;
  category?: string;
  relatedVideos?: Array<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    views?: number;
    publishedAt?: string;
  }>;
}

interface TrendingRegion {
  code: string;
  name: string;
}

const regions: TrendingRegion[] = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'EUA' },
  { code: 'ES', name: 'Espanha' },
  { code: 'GLOBAL', name: 'Global' }
];

const TrendingTopicsSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('BR');
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const fetchTrendingTopics = async (region: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the edge function to get trending topics
      const { data, error } = await supabase.functions.invoke('trending-topics', {
        body: { region }
      });
      
      if (error) throw error;
      
      console.log('Trending topics received:', data);
      
      if (data?.topics && data.topics.length > 0) {
        setTrendingTopics(data.topics);
        setSelectedTopic(0); // Reset to first topic when region changes
        
        toast({
          title: "Tópicos atualizados",
          description: `Tópicos em alta para ${regions.find(r => r.code === region)?.name || region} carregados com sucesso.`,
          variant: "default",
        });
      } else {
        setTrendingTopics([]);
        setError('Nenhum tópico em alta encontrado para esta região.');
        
        toast({
          title: "Sem tópicos",
          description: `Não foi possível encontrar tópicos em alta para ${regions.find(r => r.code === region)?.name || region}.`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error fetching trending topics:', err);
      setError('Não foi possível carregar os tópicos em alta no momento.');
      setTrendingTopics([]);
      
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao carregar os tópicos em alta. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingTopics(selectedRegion);
  }, [selectedRegion]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSearchTopic = (topic: string) => {
    // Navigate to the search page with the topic pre-filled
    window.location.href = `/search?keywords=${encodeURIComponent(topic)}`;
  };

  const handleRefresh = () => {
    fetchTrendingTopics(selectedRegion);
  };

  return (
    <Card className="bg-gradient-to-b from-[#141b41]/50 to-[#1a1f40]/50 border-none shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-xl text-white">Tópicos em Alta</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {regions.map(region => (
              <Button 
                key={region.code}
                size="sm"
                variant={selectedRegion === region.code ? "secondary" : "ghost"}
                className="flex items-center gap-1 text-xs"
                onClick={() => handleRegionChange(region.code)}
              >
                <Globe className="h-3.5 w-3.5" />
                {region.name}
              </Button>
            ))}
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-blue-300/70 mb-3">{error}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fetchTrendingTopics(selectedRegion)}
            >
              Tentar Novamente
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {trendingTopics.slice(0, 10).map((topic, index) => (
                <Badge 
                  key={index} 
                  className={`${
                    selectedTopic === index 
                      ? 'bg-blue-500/40 text-blue-100 border-blue-400' 
                      : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'
                  } cursor-pointer flex items-center gap-1 transition-colors`}
                  onClick={() => {
                    setSelectedTopic(index);
                  }}
                >
                  <span className="text-xs font-normal">{index + 1}</span>
                  <span>{topic.title}</span>
                </Badge>
              ))}
            </div>
            
            {trendingTopics.length > 0 && (
              <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-800/30">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                  Dica de Criador
                </h3>
                <p className="text-sm text-blue-200/80">
                  Crie conteúdo sobre temas em alta para aumentar suas chances de alcançar novos espectadores. 
                  Clique em um tópico para ver vídeos relacionados ou pesquisar mais sobre o tema.
                </p>
              </div>
            )}
            
            {trendingTopics.length > 0 && trendingTopics[selectedTopic]?.relatedVideos?.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Vídeos populares sobre "{trendingTopics[selectedTopic].title}"</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {trendingTopics[selectedTopic].relatedVideos.slice(0, 2).map((video, idx) => (
                    <a 
                      key={idx}
                      href={`https://youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 h-10 bg-gray-800 rounded overflow-hidden">
                        {video.thumbnail && (
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs line-clamp-2">{video.title}</p>
                        <p className="text-[10px] text-blue-300/60">{video.channelTitle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-900/20 border-blue-700/30 hover:bg-blue-900/40"
                onClick={() => handleSearchTopic(trendingTopics[selectedTopic]?.title || "")}
              >
                <Search className="h-3.5 w-3.5 mr-1" />
                Pesquisar "{trendingTopics[selectedTopic]?.title || "YouTube"}"
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingTopicsSection;
