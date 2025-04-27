
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
  
  // Primeiro verificar se há informação no localStorage sobre quando a chave foi adicionada
  const keyAddedTime = localStorage.getItem(`apiKey_${apiKey.substring(0, 8)}_added`);
  if (keyAddedTime) {
    const timeDiff = (Date.now() - parseInt(keyAddedTime)) / (1000 * 60);
    console.log(`Chave encontrada no localStorage, idade: ${timeDiff} minutos`);
    return timeDiff > 20 ? 60 : timeDiff;
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
          console.log("Chave validada com sucesso em endpoint, considerando não nova");
          // Se a chave funciona em qualquer endpoint, podemos assumir que não é tão nova
          localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, 
            (Date.now() - 60 * 60 * 1000).toString()); // Marcar como adicionada há 1 hora
          return 60; // Não é nova (60+ minutos = 1 hora)
        }
      } catch {
        // Ignorar erros individuais
      }
    }
    
    // Se chegou aqui, não conseguiu validar a chave, mas também não temos certeza se é nova
    console.log("Não foi possível determinar se a chave é nova, usando valor padrão");
    return 20; // Padrão mais conservador, não consideramos tão nova (20 minutos)
  } catch (error) {
    console.error("Erro ao verificar idade da chave:", error);
    return undefined;
  }
};

/**
 * Marca explicitamente uma chave como não nova no localStorage
 */
export const markKeyAsNotNew = (apiKey: string): void => {
  if (!apiKey) return;
  
  localStorage.setItem(`apiKey_${apiKey.substring(0, 8)}_added`, 
    (Date.now() - 60 * 60 * 1000).toString()); // 1 hora atrás
  console.log(`Chave ${apiKey.substring(0, 5)}... marcada como não nova no localStorage`);
};

export { isEmptyKey };
