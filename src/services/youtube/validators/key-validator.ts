
/**
 * Verifica se uma chave API é vazia ou inválida
 */
const isEmptyKey = (apiKey: string): boolean => {
  return !apiKey || apiKey.trim() === '';
};

/**
 * Tenta determinar a idade aproximada da chave API
 * Retorna a idade aproximada em minutos, ou undefined se não conseguir determinar
 */
export const checkKeyAge = async (apiKey: string): Promise<number | undefined> => {
  try {
    const endpoints = [
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/i18nLanguages?part=snippet&key=${apiKey}`
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          return 30; // 30+ minutos
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    return 5; // assumir 5 minutos como padrão para chaves novas
  } catch {
    return undefined;
  }
};

export { isEmptyKey };
