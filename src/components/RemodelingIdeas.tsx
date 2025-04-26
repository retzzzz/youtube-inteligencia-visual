
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoResult } from "@/types/youtube-types";
import { Lightbulb, Sparkles, Target } from "lucide-react";

interface RemodelingIdeasProps {
  video: VideoResult;
}

const RemodelingIdeas: React.FC<RemodelingIdeasProps> = ({ video }) => {
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
  const generateAlternativeTitles = (title: string): string[] => {
    const patterns = [
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
  const generateAlternativeSubniches = (mainNiche: string | undefined): string[] => {
    if (!mainNiche) return ["Desenvolvimento pessoal", "Estilo de vida", "Bem-estar"];
    
    const nicheMap: Record<string, string[]> = {
      "Tecnologia": ["Tech para iniciantes", "Produtividade digital", "Segurança online"],
      "Finanças": ["Educação financeira", "Investimentos para iniciantes", "Economia doméstica"],
      "Saúde": ["Bem-estar mental", "Fitness em casa", "Alimentação saudável"],
      "Espiritualidade": ["Meditação iniciante", "Desenvolvimento pessoal", "Equilíbrio emocional"],
      "Beleza": ["Cuidados naturais", "Maquiagem para iniciantes", "Rotinas minimalistas"],
      "Diversos": ["Hacks do dia a dia", "Produtividade pessoal", "Soluções práticas"]
    };
    
    // Tentar encontrar subnichos para o nicho principal ou usar um fallback
    const subniches = nicheMap[mainNiche] || ["Desenvolvimento pessoal", "Estilo de vida", "Bem-estar"];
    return subniches;
  };
  
  // Gerar ideia de thumbnail baseada no título
  const generateThumbnailIdea = (title: string): string => {
    const emotions = ["surpresa", "choque", "curiosidade", "entusiasmo"];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    // Extrair palavra-chave relevante do título
    const keywords = title.split(" ")
      .filter(word => word.length > 4)
      .slice(0, 2)
      .join(" ");
    
    return `Expressão facial de ${emotion} + texto destacado "${keywords}" com seta ou círculo vermelho`;
  };
  
  // Estimar público-alvo com base no conteúdo
  const estimateTargetAudience = (title: string, niche: string | undefined): string => {
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
    let interest = "interessado em crescimento pessoal";
    
    if (title.match(/como|aprenda|guia|tutorial/i)) {
      interest = "buscando aprendizado prático";
    } else if (title.match(/segredo|revelado|descoberta|surpreendente/i)) {
      interest = "curioso e aberto a novidades";
    } else if (title.match(/nunca|erro|evite|problema/i)) {
      interest = "preocupado em evitar erros";
    }
    
    return `Pessoas de ${ageRange}, ${interest}`;
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
  
  const remodelingIdeas = generateRemodelingIdeas(video.title, video.mainNiche);
  const alternativeTitles = generateAlternativeTitles(video.title);
  const alternativeSubniches = generateAlternativeSubniches(video.mainNiche);
  const thumbnailIdea = generateThumbnailIdea(video.title);
  const targetAudience = estimateTargetAudience(video.title, video.mainNiche);
  const escalabilityScore = calculateScalabilityScore(video);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Ideias de Remodelagem
            <Badge className="ml-auto" variant={escalabilityScore > 70 ? "default" : "outline"}>
              Potencial: {escalabilityScore}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Sugestões de Remodelagem:
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              {remodelingIdeas.map((idea, index) => (
                <li key={index} className="text-sm">{idea}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Títulos Alternativos:</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              {alternativeTitles.map((title, index) => (
                <li key={index} className="text-sm">{title}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Subnichos Alternativos:</h4>
            <div className="flex flex-wrap gap-1">
              {alternativeSubniches.map((subniche, index) => (
                <Badge key={index} variant="outline" className="bg-slate-100">
                  {subniche}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              Público-alvo Estimado:
            </h4>
            <p className="text-sm">{targetAudience}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Ideia para Thumbnail:</h4>
            <p className="text-sm italic border-l-2 border-gray-200 pl-2">{thumbnailIdea}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemodelingIdeas;
