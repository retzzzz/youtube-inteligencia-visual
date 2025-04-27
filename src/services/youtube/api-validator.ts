
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
    // Use um parâmetro de consulta simples para minimizar o uso da API
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=test&key=${apiKey}`
    );

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      console.log("Resposta de erro da API do YouTube:", errorData);
      
      if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
        return {
          valid: false,
          quotaExceeded: false,
          message: "Chave de API inválida. Verifique se a chave foi digitada corretamente."
        };
      } else if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        // Se o erro for específicamente sobre quota excedida
        console.log("Quota excedida detectada na resposta da API");
        return {
          valid: true, // A chave é válida, apenas sem quota
          quotaExceeded: true,
          message: "Quota da API excedida. Esta chave é válida, mas sua cota diária foi atingida."
        };
      } else if (errorData.error?.code === 403) {
        // Outros erros 403 não relacionados à quota
        return {
          valid: false,
          quotaExceeded: false,
          message: `Erro de acesso: ${errorData.error?.message || testResponse.statusText}`
        };
      }
      
      return {
        valid: false,
        quotaExceeded: false,
        message: `Erro na validação da API: ${errorData.error?.message || testResponse.statusText}`
      };
    }
    
    // Se chegou aqui, a chave é válida e tem quota
    return {
      valid: true,
      quotaExceeded: false,
      message: "Chave API validada com sucesso"
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
 * Verifica se uma chave API tem quota disponível
 */
export const checkApiQuota = async (apiKey: string): Promise<boolean> => {
  try {
    if (!apiKey || apiKey.trim() === "") {
      return false;
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
    
    // Quota excedida
    return false;
  } catch {
    // Em caso de erro de rede ou outros, assumimos que pode não haver quota
    return false;
  }
};
