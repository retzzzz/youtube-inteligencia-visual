
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { analyzeScriptNiche, estimateOptimalBlocksCount, estimateOptimalCharsPerBlock, identifyScriptTone } from "@/utils/script-niche-analyzer";

export interface ScriptStats {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
}

export interface ScriptBlock {
  text: string;
  imagePrompt?: string;
  mini_cta?: string;
}

export interface ScriptConfig {
  blocks: number;
  charactersPerBlock: number;
  targetDuration: number;
  ctaStyle: "emocional" | "apelativo" | "reflexivo" | null;
  generateMasterPrompt: boolean;
  generateImagePrompts: boolean;
  convertToSrt: boolean;
  processingType: "simple" | "remodel";
  language: "pt" | "en" | "es" | "de" | "fr";
  autoIdentifiedNiche?: {
    niche: string;
    subniche: string;
    microSubniche: string;
  };
}

export interface ProcessedScript {
  originalText: string;
  blocks: ScriptBlock[];
  stats: ScriptStats;
  masterPrompt?: string;
  srtContent?: string;
  remodeled?: {
    title?: string;
    hook?: string;
    introduction?: string;
    conclusion?: string;
  };
}

export const useScriptGenerator = () => {
  const [scriptText, setScriptText] = useState<string>("");
  const [scriptStats, setScriptStats] = useState<ScriptStats | null>(null);
  const [scriptConfig, setScriptConfig] = useState<ScriptConfig>({
    blocks: 8,
    charactersPerBlock: 400,
    targetDuration: 5,
    ctaStyle: null,
    generateMasterPrompt: false,
    generateImagePrompts: false,
    convertToSrt: false,
    processingType: "simple",
    language: "pt"
  });
  const [processedScript, setProcessedScript] = useState<ProcessedScript | null>(null);
  const [currentStep, setCurrentStep] = useState<"input" | "config" | "output">("input");
  const { toast } = useToast();

  const handleScriptInput = (text: string) => {
    setScriptText(text);
    const stats = calculateScriptStats(text);
    setScriptStats(stats);
    
    // Identificar automaticamente nicho, subnicho e micro-subnicho
    const nicheInfo = analyzeScriptNiche(text);
    
    // Estimar número ideal de blocos
    const optimalBlocks = estimateOptimalBlocksCount(text);
    
    // Estimar caracteres por bloco
    const optimalCharsPerBlock = estimateOptimalCharsPerBlock(text, optimalBlocks);
    
    // Identificar tom predominante
    const predominantTone = identifyScriptTone(text);
    
    // Atualizar a configuração com os valores detectados
    setScriptConfig(prev => ({
      ...prev,
      blocks: optimalBlocks,
      charactersPerBlock: optimalCharsPerBlock,
      ctaStyle: predominantTone,
      autoIdentifiedNiche: nicheInfo
    }));
    
    setCurrentStep("config");
    
    toast({
      title: "Texto recebido!",
      description: `${stats.words} palavras, ${stats.charactersWithSpaces} caracteres.`,
    });
  };

  const calculateScriptStats = (text: string): ScriptStats => {
    return {
      charactersWithSpaces: text.length,
      charactersWithoutSpaces: text.replace(/\s/g, "").length,
      words: text.split(/\s+/).filter(word => word.length > 0).length,
      lines: text.split(/\r\n|\r|\n/).length,
    };
  };

  const handleConfigSubmit = (config: ScriptConfig) => {
    setScriptConfig(config);
    const processed = processScript(scriptText, config);
    setProcessedScript(processed);
    setCurrentStep("output");
    
    toast({
      title: config.processingType === "remodel" ? "Roteiro remodelado!" : "Roteiro processado!",
      description: `Roteiro dividido em ${processed.blocks.length} blocos.`,
    });
  };

  const processScript = (text: string, config: ScriptConfig): ProcessedScript => {
    if (config.processingType === "simple") {
      return processSimpleScript(text, config);
    } else {
      return remodelScript(text, config);
    }
  };

  const processSimpleScript = (text: string, config: ScriptConfig): ProcessedScript => {
    // Dividir o texto em blocos com base na configuração
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const blocksCount = config.blocks;
    const wordsPerBlock = Math.ceil(words.length / blocksCount);
    
    const blocks: ScriptBlock[] = [];
    
    for (let i = 0; i < blocksCount; i++) {
      const startIdx = i * wordsPerBlock;
      const endIdx = Math.min(startIdx + wordsPerBlock, words.length);
      
      if (startIdx >= words.length) break;
      
      const blockText = words.slice(startIdx, endIdx).join(" ");
      
      blocks.push({
        text: blockText,
        imagePrompt: config.generateImagePrompts 
          ? generateImagePrompt(blockText) 
          : undefined
      });
    }
    
    // Se solicitado, adicionar CTA ao final
    if (config.ctaStyle) {
      const ctaText = generateCTA(config.ctaStyle);
      blocks.push({
        text: ctaText,
        imagePrompt: config.generateImagePrompts 
          ? "Professional content creator speaking directly to camera, warm lighting, emotional connection, call to action moment" 
          : undefined
      });
    }
    
    // Gerar SRT se solicitado
    let srtContent: string | undefined = undefined;
    if (config.convertToSrt) {
      srtContent = convertToSrt(blocks);
    }
    
    return {
      originalText: text,
      blocks: blocks,
      stats: calculateScriptStats(text),
      masterPrompt: config.generateMasterPrompt 
        ? generateMasterPrompt(text) 
        : undefined,
      srtContent: srtContent
    };
  };

  const remodelScript = (text: string, config: ScriptConfig): ProcessedScript => {
    const stats = calculateScriptStats(text);
    const nicho = config.autoIdentifiedNiche?.niche || "Desenvolvimento Pessoal";
    const subnicho = config.autoIdentifiedNiche?.subniche || "Crescimento";
    const microSubnicho = config.autoIdentifiedNiche?.microSubniche || `${subnicho} especializado`;
    
    // Gerar título com base nos nichos identificados
    const titulo = generateTitle(nicho, subnicho, microSubnicho, config.language);
    
    // Gerar hook
    const hook = generateHook(microSubnicho, config.language);
    
    // Gerar introdução
    const introducao = generateIntroduction(text, microSubnicho, config.language);
    
    // Dividir o texto original em seções para usar como base para os blocos
    const sentences = text.split(/(?<=[.!?])\s+/);
    const sentencesPerBlock = Math.ceil(sentences.length / config.blocks);
    
    const blocks: ScriptBlock[] = [];
    
    // Criar blocos temáticos
    for (let i = 0; i < config.blocks; i++) {
      const startIdx = i * sentencesPerBlock;
      const endIdx = Math.min(startIdx + sentencesPerBlock, sentences.length);
      
      if (startIdx >= sentences.length) break;
      
      // Extrair o conteúdo base para este bloco
      const blockBaseContent = sentences.slice(startIdx, endIdx).join(" ");
      
      // Gerar bloco remodelado
      const remodelado = remodelScriptBlock(
        blockBaseContent,
        i + 1,
        config.blocks,
        microSubnicho,
        config.language
      );
      
      // Gerar mini-CTA para o final do bloco
      const miniCta = generateMiniCTA(i + 1, config.blocks, config.language);
      
      blocks.push({
        text: remodelado,
        mini_cta: miniCta,
        imagePrompt: config.generateImagePrompts 
          ? generateImagePrompt(remodelado) 
          : undefined
      });
    }
    
    // Gerar conclusão
    const conclusao = generateConclusion(microSubnicho, config.ctaStyle, config.language);
    
    // Gerar SRT se solicitado
    let srtContent: string | undefined = undefined;
    if (config.convertToSrt) {
      srtContent = convertRemodeledScriptToSrt(titulo, hook, introducao, blocks, conclusao);
    }
    
    return {
      originalText: text,
      blocks: blocks,
      stats: stats,
      masterPrompt: config.generateMasterPrompt 
        ? generateMasterPrompt(text) 
        : undefined,
      srtContent: srtContent,
      remodeled: {
        title: titulo,
        hook: hook,
        introduction: introducao,
        conclusion: conclusao
      }
    };
  };

  const generateTitle = (nicho: string, subnicho: string, microSubnicho: string, language: string): string => {
    // Definir componentes de título por idioma
    const components = {
      pt: {
        personagens: ["O Especialista", "O Mestre", "O Profissional", "O Iniciante", "O Guru", "O Coach"],
        acoes: ["Revelou", "Descobriu", "Compartilhou", "Ensinou", "Desvendou", "Transformou"],
        emocoes: ["e o Resultado Foi Incrível", "e Você Vai Se Surpreender", "Contra Todas as Expectativas", "e Isso Mudou Tudo", "de uma Forma Que Ninguém Esperava"]
      },
      en: {
        personagens: ["The Expert", "The Master", "The Professional", "The Beginner", "The Guru", "The Coach"],
        acoes: ["Revealed", "Discovered", "Shared", "Taught", "Unveiled", "Transformed"],
        emocoes: ["and the Result Was Amazing", "and You'll Be Surprised", "Against All Expectations", "and It Changed Everything", "in a Way No One Expected"]
      },
      es: {
        personagens: ["El Experto", "El Maestro", "El Profesional", "El Principiante", "El Gurú", "El Coach"],
        acoes: ["Reveló", "Descubrió", "Compartió", "Enseñó", "Desveló", "Transformó"],
        emocoes: ["y el Resultado Fue Increíble", "y Te Sorprenderás", "Contra Todas las Expectativas", "y Eso Cambió Todo", "de una Forma Que Nadie Esperaba"]
      },
      de: {
        personagens: ["Der Experte", "Der Meister", "Der Profi", "Der Anfänger", "Der Guru", "Der Coach"],
        acoes: ["Enthüllte", "Entdeckte", "Teilte", "Lehrte", "Offenbarte", "Transformierte"],
        emocoes: ["und das Ergebnis War Unglaublich", "und Sie Werden Überrascht Sein", "Gegen Alle Erwartungen", "und Es Veränderte Alles", "auf eine Weise, Die Niemand Erwartet Hatte"]
      },
      fr: {
        personagens: ["L'Expert", "Le Maître", "Le Professionnel", "Le Débutant", "Le Gourou", "Le Coach"],
        acoes: ["A Révélé", "A Découvert", "A Partagé", "A Enseigné", "A Dévoilé", "A Transformé"],
        emocoes: ["et le Résultat Était Incroyable", "et Vous Serez Surpris", "Contre Toute Attente", "et Cela a Tout Changé", "d'une Manière Que Personne N'Attendait"]
      }
    };
    
    // Selecionar componentes aleatoriamente para o título no idioma escolhido
    const langComponents = components[language as keyof typeof components] || components.pt;
    const personagem = langComponents.personagens[Math.floor(Math.random() * langComponents.personagens.length)];
    const acao = langComponents.acoes[Math.floor(Math.random() * langComponents.acoes.length)];
    const emocao = langComponents.emocoes[Math.floor(Math.random() * langComponents.emocoes.length)];
    
    // Construir título no formato: Personagem + Ação + [Micronicho] + Emoção/Curiosidade
    return `${personagem} ${acao} ${microSubnicho} ${emocao}`;
  };

  const generateHook = (microSubnicho: string, language: string): string => {
    const hooks = {
      pt: [
        `Você já se perguntou por que tantas pessoas falham em ${microSubnicho}?`,
        `E se eu te dissesse que existe um segredo para dominar ${microSubnicho} que poucos conhecem?`,
        `Já pensou em quanto tempo você perdeu tentando entender ${microSubnicho} do jeito errado?`,
        `O que você faria se descobrisse que tudo o que você sabe sobre ${microSubnicho} está errado?`
      ],
      en: [
        `Have you ever wondered why so many people fail at ${microSubnicho}?`,
        `What if I told you there's a secret to mastering ${microSubnicho} that few people know about?`,
        `Have you thought about how much time you've wasted trying to understand ${microSubnicho} the wrong way?`,
        `What would you do if you discovered that everything you know about ${microSubnicho} is wrong?`
      ],
      es: [
        `¿Alguna vez te has preguntado por qué tantas personas fracasan en ${microSubnicho}?`,
        `¿Y si te dijera que existe un secreto para dominar ${microSubnicho} que pocos conocen?`,
        `¿Has pensado en cuánto tiempo has perdido tratando de entender ${microSubnicho} de la manera incorrecta?`,
        `¿Qué harías si descubrieras que todo lo que sabes sobre ${microSubnicho} está equivocado?`
      ],
      de: [
        `Haben Sie sich jemals gefragt, warum so viele Menschen bei ${microSubnicho} scheitern?`,
        `Was wäre, wenn ich Ihnen sagen würde, dass es ein Geheimnis gibt, um ${microSubnicho} zu beherrschen, das nur wenige kennen?`,
        `Haben Sie darüber nachgedacht, wie viel Zeit Sie verschwendet haben, um ${microSubnicho} auf die falsche Weise zu verstehen?`,
        `Was würden Sie tun, wenn Sie entdecken würden, dass alles, was Sie über ${microSubnicho} wissen, falsch ist?`
      ],
      fr: [
        `Vous êtes-vous déjà demandé pourquoi tant de personnes échouent en ${microSubnicho}?`,
        `Et si je vous disais qu'il existe un secret pour maîtriser ${microSubnicho} que peu de gens connaissent?`,
        `Avez-vous pensé au temps que vous avez perdu à essayer de comprendre ${microSubnicho} de la mauvaise façon?`,
        `Que feriez-vous si vous découvriez que tout ce que vous savez sur ${microSubnicho} est faux?`
      ]
    };
    
    const langHooks = hooks[language as keyof typeof hooks] || hooks.pt;
    return langHooks[Math.floor(Math.random() * langHooks.length)];
  };

  const generateIntroduction = (originalText: string, microSubnicho: string, language: string): string => {
    // Extrair algumas palavras-chave do texto original para personalizar a introdução
    const keywords = originalText
      .split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 5);
    
    const keyword = keywords.length > 0 ? keywords[0] : microSubnicho;
    
    const intros = {
      pt: [
        `Hoje vamos falar sobre algo que tem transformado a vida de milhares de pessoas: ${microSubnicho}. Se você está assistindo este vídeo, provavelmente já tentou algumas abordagens, mas ainda não encontrou a solução ideal. Não se preocupe, porque hoje vou compartilhar com você o método que realmente funciona. Comente abaixo se você já passou por frustrações tentando dominar este assunto.`,
        `Bem-vindo a mais um vídeo do canal! Hoje vamos mergulhar fundo em ${microSubnicho}, um tema que recebo muitas dúvidas diariamente. O que vou compartilhar hoje mudou completamente minha perspectiva e tenho certeza que vai impactar você também. Se você já teve dificuldades com ${keyword}, deixe um comentário compartilhando sua experiência.`,
        `Você já se sentiu perdido quando o assunto é ${microSubnicho}? Não está sozinho! Milhares de pessoas enfrentam os mesmos desafios todos os dias. Mas hoje, vou revelar um método comprovado que vai mudar sua forma de abordar este tema para sempre. Se esse conteúdo já está te ajudando, deixe seu like para o algoritmo recomendar para mais pessoas.`
      ],
      en: [
        `Today we're going to talk about something that has been transforming thousands of lives: ${microSubnicho}. If you're watching this video, you've probably tried several approaches but haven't found the ideal solution yet. Don't worry, because today I'll share with you the method that really works. Comment below if you've experienced frustrations trying to master this subject.`,
        `Welcome to another channel video! Today we're diving deep into ${microSubnicho}, a topic I get many questions about daily. What I'm going to share today completely changed my perspective and I'm sure it will impact you too. If you've had difficulties with ${keyword}, leave a comment sharing your experience.`,
        `Have you ever felt lost when it comes to ${microSubnicho}? You're not alone! Thousands of people face the same challenges every day. But today, I'll reveal a proven method that will change your approach to this topic forever. If this content is already helping you, leave a like so the algorithm recommends it to more people.`
      ],
      es: [
        `Hoy vamos a hablar sobre algo que ha estado transformando miles de vidas: ${microSubnicho}. Si estás viendo este video, probablemente has intentado varios enfoques pero aún no has encontrado la solución ideal. No te preocupes, porque hoy compartiré contigo el método que realmente funciona. Comenta abajo si has experimentado frustraciones tratando de dominar este tema.`,
        `¡Bienvenido a otro video del canal! Hoy nos sumergiremos profundamente en ${microSubnicho}, un tema sobre el que recibo muchas preguntas a diario. Lo que voy a compartir hoy cambió completamente mi perspectiva y estoy seguro de que también te impactará. Si has tenido dificultades con ${keyword}, deja un comentario compartiendo tu experiencia.`,
        `¿Alguna vez te has sentido perdido cuando se trata de ${microSubnicho}? ¡No estás solo! Miles de personas enfrentan los mismos desafíos todos los días. Pero hoy, revelaré un método probado que cambiará tu enfoque de este tema para siempre. Si este contenido ya te está ayudando, deja un like para que el algoritmo lo recomiende a más personas.`
      ],
      de: [
        `Heute sprechen wir über etwas, das Tausende von Leben verändert hat: ${microSubnicho}. Wenn Sie dieses Video ansehen, haben Sie wahrscheinlich bereits mehrere Ansätze ausprobiert, aber noch keine ideale Lösung gefunden. Keine Sorge, denn heute werde ich Ihnen die Methode vorstellen, die wirklich funktioniert. Kommentieren Sie unten, wenn Sie bei der Beherrschung dieses Themas Frustrationen erlebt haben.`,
        `Willkommen zu einem weiteren Video auf diesem Kanal! Heute tauchen wir tief in ${microSubnicho} ein, ein Thema, zu dem ich täglich viele Fragen bekomme. Was ich heute teilen werde, hat meine Perspektive völlig verändert, und ich bin sicher, dass es auch Sie beeinflussen wird. Wenn Sie Schwierigkeiten mit ${keyword} hatten, hinterlassen Sie einen Kommentar und teilen Sie Ihre Erfahrung.`,
        `Haben Sie sich jemals verloren gefühlt, wenn es um ${microSubnicho} geht? Sie sind nicht allein! Tausende von Menschen stehen jeden Tag vor den gleichen Herausforderungen. Aber heute werde ich eine bewährte Methode enthüllen, die Ihren Ansatz zu diesem Thema für immer verändern wird. Wenn Ihnen dieser Inhalt bereits hilft, hinterlassen Sie ein Like, damit der Algorithmus ihn mehr Menschen empfiehlt.`
      ],
      fr: [
        `Aujourd'hui, nous allons parler de quelque chose qui transforme des milliers de vies: ${microSubnicho}. Si vous regardez cette vidéo, vous avez probablement essayé plusieurs approches mais n'avez pas encore trouvé la solution idéale. Ne vous inquiétez pas, car aujourd'hui je vais partager avec vous la méthode qui fonctionne vraiment. Commentez ci-dessous si vous avez éprouvé des frustrations en essayant de maîtriser ce sujet.`,
        `Bienvenue dans une nouvelle vidéo de la chaîne! Aujourd'hui, nous plongeons profondément dans ${microSubnicho}, un sujet sur lequel je reçois quotidiennement de nombreuses questions. Ce que je vais partager aujourd'hui a complètement changé ma perspective et je suis sûr que cela vous impactera aussi. Si vous avez eu des difficultés avec ${keyword}, laissez un commentaire partageant votre expérience.`,
        `Vous êtes-vous déjà senti perdu quand il s'agit de ${microSubnicho}? Vous n'êtes pas seul! Des milliers de personnes font face aux mêmes défis chaque jour. Mais aujourd'hui, je vais vous révéler une méthode éprouvée qui changera votre approche de ce sujet pour toujours. Si ce contenu vous aide déjà, laissez un like pour que l'algorithme le recommande à plus de personnes.`
      ]
    };
    
    const langIntros = intros[language as keyof typeof intros] || intros.pt;
    return langIntros[Math.floor(Math.random() * langIntros.length)];
  };

  const remodelScriptBlock = (
    originalContent: string, 
    blockNumber: number, 
    totalBlocks: number, 
    microSubnicho: string,
    language: string
  ): string => {
    // Extrair conceitos-chave do conteúdo original
    const keywords = originalContent
      .split(/\s+/)
      .filter(word => word.length > 4)
      .slice(0, 3);
    
    const keyword = keywords.length > 0 ? keywords[0] : microSubnicho;
    
    // Templates para situação, conflito e solução
    const templates = {
      pt: {
        situacao: [
          `Muitas pessoas enfrentam dificuldades quando se trata de ${keyword}.`,
          `Uma situação comum que vemos no dia a dia é a falta de conhecimento sobre ${keyword}.`,
          `Imagine que você está tentando melhorar em ${keyword}, mas continua cometendo os mesmos erros.`
        ],
        conflito: [
          `O problema é que a maioria das pessoas aborda ${keyword} da maneira errada.`,
          `A dificuldade surge quando tentamos aplicar métodos antiquados para ${keyword}.`,
          `O maior desafio é separar os mitos dos fatos sobre ${keyword}.`
        ],
        solucao: [
          `A solução é adotar uma nova perspectiva sobre ${keyword}, focando em resultados comprovados.`,
          `O segredo está em aplicar técnicas específicas para ${keyword} que poucos conhecem.`,
          `O método que realmente funciona envolve uma abordagem sistemática para ${keyword}.`
        ],
        pergunta: [
          `Você já parou para pensar como ${keyword} impacta sua vida diariamente?`,
          `Já se perguntou por que tantas pessoas falham quando tentam dominar ${keyword}?`,
          `O que você faria diferente se soubesse o verdadeiro segredo por trás de ${keyword}?`
        ],
        promessa: [
          `No próximo bloco, vou compartilhar a técnica que transformou minha abordagem sobre ${microSubnicho}.`,
          `Continue assistindo para descobrir o método exclusivo que vai revolucionar sua visão sobre ${microSubnicho}.`,
          `Você não vai querer perder o que vem a seguir: o passo a passo para dominar ${microSubnicho}.`
        ]
      },
      en: {
        situacao: [
          `Many people face difficulties when it comes to ${keyword}.`,
          `A common situation we see daily is the lack of knowledge about ${keyword}.`,
          `Imagine that you're trying to improve at ${keyword}, but keep making the same mistakes.`
        ],
        conflito: [
          `The problem is that most people approach ${keyword} the wrong way.`,
          `The difficulty arises when we try to apply outdated methods to ${keyword}.`,
          `The biggest challenge is separating myths from facts about ${keyword}.`
        ],
        solucao: [
          `The solution is to adopt a new perspective on ${keyword}, focusing on proven results.`,
          `The secret lies in applying specific techniques for ${keyword} that few know about.`,
          `The method that really works involves a systematic approach to ${keyword}.`
        ],
        pergunta: [
          `Have you ever stopped to think about how ${keyword} impacts your life daily?`,
          `Have you ever wondered why so many people fail when trying to master ${keyword}?`,
          `What would you do differently if you knew the true secret behind ${keyword}?`
        ],
        promessa: [
          `In the next block, I'll share the technique that transformed my approach to ${microSubnicho}.`,
          `Keep watching to discover the exclusive method that will revolutionize your vision of ${microSubnicho}.`,
          `You won't want to miss what comes next: the step-by-step guide to mastering ${microSubnicho}.`
        ]
      },
      es: {
        situacao: [
          `Muchas personas enfrentan dificultades cuando se trata de ${keyword}.`,
          `Una situación común que vemos a diario es la falta de conocimiento sobre ${keyword}.`,
          `Imagina que estás tratando de mejorar en ${keyword}, pero sigues cometiendo los mismos errores.`
        ],
        conflito: [
          `El problema es que la mayoría de las personas abordan ${keyword} de la manera incorrecta.`,
          `La dificultad surge cuando intentamos aplicar métodos anticuados para ${keyword}.`,
          `El mayor desafío es separar los mitos de los hechos sobre ${keyword}.`
        ],
        solucao: [
          `La solución es adoptar una nueva perspectiva sobre ${keyword}, centrándose en resultados probados.`,
          `El secreto está en aplicar técnicas específicas para ${keyword} que pocos conocen.`,
          `El método que realmente funciona implica un enfoque sistemático para ${keyword}.`
        ],
        pergunta: [
          `¿Alguna vez te has detenido a pensar cómo ${keyword} impacta tu vida diariamente?`,
          `¿Te has preguntado por qué tantas personas fracasan cuando intentan dominar ${keyword}?`,
          `¿Qué harías diferente si conocieras el verdadero secreto detrás de ${keyword}?`
        ],
        promessa: [
          `En el próximo bloque, compartiré la técnica que transformó mi enfoque sobre ${microSubnicho}.`,
          `Continúa viendo para descubrir el método exclusivo que revolucionará tu visión sobre ${microSubnicho}.`,
          `No querrás perderte lo que viene a continuación: la guía paso a paso para dominar ${microSubnicho}.`
        ]
      },
      de: {
        situacao: [
          `Viele Menschen haben Schwierigkeiten, wenn es um ${keyword} geht.`,
          `Eine häufige Situation, die wir täglich sehen, ist der Mangel an Wissen über ${keyword}.`,
          `Stellen Sie sich vor, Sie versuchen, sich bei ${keyword} zu verbessern, machen aber immer wieder die gleichen Fehler.`
        ],
        conflito: [
          `Das Problem ist, dass die meisten Menschen ${keyword} auf die falsche Weise angehen.`,
          `Die Schwierigkeit entsteht, wenn wir versuchen, veraltete Methoden auf ${keyword} anzuwenden.`,
          `Die größte Herausforderung besteht darin, Mythen von Fakten über ${keyword} zu trennen.`
        ],
        solucao: [
          `Die Lösung besteht darin, eine neue Perspektive auf ${keyword} einzunehmen und sich auf bewährte Ergebnisse zu konzentrieren.`,
          `Das Geheimnis liegt in der Anwendung spezifischer Techniken für ${keyword}, die nur wenige kennen.`,
          `Die Methode, die wirklich funktioniert, beinhaltet einen systematischen Ansatz für ${keyword}.`
        ],
        pergunta: [
          `Haben Sie jemals innegehalten und darüber nachgedacht, wie ${keyword} Ihr tägliches Leben beeinflusst?`,
          `Haben Sie sich jemals gefragt, warum so viele Menschen scheitern, wenn sie versuchen, ${keyword} zu beherrschen?`,
          `Was würden Sie anders machen, wenn Sie das wahre Geheimnis hinter ${keyword} kennen würden?`
        ],
        promessa: [
          `Im nächsten Block werde ich die Technik teilen, die meinen Ansatz zu ${microSubnicho} verändert hat.`,
          `Schauen Sie weiter, um die exklusive Methode zu entdecken, die Ihre Vision von ${microSubnicho} revolutionieren wird.`,
          `Sie werden nicht verpassen wollen, was als nächstes kommt: die Schritt-für-Schritt-Anleitung zur Beherrschung von ${microSubnicho}.`
        ]
      },
      fr: {
        situacao: [
          `Beaucoup de personnes rencontrent des difficultés quand il s'agit de ${keyword}.`,
          `Une situation courante que nous voyons quotidiennement est le manque de connaissances sur ${keyword}.`,
          `Imaginez que vous essayez de vous améliorer en ${keyword}, mais que vous continuez à faire les mêmes erreurs.`
        ],
        conflito: [
          `Le problème est que la plupart des gens abordent ${keyword} de la mauvaise manière.`,
          `La difficulté survient lorsque nous essayons d'appliquer des méthodes dépassées à ${keyword}.`,
          `Le plus grand défi est de séparer les mythes des faits concernant ${keyword}.`
        ],
        solucao: [
          `La solution est d'adopter une nouvelle perspective sur ${keyword}, en se concentrant sur des résultats prouvés.`,
          `Le secret réside dans l'application de techniques spécifiques pour ${keyword} que peu de gens connaissent.`,
          `La méthode qui fonctionne vraiment implique une approche systématique de ${keyword}.`
        ],
        pergunta: [
          `Vous êtes-vous déjà arrêté pour réfléchir à la façon dont ${keyword} impacte votre vie quotidiennement?`,
          `Vous êtes-vous déjà demandé pourquoi tant de personnes échouent lorsqu'elles essaient de maîtriser ${keyword}?`,
          `Que feriez-vous différemment si vous connaissiez le véritable secret derrière ${keyword}?`
        ],
        promessa: [
          `Dans le prochain bloc, je partagerai la technique qui a transformé mon approche de ${microSubnicho}.`,
          `Continuez à regarder pour découvrir la méthode exclusive qui révolutionnera votre vision de ${microSubnicho}.`,
          `Vous ne voudrez pas manquer ce qui suit: le guide étape par étape pour maîtriser ${microSubnicho}.`
        ]
      }
    };
    
    // Selecionar idioma ou usar o padrão (português)
    const langTemplates = templates[language as keyof typeof templates] || templates.pt;
    
    // Selecionar aleatoriamente um template para cada parte
    const situacao = langTemplates.situacao[Math.floor(Math.random() * langTemplates.situacao.length)];
    const conflito = langTemplates.conflito[Math.floor(Math.random() * langTemplates.conflito.length)];
    const solucao = langTemplates.solucao[Math.floor(Math.random() * langTemplates.solucao.length)];
    const pergunta = langTemplates.pergunta[Math.floor(Math.random() * langTemplates.pergunta.length)];
    
    // Adicionar promessa no final do bloco, exceto no último bloco
    const promessa = blockNumber < totalBlocks 
      ? langTemplates.promessa[Math.floor(Math.random() * langTemplates.promessa.length)] 
      : "";
    
    // Construir texto do bloco
    return `${situacao} ${conflito} ${solucao} ${pergunta} ${promessa}`;
  };

  const generateMiniCTA = (blockNumber: number, totalBlocks: number, language: string): string => {
    const ctas = {
      pt: [
        "Se você concorda com isso, deixe seu like no vídeo!",
        "Comente abaixo se você já viveu uma situação parecida.",
        "Se esse conteúdo está te ajudando, compartilhe com alguém que precisa ver isso.",
        "Se você está gostando, ative o sininho para receber mais vídeos como este."
      ],
      en: [
        "If you agree with this, leave a like on the video!",
        "Comment below if you've experienced a similar situation.",
        "If this content is helping you, share it with someone who needs to see this.",
        "If you're enjoying this, hit the bell icon to receive more videos like this one."
      ],
      es: [
        "Si estás de acuerdo con esto, ¡deja tu like en el video!",
        "Comenta abajo si has vivido una situación similar.",
        "Si este contenido te está ayudando, compártelo con alguien que necesite verlo.",
        "Si te está gustando, activa la campanita para recibir más videos como este."
      ],
      de: [
        "Wenn Sie dem zustimmen, hinterlassen Sie ein Like für das Video!",
        "Kommentieren Sie unten, wenn Sie eine ähnliche Situation erlebt haben.",
        "Wenn Ihnen dieser Inhalt hilft, teilen Sie ihn mit jemandem, der dies sehen muss.",
        "Wenn es Ihnen gefällt, aktivieren Sie die Glocke, um mehr Videos wie dieses zu erhalten."
      ],
      fr: [
        "Si vous êtes d'accord avec cela, laissez un like sur la vidéo!",
        "Commentez ci-dessous si vous avez vécu une situation similaire.",
        "Si ce contenu vous aide, partagez-le avec quelqu'un qui a besoin de voir cela.",
        "Si vous appréciez, activez la cloche pour recevoir plus de vidéos comme celle-ci."
      ]
    };
    
    const langCtas = ctas[language as keyof typeof ctas] || ctas.pt;
    return langCtas[Math.floor(Math.random() * langCtas.length)];
  };

  const generateConclusion = (microSubnicho: string, ctaStyle: string | null, language: string): string => {
    const conclusions = {
      pt: {
        base: `Chegamos ao final deste vídeo sobre ${microSubnicho}. Espero que você tenha aprendido algo novo e valioso. Lembre-se que a consistência é a chave para o sucesso nesta área.`,
        emocional: ` Se este conteúdo tocou seu coração, compartilhe sua experiência nos comentários. Sua história pode inspirar outras pessoas que estão passando pelo mesmo. Não se esqueça de se inscrever no canal e ativar o sininho para mais conteúdos que vão tocar sua alma.`,
        apelativo: ` CLIQUE JÁ no botão de inscrição e ative o sininho! AGORA é a hora de você fazer parte dessa comunidade incrível. Deixe seu LIKE e COMENTE o que achou! Seus comentários me motivam a continuar trazendo mais conteúdos como esse. COMPARTILHE com seus amigos, eles PRECISAM ver isso!`,
        reflexivo: ` Antes de encerrarmos, quero que você reflita: como essa mensagem se conecta com sua própria jornada? Talvez haja uma razão para você estar assistindo este vídeo exatamente agora. Se esse conteúdo te fez pensar, considere se inscrever para continuarmos essa conversa. Obrigado por dedicar seu tempo aqui.`
      },
      en: {
        base: `We've reached the end of this video about ${microSubnicho}. I hope you've learned something new and valuable. Remember that consistency is the key to success in this area.`,
        emocional: ` If this content touched your heart, share your experience in the comments. Your story might inspire other people who are going through the same thing. Don't forget to subscribe to the channel and hit the bell to receive more content that will touch your soul.`,
        apelativo: ` CLICK NOW on the subscribe button and hit the bell! NOW is the time for you to be part of this amazing community. Leave your LIKE and COMMENT what you thought! Your comments motivate me to continue bringing more content like this. SHARE with your friends, they NEED to see this!`,
        reflexivo: ` Before we end, I want you to reflect: how does this message connect with your own journey? Perhaps there's a reason you're watching this video right now. If this content made you think, consider subscribing so we can continue this conversation. Thank you for dedicating your time here.`
      },
      es: {
        base: `Hemos llegado al final de este video sobre ${microSubnicho}. Espero que hayas aprendido algo nuevo y valioso. Recuerda que la consistencia es la clave para el éxito en esta área.`,
        emocional: ` Si este contenido tocó tu corazón, comparte tu experiencia en los comentarios. Tu historia podría inspirar a otras personas que están pasando por lo mismo. No olvides suscribirte al canal y activar la campanita para recibir más contenido que tocará tu alma.`,
        apelativo: ` ¡HAZ CLIC AHORA en el botón de suscripción y activa la campanita! AHORA es el momento de ser parte de esta increíble comunidad. ¡Deja tu ME GUSTA y COMENTA lo que pensaste! Tus comentarios me motivan a seguir trayendo más contenido como este. ¡COMPARTE con tus amigos, NECESITAN ver esto!`,
        reflexivo: ` Antes de terminar, quiero que reflexiones: ¿cómo se conecta este mensaje con tu propio camino? Quizás hay una razón por la que estás viendo este video ahora mismo. Si este contenido te hizo pensar, considera suscribirte para que podamos continuar esta conversación. Gracias por dedicar tu tiempo aquí.`
      },
      de: {
        base: `Wir sind am Ende dieses Videos über ${microSubnicho} angelangt. Ich hoffe, Sie haben etwas Neues und Wertvolles gelernt. Denken Sie daran, dass Konsequenz der Schlüssel zum Erfolg in diesem Bereich ist.`,
        emocional: ` Wenn dieser Inhalt Ihr Herz berührt hat, teilen Sie Ihre Erfahrung in den Kommentaren. Ihre Geschichte könnte andere Menschen inspirieren, die dasselbe durchmachen. Vergessen Sie nicht, den Kanal zu abonnieren und die Glocke zu aktivieren, um mehr Inhalte zu erhalten, die Ihre Seele berühren werden.`,
        apelativo: ` KLICKEN SIE JETZT auf die Abonnieren-Schaltfläche und aktivieren Sie die Glocke! JETZT ist es Zeit für Sie, Teil dieser erstaunlichen Community zu werden. Hinterlassen Sie Ihr LIKE und KOMMENTIEREN Sie, was Sie gedacht haben! Ihre Kommentare motivieren mich, weiterhin mehr Inhalte wie diesen zu bringen. TEILEN Sie mit Ihren Freunden, sie MÜSSEN das sehen!`,
        reflexivo: ` Bevor wir enden, möchte ich, dass Sie nachdenken: Wie verbindet sich diese Botschaft mit Ihrer eigenen Reise? Vielleicht gibt es einen Grund, warum Sie dieses Video gerade jetzt ansehen. Wenn dieser Inhalt Sie zum Nachdenken gebracht hat, erwägen Sie ein Abonnement, damit wir dieses Gespräch fortsetzen können. Vielen Dank, dass Sie Ihre Zeit hier verbracht haben.`
      },
      fr: {
        base: `Nous sommes arrivés à la fin de cette vidéo sur ${microSubnicho}. J'espère que vous avez appris quelque chose de nouveau et de précieux. N'oubliez pas que la constance est la clé du succès dans ce domaine.`,
        emocional: ` Si ce contenu a touché votre cœur, partagez votre expérience dans les commentaires. Votre histoire pourrait inspirer d'autres personnes qui vivent la même chose. N'oubliez pas de vous abonner à la chaîne et d'activer la cloche pour recevoir plus de contenu qui touchera votre âme.`,
        apelativo: ` CLIQUEZ MAINTENANT sur le bouton d'abonnement et activez la cloche! MAINTENANT est le moment pour vous de faire partie de cette incroyable communauté. Laissez votre J'AIME et COMMENTEZ ce que vous avez pensé! Vos commentaires me motivent à continuer d'apporter plus de contenu comme celui-ci. PARTAGEZ avec vos amis, ils ONT BESOIN de voir ça!`,
        reflexivo: ` Avant de terminer, je veux que vous réfléchissiez: comment ce message se connecte-t-il à votre propre parcours? Peut-être y a-t-il une raison pour laquelle vous regardez cette vidéo en ce moment. Si ce contenu vous a fait réfléchir, envisagez de vous abonner pour que nous puissions poursuivre cette conversation. Merci d'avoir consacré votre temps ici.`
      }
    };
    
    // Selecionar conclusão base + estilo de CTA apropriado
    const langConclusion = conclusions[language as keyof typeof conclusions] || conclusions.pt;
    const baseConclusao = langConclusion.base;
    
    let ctaConclusion = "";
    if (ctaStyle === "emocional") {
      ctaConclusion = langConclusion.emocional;
    } else if (ctaStyle === "apelativo") {
      ctaConclusion = langConclusion.apelativo;
    } else if (ctaStyle === "reflexivo") {
      ctaConclusion = langConclusion.reflexivo;
    }
    
    return baseConclusao + ctaConclusion;
  };

  const generateCTA = (style: "emocional" | "apelativo" | "reflexivo"): string => {
    switch(style) {
      case "emocional":
        return "E aí, essa história tocou seu coração? Se você também já passou por algo parecido, compartilhe sua experiência nos comentários. Sua história pode inspirar outras pessoas que estão passando pelo mesmo. Não se esqueça de se inscrever no canal e ativar o sininho para mais conteúdos que vão tocar sua alma.";
      case "apelativo":
        return "CLIQUE JÁ no botão de inscrição e ative o sininho! AGORA é a hora de você fazer parte dessa comunidade incrível. Deixe seu LIKE e COMENTE o que achou! Seus comentários me motivam a continuar trazendo mais conteúdos como esse. COMPARTILHE com seus amigos, eles PRECISAM ver isso!";
      case "reflexivo":
        return "Antes de encerrarmos, quero que você reflita: como essa mensagem se conecta com sua própria jornada? Talvez haja uma razão para você estar assistindo este vídeo exatamente agora. Se esse conteúdo te fez pensar, considere se inscrever para continuarmos essa conversa. Obrigado por dedicar seu tempo aqui.";
      default:
        return "";
    }
  };

  const generateImagePrompt = (text: string): string => {
    // Simplificado para demonstração
    const keywords = text
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 5)
      .join(', ');
    
    return `Cinematic scene, emotional storytelling, high quality, professional lighting, ${keywords}, 4k detailed image`;
  };

  const generateMasterPrompt = (text: string): string => {
    // Análise simplificada do texto para gerar um prompt mestre
    const isPositive = text.match(/feliz|alegr|sorri|conquist|supera|venc/gi);
    const isNegative = text.match(/trist|dor|sofr|perda|lut|difícil/gi);
    const isNeutral = !isPositive && !isNegative;
    
    if (isPositive) {
      return "Cinematic documentary style, warm vibrant colors, soft natural lighting, motivated characters, emotional intimate moments, depth of field, believable environments, hope and triumph theme, professional videography quality";
    } else if (isNegative) {
      return "Cinematic documentary style, muted colors, dramatic lighting with shadows, reflective mood, emotional weight, realistic environments, struggle and resilience theme, professional videography quality";
    } else {
      return "Cinematic documentary style, balanced lighting, natural color palette, authentic environments, storytelling moments, emotional connection, professional videography quality";
    }
  };

  const convertToSrt = (blocks: ScriptBlock[]): string => {
    // Implementação simplificada de conversão para SRT
    let srt = "";
    let index = 1;
    let currentTime = 0;
    
    blocks.forEach(block => {
      // Estima 10 segundos por bloco para este exemplo
      const startTime = formatSrtTime(currentTime);
      currentTime += 10;
      const endTime = formatSrtTime(currentTime);
      
      srt += `${index}\n${startTime} --> ${endTime}\n${block.text}\n\n`;
      index++;
    });
    
    return srt;
  };

  const convertRemodeledScriptToSrt = (
    title: string,
    hook: string,
    introduction: string,
    blocks: ScriptBlock[],
    conclusion: string
  ): string => {
    let srt = "";
    let index = 1;
    let currentTime = 0;
    
    // Título
    const titleStartTime = formatSrtTime(currentTime);
    currentTime += 3;
    const titleEndTime = formatSrtTime(currentTime);
    srt += `${index}\n${titleStartTime} --> ${titleEndTime}\n${title}\n\n`;
    index++;
    
    // Hook
    const hookStartTime = formatSrtTime(currentTime);
    currentTime += 7;
    const hookEndTime = formatSrtTime(currentTime);
    srt += `${index}\n${hookStartTime} --> ${hookEndTime}\n${hook}\n\n`;
    index++;
    
    // Introdução
    const introStartTime = formatSrtTime(currentTime);
    currentTime += 15;
    const introEndTime = formatSrtTime(currentTime);
    srt += `${index}\n${introStartTime} --> ${introEndTime}\n${introduction}\n\n`;
    index++;
    
    // Blocos
    blocks.forEach(block => {
      const blockStartTime = formatSrtTime(currentTime);
      // Estimar tempo baseado no tamanho do texto (10s por 400 caracteres)
      const blockDuration = Math.max(10, Math.ceil(block.text.length / 40));
      currentTime += blockDuration;
      const blockEndTime = formatSrtTime(currentTime);
      
      srt += `${index}\n${blockStartTime} --> ${blockEndTime}\n${block.text}\n\n`;
      index++;
      
      // Mini-CTA
      if (block.mini_cta) {
        const miniCtaStartTime = formatSrtTime(currentTime);
        currentTime += 5;
        const miniCtaEndTime = formatSrtTime(currentTime);
        
        srt += `${index}\n${miniCtaStartTime} --> ${miniCtaEndTime}\n${block.mini_cta}\n\n`;
        index++;
      }
    });
    
    // Conclusão
    const conclusionStartTime = formatSrtTime(currentTime);
    currentTime += 20;
    const conclusionEndTime = formatSrtTime(currentTime);
    srt += `${index}\n${conclusionStartTime} --> ${conclusionEndTime}\n${conclusion}\n\n`;
    
    return srt;
  };

  const formatSrtTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };

  return {
    scriptText,
    setScriptText,
    scriptStats,
    scriptConfig,
    processedScript,
    currentStep,
    setCurrentStep,
    handleScriptInput,
    handleConfigSubmit
  };
};
