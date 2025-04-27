
import React from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';

const Search = () => {
  const { search, isLoading, results } = useYouTubeSearch();

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Pesquisa Avançada</h2>
        <SearchForm onSearch={search} isLoading={isLoading} />
        
        {results && results.length > 0 && (
          <div className="mt-8">
            {/* Display your search results here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
