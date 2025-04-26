
import { VideoAnalysis } from "@/types/youtube-types";
import { analyzeSaturation } from "@/utils/formatters";

const MOCK_VIDEO_DATABASE = [
  {
    title: "Como Meditar em 5 Minutos por Dia",
    description: "Neste vídeo, ensino uma técnica simples de meditação que você pode fazer em apenas 5 minutos por dia. Ideal para iniciantes e para quem tem uma rotina agitada.",
    views: 45000,
    videoAge: 15,
    channel: "Equilíbrio Mental",
    language: "pt-BR",
  },
  {
    title: "5 Técnicas de Meditação para Iniciantes",
    description: "Aprenda cinco técnicas simples de meditação para quem está começando agora. Resultados rápidos e sem complicação!",
    views: 32000,
    videoAge: 22,
    channel: "Vida Consciente",
    language: "pt-BR",
  },
  {
    title: "Meditação Guiada para Iniciantes - 10 minutos",
    description: "Uma meditação guiada simples e eficaz para quem está começando. Apenas 10 minutos por dia para transformar sua mente.",
    views: 78000,
    videoAge: 8,
    channel: "Paz Interior",
    language: "pt-BR",
  },
];

function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const analyzeYoutubeVideo = async (videoUrl: string): Promise<VideoAnalysis> => {
  // Simulando tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error("URL de vídeo inválido");
  }
  
  // Em uma implementação real, aqui faríamos chamadas à API do YouTube
  // Para fins de demonstração, vamos usar dados simulados
  
  // Pegamos o segundo vídeo da nossa base fictícia como exemplo
  const videoData = MOCK_VIDEO_DATABASE[1];
  
  // Analisar saturação (usando a função existente)
  const saturationAnalysis = analyzeSaturation(MOCK_VIDEO_DATABASE, videoData.title);
  
  return {
    basicInfo: {
      title: videoData.title,
      description: videoData.description,
      views: videoData.views,
      publishDate: "2023-09-15", // Data fictícia
      language: videoData.language,
      duration: "8:24", // Duração fictícia
      category: "Saúde e Bem-estar",
      tags: ["meditação", "bem-estar", "saúde mental", "iniciantes", "técnicas"]
    },
    
    translations: {
      english: {
        title: "5 Meditation Techniques for Beginners",
        description: "Learn five simple meditation techniques for those who are just starting out. Quick results without complications!"
      },
      spanish: {
        title: "5 Técnicas de Meditación para Principiantes",
        description: "Aprenda cinco técnicas simples de meditación para quienes recién están comenzando. ¡Resultados rápidos y sin complicaciones!"
      },
      french: {
        title: "5 Techniques de Méditation pour Débutants",
        description: "Apprenez cinq techniques simples de méditation pour ceux qui débutent. Des résultats rapides sans complications!"
      },
      italian: {
        title: "5 Tecniche di Meditazione per Principianti",
        description: "Impara cinque semplici tecniche di meditazione per chi sta iniziando. Risultati rapidi e senza complicazioni!"
      }
    },
    
    titleVariations: {
      emotional: [
        "5 Técnicas de Meditação que Transformaram Minha Ansiedade",
        "O Segredo da Meditação que Ninguém te Conta",
        "Como Meditar Mesmo Quando Você Acha Que Não Consegue",
        "Meditação para Quem Está Sofrendo com Estresse",
        "A Prática de 5 Minutos que me Salvou da Depressão"
      ],
      structural: [
        "7 Técnicas de Meditação que Funcionam em Apenas 3 Minutos",
        "Técnica #1 de Meditação: O Método que Ninguém Conhece",
        "Você Medita Errado? 3 Erros que Impedem seu Progresso",
        "Meditação 101: O Guia Definitivo para Iniciantes",
        "10 Dias de Meditação: O Desafio que Vai Mudar sua Vida"
      ],
      multilingual: [
        "Meditation Techniques That Changed My Life (Inglês)",
        "Las 5 Mejores Técnicas de Meditación para Principiantes (Espanhol)",
        "Comment Méditer en 5 Minutes par Jour (Francês)",
        "5 Tecniche di Meditazione per Principianti (Italiano)",
        "Медитация для Начинающих: 5 Простых Техник (Russo)"
      ]
    },
    
    scriptIdeas: [
      "História pessoal: Como a meditação me ajudou a superar um burnout severo e como essas 5 técnicas foram fundamentais para minha recuperação.",
      
      "Contexto histórico: Explorar a origem de cada uma das 5 técnicas em diferentes culturas (zen budismo, yoga, mindfulness ocidental) e como elas evoluíram para se adaptar ao mundo moderno.",
      
      "Desafio de 21 dias: Estruturar o vídeo como um desafio, mostrando o progresso dia após dia de uma pessoa iniciando na meditação, com depoimentos reais.",
      
      "Abordagem científica: Apresentar estudos neurocientíficos que comprovam os benefícios de cada técnica de meditação, com visualizações de scans cerebrais antes e depois da prática.",
      
      "Meditação em situações extremas: Mostrar como pessoas em situações de alto estresse (cirurgiões, bombeiros, atletas) utilizam técnicas rápidas de meditação para manter o foco e a calma."
    ],
    
    thumbnailPrompts: [
      "Fotografia minimalista em tons de azul e branco mostrando uma pessoa serena de perfil com leve sorriso, com efeito de ondas cerebrais azuis iluminadas saindo de sua cabeça, texto em negrito '5 TÉCNICAS QUE FUNCIONAM'",
      
      "Contraste visual entre um lado da imagem mostrando uma pessoa estressada com cores caóticas (vermelho/laranja) e outro lado mostrando a mesma pessoa meditando em paz com cores suaves (azul/verde), split design, texto 'DO CAOS À PAZ'",
      
      "Close-up dramático de um olho humano fechado com uma lágrima de alívio, iluminação suave azulada, reflexo de padrões de ondas cerebrais na lágrima, texto impactante '5 MIN = TRANSFORMAÇÃO'",
      
      "Silhueta de pessoa meditando ao pôr do sol com cinco raios de luz diferentes cores saindo de seu corpo, representando as 5 técnicas, design gráfico minimalista, texto 'MEDITAÇÃO PARA INICIANTES'",
      
      "Composição tipo 'antes e depois' com rosto dividido ao meio: lado esquerdo com expressão de estresse e cores tensas, lado direito com expressão serena e cores suaves, texto 'A CIÊNCIA DA MEDITAÇÃO'"
    ],
    
    supportImagePrompts: [
      "Ilustração anatômica estilo infográfico do cérebro humano com áreas ativadas durante a meditação destacadas em azul brilhante, fundo branco limpo, estilo médico mas acessível",
      
      "Time-lapse da passagem do dia através de uma janela com uma almofada de meditação em primeiro plano, luz mudando gradualmente do amanhecer ao anoitecer, estilo fotográfico sereno",
      
      "Visualização de dados tipo ondas de áudio representando ondas cerebrais, comparando padrões antes da meditação (irregulares, vermelhos) e durante/após (regulares, azuis), design minimalista",
      
      "Ilustração isométrica 3D do interior de uma casa moderna com cinco espaços diferentes dedicados à meditação, cada um representando uma técnica diferente, estilo limpo e acolhedor",
      
      "Sequência de poses corporais simples para meditação iniciante, ilustrada em estilo flat design com linhas de fluxo de energia visíveis, fundo gradiente suave, aparência acessível e não intimidadora"
    ],
    
    subNicheIdeas: [
      {
        name: "Meditação para Produtividade",
        description: "Foco em técnicas específicas de meditação para aumentar foco, produtividade e criatividade no trabalho e estudos.",
        examples: [
          "Meditação de 3 minutos para fazer antes de reuniões importantes",
          "Como usar micromeditações para evitar procrastinação",
          "Técnica pomodoro + meditação: o combo perfeito para estudantes"
        ]
      },
      {
        name: "Meditação para Relacionamentos",
        description: "Técnicas meditativas para melhorar conexão interpessoal, comunicação e inteligência emocional nos relacionamentos.",
        examples: [
          "Meditação para casais: exercícios para fazer juntos",
          "Como a meditação me ajudou a ter mais empatia com meus filhos",
          "Técnica de escuta consciente para resolver conflitos"
        ]
      },
      {
        name: "Meditação para Atletas",
        description: "Práticas de meditação adaptadas para melhorar performance esportiva, foco em competições e recuperação física.",
        examples: [
          "A técnica de visualização usada por atletas olímpicos",
          "Meditação pré-treino: 5 minutos para máxima performance",
          "Como meditar durante a corrida: mindfulness em movimento"
        ]
      }
    ],
    
    saturation: saturationAnalysis
  };
};
