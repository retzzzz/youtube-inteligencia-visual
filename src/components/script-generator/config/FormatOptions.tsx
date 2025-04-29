
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScriptConfig } from "@/hooks/useScriptGenerator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FormatOptionsProps {
  config: ScriptConfig;
  onConfigChange: (field: keyof ScriptConfig, value: any) => void;
}

const FormatOptions: React.FC<FormatOptionsProps> = ({
  config,
  onConfigChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Opções de Formatação</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Tipo de Processamento</h4>
          <RadioGroup
            value={config.processingType}
            onValueChange={(value) => onConfigChange("processingType", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="simple" id="simple" />
              <Label htmlFor="simple">Processamento Simples</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remodel" id="remodel" />
              <Label htmlFor="remodel">Remodelar Roteiro</Label>
            </div>
          </RadioGroup>
        </Card>
        
        <Card className="p-4">
          <h4 className="font-medium mb-3">Idioma do Roteiro</h4>
          <Select 
            value={config.language} 
            onValueChange={(value) => onConfigChange("language", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">Inglês</SelectItem>
              <SelectItem value="es">Espanhol</SelectItem>
              <SelectItem value="de">Alemão</SelectItem>
              <SelectItem value="fr">Francês</SelectItem>
            </SelectContent>
          </Select>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mt-4">
        {config.processingType === "remodel" && (
          <Card className="p-4">
            <h4 className="font-medium mb-3">Estilo do CTA</h4>
            <Select 
              value={config.ctaStyle || ""} 
              onValueChange={(value) => onConfigChange("ctaStyle", value === "" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo do CTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Sem CTA</SelectItem>
                <SelectItem value="emocional">Emocional</SelectItem>
                <SelectItem value="apelativo">Apelativo</SelectItem>
                <SelectItem value="reflexivo">Reflexivo</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        )}
      </div>
      
      <div className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="generateMasterPrompt">Gerar Prompt Mestre</Label>
          <Switch
            id="generateMasterPrompt"
            checked={config.generateMasterPrompt}
            onCheckedChange={(checked) => onConfigChange("generateMasterPrompt", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="generateImagePrompts">Gerar Prompts de Imagem</Label>
          <Switch
            id="generateImagePrompts"
            checked={config.generateImagePrompts}
            onCheckedChange={(checked) => onConfigChange("generateImagePrompts", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="convertToSrt">Converter para SRT</Label>
          <Switch
            id="convertToSrt"
            checked={config.convertToSrt}
            onCheckedChange={(checked) => onConfigChange("convertToSrt", checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormatOptions;
