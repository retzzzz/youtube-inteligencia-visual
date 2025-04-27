
import { useState } from "react";
import { YoutubeSearchParams, VideoResult } from "@/types/youtube-types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { fetchYouTubeData } from "@/services/youtube";
import { validateApiKey } from "@/services/youtube/api-validator";

export const useYouTubeSearch = () => {
  const [searchParams, setSearchParams] = useState<YoutubeSearchParams | null>(null);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNewKey, setIsNewKey] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey, setYoutubeApiKey, setNeedsApiKey } = useAuth();

  const handleSearch = async (params: YoutubeSearchParams) => {
    setIsLoading(true);
    setSearchParams(params);
    setSelectedVideo(null);
    setError(null);
    setResults([]);
    setIsNewKey(false);

    try {
      // Verificações de API key
      if (!youtubeApiKey || youtubeApiKey.trim() === "") {
        toast({
          title: "Chave de API não fornecida",
          description: "É necessário fornecer uma chave de API válida do YouTube para buscar resultados.",
          variant: "destructive",
        });
        setNeedsApiKey(true);
        throw new Error("Chave de API não fornecida");
      }

      // Verificar a validade da chave API
      const validationResult = await validateApiKey(youtubeApiKey);
      
      if (!validationResult.valid) {
        toast({
          title: "Chave de API inválida",
          description: validationResult.message,
          variant: "destructive",
        });
        setNeedsApiKey(true);
        throw new Error(validationResult.message);
      }

      // Verificar se a mensagem indica uma chave nova
      if (validationResult.message.includes("chave nova")) {
        setIsNewKey(true);
        toast({
          title: "Chave API nova detectada",
          description: "Chaves recém-criadas podem levar alguns minutos para ficarem totalmente ativas. Prosseguindo com a busca.",
          variant: "default",
        });
      }

      // Verificar se a chave tem quota disponível
      if (validationResult.quotaExceeded) {
        toast({
          title: "Quota da API excedida",
          description: "A quota diária desta chave de API foi excedida. Por favor, use outra chave ou tente novamente mais tarde.",
          variant: "destructive",
        });
        
        // Permitir que o usuário continue tentando, mas mostrar o erro
        setError("Quota da API do YouTube excedida. Por favor, use outra chave API.");
        
        // Não interromper completamente o fluxo - usuário pode optar por manter esta chave
        setIsLoading(false);
        return;
      }

      // Usar a chave de API armazenada
      params.apiKey = youtubeApiKey;
      
      // Se chegou até aqui, tenta fazer a busca
      console.log("Iniciando busca com chave validada:", params);
      const data = await fetchYouTubeData(params);
      console.log("Dados recebidos da API:", data?.length || 0, "resultados");
      
      if (!data || data.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de pesquisa ou usar outras palavras-chave.",
          variant: "default",
        });
        setResults([]);
        return;
      }

      setResults(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
      
    } catch (error) {
      console.error("Erro detalhado na pesquisa:", error);
      
      let errorMessage = "Erro ao buscar dados. Tente novamente mais tarde.";
      
      if (error instanceof Error) {
        // Verificar se é um erro relacionado a chave nova
        if (error.message.includes("chave foi criada recentemente") || 
            error.message.includes("alguns minutos para ficar")) {
          setIsNewKey(true);
          errorMessage = error.message;
        } 
        // Verificar outros erros comuns
        else if (error.message.includes("quota")) {
          errorMessage = "Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.";
        } else if (error.message.includes("API key")) {
          errorMessage = "Chave de API inválida. Verifique se a chave foi digitada corretamente.";
          setNeedsApiKey(true);
        }
        
        setError(error.message);
      }
      
      toast({
        title: "Erro na pesquisa",
        description: errorMessage,
        variant: "destructive",
      });
      
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Adicionar função para tentar com outra API key
  const tryWithNewKey = () => {
    setNeedsApiKey(true);
  };
  
  // Adicionar função para uso imediato sem novas validações
  const forceSearchWithCurrentKey = async () => {
    if (!searchParams || !youtubeApiKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const params = {...searchParams, apiKey: youtubeApiKey};
      console.log("Forçando busca com chave atual:", youtubeApiKey);
      
      const data = await fetchYouTubeData(params);
      
      if (!data || data.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: "Tente ajustar seus critérios de pesquisa ou usar outras palavras-chave.",
          variant: "default",
        });
        setResults([]);
        return;
      }

      setResults(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
      
    } catch (error) {
      console.error("Erro ao forçar busca:", error);
      setError(error instanceof Error ? error.message : "Erro na busca forçada");
      
      toast({
        title: "Erro na pesquisa",
        description: error instanceof Error ? error.message : "Erro desconhecido ao buscar dados",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
