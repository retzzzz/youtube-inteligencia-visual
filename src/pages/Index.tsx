
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Edit } from "lucide-react";
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
        
        {!results.length && !isLoading && (
          <Card className="p-6 text-center">
            <h2 className="text-xl font-medium mb-4">Bem-vindo ao YT Analyzer</h2>
            <p className="text-muted-foreground mb-6">
              Use o formulário acima para pesquisar conteúdo no YouTube ou explore nossas outras ferramentas:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto">
              <Link to="/video-analyzer">
                <Button variant="outline" className="w-full h-auto py-4 px-6">
                  <Youtube className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Analisar Vídeo</div>
                    <div className="text-sm text-muted-foreground">
                      Analise um vídeo específico
                    </div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/title-generator">
                <Button variant="outline" className="w-full h-auto py-4 px-6">
                  <Edit className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Gerador de Títulos</div>
                    <div className="text-sm text-muted-foreground">
                      Crie títulos criativos
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
