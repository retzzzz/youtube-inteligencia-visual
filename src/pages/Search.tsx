
import React from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';

const Search = () => {
  const { 
    handleSearch, 
    isLoading, 
    results, 
    searchParams, 
    selectedVideo, 
    setSelectedVideo 
  } = useYouTubeSearch();

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
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
        
        {!isLoading && results && results.length === 0 && searchParams && (
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
