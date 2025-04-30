
import { useState, useCallback } from "react";
import { validateApiKey } from "@/services/youtube";
import { markKeyAsNotNew } from "@/services/youtube/validators/key-validator";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for managing API key validation and status
 */
export const useApiKeyManagement = (initialApiKey?: string) => {
  const [isNewKey, setIsNewKey] = useState(false);
  const { toast } = useToast();

  const isKeyOld = useCallback((key: string): boolean => {
    const keyMarker = localStorage.getItem(`apiKey_${key.substring(0, 8)}_added`);
    if (keyMarker) {
      const keyAge = (Date.now() - parseInt(keyMarker)) / (1000 * 60);
      return keyAge > 20;
    }
    return false;
  }, []);

  const validateKey = useCallback(async (
    apiKey: string, 
    forceNotNew: boolean = false
  ) => {
    if (!apiKey || apiKey.trim() === "") {
      return { 
        isValid: false, 
        message: "Chave de API não fornecida",
        isNew: false,
        quotaExceeded: false
      };
    }
    
    // Check if key is already known as not new
    if (isKeyOld(apiKey)) {
      forceNotNew = true;
      setIsNewKey(false);
    } else {
      setIsNewKey(!forceNotNew);
    }
    
    // Validate the API key
    console.log("Validando chave API:", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 4));
    try {
      const validationResult = await validateApiKey(apiKey, forceNotNew);
      console.log("Resultado da validação:", validationResult);
      
      if (!validationResult.valid) {
        return {
          isValid: false,
          message: validationResult.message,
          isNew: false,
          quotaExceeded: false
        };
      }
      
      // Update new key status based on validation result
      if (!forceNotNew && validationResult.message.includes("nova")) {
        setIsNewKey(true);
        toast({
          title: "Chave API nova detectada",
          description: "Chaves recém-criadas podem levar alguns minutos para ficarem totalmente ativas. Prosseguindo com a busca.",
          variant: "default",
        });
      } else {
        setIsNewKey(false);
      }
      
      return {
        isValid: true,
        message: validationResult.message,
        isNew: !forceNotNew && validationResult.message.includes("nova"),
        quotaExceeded: validationResult.quotaExceeded
      };
    } catch (error) {
      console.error("Erro ao validar chave:", error);
      return {
        isValid: false,
        message: error instanceof Error ? error.message : "Erro ao validar chave API",
        isNew: false,
        quotaExceeded: false
      };
    }
  }, [isKeyOld, toast]);

  const forceKeyAsNotNew = useCallback((apiKey: string) => {
    if (!apiKey) return;
    markKeyAsNotNew(apiKey);
    setIsNewKey(false);
    console.log("Chave marcada como não nova:", apiKey.substring(0, 5) + "...");
  }, []);

  return {
    isNewKey,
    validateKey,
    forceKeyAsNotNew,
    isKeyOld
  };
};
