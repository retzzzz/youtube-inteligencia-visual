
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';
import { AlertCircle, Key, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
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
    error,
    isNewKey,
    tryWithNewKey,
    forceSearchWithCurrentKey
  } = useYouTubeSearch();
  
  const { youtubeApiKey, setNeedsApiKey } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Efeito para lidar com parâmetros na URL
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
        
        // Forçar a busca novamente ao trocar de API key
        handleSearch(loadedParams);
      } catch (error) {
        console.error("Erro ao carregar parâmetros da URL:", error);
      }
    }
  }, [location.search, youtubeApiKey]);

  // Função para modificar a chave API quando necessário
  const handleChangeApiKey = () => {
    setNeedsApiKey(true);
  };

  // Função para tentar novamente com a mesma chave
  const handleRetry = () => {
    if (searchParams) {
      handleSearch(searchParams);
    }
  };
  
  // Função para forçar a busca ignorando avisos de quota
  const handleForceSearch = () => {
    forceSearchWithCurrentKey();
  };

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
      
      {youtubeApiKey && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Usando chave API: {youtubeApiKey.substring(0, 5)}...{youtubeApiKey.substring(youtubeApiKey.length - 4)}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={handleRetry}
              disabled={isLoading || !searchParams}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Tentar novamente
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={handleChangeApiKey}
            >
              <Key className="h-3 w-3 mr-1" /> Alterar chave API
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {isNewKey && (
          <Alert className="mt-6 bg-blue-50 border-blue-300">
            <Clock className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              <strong>Chave API recém-criada detectada!</strong> As chaves do Google Cloud podem levar alguns minutos para ativação completa. 
              Se estiver recebendo erros, aguarde 5-10 minutos e tente novamente.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex justify-between items-center w-full">
              <div>
                <span>{error}</span>
              </div>
              <div className="flex gap-2">
                {error.includes("quota") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleForceSearch}
                    className="ml-2 whitespace-nowrap"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                    Tentar mesmo assim
                  </Button>
                )}
                {error.includes("chave foi criada recentemente") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="ml-2 whitespace-nowrap"
                  >
                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                    Tentar novamente
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleChangeApiKey}
                  className="ml-2 whitespace-nowrap"
                >
                  Configurar nova chave
                </Button>
              </div>
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
