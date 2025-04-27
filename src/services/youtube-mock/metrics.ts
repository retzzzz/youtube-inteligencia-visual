
import { randomBetween } from './utils';

// Calculate the viral score for a video
export const calculateViralScore = (views: number, engagement: number, ageInDays: number, subscribers: number): number => {
  // Maior peso para vídeos muito recentes (24/48/72h)
  let freshnessMultiplier = 1;
  if (ageInDays <= 1) { // 24h
    freshnessMultiplier = 6; 
  } else if (ageInDays <= 2) { // 48h
    freshnessMultiplier = 5;
  } else if (ageInDays <= 3) { // 72h
    freshnessMultiplier = 4;
  } else if (ageInDays <= 7) {
    freshnessMultiplier = 2;
  }
  
  // Taxa de crescimento: mais visualizações em menos tempo = maior pontuação
  const growthRate = views / Math.max(0.1, ageInDays);
  
  // Engajamento tem peso importante para viralização
  const engagementScore = engagement * 3;
  
  // Penalizar vídeos muito grandes (já virais)
  let penaltyFactor = 1;
  if (views > 1000000) {
    penaltyFactor = 0.4; // Penalidade maior para vídeos já virais
  } else if (views > 500000) {
    penaltyFactor = 0.6;
  } else if (views > 100000) {
    penaltyFactor = 0.8;
  }
  
  // Penalidade adicional para canais grandes
  let channelPenaltyFactor = 1;
  if (subscribers > 5000000) {
    channelPenaltyFactor = 0.5;
  } else if (subscribers > 1000000) {
    channelPenaltyFactor = 0.7;
  } else if (subscribers > 500000) {
    channelPenaltyFactor = 0.85;
  }
  
  // Combinar os fatores com pesos específicos
  return Math.round((growthRate * 0.3 + engagementScore * 0.35 + freshnessMultiplier * 0.35) * penaltyFactor * channelPenaltyFactor * 100);
};

// Estimate CPM based on language, niche, views, and engagement
export const estimateCPM = (language: string, niche: string, views: number, engagement: number): number => {
  let baseCPM = 0;
  
  // CPM base por idioma (valores mais realistas baseados em dados de mercado)
  if (language.startsWith("en")) baseCPM = 4.80;
  else if (language.startsWith("pt")) baseCPM = 2.40;
  else if (language.startsWith("de")) baseCPM = 4.20;
  else if (language.startsWith("fr")) baseCPM = 3.80;
  else if (language.startsWith("ja")) baseCPM = 3.50;
  else if (language.startsWith("es")) baseCPM = 2.80;
  else baseCPM = 2.50;
  
  // Ajuste por nicho
  const nicheAdjustments: Record<string, number> = {
    "Finanças": 1.4,
    "Investimentos": 1.5,
    "Tecnologia": 1.3,
    "Educação": 1.2,
    "Saúde": 1.1,
    "Beleza": 1.2,
    "Jogos": 0.9,
    "Entretenimento": 0.85,
    "Esportes": 0.95,
    "Viagem": 1.15,
    "Culinária": 1.05,
    "Diversos": 1.0
  };
  
  const nicheMultiplier = nicheAdjustments[niche] || 1.0;
  
  // Ajustar com base no engajamento (engajamento maior = maior CPM)
  const engagementMultiplier = 1 + (engagement / 150);
  
  // Ajustar com base nas visualizações (valores mais realistas)
  let viewsAdjustment = 1.0;
  if (views > 1000000) viewsAdjustment = 1.05;
  else if (views > 500000) viewsAdjustment = 1.03;
  else if (views > 100000) viewsAdjustment = 1.01;
  else if (views < 10000) viewsAdjustment = 0.98;
  
  return Number((baseCPM * engagementMultiplier * viewsAdjustment * nicheMultiplier).toFixed(2));
};

// Function to detect niches and subniches
export const detectNiche = (title: string, keywords: string): { mainNiche: string, subNiche: string } => {
  const allText = (title + " " + keywords).toLowerCase();
  
  // Nichos principais comuns no YouTube
  const nicheKeywords = [
    { niche: "Tecnologia", keywords: ["tech", "tecnologia", "gadget", "software", "programação", "código"] },
    { niche: "Games", keywords: ["game", "jogo", "gaming", "gameplay", "videogame", "playstation", "xbox", "nintendo"] },
    { niche: "Beleza", keywords: ["beleza", "beauty", "maquiagem", "makeup", "skincare", "cabelo"] },
    { niche: "Moda", keywords: ["moda", "fashion", "roupa", "estilo", "tendência"] },
    { niche: "Culinária", keywords: ["receita", "cooking", "culinária", "comida", "cozinha", "food"] },
    { niche: "Fitness", keywords: ["fitness", "workout", "exercício", "treino", "gym", "academia", "emagrecer"] },
    { niche: "Saúde", keywords: ["saúde", "health", "bem-estar", "wellness", "medicina", "nutrição"] },
    { niche: "Música", keywords: ["música", "music", "song", "canção", "album", "artista"] },
    { niche: "Educação", keywords: ["educação", "education", "curso", "aula", "aprender", "estudar"] },
    { niche: "Finanças", keywords: ["finanças", "finance", "investimento", "dinheiro", "economia", "bolsa"] },
    { niche: "Viagem", keywords: ["viagem", "travel", "turismo", "viajar", "destino"] },
    { niche: "Espiritualidade", keywords: ["espiritualidade", "spirituality", "religião", "fé", "meditação"] }
  ];
  
  // Encontrar nicho principal
  let mainNiche = "Diversos";
  for (const {niche, keywords} of nicheKeywords) {
    if (keywords.some(keyword => allText.includes(keyword))) {
      mainNiche = niche;
      break;
    }
  }
  
  // Gerar subnicho com base em combinações de palavras frequentes
  const words = allText.split(/\s+/).filter(w => w.length > 3);
  let subNiche = "";
  
  if (words.length >= 3) {
    const randomIndex = Math.floor(Math.random() * (words.length - 2));
    subNiche = words[randomIndex].charAt(0).toUpperCase() + words[randomIndex].slice(1) + " " + 
               words[randomIndex + 1] + " " + words[randomIndex + 2];
  } else {
    subNiche = mainNiche + " Específico";
  }
  
  return { mainNiche, subNiche };
};
