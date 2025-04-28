
/**
 * Utility functions for basic title variation generation
 */

/**
 * Gera variações de um título original
 * @param tituloOriginal Título original para transformar
 * @param nVariacoes Número de variações a gerar
 * @returns Lista de títulos variados
 */
export const gerarVariacoesTitulo = (
  tituloOriginal: string,
  nVariacoes: number = 5
): string[] => {
  // Na implementação real, aqui chamaríamos uma API como ChatGPT/Perplexity
  // Por enquanto, vamos usar padrões de variação
  
  const variantes = [
    // Mais provocativo/emocional
    `${tituloOriginal} (Você Não Vai Acreditar!)`,
    `A Verdade Sobre ${tituloOriginal} Que Ninguém Conta`,
    `${tituloOriginal}: O Segredo Finalmente Revelado`,
    
    // Com números
    `5 Coisas Chocantes Sobre ${tituloOriginal}`,
    `3 Segredos De ${tituloOriginal} Revelados`,
    `7 Razões Por Que ${tituloOriginal} Está Mudando Tudo`,
    
    // Com perguntas
    `E Se ${tituloOriginal} For Uma Mentira?`,
    `${tituloOriginal}? A Verdade Vai Te Chocar`,
    `Por Que ${tituloOriginal} Está Viralizando Agora?`,
    
    // Com urgência/FOMO
    `${tituloOriginal}: Últimas Horas Para Descobrir`,
    `${tituloOriginal} - Assista Antes Que Removam`,
    `${tituloOriginal} - 99% Das Pessoas Não Sabem Disso`
  ];
  
  // Embaralhar e pegar n variações
  return embaralharArray(variantes).slice(0, nVariacoes);
};

/**
 * Interface para variações de título
 */
export interface TitleVariations {
  emotional: string[];
  structural: string[];
  multilingual: string[];
}

/**
 * Cria variações de título apelando para diferentes estruturas e emoções
 * @param tituloOriginal Título original
 * @returns Objeto com diferentes categorias de variações
 */
export const gerarVariacoesEstruturadas = (
  tituloOriginal: string
): TitleVariations => {
  // Extrai partes principais do título para reutilizar nas variantes
  const palavrasChave = extrairComponentesTitulo(tituloOriginal);
  const sujeito = palavrasChave.sujeito;
  const predicado = palavrasChave.predicado;
  
  // Variações emocionais
  const emotional = [
    `${sujeito} CHOCANTE ${predicado}`,
    `Você não vai acreditar como ${sujeito} ${predicado}`,
    `A verdade sobre ${sujeito} que ${predicado}`,
    `Revelado: ${sujeito} secretamente ${predicado}`,
    `Escândalo: Como ${sujeito} realmente ${predicado}`
  ];
  
  // Variações estruturais
  const structural = [
    `5 vezes que ${sujeito} ${predicado}`,
    `Por que ${sujeito} sempre ${predicado}?`,
    `Como ${sujeito} conseguiu ${predicado} em 7 dias`,
    `${sujeito} vs ${predicado}: A história completa`,
    `O método secreto: ${sujeito} ${predicado} instantaneamente`
  ];
  
  // Variações multilíngue (simuladas)
  const multilingual = [
    `The truth about ${sujeito} that ${predicado}`, // Inglês
    `La verdad sobre ${sujeito} que ${predicado}`, // Espanhol
    `La vérité sur ${sujeito} qui ${predicado}`, // Francês
    `Die Wahrheit über ${sujeito} das ${predicado}`, // Alemão
    `La verità su ${sujeito} che ${predicado}` // Italiano
  ];
  
  return {
    emotional,
    structural,
    multilingual
  };
};

/**
 * Extrai componentes significativos de um título
 */
export function extrairComponentesTitulo(titulo: string): {sujeito: string, predicado: string} {
  // Implementação básica - dividir ao meio ou na primeira ocorrência de verbo
  const palavras = titulo.split(' ');
  const meio = Math.floor(palavras.length / 2);
  
  return {
    sujeito: palavras.slice(0, meio).join(' '),
    predicado: palavras.slice(meio).join(' ')
  };
}

/**
 * Embaralha um array (algoritmo Fisher-Yates)
 */
export function embaralharArray<T>(array: T[]): T[] {
  const resultado = [...array];
  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
  }
  return resultado;
}
