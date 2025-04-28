
import React from "react";
import { Card } from "@/components/ui/card";
import { ScriptStats } from "@/hooks/useScriptGenerator";

interface ScriptStatsCardProps {
  scriptStats: ScriptStats;
}

const ScriptStatsCard: React.FC<ScriptStatsCardProps> = ({ scriptStats }) => {
  // Calculate the duration estimate based on words
  const estimateDuration = () => {
    const wordsPerMinute = 150; // Average words spoken per minute
    return Math.ceil(scriptStats.words / wordsPerMinute);
  };

  return (
    <Card className="p-4 bg-muted/30">
      <h3 className="text-lg font-medium mb-4">Estatísticas do Texto</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Caracteres (com espaços)</p>
          <p className="text-xl font-semibold">{scriptStats.charactersWithSpaces}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Caracteres (sem espaços)</p>
          <p className="text-xl font-semibold">{scriptStats.charactersWithoutSpaces}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Palavras</p>
          <p className="text-xl font-semibold">{scriptStats.words}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Linhas</p>
          <p className="text-xl font-semibold">{scriptStats.lines}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
        <p className="text-sm text-amber-800">
          Duração estimada: <span className="font-semibold">{estimateDuration()} minutos</span> 
          (baseado na média de 150 palavras por minuto)
        </p>
      </div>
    </Card>
  );
};

export default ScriptStatsCard;
