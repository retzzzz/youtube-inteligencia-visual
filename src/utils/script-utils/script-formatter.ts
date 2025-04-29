
import { ScriptBlock } from "@/hooks/script-generator/types";

/**
 * Generate a basic CTA based on style
 */
export const generateCTA = (style: "emocional" | "apelativo" | "reflexivo"): string => {
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

/**
 * Generate a mini CTA for engagement
 */
export const generateMiniCTA = (blockNumber: number, totalBlocks: number, language: string): string => {
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
      "Wenn es Ihnen gefällt, aktivieren Sie die Glocke, um mehr Inhalte zu erhalten."
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

/**
 * Generate an AI image prompt based on text
 */
export const generateImagePrompt = (text: string): string => {
  const keywords = text
    .split(' ')
    .filter(word => word.length > 3)
    .slice(0, 5)
    .join(', ');
  
  return `Cinematic scene, emotional storytelling, high quality, professional lighting, ${keywords}, 4k detailed image`;
};

/**
 * Generate a master prompt for the entire script
 */
export const generateMasterPrompt = (text: string): string => {
  const isPositive = text.match(/feliz|alegr|sorri|conquist|supera|venc/gi);
  const isNegative = text.match(/trist|dor|sofr|perda|lut|difícil/gi);
  
  if (isPositive) {
    return "Cinematic documentary style, warm vibrant colors, soft natural lighting, motivated characters, emotional intimate moments, depth of field, believable environments, hope and triumph theme, professional videography quality";
  } else if (isNegative) {
    return "Cinematic documentary style, muted colors, dramatic lighting with shadows, reflective mood, emotional weight, realistic environments, struggle and resilience theme, professional videography quality";
  } else {
    return "Cinematic documentary style, balanced lighting, natural color palette, authentic environments, storytelling moments, emotional connection, professional videography quality";
  }
};
