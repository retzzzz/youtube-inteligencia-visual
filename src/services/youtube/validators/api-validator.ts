
import { isEmptyKey, checkKeyAge } from './key-validator';
import { analyzeApiResponse } from './response-validator';

/**
 * Valida uma chave de API do YouTube fazendo uma solicitação de teste
 */
export const validateApiKey = async (apiKey: string): Promise<{valid: boolean, quotaExceeded: boolean, message: string}> => {
  if (isEmptyKey(apiKey)) {
    return {
      valid: false,
      quotaExceeded: false,
      message: "Chave de API vazia"
    };
  }

  try {
    console.log("Tentando validar chave com endpoint de baixa quota...");
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    if (categoryResponse.ok) {
      console.log("Chave API validada com sucesso usando i18nRegions");
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    console.log("Tentando segundo endpoint de baixa quota...");
    const videoCatResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`
    );
    
    if (videoCatResponse.ok) {
      console.log("Chave API validada com sucesso usando videoCategories");
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    const validationResult = await analyzeApiResponse(videoCatResponse);
    
    // Para chaves com erro de quota, verificar se são novas
    if (validationResult.quotaExceeded) {
      const keyAge = await checkKeyAge(apiKey);
      console.log("Idade estimada da chave (minutos):", keyAge);
      
      if (keyAge !== undefined && keyAge < 15) {
        return {
          valid: true,
          quotaExceeded: false,
          message: "Chave API nova detectada. As chaves de API recém-criadas podem levar 5-15 minutos para ficarem totalmente ativas."
        };
      }
    }
    
    return validationResult;
  } catch (error) {
    console.error("Erro ao validar chave API:", error);
    return {
      valid: false,
      quotaExceeded: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao validar a chave"
    };
  }
};

/**
 * Verifica se uma chave API tem quota disponível
 */
export const checkApiQuota = async (apiKey: string): Promise<boolean> => {
  try {
    if (isEmptyKey(apiKey)) {
      return false;
    }
    
    const endpoints = [
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    ];
    
    for (const endpoint of endpoints) {
      const response = await fetch(endpoint);
      if (response.ok) return true;
      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
          const keyAge = await checkKeyAge(apiKey);
          if (keyAge !== undefined && keyAge < 15) {
            return true; // Assume quota disponível para chaves novas
          }
          continue; // Tenta o próximo endpoint
        }
      }
    }
    
    return false;
  } catch {
    return true; // Em caso de erro de rede, assume que pode haver quota
  }
};
