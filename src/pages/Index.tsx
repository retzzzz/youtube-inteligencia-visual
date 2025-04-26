
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import SavedSearches from "@/components/SavedSearches";
import ResultsSection from "@/components/ResultsSection";
import WelcomeMessage from "@/components/WelcomeMessage";
import SaturationIndicator from "@/components/SaturationIndicator";
import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { analyzeSaturation } from "@/utils/formatters";

const Index = () => {
  const { 
    searchParams, 
    results, 
    isLoading, 
    selectedVideo, 
    setSelectedVideo, 
    handleSearch 
  } = useYouTubeSearch();

  const handleLoadSearch = (params: YoutubeSearchParams) => {
    handleSearch(params);
  };

  const saturationAnalysis = searchParams?.keywords && results.length > 0
    ? analyzeSaturation(results, searchParams.keywords)
    : null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          {saturationAnalysis && (
            <SaturationIndicator 
              status={saturationAnalysis.status}
              message={saturationAnalysis.message}
              count={saturationAnalysis.count}
              keyword={searchParams?.keywords || ''}
            />
          )}
        </div>
        
        <div>
          <SavedSearches currentSearch={searchParams} onLoadSearch={handleLoadSearch} />
        </div>
      </div>

      {results.length > 0 ? (
        <ResultsSection 
          results={results}
          selectedVideo={selectedVideo}
          onSelectVideo={setSelectedVideo}
          searchParams={searchParams}
        />
      ) : !isLoading && (
        <WelcomeMessage />
      )}
    </div>
  );
};

export default Index;
