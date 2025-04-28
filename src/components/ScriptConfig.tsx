
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScriptStats, ScriptConfig as ScriptConfigType } from "@/hooks/useScriptGenerator";

interface ScriptConfigProps {
  scriptStats: ScriptStats;
  onSubmit: (config: ScriptConfigType) => void;
  initialConfig: ScriptConfigType;
}

const ScriptConfig = ({ 
  scriptStats, 
  onSubmit,
  initialConfig 
}: ScriptConfigProps) => {
  const [config, setConfig] = useState<ScriptConfigType>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      onSubmit(config);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof ScriptConfigType, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calcular a duração estimada com base nos caracteres e palavras
  const estimateDuration = () => {
    const wordsPerMinute = 150; // Média de palavras faladas por minuto
    return Math.ceil(scriptStats.words / wordsPerMinute);
  };

  return (
    <div className="space-y-6">
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

      <div className="space-y-6">
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
                onChange={(e) => handleInputChange('blocks', parseInt(e.target.value) || 1)}
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
                onChange={(e) => handleInputChange('charactersPerBlock', parseInt(e.target.value) || 400)}
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
                onChange={(e) => handleInputChange('targetDuration', parseInt(e.target.value) || 5)}
              />
              <p className="text-xs text-muted-foreground">
                Duração alvo do vídeo final
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Formatação e Customização</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Deseja que seja incluído um CTA ao final?</Label>
              <RadioGroup 
                value={config.ctaStyle || ""}
                onValueChange={(value) => handleInputChange('ctaStyle', value === "" ? null : value)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                  <RadioGroupItem value="emocional" id="emocional" />
                  <Label htmlFor="emocional" className="cursor-pointer">Emocional</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                  <RadioGroupItem value="apelativo" id="apelativo" />
                  <Label htmlFor="apelativo" className="cursor-pointer">Apelativo</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                  <RadioGroupItem value="reflexivo" id="reflexivo" />
                  <Label htmlFor="reflexivo" className="cursor-pointer">Reflexivo</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                  <RadioGroupItem value="" id="sem-cta" />
                  <Label htmlFor="sem-cta" className="cursor-pointer">Sem CTA</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <Label htmlFor="masterPrompt" className="cursor-pointer">
                  Deseja criar um Prompt Mestre de ambientação visual?
                </Label>
                <p className="text-xs text-muted-foreground">
                  Para manter consistência nos cenários e atmosfera
                </p>
              </div>
              <Switch 
                id="masterPrompt"
                checked={config.generateMasterPrompt}
                onCheckedChange={(checked) => handleInputChange('generateMasterPrompt', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <Label htmlFor="imagePrompts" className="cursor-pointer">
                  Deseja gerar prompts de imagem para cada bloco?
                </Label>
                <p className="text-xs text-muted-foreground">
                  Descrições completas em inglês para IA geradora de imagens
                </p>
              </div>
              <Switch 
                id="imagePrompts"
                checked={config.generateImagePrompts}
                onCheckedChange={(checked) => handleInputChange('generateImagePrompts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <Label htmlFor="convertToSrt" className="cursor-pointer">
                  Deseja converter o roteiro para formato .srt?
                </Label>
                <p className="text-xs text-muted-foreground">
                  Para uso como legendas em vídeos
                </p>
              </div>
              <Switch 
                id="convertToSrt"
                checked={config.convertToSrt}
                onCheckedChange={(checked) => handleInputChange('convertToSrt', checked)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading} 
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando Roteiro...
            </>
          ) : "Processar Roteiro"}
        </Button>
      </div>
    </div>
  );
};

export default ScriptConfig;
