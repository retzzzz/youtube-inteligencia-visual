
import { useState } from "react";
import { useToast } from "./use-toast";
import { validateApiKey } from "@/services/youtube";

export const useApiKeyValidation = (onSuccess?: (key: string) => void) => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const { toast } = useToast();

  const validateAndSaveApiKey = async (apiKey: string, rememberKey: boolean, forceNotNew: boolean = false) => {
    if (!apiKey.trim()) {
      setError("Por favor, insira uma chave de API");
      return;
    }
    
    try {
      setIsValidating(true);
      setError("");
      setWarning("");
      
      const validationResult = await validateApiKey(apiKey.trim(), forceNotNew);
      console.log("Resultado da validação:", validationResult);
      
      if (!validationResult.valid) {
        setError(validationResult.message);
        return;
      }
      
      // Verificar se é uma chave nova
      if (!forceNotNew && (validationResult.message.includes("nova") || validationResult.message.includes("recém-criada"))) {
        setWarning("Chave API recém-criada detectada. As chaves podem levar 5-15 minutos para ficarem totalmente ativas. Você pode usá-la agora, mas pode encontrar erros temporariamente.");
      } else {
        // Registrar a chave como não nova no localStorage
        localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, 
          (Date.now() - 60 * 60 * 1000).toString()); // 1 hora atrás
      }
      
      // Verificar quota excedida
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
          : validationResult.message.includes("nova") && !forceNotNew
            ? "Sua chave API foi salva. Lembre-se que chaves novas podem levar alguns minutos para ativar completamente."
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
      
      // Marcar explicitamente a chave como não nova
      localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, 
        (Date.now() - 60 * 60 * 1000).toString()); // 1 hora atrás
      
      if (rememberKey) {
        localStorage.setItem("youtubeApiKey", apiKey.trim());
      }
      
      onSuccess?.(apiKey.trim());
      
      toast({
        title: "Chave API aceita",
        description: "Sua chave API foi aceita e será usada para pesquisas.",
      });
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
