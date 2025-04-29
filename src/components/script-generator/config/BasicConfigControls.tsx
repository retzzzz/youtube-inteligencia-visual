
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScriptConfig } from "@/hooks/useScriptGenerator";
import { Badge } from "@/components/ui/badge";

interface BasicConfigControlsProps {
  config: ScriptConfig;
  onConfigChange: (field: keyof ScriptConfig, value: any) => void;
}

const BasicConfigControls: React.FC<BasicConfigControlsProps> = ({
  config,
  onConfigChange
}) => {
  const handleSliderChange = (field: keyof ScriptConfig, value: number[]) => {
    onConfigChange(field, value[0]);
  };

  const handleInputChange = (field: keyof ScriptConfig, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onConfigChange(field, value);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações Básicas</h3>
        {config.autoIdentifiedNiche && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Nicho identificado:</p>
              <Badge variant="secondary">{config.autoIdentifiedNiche.niche}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Subnicho identificado:</p>
              <Badge variant="secondary">{config.autoIdentifiedNiche.subniche}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Micro-subnicho identificado:</p>
              <Badge variant="secondary">{config.autoIdentifiedNiche.microSubniche}</Badge>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="blocks">Quantidade de Blocos</Label>
            <Badge variant="outline">{config.blocks}</Badge>
          </div>
          <Slider
            id="blocks"
            min={3}
            max={12}
            step={1}
            value={[config.blocks]}
            onValueChange={(value) => handleSliderChange("blocks", value)}
          />
          <Input 
            type="number" 
            id="blocks-input" 
            min={3} 
            max={12}
            value={config.blocks}
            onChange={(e) => handleInputChange("blocks", e)}
            className="mt-2 w-20"
          />
        </Card>
        
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="charactersPerBlock">Caracteres por Bloco</Label>
            <Badge variant="outline">{config.charactersPerBlock}</Badge>
          </div>
          <Slider
            id="charactersPerBlock"
            min={300}
            max={800}
            step={50}
            value={[config.charactersPerBlock]}
            onValueChange={(value) => handleSliderChange("charactersPerBlock", value)}
          />
          <Input 
            type="number" 
            id="chars-per-block-input" 
            min={300} 
            max={800}
            value={config.charactersPerBlock}
            onChange={(e) => handleInputChange("charactersPerBlock", e)}
            className="mt-2 w-20"
          />
        </Card>
      </div>
      
      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="targetDuration">Duração Alvo (minutos)</Label>
          <Badge variant="outline">{config.targetDuration} min</Badge>
        </div>
        <Slider
          id="targetDuration"
          min={1}
          max={15}
          step={1}
          value={[config.targetDuration]}
          onValueChange={(value) => handleSliderChange("targetDuration", value)}
        />
        <Input 
          type="number" 
          id="target-duration-input" 
          min={1} 
          max={15}
          value={config.targetDuration}
          onChange={(e) => handleInputChange("targetDuration", e)}
          className="mt-2 w-20"
        />
      </Card>
    </div>
  );
};

export default BasicConfigControls;
