
import { useState } from "react";
import { useToast } from "./use-toast";
import { validateApiKey } from "@/services/youtube";

export const useApiKeyValidation = (onSuccess?: (key: string) => void) => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const { toast } = useToast();

  const validateAndSaveApiKey = async (apiKey: string, rememberKey: boolean) => {
    if (!apiKey.trim()) {
      setError("Por favor, insira uma chave de API");
      return;
    }
    
    try {
      setIsValidating(true);
      setError("");
      setWarning("");
      
      const validationResult = await validateApiKey(apiKey.trim());
      console.log("Resultado da validação:", validationResult);
      
      if (!validationResult.valid) {
        setError(validationResult.message);
        return;
      }
      
      if (validationResult.quotaExceeded) {
        setWarning("Esta chave é válida, mas sua quota está excedida. Você poderá usá-la novamente quando a quota for renovada (geralmente a cada 24h).");
      }
      
      if (rememberKey) {
        localStorage.setItem("youtubeApiKey", apiKey.trim());
      }
      
      onSuccess?.(apiKey.trim());
      
      toast({
        title: "Chave API salva",
        description: validationResult.quotaExceeded 
          ? "Sua chave API foi salva, mas a quota está excedida. Considere usar outra chave."
          : "Sua chave API do YouTube foi configurada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao validar chave:", error);
      setError(error instanceof Error ? error.message : "Erro ao validar a chave de API");
    } finally {
      setIsValidating(false);
    }
  };

  const forceValidation = async (apiKey: string, rememberKey: boolean) => {
    try {
      setIsValidating(true);
      setError("");
      setWarning("");
      
      const testUrl = `https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=1&key=${apiKey.trim()}`;
      const testResponse = await fetch(testUrl);
      
      if (testResponse.ok) {
        if (rememberKey) {
          localStorage.setItem("youtubeApiKey", apiKey.trim());
        }
        
        onSuccess?.(apiKey.trim());
        
        toast({
          title: "Chave API validada",
          description: "Sua chave API do YouTube foi configurada com sucesso!",
        });
      } else {
        const errorData = await testResponse.json();
        console.log("Segunda validação retornou:", errorData);
        
        if (errorData.error?.code === 403 && errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
          setWarning("Confirmado: Esta chave está com a quota diária excedida. Você pode usá-la mesmo assim ou tentar outra chave.");
        } else {
          setError(`Erro na validação: ${errorData.error?.message || testResponse.statusText}`);
        }
      }
    } catch (error) {
      console.error("Erro na validação alternativa:", error);
      setError(error instanceof Error ? error.message : "Erro na validação");
    } finally {
      setIsValidating(false);
    }
  };

  const clearValidationState = () => {
    setError("");
    setWarning("");
  };

  return {
    isValidating,
    error,
    warning,
    validateAndSaveApiKey,
    forceValidation,
    clearValidationState
  };
};
