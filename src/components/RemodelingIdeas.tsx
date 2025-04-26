
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoResult } from "@/types/youtube-types";
import { 
  Lightbulb, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Clock, 
  BarChart, 
  Users, 
  Tag,
  MessageCircle,
  ThumbsUp
} from "lucide-react";

interface RemodelingIdeasProps {
  video: VideoResult;
}

const RemodelingIdeas: React.FC<RemodelingIdeasProps> = ({ video }) => {
  // Determinar o tamanho do canal com base no número de inscritos
  const getChannelSize = (subscribers: number): "small" | "medium" | "large" => {
    if (subscribers < 100000) return "small";
    if (subscribers < 1000000) return "medium";
    return "large";
  };
  
  // Calcular visualizações por hora
  const calculateViewsPerHour = (views: number, ageInDays: number): number => {
    const ageInHours = ageInDays * 24;
    return ageInHours > 0 ? Math.round(views / ageInHours) : 0;
  };
  
  // Determinar potencial de viralidade
  const assessViralityPotential = (video: VideoResult): {
    potential: "low" | "medium" | "high",
    reason: string
  } => {
    const viewsPerHour = video.viewsPerHour || calculateViewsPerHour(video.views, video.videoAge);
    const channelSize = video.channelSize || getChannelSize(video.subscribers);
    
    // Fatores que influenciam a viralidade
    const isNew = video.videoAge < 3; // Menos de 3 dias
    const hasHighEngagement = video.engagement > 7; // Mais de 7% de engajamento
    const hasHighViewRate = viewsPerHour > 200; // Mais de 200 views por hora
    const isSmallChannel = channelSize === "small";
    const hasHighViralScore = video.viralScore > 700;
    
    // Contar fatores positivos para viralidade
    let positiveFactors = 0;
    let reasons = [];
    
    if (isNew) {
      positiveFactors++;
      reasons.push("vídeo recente");
    }
    
    if (hasHighEngagement) {
      positiveFactors += 2;
      reasons.push(`alto engajamento (${video.engagement}%)`);
    }
    
    if (hasHighViewRate) {
      positiveFactors += 2;
      reasons.push(`crescimento rápido (${viewsPerHour} views/h)`);
    }
    
    if (isSmallChannel) {
      positiveFactors++;
      reasons.push("canal em crescimento");
    }
    
    if (hasHighViralScore) {
      positiveFactors++;
      reasons.push("pontuação viral alta");
    }
    
    // Determinar potencial com base nos fatores
    let potential: "low" | "medium" | "high" = "low";
    if (positiveFactors >= 4) {
      potential = "high";
    } else if (positiveFactors >= 2) {
      potential = "medium";
    }
    
    const reason = reasons.length > 0 
      ? `${reasons.join(", ")}`
      : "análise baseada em métricas de crescimento e engajamento";
    
    return { potential, reason };
  };
  
  // Gerar ideias de remodelagem com base no título e nicho do vídeo
  const generateRemodelingIdeas = (title: string, niche: string | undefined): string[] => {
    const ideas: string[] = [];
    
    // Ideias baseadas em padrões de conteúdo viral
    if (title.toLowerCase().includes("como")) {
      ideas.push(`7 segredos que ${title.split("como")[1]?.trim() || "os especialistas nunca revelam"}`);
    }
    
    // Adicionar numerais para gerar listas
    if (!title.match(/^\d+/)) {
      ideas.push(`10 formas comprovadas de ${title.split(" ").slice(-3).join(" ")}`);
    }
    
    // Adicionar elementos emocionais
    if (!title.toLowerCase().includes("nunca") && !title.toLowerCase().includes("jamais")) {
      ideas.push(`O que você NUNCA deve fazer quando ${title.split(" ").slice(-3).join(" ")}`);
    }
    
    // Adicionar elementos de mistério/curiosidade
    ideas.push(`O segredo pouco conhecido para ${video.mainNiche?.toLowerCase() || "sucesso"} que 90% das pessoas ignoram`);
    
    // Adicionar um elemento temporal para urgência
    ideas.push(`Faça isto HOJE para ${video.mainNiche?.toLowerCase() || "melhorar"} em 7 dias ou menos`);
    
    return ideas.slice(0, 3); // Retornar até 3 ideias
  };
  
  // Gerar títulos alternativos baseados em padrões virais
  const generateAlternativeTitles = (title: string, language: string): string[] => {
    const isSpanish = language.startsWith("es");
    const isEnglish = language.startsWith("en");
    
    const patterns = isSpanish ? [
      "El secreto que nadie te contó sobre",
      "La verdad que necesitas saber sobre",
      "Nunca más cometas este error en",
      "Cómo descubrí la forma perfecta de",
      "El método comprobado para"
    ] : isEnglish ? [
      "The secret nobody told you about",
      "The truth you need to know about",
      "Never make this mistake with",
      "How I discovered the perfect way to",
      "The proven method for"
    ] : [
      "O segredo que ninguém te contou sobre",
      "A verdade que você precisa saber sobre",
      "Nunca mais cometa este erro em",
      "Como eu descobri a forma perfeita de",
      "O método comprovado para"
    ];
    
    const keywords = title.split(" ")
      .filter(word => word.length > 3)
      .slice(-3);
    
    const titleBase = keywords.join(" ");
    
    return patterns.map(pattern => `${pattern} ${titleBase}`)
      .slice(0, 3); // Retornar até 3 títulos alternativos
  };
  
  // Gerar sugestões de subnichos alternativos
  const generateAlternativeSubniches = (mainNiche: string | undefined, language: string): string[] => {
    if (!mainNiche) return ["Desenvolvimento pessoal", "Estilo de vida", "Bem-estar"];
    
    const isSpanish = language.startsWith("es");
    const isEnglish = language.startsWith("en");
    
    const nicheMap: Record<string, Record<string, string[]>> = {
      "pt": {
        "Tecnologia": ["Tech para iniciantes", "Produtividade digital", "Segurança online"],
        "Finanças": ["Educação financeira", "Investimentos para iniciantes", "Economia doméstica"],
        "Saúde": ["Bem-estar mental", "Fitness em casa", "Alimentação saudável"],
        "Espiritualidade": ["Meditação iniciante", "Desenvolvimento pessoal", "Equilíbrio emocional"],
        "Beleza": ["Cuidados naturais", "Maquiagem para iniciantes", "Rotinas minimalistas"],
        "Diversos": ["Hacks do dia a dia", "Produtividade pessoal", "Soluções práticas"]
      },
      "es": {
        "Tecnología": ["Tech para principiantes", "Productividad digital", "Seguridad en línea"],
        "Finanzas": ["Educación financiera", "Inversiones para principiantes", "Economía doméstica"],
        "Salud": ["Bienestar mental", "Fitness en casa", "Alimentación saludable"],
        "Espiritualidad": ["Meditación para principiantes", "Desarrollo personal", "Equilibrio emocional"],
        "Belleza": ["Cuidados naturales", "Maquillaje para principiantes", "Rutinas minimalistas"],
        "Diversos": ["Trucos cotidianos", "Productividad personal", "Soluciones prácticas"]
      },
      "en": {
        "Technology": ["Tech for beginners", "Digital productivity", "Online security"],
        "Finance": ["Financial education", "Investing for beginners", "Home economics"],
        "Health": ["Mental wellbeing", "Home fitness", "Healthy eating"],
        "Spirituality": ["Beginner meditation", "Personal development", "Emotional balance"],
        "Beauty": ["Natural care", "Makeup for beginners", "Minimalist routines"],
        "Various": ["Daily hacks", "Personal productivity", "Practical solutions"]
      }
    };
    
    const langKey = isSpanish ? "es" : isEnglish ? "en" : "pt";
    const nicheKey = mainNiche;
    
    // Tentar encontrar subnichos para o nicho principal ou usar um fallback
    const subniches = nicheMap[langKey][nicheKey] || ["Desenvolvimento pessoal", "Estilo de vida", "Bem-estar"];
    return subniches;
  };
  
  // Gerar ideia de thumbnail baseada no título
  const generateThumbnailIdea = (title: string, language: string): string => {
    const emotions = language.startsWith("es") ? 
      ["sorpresa", "shock", "curiosidad", "entusiasmo"] :
      language.startsWith("en") ?
      ["surprise", "shock", "curiosity", "enthusiasm"] :
      ["surpresa", "choque", "curiosidade", "entusiasmo"];
      
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    // Extrair palavra-chave relevante do título
    const keywords = title.split(" ")
      .filter(word => word.length > 4)
      .slice(0, 2)
      .join(" ");
    
    if (language.startsWith("es")) {
      return `Expresión facial de ${emotion} + texto destacado "${keywords}" con flecha o círculo rojo`;
    } else if (language.startsWith("en")) {
      return `Facial expression of ${emotion} + highlighted text "${keywords}" with red arrow or circle`;
    } else {
      return `Expressão facial de ${emotion} + texto destacado "${keywords}" com seta ou círculo vermelho`;
    }
  };
  
  // Estimar público-alvo com base no conteúdo
  const estimateTargetAudience = (title: string, niche: string | undefined, language: string): string => {
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
    
    // Determinar interesse baseado nas palavras do título
    let interest = language.startsWith("es") ? 
      "interesado en crecimiento personal" :
      language.startsWith("en") ?
      "interested in personal growth" :
      "interessado em crescimento pessoal";
    
    const titleLower = title.toLowerCase();
    if (language.startsWith("es")) {
      if (titleLower.match(/como|aprenda|guía|tutorial/i)) {
        interest = "buscando aprendizaje práctico";
      } else if (titleLower.match(/secreto|revelado|descubierto|sorprendente/i)) {
        interest = "curioso y abierto a novedades";
      } else if (titleLower.match(/nunca|error|evite|problema/i)) {
        interest = "preocupado en evitar errores";
      }
    } else if (language.startsWith("en")) {
      if (titleLower.match(/how|learn|guide|tutorial/i)) {
        interest = "seeking practical learning";
      } else if (titleLower.match(/secret|revealed|discovery|surprising/i)) {
        interest = "curious and open to new ideas";
      } else if (titleLower.match(/never|error|avoid|problem/i)) {
        interest = "concerned about avoiding mistakes";
      }
    } else {
      if (titleLower.match(/como|aprenda|guia|tutorial/i)) {
        interest = "buscando aprendizado prático";
      } else if (titleLower.match(/segredo|revelado|descoberta|surpreendente/i)) {
        interest = "curioso e aberto a novidades";
      } else if (titleLower.match(/nunca|erro|evite|problema/i)) {
        interest = "preocupado em evitar erros";
      }
    }
    
    let ageRangeText = ageRange;
    let interestText = interest;
    
    if (language.startsWith("es")) {
      ageRangeText = ageRange.replace("anos", "años");
      ageRangeText = "Personas de " + ageRangeText + ", " + interest;
    } else if (language.startsWith("en")) {
      ageRangeText = ageRange.replace("anos", "years");
      ageRangeText = "People aged " + ageRangeText + ", " + interest;
    } else {
      ageRangeText = "Pessoas de " + ageRangeText + ", " + interest;
    }
    
    return ageRangeText;
  };
  
  // Calcular pontuação de escalabilidade (0-100)
  const calculateScalabilityScore = (video: VideoResult): number => {
    let score = 50; // Pontuação base
    
    // Fatores positivos
    if (video.engagement > 10) score += 10;
    if (video.viralScore > 700) score += 15;
    if (video.videoAge < 7) score += 10;
    if (video.estimatedCPM > 4) score += 5;
    
    // Fatores negativos
    if (video.subscribers > 1000000) score -= 10; // Canal muito grande, mais difícil competir
    if (video.views > 500000) score -= 5; // Vídeo já muito visto
    
    // Garantir que o score está entre 0-100
    return Math.max(0, Math.min(100, score));
  };
  
  // Calcular e enriquecer os dados do vídeo com métricas adicionais
  const enrichVideoData = (video: VideoResult) => {
    // Calcular visualizações por hora
    const viewsPerHour = calculateViewsPerHour(video.views, video.videoAge);
    
    // Determinar tamanho do canal
    const channelSize = getChannelSize(video.subscribers);
    
    // Avaliar potencial de viralidade
    const virality = assessViralityPotential({
      ...video,
      viewsPerHour,
      channelSize
    });
    
    return {
      ...video,
      viewsPerHour,
      channelSize,
      viralityPotential: virality.potential,
      viralityReason: virality.reason
    };
  };
  
  // Enriquecer os dados do vídeo
  const enrichedVideo = enrichVideoData(video);
  
  // Gerar ideias de remodelagem e outras sugestões
  const remodelingIdeas = generateRemodelingIdeas(video.title, video.mainNiche);
  const alternativeTitles = generateAlternativeTitles(video.title, video.language);
  const alternativeSubniches = generateAlternativeSubniches(video.mainNiche, video.language);
  const thumbnailIdea = generateThumbnailIdea(video.title, video.language);
  const targetAudience = estimateTargetAudience(video.title, video.mainNiche, video.language);
  const escalabilityScore = calculateScalabilityScore(video);
  
  // Formatar visualizações por hora
  const formattedViewsPerHour = new Intl.NumberFormat().format(enrichedVideo.viewsPerHour || 0);
  
  // Formatar idade do vídeo
  const formatVideoAge = (days: number): string => {
    if (days < 1) {
      const hours = Math.round(days * 24);
      return `${hours} horas`;
    } else if (days < 30) {
      return `${Math.round(days)} dias`;
    } else {
      const months = Math.round(days / 30);
      return `${months} meses`;
    }
  };
  
  // Determinar a cor do badge de potencial de viralidade
  const getViralityColor = (potential: string | undefined): string => {
    switch (potential) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-gray-500";
      default: return "bg-gray-300";
    }
  };
  
  // Determinar label do tamanho do canal
  const getChannelSizeLabel = (size: string | undefined, language: string): string => {
    if (language.startsWith("es")) {
      switch (size) {
        case "small": return "Pequeño";
        case "medium": return "Mediano";
        case "large": return "Grande";
        default: return "Desconocido";
      }
    } else if (language.startsWith("en")) {
      switch (size) {
        case "small": return "Small";
        case "medium": return "Medium";
        case "large": return "Large";
        default: return "Unknown";
      }
    } else {
      switch (size) {
        case "small": return "Pequeno";
        case "medium": return "Médio";
        case "large": return "Grande";
        default: return "Desconhecido";
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Análise Detalhada e Sugestões de Remodelagem
            <Badge className={`ml-auto ${getViralityColor(enrichedVideo.viralityPotential)}`} variant="default">
              Potencial: {escalabilityScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Seção 1: Análise do Vídeo */}
          <div className="border rounded-md p-4 bg-slate-50">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-blue-500" />
              Análise do Vídeo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nicho Detectado:</span>
                  <span className="font-medium">{enrichedVideo.mainNiche || "Diversos"}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Idade do Vídeo:</span>
                  <span className="font-medium">{formatVideoAge(enrichedVideo.videoAge)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Views por Hora:</span>
                  <span className="font-medium">{formattedViewsPerHour}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Engajamento:</span>
                  <span className="font-medium">{enrichedVideo.engagement}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tamanho do Canal:</span>
                  <span className="font-medium">
                    {getChannelSizeLabel(enrichedVideo.channelSize, enrichedVideo.language)} 
                    ({new Intl.NumberFormat().format(enrichedVideo.subscribers)} inscritos)
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Viral Score:</span>
                  <span className="font-medium">{enrichedVideo.viralScore}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Idioma:</span>
                  <span className="font-medium">{enrichedVideo.language}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potencial de Viralidade:</span>
                  <span className="font-medium capitalize">
                    <Badge 
                      variant="outline" 
                      className={`${getViralityColor(enrichedVideo.viralityPotential)} text-white`}
                    >
                      {enrichedVideo.viralityPotential === "high" ? "Alto" : 
                       enrichedVideo.viralityPotential === "medium" ? "Médio" : "Baixo"}
                    </Badge>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-t">
              <div className="text-sm">
                <span className="text-muted-foreground font-medium">Motivo da Avaliação:</span>
                <p className="mt-1">{enrichedVideo.viralityReason}</p>
              </div>
            </div>
          </div>
          
          {/* Seção 2: Sugestões de Remodelagem */}
          <div className="border rounded-md p-4 bg-amber-50/50">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Sugestões de Remodelagem
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-1">Ideias de Remodelagem:</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {remodelingIdeas.map((idea, index) => (
                    <li key={index} className="text-sm">{idea}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Títulos Alternativos:</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {alternativeTitles.map((title, index) => (
                    <li key={index} className="text-sm">{title}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-slate-500" />
                  Subnichos Alternativos:
                </h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {alternativeSubniches.map((subniche, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-100">
                      {subniche}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Público-alvo Estimado:
                </h4>
                <p className="text-sm">{targetAudience}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Ideia para Thumbnail:</h4>
                <p className="text-sm italic border-l-2 border-amber-200 pl-2 py-1">{thumbnailIdea}</p>
              </div>
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-2 justify-end">
            <Badge variant="outline" className="bg-blue-100">
              <Clock className="h-3 w-3 mr-1" /> 
              {formatVideoAge(video.videoAge)}
            </Badge>
            <Badge variant="outline" className="bg-green-100">
              <TrendingUp className="h-3 w-3 mr-1" /> 
              {formattedViewsPerHour} views/h
            </Badge>
            {video.likes && (
              <Badge variant="outline" className="bg-red-100">
                <ThumbsUp className="h-3 w-3 mr-1" /> 
                {new Intl.NumberFormat().format(video.likes)}
              </Badge>
            )}
            {video.comments && (
              <Badge variant="outline" className="bg-purple-100">
                <MessageCircle className="h-3 w-3 mr-1" /> 
                {new Intl.NumberFormat().format(video.comments)}
              </Badge>
            )}
            <Badge variant="outline" className="bg-yellow-100">
              <Users className="h-3 w-3 mr-1" /> 
              {new Intl.NumberFormat().format(video.subscribers)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemodelingIdeas;
