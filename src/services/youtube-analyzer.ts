
import { VideoAnalysis } from "@/types/youtube-types";
import { analyzeSaturation } from "@/utils/formatters";

// Função auxiliar para extrair o ID do vídeo de uma URL do YouTube
function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const analyzeYoutubeVideo = async (videoUrl: string, apiKey: string): Promise<VideoAnalysis> => {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error("URL de vídeo inválido");
  }

  try {
    // Obter dados básicos do vídeo da API do YouTube
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${apiKey}`
    );
    
    if (!videoResponse.ok) {
      const errorData = await videoResponse.json();
      throw new Error(`Erro na API do YouTube: ${errorData.error?.message || 'Erro desconhecido'}`);
    }
    
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      throw new Error("Vídeo não encontrado ou indisponível");
    }
    
    const video = videoData.items[0];
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;
    
    // Formatar a duração do vídeo (do formato ISO 8601 para um formato mais legível)
    let duration = contentDetails.duration;
    duration = duration.replace('PT', '');
    duration = duration.replace('H', ':').replace('M', ':').replace('S', '');
    if (duration.endsWith(':')) duration = duration.slice(0, -1);
    
    // Detectar idioma do vídeo
    const language = snippet.defaultLanguage || snippet.defaultAudioLanguage || 'und'; // und = undefined
    
    // Extrair tags (se disponíveis)
    const tags = snippet.tags || [];
    
    // Dados básicos do vídeo
    const basicInfo = {
      title: snippet.title,
      description: snippet.description,
      views: parseInt(statistics.viewCount, 10),
      publishDate: new Date(snippet.publishedAt).toLocaleDateString(),
      language: language,
      duration: duration,
      category: snippet.categoryId, // Idealmente, converteríamos o ID da categoria para o nome
      tags: tags
    };
    
    // Para fins de demonstração, usamos dados simulados para o resto da análise
    // Em uma implementação real, poderíamos usar serviços de AI como ChatGPT para gerar essas sugestões
    
    // Simular análise de saturação
    const saturationResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(basicInfo.title)}&type=video&publishedAfter=${encodeURIComponent(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}&key=${apiKey}`
    );
    
    const saturationData = await saturationResponse.json();
    const videoCount = saturationData.pageInfo?.totalResults || 0;
    
    let saturationStatus: "high" | "medium" | "low";
    let saturationMessage = "";
    
    if (videoCount > 20) {
      saturationStatus = "high";
      saturationMessage = "Alta saturação detectada";
    } else if (videoCount > 10) {
      saturationStatus = "medium";
      saturationMessage = "Saturação média detectada";
    } else {
      saturationStatus = "low";
      saturationMessage = "Baixa saturação, boa oportunidade";
    }
    
    const saturation = {
      status: saturationStatus,
      message: saturationMessage,
      count: videoCount
    };
    
    return {
      basicInfo,
      translations: {
        english: {
          title: `[English] ${basicInfo.title}`,
          description: `This is a simulated translation of the description to English.`
        },
        spanish: {
          title: `[Español] ${basicInfo.title}`,
          description: `Esta es una traducción simulada de la descripción al español.`
        },
        french: {
          title: `[Français] ${basicInfo.title}`,
          description: `Ceci est une traduction simulée de la description en français.`
        },
        italian: {
          title: `[Italiano] ${basicInfo.title}`,
          description: `Questa è una traduzione simulata della descrizione in italiano.`
        }
      },
      titleVariations: {
        emotional: [
          `[Emoção] Como ${basicInfo.title} mudou minha vida`,
          `O incrível segredo por trás de ${basicInfo.title}`,
          `A verdade chocante sobre ${basicInfo.title} que ninguém conta`,
          `Por que ${basicInfo.title} me fez chorar`,
          `A jornada inspiradora para descobrir ${basicInfo.title}`
        ],
        structural: [
          `7 maneiras de dominar ${basicInfo.title} em 30 dias`,
          `${basicInfo.title}: o guia definitivo para iniciantes`,
          `Você está fazendo ${basicInfo.title} errado? 5 erros comuns`,
          `Antes e depois: como ${basicInfo.title} transformou meus resultados`,
          `${basicInfo.title} explicado em apenas 5 minutos`
        ],
        multilingual: [
          `[English] The ultimate guide to ${basicInfo.title}`,
          `[Español] Todo lo que necesitas saber sobre ${basicInfo.title}`,
          `[Français] Les secrets de ${basicInfo.title} révélés`,
          `[Italiano] Come padroneggiare ${basicInfo.title} in 30 giorni`,
          `[Deutsch] ${basicInfo.title} leicht gemacht`
        ]
      },
      scriptIdeas: [
        `História pessoal: Minha jornada com ${basicInfo.title} e como isso mudou minha perspectiva.`,
        `Análise aprofundada: Os 5 princípios fundamentais de ${basicInfo.title} que ninguém explica.`,
        `Guia passo a passo: Como implementar ${basicInfo.title} em sua rotina diária.`,
        `Debate: Prós e contras de diferentes abordagens para ${basicInfo.title}.`,
        `Entrevista com especialista: Conversando com um profissional sobre ${basicInfo.title}.`
      ],
      thumbnailPrompts: [
        `Imagem de uma pessoa com expressão surpresa olhando para texto grande '${basicInfo.title}' com fundo gradiente azul para vermelho`,
        `Close-up em olhos expressivos com reflexo mostrando '${basicInfo.title}', fundo escuro contrastante`,
        `Colagem antes/depois demonstrando o impacto de '${basicInfo.title}', texto em negrito no centro`,
        `Silhueta de pessoa contra pôr do sol com texto inspirador sobre '${basicInfo.title}' em fontes modernas`,
        `Estilo minimalista com apenas um elemento visual forte relacionado a '${basicInfo.title}' e texto grande na lateral`
      ],
      supportImagePrompts: [
        `Infográfico explicando os 5 elementos principais de '${basicInfo.title}'`,
        `Tabela comparativa mostrando diferentes abordagens para '${basicInfo.title}'`,
        `Linha do tempo visual mostrando a evolução e marcos importantes de '${basicInfo.title}'`,
        `Diagrama de fluxo ilustrando o processo de dominar '${basicInfo.title}' passo a passo`,
        `Conjunto de ícones personalizados representando os conceitos-chave de '${basicInfo.title}'`
      ],
      subNicheIdeas: [
        {
          name: `${basicInfo.title} para iniciantes`,
          description: "Conteúdo focado especificamente em pessoas que estão começando do zero.",
          examples: [
            `Guia do absoluto iniciante para ${basicInfo.title}`,
            `Os erros mais comuns de iniciantes em ${basicInfo.title}`,
            `${basicInfo.title} simplificado: aprenda em 7 dias`
          ]
        },
        {
          name: `${basicInfo.title} avançado`,
          description: "Conteúdo para quem já domina o básico e quer técnicas mais sofisticadas.",
          examples: [
            `Técnicas avançadas de ${basicInfo.title} que 98% das pessoas desconhecem`,
            `Domine ${basicInfo.title} como um profissional`,
            `Os segredos dos especialistas em ${basicInfo.title}`
          ]
        },
        {
          name: `${basicInfo.title} para negócios`,
          description: "Como aplicar este conhecimento especificamente no contexto empresarial.",
          examples: [
            `Como ${basicInfo.title} pode revolucionar seu negócio`,
            `Estudo de caso: empresa aumenta receita em 240% com ${basicInfo.title}`,
            `Estratégias de ${basicInfo.title} para pequenas empresas`
          ]
        }
      ],
      saturation
    };
    
  } catch (error) {
    console.error("Erro ao analisar vídeo:", error);
    throw new Error(`Falha ao analisar o vídeo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};
