
export const getCompetitionBadgeVariant = (level: "baixa" | "média" | "alta") => {
  switch (level) {
    case "baixa":
      return "secondary";
    case "média":
      return "outline";
    case "alta":
      return "destructive";
    default:
      return "secondary";
  }
};

export const getViralPotentialText = (potential: number) => {
  if (potential >= 80) return "Muito alto";
  if (potential >= 60) return "Alto";
  if (potential >= 40) return "Médio";
  if (potential >= 20) return "Baixo";
  return "Muito baixo";
};

export const translateText = (text: string, targetLanguage: string): string => {
  const isPainTitle = text.match(/verdade dolorosa|destruindo sua vida|luta silenciosa/i);
  const isHopeTitle = text.match(/maneiras de transformar|superei|poder transformador/i);
  const isCuriosityTitle = text.match(/segredo oculto|fatos surpreendentes|mistério não resolvido/i);
  
  if (targetLanguage === "es") {
    if (isPainTitle) {
      if (text.includes("verdade dolorosa")) {
        return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
          "La verdad dolorosa sobre $1 que nadie quiere admitir");
      } else if (text.includes("destruindo sua vida")) {
        return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
          "Por qué $1 puede estar destruyendo tu vida sin que lo sepas");
      } else {
        return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
          "La lucha silenciosa de vivir con $1 diariamente");
      }
    } else if (isHopeTitle) {
      if (text.includes("maneiras de transformar")) {
        return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
          "formas de transformar $1 en oportunidades de crecimiento");
      } else if (text.includes("superei")) {
        return text.replace(/Como superei (.*) e você também pode/i, 
          "Cómo superé $1 y tú también puedes");
      } else {
        return text.replace(/poder transformador de (.*) na sua jornada/i, 
          "El poder transformador de $1 en tu camino");
      }
    } else if (isCuriosityTitle) {
      if (text.includes("segredo oculto")) {
        return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
          "El secreto oculto detrás de $1 que nadie cuenta");
      } else if (text.includes("fatos surpreendentes")) {
        return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
          "¿Conocías estos 5 datos sorprendentes sobre $1?");
      } else {
        return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
          "El misterio sin resolver de $1 que los expertos no pueden explicar");
      }
    }
    return `El contenido sobre ${text} traducido al español`;
  } 
  else if (targetLanguage === "en") {
    if (isPainTitle) {
      if (text.includes("verdade dolorosa")) {
        return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
          "The painful truth about $1 that no one wants to admit");
      } else if (text.includes("destruindo sua vida")) {
        return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
          "Why $1 might be destroying your life without you knowing");
      } else {
        return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
          "The silent struggle of living with $1 daily");
      }
    } else if (isHopeTitle) {
      if (text.includes("maneiras de transformar")) {
        return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
          "ways to transform $1 into growth opportunities");
      } else if (text.includes("superei")) {
        return text.replace(/Como superei (.*) e você também pode/i, 
          "How I overcame $1 and you can too");
      } else {
        return text.replace(/poder transformador de (.*) na sua jornada/i, 
          "The transformative power of $1 in your journey");
      }
    } else if (isCuriosityTitle) {
      if (text.includes("segredo oculto")) {
        return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
          "The hidden secret behind $1 that no one tells");
      } else if (text.includes("fatos surpreendentes")) {
        return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
          "Did you know these 5 surprising facts about $1?");
      } else {
        return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
          "The unsolved mystery of $1 that experts can't explain");
      }
    }
    return `The content about ${text} translated to English`;
  } 
  else if (targetLanguage === "fr") {
    if (isPainTitle) {
      if (text.includes("verdade dolorosa")) {
        return text.replace(/verdade dolorosa sobre (.*) que ninguém quer admitir/i, 
          "La vérité douloureuse sur $1 que personne ne veut admettre");
      } else if (text.includes("destruindo sua vida")) {
        return text.replace(/Por que (.*) pode estar destruindo sua vida sem você perceber/i, 
          "Pourquoi $1 pourrait détruire votre vie sans que vous le sachiez");
      } else {
        return text.replace(/luta silenciosa de viver com (.*) diariamente/i, 
          "La lutte silencieuse de vivre avec $1 quotidiennement");
      }
    } else if (isHopeTitle) {
      if (text.includes("maneiras de transformar")) {
        return text.replace(/maneiras de transformar (.*) em oportunidades de crescimento/i, 
          "façons de transformer $1 en opportunités de croissance");
      } else if (text.includes("superei")) {
        return text.replace(/Como superei (.*) e você também pode/i, 
          "Comment j'ai surmonté $1 et vous pouvez aussi");
      } else {
        return text.replace(/poder transformador de (.*) na sua jornada/i, 
          "Le pouvoir transformateur de $1 dans votre voyage");
      }
    } else if (isCuriosityTitle) {
      if (text.includes("segredo oculto")) {
        return text.replace(/segredo oculto por trás de (.*) que ninguém conta/i, 
          "Le secret caché derrière $1 que personne ne dit");
      } else if (text.includes("fatos surpreendentes")) {
        return text.replace(/Você sabia destes 5 fatos surpreendentes sobre (.*)/i, 
          "Connaissez-vous ces 5 faits surprenants sur $1?");
      } else {
        return text.replace(/mistério não resolvido de (.*) que os especialistas não conseguem explicar/i, 
          "Le mystère non résolu de $1 que les experts ne peuvent expliquer");
      }
    }
    return `Le contenu sur ${text} traduit en français`;
  }
  
  return text;
};
