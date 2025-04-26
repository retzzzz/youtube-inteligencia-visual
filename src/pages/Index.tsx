
import React, { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import ResultsSection from "@/components/ResultsSection";
import SavedSearches from "@/components/SavedSearches";
import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";
import { YoutubeSearchParams } from "@/types/youtube-types";

const Index = () => {
  const { searchParams, results, isLoading, selectedVideo, setSelectedVideo, handleSearch } = useYouTubeSearch();

  const handleLoadSearch = (params: YoutubeSearchParams) => {
    handleSearch(params);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      
      <div className="grid gap-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          <div className="md:col-span-1">
            <SavedSearches currentSearch={searchParams} onLoadSearch={handleLoadSearch} />
          </div>
        </div>
        
        {results.length > 0 && (
          <ResultsSection 
            results={results} 
            selectedVideo={selectedVideo} 
            onSelectVideo={setSelectedVideo}
            searchParams={searchParams}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
