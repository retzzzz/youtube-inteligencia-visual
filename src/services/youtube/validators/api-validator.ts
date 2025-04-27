
import { isEmptyKey, checkKeyAge, markKeyAsNotNew } from './key-validator';
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
      markKeyAsNotNew(apiKey);
      
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
      markKeyAsNotNew(apiKey);
      
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    // Se forçar a chave como não nova, marcar no localStorage
    if (forceNotNew) {
      markKeyAsNotNew(apiKey);
    }
    
    // Analisar resposta para detectar tipo de erro (quota excedida, chave inválida, etc)
    try {
      const validationResult = await analyzeApiResponse(videoCatResponse);
      
      // Para chaves com erro de quota, verificar se são novas
      if (validationResult.quotaExceeded) {
        console.log("Quota excedida detectada. Verificando se é uma chave nova...");
        const keyAge = await checkKeyAge(apiKey, forceNotNew);
        console.log("Idade estimada da chave (minutos):", keyAge);
        
        if (!forceNotNew && keyAge !== undefined && keyAge < 15) {
          console.log("Chave parece ser nova (menos de 15 minutos)");
          return {
            valid: true,
            quotaExceeded: false,
            message: "Chave API nova detectada. As chaves de API recém-criadas podem levar 5-15 minutos para ficarem totalmente ativas."
          };
        }
        
        // Se não for nova ou forceNotNew for true, retorna o erro de quota excedida
        console.log("Confirmando erro de quota excedida");
        validationResult.message = "Quota da API excedida. A quota diária desta chave foi excedida. Por favor, tente novamente após 24 horas ou use outra chave.";
      }
      
      return validationResult;
    } catch (analysisError) {
      console.error("Erro ao analisar resposta da API:", analysisError);
      return {
        valid: false,
        quotaExceeded: false,
        message: "Erro ao analisar resposta da API do YouTube"
      };
    }
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
    
    // Se forçar a chave como não nova, marcar no localStorage
    if (forceNotNew) {
      markKeyAsNotNew(apiKey);
    }
    
    // Testar múltiplos endpoints para ter certeza
    const endpoints = [
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Verificando quota com endpoint: ${endpoint.replace(apiKey, "API_KEY_HIDDEN")}`);
        const response = await fetch(endpoint);
        
        if (response.ok) {
          console.log("Endpoint retornou OK, quota disponível");
          markKeyAsNotNew(apiKey);
          return true;
        }
        
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Resposta de erro ao verificar quota:", errorData);
          
          if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
            // Verificar se é uma chave nova
            if (!forceNotNew) {
              const keyAge = await checkKeyAge(apiKey);
              if (keyAge !== undefined && keyAge < 15) {
                console.log("Chave nova detectada (< 15 min), assumindo quota disponível");
                return true; // Assume quota disponível para chaves novas
              }
            }
            console.log("Quota excedida confirmada neste endpoint, tentando próximo...");
            continue; // Tenta o próximo endpoint
          }
        }
      } catch (endpointError) {
        console.warn("Erro ao verificar quota com endpoint:", endpointError);
        // Continua para o próximo endpoint em caso de erro
      }
    }
    
    console.log("Todos os endpoints falharam, assumindo quota esgotada");
    return false;
  } catch (error) {
    console.error("Erro geral ao verificar quota:", error);
    // Em caso de erro inesperado, assumimos que pode haver quota
    return true;
  }
};
