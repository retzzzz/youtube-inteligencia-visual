
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TrendingTopic } from './trending/types';

// Import the new components
import RegionSelector from './trending/RegionSelector';
import TopicsList from './trending/TopicsList';
import RelatedVideos from './trending/RelatedVideos';
import CreatorTip from './trending/CreatorTip';
import SearchTopicButton from './trending/SearchTopicButton';
import LoadingState from './trending/LoadingState';
import ErrorState from './trending/ErrorState';

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
          description: `Tópicos em alta para ${region} carregados com sucesso.`,
          variant: "default",
        });
      } else {
        setTrendingTopics([]);
        setError('Nenhum tópico em alta encontrado para esta região.');
        
        toast({
          title: "Sem tópicos",
          description: `Não foi possível encontrar tópicos em alta para ${region}.`,
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
          <RegionSelector 
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={() => fetchTrendingTopics(selectedRegion)} />
        ) : (
          <div className="space-y-4">
            <TopicsList 
              topics={trendingTopics} 
              selectedTopic={selectedTopic} 
              onSelectTopic={setSelectedTopic} 
            />
            
            {trendingTopics.length > 0 && <CreatorTip />}
            
            {trendingTopics.length > 0 && trendingTopics[selectedTopic] && (
              <RelatedVideos topic={trendingTopics[selectedTopic]} />
            )}

            {trendingTopics.length > 0 && (
              <SearchTopicButton 
                topic={trendingTopics[selectedTopic]?.title || ""} 
                onSearch={handleSearchTopic}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingTopicsSection;
