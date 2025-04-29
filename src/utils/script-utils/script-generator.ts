
import { LanguageTemplates } from "@/hooks/script-generator/types";

/**
 * Generate a title based on niche information and language
 */
export const generateTitle = (nicho: string, subnicho: string, microSubnicho: string, language: string): string => {
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
  
  const langComponents = components[language as keyof typeof components] || components.pt;
  const personagem = langComponents.personagens[Math.floor(Math.random() * langComponents.personagens.length)];
  const acao = langComponents.acoes[Math.floor(Math.random() * langComponents.acoes.length)];
  const emocao = langComponents.emocoes[Math.floor(Math.random() * langComponents.emocoes.length)];
  
  return `${personagem} ${acao} ${microSubnicho} ${emocao}`;
};

/**
 * Generate an attention-grabbing hook
 */
export const generateHook = (microSubnicho: string, language: string): string => {
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

/**
 * Generate an introduction for the script
 */
export const generateIntroduction = (originalText: string, microSubnicho: string, language: string): string => {
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
      `Haben Sie sich jemals verloren gefühlt, wenn es um ${microSubnicho} geht? Sie sind nicht allein! Tausende von Menschen standen jeden Tag vor den gleichen Herausforderungen. Aber heute werde ich eine bewährte Methode enthüllen, die Ihren Ansatz zu diesem Thema für immer verändern wird. Wenn Ihnen dieser Inhalt bereits hilft, hinterlassen Sie ein Like, damit der Algorithmus ihn mehr Menschen empfiehlt.`
    ],
    fr: [
      `Aujourd'hui, nous allons parler de quelque chose qui transforme des milliers de vies: ${microSubnicho}. Si vous regardez cette vidéo, vous avez probablement essayé plusieurs approches mais n'avez pas encore trouvé la solution idéale. Ne vous inquiétez pas, car aujourd'hui je vais partager avec vous la méthode qui fonctionne vraiment. Commentez ci-dessous si vous avez éprouvé des frustrations en essayant de maîtriser ce sujet.`,
      `Bienvenue dans une nouvelle vidéo de la chaîne! Aujourd'hui, nous plongeons profondément dans ${microSubnicho}, un sujet sur lequel je reçois quotidiennement de nombreuses questions. Ce que je vais partager aujourd'hui a complètement changé ma perspective et je suis sûr que cela vous impactera aussi. Si vous avez eu des difficultés avec ${keyword}, laissez un commentaire partageant votre expérience.`,
      `Vous êtes-vous déjà senti perdu quand il s'agit de ${microSubnicho}? Vous n'êtes pas seul! Des milliers de personnes font face aux mêmes défis tous les jours. Mais aujourd'hui, je vais vous révéler une méthode éprouvée qui changera votre approche de ce sujet pour toujours. Si ce contenu vous aide déjà, laissez un like pour que l'algorithme le recommande à plus de personnes.`
    ]
  };
  
  const langIntros = intros[language as keyof typeof intros] || intros.pt;
  return langIntros[Math.floor(Math.random() * langIntros.length)];
};

/**
 * Generate a conclusion with an appropriate CTA
 */
export const generateConclusion = (microSubnicho: string, ctaStyle: string | null, language: string): string => {
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
      reflexivo: ` Bevor wir enden, möchte ich, dass Sie nachdenken: Wie verbindet sich diese Botschaft mit Ihrer eigenen Reise? Vielleicht gibt es eine Reason, warum Sie dieses Video gerade jetzt ansehen. Wenn dieser Inhalt Sie zum Nachdenken gebracht hat, erwägen Sie ein Abonnement, damit wir dieses Gespräch fortsetzen können. Vielen Dank, dass Sie Ihre Zeit hier verbracht haben.`
    },
    fr: {
      base: `Nous sommes arrivés à la fin de cette vidéo sur ${microSubnicho}. J'espère que vous avez appris quelque chose de nouveau et de précieux. N'oubliez pas que la constance est la clé du succès dans ce domaine.`,
      emocional: ` Si ce contenu a touché votre cœur, partagez votre expérience dans les commentaires. Votre histoire pourrait inspirer d'autres personnes qui vivent la même chose. N'oubliez pas de vous abonner à la chaîne et d'activer la cloche pour recevoir plus de contenu qui touchera votre âme.`,
      apelativo: ` CLIQUEZ MAINTENANT sur le bouton d'abonnement et activez la cloche! MAINTENANT est le moment pour vous de faire partie de cette incroyable communauté. Laissez votre J'AIME et COMMENTEZ ce que vous avez pensé! Vos commentaires me motivent à continuer d'apporter plus de contenu comme celui-ci. PARTAGEZ avec vos amis, ils ONT BESOIN de voir ça!`,
      reflexivo: ` Avant de terminer, je veux que vous réfléchissiez: comment ce message se connecte-t-il à votre propre parcours? Peut-être y a-t-il une raison pour laquelle vous regardez cette vidéo en ce moment. Si ce contenu vous a fait réfléchir, envisagez de vous abonner pour que nous puissions poursuivre cette conversation. Merci d'avoir consacré votre temps ici.`
    }
  };
  
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
