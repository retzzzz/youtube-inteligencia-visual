
import { ScriptPrompts } from "@/types/script-generator-types";

// Interface para os parâmetros de entrada do roteiro
export interface ScriptGenerationParams {
  niche: string;
  subniche: string;
  microSubniche: string;
  blocksCount: number;
  charsPerBlock: number;
}

// Interface para o roteiro completo gerado
export interface CompleteScript {
  titulo: string;
  hook: string;
  introducao: string;
  blocos: {
    texto: string;
    mini_cta: string;
  }[];
  conclusao: string;
  stats: {
    caracteres_com_espacos: number;
    caracteres_sem_espacos: number;
    palavras: number;
    duracao_min: number;
  };
}

// Função para gerar um título usando a fórmula Personagem + Ação/Gancho + Emoção/Curiosidade
const generateTitle = (params: ScriptGenerationParams): string => {
  const personagens = [
    "O Especialista", 
    "A Influenciadora", 
    "O Empreendedor", 
    "A Treinadora", 
    "O Profissional", 
    "A Mentora"
  ];
  
  const acoes = [
    "Revelou", 
    "Descobriu", 
    "Compartilhou", 
    "Ensinou", 
    "Transformou", 
    "Desafiou", 
    "Provou"
  ];
  
  const ganchos = [
    "o Segredo de", 
    "a Verdade Sobre", 
    "a Fórmula Para", 
    "o Método Infalível de", 
    "a Estratégia Definitiva Para"
  ];
  
  const emocoes = [
    "e Você Vai Se Surpreender", 
    "e os Resultados São Incríveis", 
    "e Todos Ficaram Chocados", 
    "e Isso Mudará Sua Visão Para Sempre", 
    "e Você Precisa Conhecer Agora"
  ];
  
  // Seleciona elementos aleatórios de cada lista
  const personagem = personagens[Math.floor(Math.random() * personagens.length)];
  const acao = acoes[Math.floor(Math.random() * acoes.length)];
  const gancho = ganchos[Math.floor(Math.random() * ganchos.length)];
  const emocao = emocoes[Math.floor(Math.random() * emocoes.length)];
  
  // Combina os componentes para formar o título
  return `${personagem} ${acao} ${gancho} ${params.microSubniche} ${emocao}`;
};

// Função para gerar um hook inicial
const generateHook = (params: ScriptGenerationParams): string => {
  const hooks = [
    `Você já se perguntou por que tantas pessoas falham ao tentar ${params.microSubniche}?`,
    `O que realmente separa os bem-sucedidos dos fracassados quando falamos de ${params.microSubniche}?`,
    `E se eu te disser que existe um método revolucionário para ${params.microSubniche} que pouquíssimas pessoas conhecem?`,
    `Você está cometendo estes erros fatais em ${params.microSubniche} sem nem perceber?`,
    `Por que 95% das pessoas nunca conseguem resultados reais com ${params.microSubniche}?`
  ];
  
  return hooks[Math.floor(Math.random() * hooks.length)];
};

// Função para gerar a introdução
const generateIntroduction = (params: ScriptGenerationParams): string => {
  return `Olá, seja bem-vindo ao canal! Hoje vamos mergulhar em um tema fascinante: ${params.microSubniche}. 
Se você se interessa por ${params.subniche} e quer levar seus resultados para o próximo nível, este vídeo 
foi feito especialmente para você. Vou compartilhar insights que mudaram completamente minha abordagem e 
tenho certeza que vão fazer o mesmo por você. Comente abaixo se você já tentou implementar algo relacionado 
a ${params.microSubniche} e como foi sua experiência... Vamos começar!`;
};

// Função para gerar um bloco de conteúdo
const generateBlock = (
  blockNumber: number, 
  totalBlocks: number, 
  params: ScriptGenerationParams
): { texto: string; mini_cta: string } => {
  // Arrays de situações, conflitos e soluções baseados no nicho
  const situacoes = [
    `Muitas pessoas começam a trabalhar com ${params.microSubniche} com grandes expectativas`,
    `Frequentemente vemos iniciantes em ${params.microSubniche} cometendo o mesmo erro básico`,
    `A maioria das pessoas aborda ${params.microSubniche} da maneira tradicional`,
    `Ao iniciar a jornada em ${params.microSubniche}, é comum sentir-se perdido`,
    `Quando falamos de ${params.microSubniche}, o primeiro desafio é a falta de conhecimento estruturado`
  ];
  
  const conflitos = [
    `mas logo se deparam com obstáculos que parecem impossíveis de superar`,
    `porém acabam frustrados porque não conseguem ver resultados concretos`,
    `contudo, essa abordagem está completamente ultrapassada nos dias de hoje`,
    `e essa confusão inicial leva a decisões que comprometem todo o processo`,
    `e isso faz com que a maioria desista antes mesmo de começar de verdade`
  ];
  
  const solucoes = [
    `A verdadeira solução está em mudar completamente sua perspectiva sobre o processo`,
    `O segredo que descobri após anos de estudo é implementar pequenas mudanças consistentes`,
    `O método que realmente funciona envolve três etapas fundamentais que vou detalhar agora`,
    `A estratégia que transformou meus resultados foi focar nos fundamentos antes de avançar`,
    `O que realmente faz diferença é entender o princípio central por trás de ${params.microSubniche}`
  ];
  
  const perguntasRetoricas = [
    `Você já parou para pensar como seria sua vida se dominasse esta habilidade?`,
    `O que aconteceria se você implementasse este conhecimento já na próxima semana?`,
    `Consegue imaginar os resultados que poderia alcançar com esta abordagem?`,
    `Qual seria o impacto na sua vida se você superasse esta limitação hoje mesmo?`,
    `Já se perguntou por que algumas pessoas conseguem resultados tão superiores nesta área?`
  ];
  
  const promessasProximoBloco = [
    `No próximo tópico, vou revelar o elemento mais importante que ninguém menciona sobre ${params.microSubniche}`,
    `A seguir, vou mostrar exatamente como implementar esta estratégia no seu dia-a-dia`,
    `Continuando, vou compartilhar o erro número um que você deve evitar a todo custo`,
    `No próximo bloco, você vai descobrir como multiplicar seus resultados com um simples ajuste`,
    `Vamos ver agora como adaptar este método para qualquer nível de experiência`
  ];
  
  // Mini CTAs para engajamento
  const miniCTAs = [
    "Se você já viveu algo parecido, deixe um 👍 nos comentários!",
    "Concorda com este ponto? Escreva 'SIM' nos comentários abaixo!",
    "Se este conteúdo está te ajudando, não esqueça de deixar um like!",
    "Compartilhe sua experiência nos comentários - leio todos!",
    "Ative o sininho para não perder nossas próximas dicas exclusivas!"
  ];
  
  // Selecionar elementos aleatórios
  const situacao = situacoes[Math.floor(Math.random() * situacoes.length)];
  const conflito = conflitos[Math.floor(Math.random() * conflitos.length)];
  const solucao = solucoes[Math.floor(Math.random() * solucoes.length)];
  const pergunta = perguntasRetoricas[Math.floor(Math.random() * perguntasRetoricas.length)];
  
  // A última promessa é diferente para o último bloco
  let promessa = "";
  if (blockNumber < totalBlocks) {
    promessa = promessasProximoBloco[Math.floor(Math.random() * promessasProximoBloco.length)];
  } else {
    promessa = "Agora vamos concluir com as ideias mais importantes que você deve levar deste vídeo.";
  }
  
  const miniCTA = miniCTAs[Math.floor(Math.random() * miniCTAs.length)];
  
  // Criar texto com tamanho aproximado ao solicitado
  const baseText = `${situacao}. ${conflito}. ${solucao}. ${pergunta} ${promessa}`;
  
  // Ajustar o tamanho do texto para aproximar-se do parâmetro charsPerBlock
  let texto = baseText;
  while (texto.length < params.charsPerBlock * 0.8) {
    texto = texto + " " + solucoes[Math.floor(Math.random() * solucoes.length)];
  }
  
  // Limitar o tamanho máximo
  if (texto.length > params.charsPerBlock * 1.2) {
    texto = texto.substring(0, params.charsPerBlock);
  }
  
  return { texto, mini_cta: miniCTA };
};

// Função para gerar a conclusão
const generateConclusion = (params: ScriptGenerationParams): string => {
  return `Chegamos ao final deste vídeo sobre ${params.microSubniche}. Espero que estas 
informações tenham sido valiosas e que você possa aplicá-las imediatamente para transformar 
seus resultados em ${params.subniche}. Lembre-se que a consistência é a chave para o sucesso 
nesta área. Se você gostou deste conteúdo, não esqueça de deixar seu like, se inscrever no 
canal e ativar o sininho para ser notificado sempre que publicarmos novos vídeos sobre 
${params.niche}. Além disso, compartilhe nos comentários qual foi seu maior aprendizado 
e como pretende aplicá-lo. Estou sempre aqui para responder suas dúvidas e ajudar em sua 
jornada. Até o próximo vídeo!`;
};

// Função para calcular estatísticas do texto
const calculateStats = (script: CompleteScript): CompleteScript["stats"] => {
  // Combinar todos os textos do roteiro
  let fullText = script.titulo + " " + script.hook + " " + script.introducao;
  
  script.blocos.forEach(bloco => {
    fullText += " " + bloco.texto + " " + bloco.mini_cta;
  });
  
  fullText += " " + script.conclusao;
  
  // Calcular estatísticas
  const caracteresComEspacos = fullText.length;
  const caracteresSemEspacos = fullText.replace(/\s/g, "").length;
  const palavras = fullText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Estimar duração (aproximadamente 150 palavras por minuto)
  const duracaoMin = Math.ceil(palavras / 150);
  
  return {
    caracteres_com_espacos: caracteresComEspacos,
    caracteres_sem_espacos: caracteresSemEspacos,
    palavras: palavras,
    duracao_min: duracaoMin
  };
};

/**
 * Gera um roteiro completo com base nos parâmetros fornecidos
 * @param params Parâmetros para geração do roteiro
 * @returns Roteiro completo estruturado
 */
export const generateCompleteScript = (params: ScriptGenerationParams): CompleteScript => {
  // Gerar título
  const titulo = generateTitle(params);
  
  // Gerar hook
  const hook = generateHook(params);
  
  // Gerar introdução
  const introducao = generateIntroduction(params);
  
  // Gerar blocos
  const blocos = [];
  for (let i = 0; i < params.blocksCount; i++) {
    blocos.push(generateBlock(i + 1, params.blocksCount, params));
  }
  
  // Gerar conclusão
  const conclusao = generateConclusion(params);
  
  // Criar o roteiro completo
  const script: CompleteScript = {
    titulo,
    hook,
    introducao,
    blocos,
    conclusao,
    stats: {
      caracteres_com_espacos: 0,
      caracteres_sem_espacos: 0,
      palavras: 0,
      duracao_min: 0
    }
  };
  
  // Calcular e adicionar estatísticas
  script.stats = calculateStats(script);
  
  return script;
};
