
/**
 * Utility functions for subniche title transformations
 */

/**
 * Cria variantes de títulos baseados em micro-subnichos
 * @param tituloOriginal Título original
 * @param termosPrincipais Lista de termos para substituir
 * @param idioma Idioma para adaptar as variantes
 * @returns Lista de títulos subnicheados
 */
export const subnichearTitulos = (
  tituloOriginal: string,
  termosPrincipais: string[],
  idioma: string
): string[] => {
  // Dicionário de substituições por idioma e termo
  const substituicoes: Record<string, Record<string, string[]>> = {
    inglês: {
      'millionaire': ['tech billionaire', 'real estate tycoon', 'crypto millionaire', 'self-made entrepreneur', 'wall street investor'],
      'rich': ['wealthy', 'affluent', 'high-net-worth', 'financially independent', 'elite'],
      'wealthy': ['prosperous', 'opulent', 'well-off', 'privileged', 'moneyed']
    },
    português: {
      'milionário': ['empresário de sucesso', 'investidor imobiliário', 'empreendedor digital', 'herdeiro', 'trader profissional'],
      'rico': ['abastado', 'bem-sucedido', 'afortunado', 'próspero', 'endinheirado'],
      'riqueza': ['fortuna', 'prosperidade', 'abundância', 'opulência', 'patrimônio']
    },
    espanhol: {
      'millonario': ['empresario exitoso', 'inversor inmobiliario', 'heredero', 'emprendedor', 'magnate'],
      'rico': ['adinerado', 'acaudalado', 'próspero', 'pudiente', 'acomodado'],
      'riqueza': ['fortuna', 'abundancia', 'opulencia', 'prosperidad', 'patrimonio']
    }
  };
  
  const idiomaChave = idioma.toLowerCase() as keyof typeof substituicoes;
  const substituicoesIdioma = substituicoes[idiomaChave] || substituicoes.inglês; // Fallback para inglês
  
  let titulosGerados: string[] = [];
  
  // Para cada termo principal, gerar substituições
  termosPrincipais.forEach(termo => {
    const termoLower = termo.toLowerCase();
    const alternativas = substituicoesIdioma[termoLower];
    
    if (alternativas) {
      alternativas.forEach(alternativa => {
        // Substituir o termo original pela alternativa, mantendo a capitalização original
        const regex = new RegExp(termo, 'i');
        const novoTitulo = tituloOriginal.replace(regex, alternativa);
        titulosGerados.push(novoTitulo);
      });
    }
  });
  
  return titulosGerados.filter(Boolean); // Remover possíveis entradas vazias
};
