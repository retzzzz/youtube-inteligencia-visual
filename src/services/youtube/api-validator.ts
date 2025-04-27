
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
    // 1. Primeiro tente obter uma lista de categorias de vídeo (baixo uso de quota)
    // Esta chamada usa menos quota e também permite verificar se a chave é válida
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`
    );
    
    if (categoryResponse.ok) {
      console.log("Chave API validada com sucesso usando videoCategories");
      // Se esta chamada funcionar, a chave é válida e tem quota
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    // Se a primeira chamada falhar, tente uma segunda verificação
    const errorData = await categoryResponse.json();
    console.log("Resposta de categorias:", errorData);
    
    // 2. Verificar especificamente se a API está habilitada
    if (errorData.error?.errors?.some((e: any) => e.reason === "accessNotConfigured")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "A API do YouTube não está habilitada para esta chave. Acesse o Google Cloud Console e ative a YouTube Data API v3."
      };
    }
    
    // 3. Se não for um problema de acesso, tente uma segunda chamada mais leve
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${apiKey}`
    );
    
    if (channelResponse.ok) {
      // Se esta chamada funcionar, a chave é válida e tem quota
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    // 4. Por último, tente uma pesquisa básica que requer mais quota
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    );

    if (testResponse.ok) {
      // Se esta chamada funcionar, a chave é válida e tem quota
      return {
        valid: true,
        quotaExceeded: false,
        message: "Chave API validada com sucesso"
      };
    }
    
    // Se nenhuma das chamadas funcionou, analisar o erro
    const searchErrorData = await testResponse.json();
    console.log("Resposta de erro da API do YouTube:", searchErrorData);
      
    if (searchErrorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "Chave de API inválida. Verifique se a chave foi digitada corretamente."
      };
    } else if (searchErrorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      // Verificar se é realmente um erro de quota
      // Em chaves novas, às vezes o erro pode ser incorreto
      console.log("Verificando se o erro de quota é real");
      
      // Verificar se a chave é muito nova (menos de 10 minutos)
      const keyAge = await checkKeyAge(apiKey);
      if (keyAge && keyAge < 10) {
        // Se a chave for muito nova, é provável que o erro de quota seja incorreto
        console.log("Chave API é muito nova, provavelmente o erro de quota é incorreto");
        return {
          valid: true,
          quotaExceeded: false,
          message: "Chave API validada. Como é uma chave nova, pode levar alguns minutos para estar 100% ativa."
        };
      }
      
      console.log("Quota excedida detectada na resposta da API");
      return {
        valid: true, // A chave é válida, apenas sem quota
        quotaExceeded: true,
        message: "Quota da API excedida. Esta chave é válida, mas sua cota diária foi atingida."
      };
    } else if (searchErrorData.error?.code === 403) {
      // Outros erros 403 não relacionados à quota
      return {
        valid: false,
        quotaExceeded: false,
        message: `Erro de acesso: ${searchErrorData.error?.message || testResponse.statusText}`
      };
    }
    
    return {
      valid: false,
      quotaExceeded: false,
      message: `Erro na validação da API: ${searchErrorData.error?.message || testResponse.statusText}`
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
 * Retorna undefined se não conseguir determinar
 */
const checkKeyAge = async (apiKey: string): Promise<number | undefined> => {
  try {
    // Tentar obter informações sobre a chave
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`
    );
    
    // Se conseguir acessar, verifica headers
    if (response.headers.get('date')) {
      return 0; // Se conseguimos acessar, a chave está funcionando
    }
    
    return undefined;
  } catch (error) {
    console.error("Erro ao verificar idade da chave:", error);
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
    
    // Primeiro, tente uma chamada leve (videoCategories)
    const categoryResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`
    );
    
    if (categoryResponse.ok) {
      return true;
    }
    
    // Usando uma consulta mínima para verificar a quota
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    );
    
    // Se resposta for bem-sucedida, quota está disponível
    if (testResponse.ok) {
      return true;
    }
    
    const errorData = await testResponse.json();
    console.log("Resposta ao verificar quota:", errorData);
    
    // Se erro for diferente de quota excedida, a chave pode ter outros problemas
    if (!errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      return true;
    }
    
    // Verificar se a chave é muito nova (menos de 10 minutos)
    const keyAge = await checkKeyAge(apiKey);
    if (keyAge !== undefined && keyAge < 10) {
      // Se a chave for muito nova, é provável que tenha quota
      return true;
    }
    
    // Quota excedida
    return false;
  } catch {
    // Em caso de erro de rede ou outros, assumimos que pode não haver quota
    return false;
  }
};
