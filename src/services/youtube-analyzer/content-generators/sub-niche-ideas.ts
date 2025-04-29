
/**
 * Functions for generating sub-niche ideas
 */

/**
 * Generates sub-niche ideas based on video title
 * @param title Video title
 * @returns Array of sub-niche objects with examples
 */
export function generateSubNicheIdeas(title: string) {
  return [
    {
      name: `${title} para iniciantes`,
      description: "Conteúdo focado especificamente em pessoas que estão começando do zero.",
      examples: [
        `Guia do absoluto iniciante para ${title}`,
        `Os erros mais comuns de iniciantes em ${title}`,
        `${title} simplificado: aprenda em 7 dias`
      ]
    },
    {
      name: `${title} avançado`,
      description: "Conteúdo para quem já domina o básico e quer técnicas mais sofisticadas.",
      examples: [
        `Técnicas avançadas de ${title} que 98% das pessoas desconhecem`,
        `Domine ${title} como um profissional`,
        `Os segredos dos especialistas em ${title}`
      ]
    },
    {
      name: `${title} para negócios`,
      description: "Como aplicar este conhecimento especificamente no contexto empresarial.",
      examples: [
        `Como ${title} pode revolucionar seu negócio`,
        `Estudo de caso: empresa aumenta receita em 240% com ${title}`,
        `Estratégias de ${title} para pequenas empresas`
      ]
    }
  ];
}
