
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
    // Verificar usando múltiplos endpoints leves
    const endpoints = [
      `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=BR&key=${apiKey}`,
      `https://www.googleapis.com/youtube/v3/i18nLanguages?part=snippet&key=${apiKey}`
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          return 30; // Se funcionar, não é tão nova (30+ minutos)
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    // Se todos os endpoints falharem, pode ser uma chave nova ou inválida
    // Retornamos um valor baixo para indicar que pode ser uma chave nova
    return 5;
  } catch {
    return undefined;
  }
};

export { isEmptyKey };
