import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import ApiKeyHeader from '@/components/search/ApiKeyHeader';
import ErrorDisplay from '@/components/search/ErrorDisplay';
import LoadingAndEmptyStates from '@/components/search/LoadingAndEmptyStates';
import NewKeyNotice from '@/components/search/NewKeyNotice';
import { markKeyAsNotNew } from '@/services/youtube/validators/key-validator';
import Footer from '@/components/Footer';

const Search = () => {
  const { 
    handleSearch, 
    isLoading, 
    results, 
    searchParams, 
    selectedVideo, 
    setSelectedVideo,
    error,
    isNewKey,
    forceSearchWithCurrentKey
  } = useYouTubeSearch();
  
  const { youtubeApiKey, setNeedsApiKey } = useAuth();
  const [forceNotNew, setForceNotNew] = useState(false);

  useEffect(() => {
    // Verificar se a chave já é conhecida
    if (youtubeApiKey) {
      const keyMarker = localStorage.getItem(`apiKey_${youtubeApiKey.substring(0, 8)}_added`);
      if (keyMarker) {
        const keyAge = (Date.now() - parseInt(keyMarker)) / (1000 * 60);
        console.log(`Chave API detectada no localStorage com idade de ${keyAge} minutos`);
        if (keyAge > 20) {
          setForceNotNew(true);
        }
      } else {
        console.log("Chave API não encontrada no localStorage");
      }
    }
  }, [youtubeApiKey]);

  const handleRetry = () => {
    if (searchParams) {
      // Passar o parâmetro para não considerar a chave como nova
      handleSearch(searchParams, forceNotNew);
    }
  };

  const handleForceSearch = () => {
    if (searchParams) {
      // Marcar a chave como não nova no localStorage
      if (youtubeApiKey) {
        markKeyAsNotNew(youtubeApiKey);
        setForceNotNew(true);
      }
      forceSearchWithCurrentKey();
    }
  };

  if (!youtubeApiKey) {
    return (
      <div className="min-h-screen flex flex-col w-full pb-32">
        <Header />
        <div className="w-full px-4 md:px-8 py-6">
          <Alert variant="destructive" className="mt-8 shadow-lg">
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full pb-32">
      <Header />
      
      <div className="w-full px-4 md:px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={(params) => handleSearch(params, forceNotNew)} isLoading={isLoading} />
        
        <NewKeyNotice 
          isNewKey={isNewKey && !forceNotNew} 
          onRetry={handleRetry}
        />
        
        <ErrorDisplay 
          error={error}
          onForceSearch={handleForceSearch}
          onRetry={handleRetry}
          onChangeApiKey={() => setNeedsApiKey(true)}
        />
        
        {results && results.length > 0 && (
          <div className="mt-8 w-full">
            <ResultsSection 
              results={results} 
              selectedVideo={selectedVideo} 
              onSelectVideo={setSelectedVideo} 
              searchParams={searchParams}
            />
          </div>
        )}
        
        <LoadingAndEmptyStates 
          isLoading={isLoading}
          hasResults={results?.length > 0}
          hasSearchParams={!!searchParams}
          error={error}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;
