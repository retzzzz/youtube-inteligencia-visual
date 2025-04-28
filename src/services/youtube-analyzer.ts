
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

    // Detectar se precisamos traduzir para o português ou a partir do português
    const isPortuguese = language.startsWith('pt');
    const isSpanish = language.startsWith('es');
    const isEnglish = language.startsWith('en');
    const isFrench = language.startsWith('fr');
    const isItalian = language.startsWith('it');

    // Helper para gerar traduções com PT-BR incluído
    const generateTranslations = () => {
      // Se o idioma original é português, nós traduzimos para os outros idiomas
      // Se o idioma original é outro, traduzimos para português
      
      // Exemplo de título português (para simular traduções)
      const titleInPortuguese = isPortuguese 
        ? basicInfo.title 
        : `Tradução para português do título em ${isEnglish ? 'inglês' : isSpanish ? 'espanhol' : isFrench ? 'francês' : 'italiano'}`;
      
      // Exemplo de descrição em português
      const descriptionInPortuguese = isPortuguese
        ? basicInfo.description
        : `Tradução para português da descrição em ${isEnglish ? 'inglês' : isSpanish ? 'espanhol' : isFrench ? 'francês' : 'italiano'}`;
        
      const translations = {
        english: {
          title: isEnglish 
            ? basicInfo.title 
            : `[English] ${basicInfo.title} PT-BR: ${titleInPortuguese}`,
          description: isEnglish 
            ? basicInfo.description 
            : `This is a translation of the description to English. PT-BR: ${descriptionInPortuguese}`
        },
        spanish: {
          title: isSpanish 
            ? basicInfo.title 
            : `[Español] ${basicInfo.title} PT-BR: ${titleInPortuguese}`,
          description: isSpanish 
            ? basicInfo.description 
            : `Esta es una traducción de la descripción al español. PT-BR: ${descriptionInPortuguese}`
        },
        french: {
          title: isFrench 
            ? basicInfo.title 
            : `[Français] ${basicInfo.title} PT-BR: ${titleInPortuguese}`,
          description: isFrench 
            ? basicInfo.description 
            : `Ceci est une traduction de la description en français. PT-BR: ${descriptionInPortuguese}`
        },
        italian: {
          title: isItalian 
            ? basicInfo.title 
            : `[Italiano] ${basicInfo.title} PT-BR: ${titleInPortuguese}`,
          description: isItalian 
            ? basicInfo.description 
            : `Questa è una traduzione della descrizione in italiano. PT-BR: ${descriptionInPortuguese}`
        }
      };

      return translations;
    };

    // Helper para gerar ideias de roteiro com tradução
    const generateScriptIdeas = () => {
      // Determinar o idioma base para as ideias
      const baseLanguage = isSpanish ? 'es' : 
                         isEnglish ? 'en' :
                         isFrench ? 'fr' : 
                         isItalian ? 'it' : 'pt';
      
      // Ideias base em português
      const ptIdeas = [
        `História pessoal: Minha jornada com ${basicInfo.title} e como isso mudou minha perspectiva.`,
        `Análise aprofundada: Os 5 princípios fundamentais de ${basicInfo.title} que ninguém explica.`,
        `Guia passo a passo: Como implementar ${basicInfo.title} em sua rotina diária.`,
        `Debate: Prós e contras de diferentes abordagens para ${basicInfo.title}.`,
        `Entrevista com especialista: Conversando com um profissional sobre ${basicInfo.title}.`
      ];
      
      // Ideias em espanhol
      const esIdeas = [
        `Historia personal: Mi jornada con ${basicInfo.title} y cómo cambió mi perspectiva.`,
        `Análisis profundo: Los 5 principios fundamentales de ${basicInfo.title} que nadie explica.`,
        `Guía paso a paso: Cómo implementar ${basicInfo.title} en tu rutina diaria.`,
        `Debate: Pros y contras de diferentes enfoques para ${basicInfo.title}.`,
        `Entrevista con un experto: Conversando con un profesional sobre ${basicInfo.title}.`
      ];
      
      // Ideias em inglês
      const enIdeas = [
        `Personal story: My journey with ${basicInfo.title} and how it changed my perspective.`,
        `Deep analysis: The 5 fundamental principles of ${basicInfo.title} that nobody explains.`,
        `Step-by-step guide: How to implement ${basicInfo.title} in your daily routine.`,
        `Debate: Pros and cons of different approaches to ${basicInfo.title}.`,
        `Expert interview: Talking with a professional about ${basicInfo.title}.`
      ];
      
      // Ideias em francês
      const frIdeas = [
        `Histoire personnelle: Mon voyage avec ${basicInfo.title} et comment cela a changé ma perspective.`,
        `Analyse approfondie: Les 5 principes fondamentaux de ${basicInfo.title} que personne n'explique.`,
        `Guide étape par étape: Comment mettre en œuvre ${basicInfo.title} dans votre routine quotidienne.`,
        `Débat: Avantages et inconvénients de différentes approches pour ${basicInfo.title}.`,
        `Entretien avec un expert: Conversation avec un professionnel sur ${basicInfo.title}.`
      ];
      
      // Ideias em italiano
      const itIdeas = [
        `Storia personale: Il mio viaggio con ${basicInfo.title} e come ha cambiato la mia prospettiva.`,
        `Analisi approfondita: I 5 principi fondamentali di ${basicInfo.title} che nessuno spiega.`,
        `Guida passo passo: Come implementare ${basicInfo.title} nella tua routine quotidiana.`,
        `Dibattito: Pro e contro di diversi approcci a ${basicInfo.title}.`,
        `Intervista con un esperto: Conversazione con un professionista su ${basicInfo.title}.`
      ];
      
      let ideas: string[] = [];
      
      if (baseLanguage === 'es') {
        ideas = esIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
      } else if (baseLanguage === 'en') {
        ideas = enIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
      } else if (baseLanguage === 'fr') {
        ideas = frIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
      } else if (baseLanguage === 'it') {
        ideas = itIdeas.map((idea, i) => `${idea}\nTradução: ${ptIdeas[i]}`);
      } else {
        ideas = ptIdeas;
      }
      
      return ideas;
    };

    // Helper para gerar prompts de imagem com tradução
    const generateImagePrompts = () => {
      const basePrompts = [
        `[EN] Person with surprised expression looking at large text '${basicInfo.title}' with blue to red gradient background\n[PT-BR] Pessoa com expressão de surpresa olhando para um texto grande '${basicInfo.title}' com fundo gradiente de azul para vermelho`,
        `[EN] Close-up of expressive eyes with reflection showing '${basicInfo.title}', dark contrasting background\n[PT-BR] Close em olhos expressivos com reflexo mostrando '${basicInfo.title}', fundo escuro contrastante`,
        `[EN] Before/after collage demonstrating the impact of '${basicInfo.title}', bold text in center\n[PT-BR] Colagem antes/depois demonstrando o impacto de '${basicInfo.title}', texto em negrito no centro`,
        `[EN] Silhouette of person against sunset with inspirational text about '${basicInfo.title}' in modern fonts\n[PT-BR] Silhueta de pessoa contra pôr do sol com texto inspirador sobre '${basicInfo.title}' em fontes modernas`,
        `[EN] Minimalist style with just one strong visual element related to '${basicInfo.title}' and large text on the side\n[PT-BR] Estilo minimalista com apenas um elemento visual forte relacionado a '${basicInfo.title}' e texto grande na lateral`
      ];

      return basePrompts;
    };

    const supportImagePrompts = [
      `[EN] Infographic explaining the 5 main elements of '${basicInfo.title}'\n[PT-BR] Infográfico explicando os 5 elementos principais de '${basicInfo.title}'`,
      `[EN] Comparative table showing different approaches to '${basicInfo.title}'\n[PT-BR] Tabela comparativa mostrando diferentes abordagens para '${basicInfo.title}'`,
      `[EN] Visual timeline showing the evolution and important milestones of '${basicInfo.title}'\n[PT-BR] Linha do tempo visual mostrando a evolução e marcos importantes de '${basicInfo.title}'`,
      `[EN] Flowchart illustrating the process of mastering '${basicInfo.title}' step by step\n[PT-BR] Diagrama de fluxo ilustrando o processo de dominar '${basicInfo.title}' passo a passo`,
      `[EN] Set of custom icons representing key concepts of '${basicInfo.title}'\n[PT-BR] Conjunto de ícones personalizados representando os conceitos-chave de '${basicInfo.title}'`
    ];
    
    // Função para gerar variações de título adaptadas ao idioma
    const generateTitleVariations = () => {
      // Determinar o idioma base para os títulos
      const baseLanguage = isSpanish ? 'es' : 
                         isEnglish ? 'en' :
                         isFrench ? 'fr' : 
                         isItalian ? 'it' : 'pt';
                         
      // Títulos emocionais em português
      const ptEmotional = [
        `Como ${basicInfo.title} mudou minha vida`,
        `O incrível segredo por trás de ${basicInfo.title}`,
        `A verdade chocante sobre ${basicInfo.title} que ninguém conta`,
        `Por que ${basicInfo.title} me fez chorar`,
        `A jornada inspiradora para descobrir ${basicInfo.title}`
      ];
      
      // Títulos estruturais em português
      const ptStructural = [
        `7 maneiras de dominar ${basicInfo.title} em 30 dias`,
        `${basicInfo.title}: o guia definitivo para iniciantes`,
        `Você está fazendo ${basicInfo.title} errado? 5 erros comuns`,
        `Antes e depois: como ${basicInfo.title} transformou meus resultados`,
        `${basicInfo.title} explicado em apenas 5 minutos`
      ];
      
      // Títulos em espanhol
      const esEmotional = [
        `Cómo ${basicInfo.title} cambió mi vida PT-BR: Como ${basicInfo.title} mudou minha vida`,
        `El increíble secreto detrás de ${basicInfo.title} PT-BR: O incrível segredo por trás de ${basicInfo.title}`,
        `La impactante verdad sobre ${basicInfo.title} que nadie te cuenta PT-BR: A verdade chocante sobre ${basicInfo.title} que ninguém conta`,
        `Por qué ${basicInfo.title} me hizo llorar PT-BR: Por que ${basicInfo.title} me fez chorar`,
        `El viaje inspirador para descubrir ${basicInfo.title} PT-BR: A jornada inspiradora para descobrir ${basicInfo.title}`
      ];
      
      const esStructural = [
        `7 formas de dominar ${basicInfo.title} en 30 días PT-BR: 7 maneiras de dominar ${basicInfo.title} em 30 dias`,
        `${basicInfo.title}: la guía definitiva para principiantes PT-BR: ${basicInfo.title}: o guia definitivo para iniciantes`,
        `¿Estás haciendo ${basicInfo.title} mal? 5 errores comunes PT-BR: Você está fazendo ${basicInfo.title} errado? 5 erros comuns`,
        `Antes y después: cómo ${basicInfo.title} transformó mis resultados PT-BR: Antes e depois: como ${basicInfo.title} transformou meus resultados`,
        `${basicInfo.title} explicado en solo 5 minutos PT-BR: ${basicInfo.title} explicado em apenas 5 minutos`
      ];
      
      // Títulos em inglês
      const enEmotional = [
        `How ${basicInfo.title} changed my life PT-BR: Como ${basicInfo.title} mudou minha vida`,
        `The incredible secret behind ${basicInfo.title} PT-BR: O incrível segredo por trás de ${basicInfo.title}`,
        `The shocking truth about ${basicInfo.title} nobody tells you PT-BR: A verdade chocante sobre ${basicInfo.title} que ninguém conta`,
        `Why ${basicInfo.title} made me cry PT-BR: Por que ${basicInfo.title} me fez chorar`,
        `The inspiring journey to discover ${basicInfo.title} PT-BR: A jornada inspiradora para descobrir ${basicInfo.title}`
      ];
      
      const enStructural = [
        `7 ways to master ${basicInfo.title} in 30 days PT-BR: 7 maneiras de dominar ${basicInfo.title} em 30 dias`,
        `${basicInfo.title}: the ultimate guide for beginners PT-BR: ${basicInfo.title}: o guia definitivo para iniciantes`,
        `Are you doing ${basicInfo.title} wrong? 5 common mistakes PT-BR: Você está fazendo ${basicInfo.title} errado? 5 erros comuns`,
        `Before and after: how ${basicInfo.title} transformed my results PT-BR: Antes e depois: como ${basicInfo.title} transformou meus resultados`,
        `${basicInfo.title} explained in just 5 minutes PT-BR: ${basicInfo.title} explicado em apenas 5 minutos`
      ];
      
      // Selecione os títulos com base no idioma
      let emotional, structural;
      if (baseLanguage === 'es') {
        emotional = esEmotional;
        structural = esStructural;
      } else if (baseLanguage === 'en') {
        emotional = enEmotional;
        structural = enStructural;
      } else {
        emotional = ptEmotional;
        structural = ptStructural;
      }
      
      // Multilingual sempre usa outros idiomas
      const multilingual = [
        `[English] The ultimate guide to ${basicInfo.title} PT-BR: O guia definitivo para ${basicInfo.title}`,
        `[Español] Todo lo que necesitas saber sobre ${basicInfo.title} PT-BR: Tudo o que você precisa saber sobre ${basicInfo.title}`,
        `[Français] Les secrets de ${basicInfo.title} révélés PT-BR: Os segredos de ${basicInfo.title} revelados`,
        `[Italiano] Come padroneggiare ${basicInfo.title} in 30 giorni PT-BR: Como dominar ${basicInfo.title} em 30 dias`,
        `[Deutsch] ${basicInfo.title} leicht gemacht PT-BR: ${basicInfo.title} facilitado`
      ];
    
      return {
        emotional,
        structural,
        multilingual
      };
    };
    
    return {
      basicInfo,
      translations: generateTranslations(),
      titleVariations: generateTitleVariations(),
      scriptIdeas: generateScriptIdeas(),
      thumbnailPrompts: generateImagePrompts(),
      supportImagePrompts: supportImagePrompts,
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
