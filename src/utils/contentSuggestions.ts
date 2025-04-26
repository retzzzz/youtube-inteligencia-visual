
import { VideoResult } from "@/types/youtube-types";

export const generateRemodelingIdeas = (title: string, niche: string | undefined): string[] => {
  const ideas: string[] = [];
  
  if (title.toLowerCase().includes("como")) {
    ideas.push(`7 segredos que ${title.split("como")[1]?.trim() || "os especialistas nunca revelam"}`);
  }
  
  if (!title.match(/^\d+/)) {
    ideas.push(`10 formas comprovadas de ${title.split(" ").slice(-3).join(" ")}`);
  }
  
  if (!title.toLowerCase().includes("nunca") && !title.toLowerCase().includes("jamais")) {
    ideas.push(`O que você NUNCA deve fazer quando ${title.split(" ").slice(-3).join(" ")}`);
  }
  
  ideas.push(`O segredo pouco conhecido para ${niche?.toLowerCase() || "sucesso"} que 90% das pessoas ignoram`);
  ideas.push(`Faça isto HOJE para ${niche?.toLowerCase() || "melhorar"} em 7 dias ou menos`);
  
  return ideas.slice(0, 3);
};

export const generateAlternativeTitles = (title: string, language: string): string[] => {
  const isSpanish = language.startsWith("es");
  const isEnglish = language.startsWith("en");
  
  const patterns = isSpanish ? [
    "El secreto que nadie te contó sobre",
    "La verdad que necesitas saber sobre",
    "Nunca más cometas este error en"
  ] : isEnglish ? [
    "The secret nobody told you about",
    "The truth you need to know about",
    "Never make this mistake with"
  ] : [
    "O segredo que ninguém te contou sobre",
    "A verdade que você precisa saber sobre",
    "Nunca mais cometa este erro em"
  ];
  
  const keywords = title.split(" ")
    .filter(word => word.length > 3)
    .slice(-3);
  
  const titleBase = keywords.join(" ");
  return patterns.map(pattern => `${pattern} ${titleBase}`).slice(0, 3);
};

export const estimateTargetAudience = (title: string, niche: string | undefined, language: string): string => {
  const ageRanges: Record<string, string> = {
    "Tecnologia": "25-34 anos",
    "Finanças": "30-45 anos",
    "Saúde": "28-50 anos",
    "Espiritualidade": "35-55 anos",
    "Beleza": "18-35 anos",
    "Jogos": "15-30 anos",
    "Educação": "20-40 anos"
  };
  
  const defaultAge = "25-45 anos";
  const ageRange = niche ? ageRanges[niche] || defaultAge : defaultAge;
  
  const titleLower = title.toLowerCase();
  let interest = language.startsWith("es") ? 
    "interesado en crecimiento personal" :
    language.startsWith("en") ?
    "interested in personal growth" :
    "interessado em crescimento pessoal";
    
  if (language.startsWith("es")) {
    if (titleLower.match(/como|aprenda|guía|tutorial/i)) {
      interest = "buscando aprendizaje práctico";
    } else if (titleLower.match(/secreto|revelado|descubierto|sorprendente/i)) {
      interest = "curioso y abierto a novedades";
    }
  } else if (language.startsWith("en")) {
    if (titleLower.match(/how|learn|guide|tutorial/i)) {
      interest = "seeking practical learning";
    } else if (titleLower.match(/secret|revealed|discovery|surprising/i)) {
      interest = "curious and open to new ideas";
    }
  } else {
    if (titleLower.match(/como|aprenda|guia|tutorial/i)) {
      interest = "buscando aprendizado prático";
    } else if (titleLower.match(/segredo|revelado|descoberta|surpreendente/i)) {
      interest = "curioso e aberto a novidades";
    }
  }
  
  let ageRangeText = ageRange;
  
  if (language.startsWith("es")) {
    ageRangeText = ageRange.replace("anos", "años");
    return `Personas de ${ageRangeText}, ${interest}`;
  } else if (language.startsWith("en")) {
    ageRangeText = ageRange.replace("anos", "years");
    return `People aged ${ageRangeText}, ${interest}`;
  }
  
  return `Pessoas de ${ageRangeText}, ${interest}`;
};

