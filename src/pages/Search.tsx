
import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ApiKeyHeader from '@/components/search/ApiKeyHeader';
import ErrorDisplay from '@/components/search/ErrorDisplay';
import LoadingAndEmptyStates from '@/components/search/LoadingAndEmptyStates';
import NewKeyNotice from '@/components/search/NewKeyNotice';

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

  const handleRetry = () => {
    if (searchParams) {
      handleSearch(searchParams);
    }
  };

  if (!youtubeApiKey) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <Header />
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <ApiKeyHeader 
        onRetry={handleRetry}
        isLoading={isLoading}
        hasSearchParams={!!searchParams}
        isNewKey={isNewKey}
      />
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        <NewKeyNotice 
          isNewKey={isNewKey} 
          onRetry={handleRetry}
        />
        
        <ErrorDisplay 
          error={error}
          onForceSearch={forceSearchWithCurrentKey}
          onRetry={handleRetry}
          onChangeApiKey={() => setNeedsApiKey(true)}
        />
        
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
        
        <LoadingAndEmptyStates 
          isLoading={isLoading}
          hasResults={results?.length > 0}
          hasSearchParams={!!searchParams}
          error={error}
        />
      </div>
    </div>
  );
};

export default Search;
