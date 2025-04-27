
/**
 * Valida uma chave de API do YouTube fazendo uma solicitação de teste
 */
export const validateApiKey = async (apiKey: string): Promise<void> => {
  // Se a chave estiver vazia, falha imediatamente
  if (!apiKey || apiKey.trim() === '') {
    throw new Error("Chave de API vazia");
  }

  try {
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${apiKey}`
    );

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      
      if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
        throw new Error("Chave de API inválida. Verifique se a chave foi digitada corretamente.");
      } else if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
        console.warn("Aviso: Quota da API excedida para esta chave");
        // Não lançamos erro para quota excedida, pois a chave ainda é válida
        return;
      }
      
      throw new Error(`Erro na validação da API: ${errorData.error?.message || testResponse.statusText}`);
    }
    
    // Se chegou aqui, a chave é válida
    console.log("Chave API validada com sucesso");
  } catch (error) {
    console.error("Erro ao validar chave API:", error);
    throw error;
  }
};

/**
 * Verifica se uma chave API tem quota disponível
 */
export const checkApiQuota = async (apiKey: string): Promise<boolean> => {
  try {
    const testResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${apiKey}`
    );
    
    // Se resposta for bem-sucedida, quota está disponível
    if (testResponse.ok) {
      return true;
    }
    
    const errorData = await testResponse.json();
    
    // Se erro for diferente de quota excedida, a chave pode ter outros problemas
    if (!errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      return true;
    }
    
    // Quota excedida
    return false;
  } catch {
    // Em caso de erro de rede ou outros, assumimos que pode haver quota
    return true;
  }
};
