
import { isEmptyKey, checkKeyAge } from './key-validator';
import { analyzeApiResponse } from './response-validator';

/**
 * Valida uma chave de API do YouTube fazendo uma solicitação de teste
 * @param apiKey Chave da API YouTube
 * @param forceNotNew Forçar a chave a não ser considerada nova
 */
export const validateApiKey = async (apiKey: string, forceNotNew: boolean = false): Promise<{valid: boolean, quotaExceeded: boolean, message: string}> => {
  if (isEmptyKey(apiKey)) {
    return {
      valid: false,
      quotaExceeded: false,
      message: "Chave de API vazia"
    };
  }

  try {
    console.log("Tentando validar chave com endpoint de baixa quota...");
    // Usar primeiro um endpoint de baixo custo (1 unidade)
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    if (categoryResponse.ok) {
      console.log("Chave API validada com sucesso usando i18nRegions");
      
      // Marcar a chave como validada com sucesso
      if (!localStorage.getItem(`apiKey_${apiKey.substring(0, 8)}_added`)) {
        localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, Date.now().toString());
      }
      
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    console.log("Tentando segundo endpoint de baixa quota...");
    // Testar outro endpoint de baixo custo (1 unidade)
    const videoCatResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`
    );
    
    if (videoCatResponse.ok) {
      console.log("Chave API validada com sucesso usando videoCategories");
      
      // Marcar a chave como validada com sucesso
      if (!localStorage.getItem(`apiKey_${apiKey.substring(0, 8)}_added`)) {
        localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, Date.now().toString());
      }
      
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    const validationResult = await analyzeApiResponse(videoCatResponse);
    
    // Para chaves com erro de quota, verificar se são novas
    if (validationResult.quotaExceeded) {
      const keyAge = await checkKeyAge(apiKey, forceNotNew);
      console.log("Idade estimada da chave (minutos):", keyAge);
      
      if (!forceNotNew && keyAge !== undefined && keyAge < 15) {
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
 * @param apiKey Chave da API YouTube
 * @param forceNotNew Forçar a chave a não ser considerada nova
 */
export const checkApiQuota = async (apiKey: string, forceNotNew: boolean = false): Promise<boolean> => {
  try {
    if (isEmptyKey(apiKey)) {
      return false;
    }
    
    // Testar múltiplos endpoints para ter certeza
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
          // Verificar se é uma chave nova
          if (!forceNotNew) {
            const keyAge = await checkKeyAge(apiKey);
            if (keyAge !== undefined && keyAge < 15) {
              return true; // Assume quota disponível para chaves novas
            }
          }
          continue; // Tenta o próximo endpoint
        }
      }
    }
    
    return false;
  } catch {
    // Em caso de erro de rede, assumimos que pode haver quota
    return true;
  }
};
