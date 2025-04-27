
/**
 * Analisa as respostas da API e determina o tipo de erro
 */
export const analyzeApiResponse = async (response: Response) => {
  try {
    const errorData = await response.json();
    console.log("Resposta de erro na validação:", errorData);
    
    if (errorData.error?.errors?.some((e: any) => e.reason === "accessNotConfigured")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "A API do YouTube não está habilitada para esta chave. Acesse o Google Cloud Console e ative a YouTube Data API v3."
      };
    }
    
    if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
      return {
        valid: false,
        quotaExceeded: false,
        message: "Chave de API inválida. Verifique se a chave foi digitada corretamente."
      };
    }
    
    if (errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
      return {
        valid: true,
        quotaExceeded: true,
        message: "Quota da API excedida"
      };
    }
    
    return {
      valid: false,
      quotaExceeded: false,
      message: `Erro na validação da API: ${errorData.error?.message || response.statusText}`
    };
  } catch (error) {
    return {
      valid: false,
      quotaExceeded: false,
      message: `Erro ao analisar resposta: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
};
