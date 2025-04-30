
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to handle errors consistently for YouTube search operations
 */
export const useErrorHandling = () => {
  const { toast } = useToast();

  const handleSearchError = (
    error: unknown, 
    forceNotNew: boolean = false,
    onSetError?: (message: string) => void
  ) => {
    console.error("Erro detalhado na pesquisa:", error);
    
    let errorMessage = "Erro ao buscar dados. Tente novamente mais tarde.";
    
    if (error instanceof Error) {
      // Check if it's a new key error
      if (!forceNotNew && (
          error.message.includes("chave foi criada recentemente") || 
          error.message.includes("alguns minutos para ficar"))
      ) {
        errorMessage = error.message;
      }
      // Check for quota errors
      else if (error.message.includes("quota")) {
        errorMessage = "Quota da API do YouTube excedida. Tente novamente mais tarde ou use uma chave de API diferente.";
      } 
      // Check for invalid API key errors
      else if (error.message.includes("API key")) {
        errorMessage = "Chave de API inválida. Verifique se a chave foi digitada corretamente.";
      }
      
      if (onSetError) {
        onSetError(error.message);
      }
    }
    
    toast({
      title: "Erro na pesquisa",
      description: errorMessage,
      variant: "destructive",
    });
    
    return errorMessage;
  };

  return {
    handleSearchError
  };
};
