
const stopwords = ['o', 'a', 'os', 'as', 'um', 'uma', 'e', 'de', 'do', 'da', 'dos', 'das'];

export function extrairPalavrasChave(titulos: string[]): string[] {
  const palavras = titulos.join(' ').toLowerCase().split(' ');
  const frequencia = new Map<string, number>();
  
  palavras
    .filter(palavra => !stopwords.includes(palavra) && palavra.length > 3)
    .forEach(palavra => {
      frequencia.set(palavra, (frequencia.get(palavra) || 0) + 1);
    });
  
  return Array.from(frequencia.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([palavra]) => palavra);
}
