
/**
 * Functions for generating image prompts
 */

/**
 * Generates thumbnail prompts for a video
 * @param title Video title
 * @returns Array of thumbnail prompt suggestions
 */
export function generateImagePrompts(title: string): string[] {
  const basePrompts = [
    `[EN] Person with surprised expression looking at large text '${title}' with blue to red gradient background\n[PT-BR] Pessoa com expressão de surpresa olhando para um texto grande '${title}' com fundo gradiente de azul para vermelho`,
    `[EN] Close-up of expressive eyes with reflection showing '${title}', dark contrasting background\n[PT-BR] Close em olhos expressivos com reflexo mostrando '${title}', fundo escuro contrastante`,
    `[EN] Before/after collage demonstrating the impact of '${title}', bold text in center\n[PT-BR] Colagem antes/depois demonstrando o impacto de '${title}', texto em negrito no centro`,
    `[EN] Silhouette of person against sunset with inspirational text about '${title}' in modern fonts\n[PT-BR] Silhueta de pessoa contra pôr do sol com texto inspirador sobre '${title}' em fontes modernas`,
    `[EN] Minimalist style with just one strong visual element related to '${title}' and large text on the side\n[PT-BR] Estilo minimalista com apenas um elemento visual forte relacionado a '${title}' e texto grande na lateral`
  ];

  return basePrompts;
}

/**
 * Generates support image prompts for a video
 * @param title Video title
 * @returns Array of support image prompt suggestions
 */
export function generateSupportImagePrompts(title: string): string[] {
  return [
    `[EN] Infographic explaining the 5 main elements of '${title}'\n[PT-BR] Infográfico explicando os 5 elementos principais de '${title}'`,
    `[EN] Comparative table showing different approaches to '${title}'\n[PT-BR] Tabela comparativa mostrando diferentes abordagens para '${title}'`,
    `[EN] Visual timeline showing the evolution and important milestones of '${title}'\n[PT-BR] Linha do tempo visual mostrando a evolução e marcos importantes de '${title}'`,
    `[EN] Flowchart illustrating the process of mastering '${title}' step by step\n[PT-BR] Diagrama de fluxo ilustrando o processo de dominar '${title}' passo a passo`,
    `[EN] Set of custom icons representing key concepts of '${title}'\n[PT-BR] Conjunto de ícones personalizados representando os conceitos-chave de '${title}'`
  ];
}
