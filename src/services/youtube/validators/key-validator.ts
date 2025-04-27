
/**
 * Verifica se uma chave API é vazia ou inválida
 */
const isEmptyKey = (apiKey: string): boolean => {
  return !apiKey || apiKey.trim() === '';
};

/**
 * Tenta determinar a idade aproximada da chave API
 * Retorna a idade aproximada em minutos, ou undefined se não conseguir determinar
 * 
 * @param apiKey Chave de API do YouTube
 * @param forceNotNew Se true, considera que a chave não é nova independente do resultado
 */
export const checkKeyAge = async (apiKey: string, forceNotNew: boolean = false): Promise<number | undefined> => {
  if (forceNotNew) {
    return 60; // 1 hora (não é nova)
  }
  
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
          return 60; // Se funcionar, não é tão nova (60+ minutos = 1 hora)
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    // Verificar se há informação no localStorage sobre quando a chave foi adicionada
    const keyAddedTime = localStorage.getItem(`apiKey_${apiKey.substring(0, 8)}_added`);
    if (keyAddedTime) {
      const timeDiff = (Date.now() - parseInt(keyAddedTime)) / (1000 * 60);
      return timeDiff > 20 ? 60 : timeDiff;
    }
    
    return 20; // Padrão mais conservador, não consideramos tão nova (20 minutos)
  } catch {
    return undefined;
  }
};

export { isEmptyKey };
