
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScriptConfig } from "@/hooks/useScriptGenerator";

interface BasicConfigControlsProps {
  config: ScriptConfig;
  onConfigChange: (field: keyof ScriptConfig, value: any) => void;
}

const BasicConfigControls: React.FC<BasicConfigControlsProps> = ({ 
  config, 
  onConfigChange 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Configurações do Roteiro</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="blocks">Quantos blocos deseja dividir o roteiro?</Label>
          <Input 
            id="blocks"
            type="number"
            min={1}
            value={config.blocks}
            onChange={(e) => onConfigChange('blocks', parseInt(e.target.value) || 1)}
          />
          <p className="text-xs text-muted-foreground">
            Divida seu roteiro em blocos para melhor estruturação
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="charactersPerBlock">Quantos caracteres deseja por bloco?</Label>
          <Input 
            id="charactersPerBlock"
            type="number"
            min={100}
            max={1000}
            value={config.charactersPerBlock}
            onChange={(e) => onConfigChange('charactersPerBlock', parseInt(e.target.value) || 400)}
          />
          <p className="text-xs text-muted-foreground">
            Recomendado: 300-500 caracteres (~30-45 segundos de vídeo)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetDuration">Quantos minutos deseja que o vídeo tenha?</Label>
          <Input 
            id="targetDuration"
            type="number"
            min={1}
            value={config.targetDuration}
            onChange={(e) => onConfigChange('targetDuration', parseInt(e.target.value) || 5)}
          />
          <p className="text-xs text-muted-foreground">
            Duração alvo do vídeo final
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicConfigControls;
