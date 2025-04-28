
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TitleVariation {
  title: string;
  explanation: string;
  competitionLevel: "baixa" | "média" | "alta";
  viralPotential: number; // 0-100
}

interface TitleVariationDisplayProps {
  variations: TitleVariation[];
  strategyName: string;
  strategyDescription: string;
}

const TitleVariationDisplay = ({
  variations,
  strategyName,
  strategyDescription
}: TitleVariationDisplayProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    toast({
      title: "Título copiado!",
      description: "O título foi copiado para a área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCompetitionBadgeVariant = (level: "baixa" | "média" | "alta") => {
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

  const getViralPotentialText = (potential: number) => {
    if (potential >= 80) return "Muito alto";
    if (potential >= 60) return "Alto";
    if (potential >= 40) return "Médio";
    if (potential >= 20) return "Baixo";
    return "Muito baixo";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{strategyName}</CardTitle>
        <CardDescription>{strategyDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {variations.map((variation, index) => (
          <div 
            key={`${strategyName}-${index}`}
            className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{variation.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(variation.title, `${strategyName}-${index}`)}
                className="h-8 w-8 p-0"
              >
                {copiedId === `${strategyName}-${index}` ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{variation.explanation}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={getCompetitionBadgeVariant(variation.competitionLevel)}>
                Concorrência {variation.competitionLevel}
              </Badge>
              <Badge variant="secondary">
                Potencial viral: {getViralPotentialText(variation.viralPotential)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TitleVariationDisplay;
