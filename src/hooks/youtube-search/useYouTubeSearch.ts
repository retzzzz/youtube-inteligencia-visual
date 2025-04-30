
import { useState } from "react";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchQueries } from "./useSearchQueries";
import { useApiKeyManagement } from "./useApiKeyManagement";
import { useErrorHandling } from "./useErrorHandling";

export const useYouTubeSearch = () => {
  const { youtubeApiKey, setYoutubeApiKey, setNeedsApiKey } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  
  const {
    searchParams,
    results,
    isLoading,
    selectedVideo,
    setSelectedVideo,
    performSearch
  } = useSearchQueries();
  
  const {
    isNewKey,
    validateKey,
    forceKeyAsNotNew
  } = useApiKeyManagement(youtubeApiKey);
  
  const { handleSearchError } = useErrorHandling();

  const handleSearch = async (params: YoutubeSearchParams, forceNotNew: boolean = false) => {
    setError(null);
    
    if (!youtubeApiKey) {
      toast({
        title: "Chave de API não fornecida",
        description: "É necessário fornecer uma chave de API válida do YouTube para buscar resultados.",
        variant: "destructive",
      });
      setNeedsApiKey(true);
      return;
    }
    
    try {
      // Validate API key first
      const keyValidation = await validateKey(youtubeApiKey, forceNotNew);
      
      if (!keyValidation.isValid) {
        toast({
          title: "Chave de API inválida",
          description: keyValidation.message,
          variant: "destructive",
        });
        setNeedsApiKey(true);
        setError(keyValidation.message);
        return;
      }
      
      // Check quota exceeded
      if (keyValidation.quotaExceeded) {
        console.log("Quota excedida, exibindo erro ao usuário");
        setError("Quota da API do YouTube excedida. Por favor, use outra chave API ou tente novamente após 24 horas quando a quota for renovada.");
        
        toast({
          title: "Quota da API excedida",
          description: "A quota diária desta chave de API foi excedida. Por favor, use outra chave ou tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }
      
      // Use the stored API key
      params.apiKey = youtubeApiKey;
      
      // Perform the search
      await performSearch(params, forceNotNew);
      
    } catch (error) {
      handleSearchError(error, forceNotNew, setError);
    }
  };
  
  const tryWithNewKey = () => {
    setNeedsApiKey(true);
  };
  
  const forceSearchWithCurrentKey = async () => {
    if (!searchParams || !youtubeApiKey) return;
    
    try {
      forceKeyAsNotNew(youtubeApiKey);
      
      const params = {...searchParams, apiKey: youtubeApiKey};
      console.log("Forçando busca com chave atual:", youtubeApiKey.substring(0, 5) + "..." + youtubeApiKey.substring(youtubeApiKey.length - 4));
      
      // Try searching directly, ignoring previous validations
      const result = await performSearch(params, true);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error("Erro ao forçar busca:", error);
      setError(error instanceof Error ? error.message : "Erro na busca forçada");
      
      toast({
        title: "Erro na pesquisa",
        description: error instanceof Error 
          ? (error.message.includes("quota") 
             ? "Mesmo forçando a busca, a quota da API está realmente excedida. Por favor, use outra chave API." 
             : error.message) 
          : "Erro desconhecido ao buscar dados",
        variant: "destructive",
      });
    }
  };

  return {
    searchParams,
    results,
    isLoading,
    selectedVideo,
    setSelectedVideo,
    handleSearch,
    error,
    isNewKey,
    tryWithNewKey,
    forceSearchWithCurrentKey
  };
};
