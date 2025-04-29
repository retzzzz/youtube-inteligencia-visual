
import { LanguageTemplates, TemplateSection } from "@/hooks/script-generator/types";

/**
 * Get template sections for script blocks in different languages
 */
export const getLanguageTemplates = (): LanguageTemplates => {
  const templates: LanguageTemplates = {
    pt: {
      situacao: [
        `Muitas pessoas enfrentam dificuldades quando se trata de {keyword}.`,
        `Uma situação comum que vemos no dia a dia é a falta de conhecimento sobre {keyword}.`,
        `Imagine que você está tentando melhorar em {keyword}, mas continua cometendo os mesmos erros.`
      ],
      conflito: [
        `O problema é que a maioria das pessoas aborda {keyword} da maneira errada.`,
        `A dificuldade surge quando tentamos aplicar métodos antiquados para {keyword}.`,
        `O maior desafio é separar os mitos dos fatos sobre {keyword}.`
      ],
      solucao: [
        `A solução é adotar uma nova perspectiva sobre {keyword}, focando em resultados comprovados.`,
        `O segredo está em aplicar técnicas específicas para {keyword} que poucos conhecem.`,
        `O método que realmente funciona envolve uma abordagem sistemática para {keyword}.`
      ],
      pergunta: [
        `Você já parou para pensar como {keyword} impacta sua vida diariamente?`,
        `Já se perguntou por que tantas pessoas falham quando tentam dominar {keyword}?`,
        `O que você faria diferente se soubesse o verdadeiro segredo por trás de {keyword}?`
      ],
      promessa: [
        `No próximo bloco, vou compartilhar a técnica que transformou minha abordagem sobre {microSubniche}.`,
        `Continue assistindo para descobrir o método exclusivo que vai revolucionar sua visão sobre {microSubniche}.`,
        `Você não vai querer perder o que vem a seguir: o passo a passo para dominar {microSubniche}.`
      ]
    },
    en: {
      situacao: [
        `Many people face difficulties when it comes to {keyword}.`,
        `A common situation we see daily is the lack of knowledge about {keyword}.`,
        `Imagine that you're trying to improve at {keyword}, but keep making the same mistakes.`
      ],
      conflito: [
        `The problem is that most people approach {keyword} the wrong way.`,
        `The difficulty arises when we try to apply outdated methods to {keyword}.`,
        `The biggest challenge is separating myths from facts about {keyword}.`
      ],
      solucao: [
        `The solution is to adopt a new perspective on {keyword}, focusing on proven results.`,
        `The secret lies in applying specific techniques for {keyword} that few know about.`,
        `The method that really works involves a systematic approach to {keyword}.`
      ],
      pergunta: [
        `Have you ever stopped to think about how {keyword} impacts your life daily?`,
        `Have you ever wondered why so many people fail when trying to master {keyword}?`,
        `What would you do differently if you knew the true secret behind {keyword}?`
      ],
      promessa: [
        `In the next block, I'll share the technique that transformed my approach to {microSubniche}.`,
        `Keep watching to discover the exclusive method that will revolutionize your vision of {microSubniche}.`,
        `You won't want to miss what comes next: the step-by-step guide to mastering {microSubniche}.`
      ]
    },
    es: {
      situacao: [
        `Muchas personas enfrentan dificultades cuando se trata de {keyword}.`,
        `Una situación común que vemos a diario es la falta de conocimiento sobre {keyword}.`,
        `Imagina que estás tratando de mejorar en {keyword}, pero sigues cometiendo los mismos errores.`
      ],
      conflito: [
        `El problema es que la mayoría de las personas abordan {keyword} de la manera incorrecta.`,
        `La dificultad surge cuando intentamos aplicar métodos anticuados para {keyword}.`,
        `El mayor desafío es separar los mitos de los hechos sobre {keyword}.`
      ],
      solucao: [
        `La solución es adoptar una nueva perspectiva sobre {keyword}, centrándose en resultados probados.`,
        `El secreto está en aplicar técnicas específicas para {keyword} que pocos conocen.`,
        `El método que realmente funciona implica un enfoque sistemático para {keyword}.`
      ],
      pergunta: [
        `¿Alguna vez te has detenido a pensar cómo {keyword} impacta tu vida diariamente?`,
        `¿Te has preguntado por qué tantas personas fracasan cuando intentan dominar {keyword}?`,
        `¿Qué harías diferente si conocieras el verdadero secreto detrás de {keyword}?`
      ],
      promessa: [
        `En el próximo bloque, compartiré la técnica que transformó mi enfoque sobre {microSubniche}.`,
        `Continúa viendo para descubrir el método exclusivo que revolucionará tu visión sobre {microSubniche}.`,
        `No querrás perderte lo que viene a continuación: la guía paso a paso para dominar {microSubniche}.`
      ]
    },
    de: {
      situacao: [
        `Viele Menschen haben Schwierigkeiten, wenn es um {keyword} geht.`,
        `Eine häufige Situation, die wir täglich sehen, ist der Mangel an Wissen über {keyword}.`,
        `Stellen Sie sich vor, Sie versuchen, sich bei {keyword} zu verbessern, machen aber immer wieder die gleichen Fehler.`
      ],
      conflito: [
        `Das Problem ist, dass die meisten Menschen {keyword} auf die falsche Weise angehen.`,
        `Die Schwierigkeit entsteht, wenn wir versuchen, veraltete Methoden auf {keyword} anzuwenden.`,
        `Die größte Herausforderung besteht darin, Mythen von Fakten über {keyword} zu trennen.`
      ],
      solucao: [
        `Die Lösung besteht darin, eine neue Perspektive auf {keyword} einzunehmen und sich auf bewährte Ergebnisse zu konzentrieren.`,
        `Das Geheimnis liegt in der Anwendung spezifischer Techniken für {keyword}, die nur wenige kennen.`,
        `Die Methode, die wirklich funktioniert, beinhaltet einen systematischen Ansatz für {keyword}.`
      ],
      pergunta: [
        `Haben Sie jemals innegehalten und darüber nachgedacht, wie {keyword} Ihr tägliches Leben beeinflusst?`,
        `Haben Sie sich jemals gefragt, warum so viele Menschen scheitern, wenn sie versuchen, {keyword} zu beherrschen?`,
        `Was würden Sie anders machen, wenn Sie das wahre Geheimnis hinter {keyword} kennen würden?`
      ],
      promessa: [
        `Im nächsten Block werde ich die Technik teilen, die meinen Ansatz zu {microSubniche} verändert hat.`,
        `Schauen Sie weiter, um die exklusive Methode zu entdecken, die Ihre Vision von {microSubniche} revolutionieren wird.`,
        `Sie werden nicht verpassen wollen, was als nächstes kommt: die Schritt-für-Schritt-Anleitung zur Beherrschung von {microSubniche}.`
      ]
    },
    fr: {
      situacao: [
        `Beaucoup de personnes rencontrent des difficultés quand il s'agit de {keyword}.`,
        `Une situation fréquente que nous voyons quotidiennement est le manque de connaissances sur {keyword}.`,
        `Imaginez que vous essayez de vous améliorer dans {keyword}, mais que vous continuez à faire les mêmes erreurs.`
      ],
      conflito: [
        `Le problème est que la plupart des gens abordent {keyword} de la mauvaise manière.`,
        `La difficulté survient lorsque nous essayons d'appliquer des méthodes obsolètes à {keyword}.`,
        `Le plus grand défi est de séparer les mythes des faits concernant {keyword}.`
      ],
      solucao: [
        `La solution consiste à adopter une nouvelle perspective sur {keyword}, en se concentrant sur des résultats prouvés.`,
        `Le secret réside dans l'application de techniques spécifiques pour {keyword} que peu connaissent.`,
        `La méthode qui fonctionne vraiment implique une approche systématique pour {keyword}.`
      ],
      pergunta: [
        `Vous êtes-vous déjà arrêté pour réfléchir à la façon dont {keyword} impacte votre vie quotidienne?`,
        `Vous êtes-vous déjà demandé pourquoi tant de personnes échouent lorsqu'elles essaient de maîtriser {keyword}?`,
        `Que feriez-vous différemment si vous connaissiez le véritable secret derrière {keyword}?`
      ],
      promessa: [
        `Dans le prochain bloc, je partagerai la technique qui a transformé mon approche de {microSubniche}.`,
        `Continuez à regarder pour découvrir la méthode exclusive qui révolutionnera votre vision de {microSubniche}.`,
        `Vous ne voudrez pas manquer ce qui suit: le guide étape par étape pour maîtriser {microSubniche}.`
      ]
    }
  };
  
  return templates;
};

/**
 * Create a remodeled script block using template sections
 */
export const remodelScriptBlock = (
  originalContent: string, 
  blockNumber: number, 
  totalBlocks: number, 
  microSubnicho: string,
  language: string
): string => {
  const keywords = originalContent
    .split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 3);
  
  const keyword = keywords.length > 0 ? keywords[0] : microSubnicho;
  
  const templates = getLanguageTemplates();
  const langTemplates = templates[language] || templates.pt;
  
  // Safely get template sections with fallbacks
  const situacao = langTemplates.situacao[Math.floor(Math.random() * langTemplates.situacao.length)]
    .replace(/{keyword}/g, keyword);
    
  const conflito = langTemplates.conflito[Math.floor(Math.random() * langTemplates.conflito.length)]
    .replace(/{keyword}/g, keyword);
    
  const solucao = langTemplates.solucao[Math.floor(Math.random() * langTemplates.solucao.length)]
    .replace(/{keyword}/g, keyword);
    
  const pergunta = langTemplates.pergunta[Math.floor(Math.random() * langTemplates.pergunta.length)]
    .replace(/{keyword}/g, keyword);
    
  // Only add a promise in non-final blocks
  let promessa = "";
  if (blockNumber < totalBlocks) {
    promessa = langTemplates.promessa[Math.floor(Math.random() * langTemplates.promessa.length)]
      .replace(/{microSubniche}/g, microSubnicho);
  }
  
  return `${situacao} ${conflito} ${solucao} ${pergunta} ${promessa}`;
};
