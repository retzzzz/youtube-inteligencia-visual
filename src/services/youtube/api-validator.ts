
/**
 * Valida uma chave de API do YouTube fazendo uma solicitação de teste
 */
export const validateApiKey = async (apiKey: string): Promise<{valid: boolean, quotaExceeded: boolean, message: string}> => {
  // Se a chave estiver vazia, falha imediatamente
  if (!apiKey || apiKey.trim() === '') {
    return {
      valid: false,
      quotaExceeded: false,
      message: "Chave de API vazia"
    };
  }

  try {
    // Tentativa 1: Usar um endpoint que consome pouca quota
    console.log("Tentando validar chave com endpoint de baixa quota...");
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    // Se sucesso, a chave é válida
    if (categoryResponse.ok) {
      console.log("Chave API validada com sucesso usando i18nRegions");
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    // Tentativa 2: Usar videoCategories (outra opção de baixa quota)
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
    
    // Analisar o erro da última tentativa
    const errorData = await videoCatResponse.json();
    console.log("Resposta de erro na validação:", errorData);
    
    // Verificar se a API está habilitada
    if (errorData.error?.errors?.some((e: any) => e.reason === "accessNotConfigured")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "A API do YouTube não está habilitada para esta chave. Acesse o Google Cloud Console e ative a YouTube Data API v3."
      };
    }
    
    // Verificar se a chave é inválida
    if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "Chave de API inválida. Verifique se a chave foi digitada corretamente."
      };
    }
    
    // Verificar se é um erro de quota
    if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      // Tentar determinar se a chave é nova (menos de 15 minutos)
      const keyAge = await checkKeyAge(apiKey);
      console.log("Idade estimada da chave (minutos):", keyAge);
      
      if (keyAge !== undefined && keyAge < 15) {
        // Para chaves novas, é provável que seja um falso positivo de quota
        return {
          valid: true,
          quotaExceeded: false,
          message: "Chave API nova detectada. As chaves de API recém-criadas podem levar 5-15 minutos para ficarem totalmente ativas."
        };
      }
      
      // Se não for nova, é realmente um erro de quota
      return {
        valid: true,
        quotaExceeded: true,
        message: "Quota da API excedida. Esta chave é válida, mas sua cota diária foi atingida."
      };
    }
    
    // Erro genérico
    return {
      valid: false,
      quotaExceeded: false,
      message: `Erro na validação da API: ${errorData.error?.message || videoCatResponse.statusText}`
    };
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
 * Tenta determinar a idade aproximada da chave API
 * Retorna a idade aproximada em minutos, ou undefined se não conseguir determinar
 */
const checkKeyAge = async (apiKey: string): Promise<number | undefined> => {
  try {
    // Para chaves novas, tentamos múltiplos endpoints leves
    const endpoints = [
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/i18nLanguages?part=snippet&key=${apiKey}`
    ];
    
    // Tentar cada endpoint
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          // Se algum endpoint funcionar, consideramos que a chave não é tão nova
          return 30; // 30+ minutos
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    // Se nenhum endpoint funcionou, é possível que seja uma chave muito nova
    // Retornamos um valor baixo como estimativa
    return 5; // assumir 5 minutos como padrão para chaves novas
  } catch {
    return undefined;
  }
};

/**
 * Verifica se uma chave API tem quota disponível
 */
export const checkApiQuota = async (apiKey: string): Promise<boolean> => {
  try {
    if (!apiKey || apiKey.trim() === "") {
      return false;
    }
    
    // Primeiro, tente uma chamada leve (i18nRegions)
    const regionResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    if (regionResponse.ok) {
      return true;
    }
    
    // Segundo, tente outra chamada leve (videoCategories)
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`
    );
    
    if (categoryResponse.ok) {
      return true;
    }
    
    // Por último, tente uma chamada de pesquisa mínima
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    );
    
    // Se resposta for bem-sucedida, quota está disponível
    if (testResponse.ok) {
      return true;
    }
    
    const errorData = await testResponse.json();
    console.log("Resposta ao verificar quota:", errorData);
    
    // Verificar se é um erro de quota excedida
    if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      // Verificar se é uma chave nova (menos de 15 minutos)
      const keyAge = await checkKeyAge(apiKey);
      if (keyAge !== undefined && keyAge < 15) {
        // Para chaves novas, assume que é um falso positivo
        return true;
      }
      
      // Quota realmente excedida
      return false;
    }
    
    // Para outros tipos de erro, assumimos que tem quota (pode ser problema de acesso, etc)
    return true;
  } catch {
    // Em caso de erro de rede, assume que pode haver quota
    return true;
  }
};
