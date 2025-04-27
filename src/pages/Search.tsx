
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Search = () => {
  const { 
    handleSearch, 
    isLoading, 
    results, 
    searchParams, 
    selectedVideo, 
    setSelectedVideo,
    error 
  } = useYouTubeSearch();
  
  const { youtubeApiKey, setNeedsApiKey } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Se não houver chave de API, mostrar o diálogo
    if (!youtubeApiKey) {
      setNeedsApiKey(true);
      return;
    }

    const query = new URLSearchParams(location.search);
    const paramsString = query.get('params');
    
    if (paramsString) {
      try {
        const loadedParams = JSON.parse(decodeURIComponent(paramsString));
        console.log("Parâmetros carregados da URL:", loadedParams);
        handleSearch(loadedParams);
      } catch (error) {
        console.error("Erro ao carregar parâmetros da URL:", error);
      }
    }
  }, [location.search, youtubeApiKey]);

  if (!youtubeApiKey) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <Header />
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            É necessário configurar uma chave de API do YouTube para usar esta ferramenta.
            <Button
              variant="link"
              className="p-0 h-auto ml-2"
              onClick={() => setNeedsApiKey(true)}
            >
              Configurar chave API
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              {error.includes("API") && (
                <Button
                  variant="link"
                  className="p-0 h-auto ml-2"
                  onClick={() => setNeedsApiKey(true)}
                >
                  Configurar chave API
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        {results && results.length > 0 && (
          <div className="mt-8">
            <ResultsSection 
              results={results} 
              selectedVideo={selectedVideo} 
              onSelectVideo={setSelectedVideo} 
              searchParams={searchParams}
            />
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!isLoading && results && results.length === 0 && searchParams && !error && (
          <div className="text-center p-12">
            <p className="text-xl font-medium">Nenhum resultado encontrado</p>
            <p className="text-muted-foreground mt-2">Tente ajustar seus critérios de pesquisa</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
