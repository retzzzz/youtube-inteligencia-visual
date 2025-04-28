
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScriptConfig } from "@/hooks/useScriptGenerator";

interface FormatOptionsProps {
  config: ScriptConfig;
  onConfigChange: (field: keyof ScriptConfig, value: any) => void;
}

const FormatOptions: React.FC<FormatOptionsProps> = ({ 
  config, 
  onConfigChange 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Formatação e Customização</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Deseja que seja incluído um CTA ao final?</Label>
          <RadioGroup 
            value={config.ctaStyle || ""}
            onValueChange={(value) => onConfigChange('ctaStyle', value === "" ? null : value)}
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
        
        <SwitchOption
          id="masterPrompt"
          label="Deseja criar um Prompt Mestre de ambientação visual?"
          description="Para manter consistência nos cenários e atmosfera"
          checked={config.generateMasterPrompt}
          onCheckedChange={(checked) => onConfigChange('generateMasterPrompt', checked)}
        />
        
        <SwitchOption
          id="imagePrompts"
          label="Deseja gerar prompts de imagem para cada bloco?"
          description="Descrições completas em inglês para IA geradora de imagens"
          checked={config.generateImagePrompts}
          onCheckedChange={(checked) => onConfigChange('generateImagePrompts', checked)}
        />
        
        <SwitchOption
          id="convertToSrt"
          label="Deseja converter o roteiro para formato .srt?"
          description="Para uso como legendas em vídeos"
          checked={config.convertToSrt}
          onCheckedChange={(checked) => onConfigChange('convertToSrt', checked)}
        />
      </div>
    </div>
  );
};

interface SwitchOptionProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SwitchOption: React.FC<SwitchOptionProps> = ({
  id, 
  label, 
  description, 
  checked, 
  onCheckedChange
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div>
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default FormatOptions;
