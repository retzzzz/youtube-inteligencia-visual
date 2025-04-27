
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';
import ResultsSection from '@/components/ResultsSection';
import { VideoResult } from '@/types/youtube-types';

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
      </div>
    </div>
  );
};

export default Search;
