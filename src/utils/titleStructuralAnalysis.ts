
/**
 * Analisa a estrutura de um título para identificar seus componentes principais
 */
export interface TitleStructure {
  hasNumber: boolean;
  character: string;
  action: string;
  hook: string;
}

export function analyzeTitleStructure(title: string): TitleStructure {
  // Verifica se contém números
  const hasNumber = /\d+/.test(title);
  
  // Analisar o título para dividir em componentes
  let character = "";
  let action = "";
  let hook = "";
  
  // Identifica padrões comuns em títulos
  const hasDash = title.includes(" - ");
  const hasColon = title.includes(": ");
  const hasComma = title.includes(", ");
  const hasQuestion = title.endsWith("?");
  
  if (hasDash) {
    // Formato "Personagem - Ação"
    const parts = title.split(" - ");
    character = parts[0].trim();
    action = parts.slice(1).join(" - ").trim();
  } else if (hasColon) {
    // Formato "Personagem: Ação"
    const parts = title.split(": ");
    character = parts[0].trim();
    action = parts.slice(1).join(": ").trim();
  } else if (hasComma) {
    // Formato "Personagem, descrição e ação"
    const parts = title.split(",");
    character = parts[0].trim();
    action = parts.slice(1).join(",").trim();
  } else {
    // Tentativa de segmentar por palavras-chave
    const words = title.split(" ");
    const midPoint = Math.floor(words.length / 2);
    character = words.slice(0, midPoint).join(" ");
    action = words.slice(midPoint).join(" ");
  }
  
  // Identificar gancho (implícito ou explícito)
  const hookPhrases = [
    "nunca viu", "você não vai acreditar", "incrível", "surpreendente", 
    "assombroso", "chocante", "o que aconteceu depois", "inacreditável",
    "no creerás", "increíble", "sorprendente", "asombroso"
  ];
  
  const hookFound = hookPhrases.some(phrase => title.toLowerCase().includes(phrase.toLowerCase()));
  
  if (hookFound) {
    // Se encontrar um gancho explícito
    const lowerTitle = title.toLowerCase();
    for (const phrase of hookPhrases) {
      if (lowerTitle.includes(phrase.toLowerCase())) {
        // Extrair o contexto do gancho
        const hookIndex = lowerTitle.indexOf(phrase.toLowerCase());
        const hookEnd = Math.min(hookIndex + phrase.length + 15, title.length);
        hook = title.substring(hookIndex, hookEnd);
        break;
      }
    }
  } else {
    // Gancho implícito baseado no tema ou ação
    const keywords = action.split(" ");
    if (keywords.length > 2) {
      hook = `curiosidade sobre ${keywords.slice(-2).join(" ")}`;
    } else {
      hook = "curiosidade implícita";
    }
  }
  
  return {
    hasNumber,
    character,
    action,
    hook
  };
}
