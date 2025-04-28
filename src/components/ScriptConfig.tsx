
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { ScriptStats, ScriptConfig as ScriptConfigType } from "@/hooks/useScriptGenerator";
import ScriptStatsCard from "./script-generator/config/ScriptStatsCard";
import BasicConfigControls from "./script-generator/config/BasicConfigControls";
import FormatOptions from "./script-generator/config/FormatOptions";

interface ScriptConfigProps {
  scriptStats: ScriptStats;
  onSubmit: (config: ScriptConfigType) => void;
  initialConfig: ScriptConfigType;
}

const ScriptConfig: React.FC<ScriptConfigProps> = ({ 
  scriptStats, 
  onSubmit,
  initialConfig 
}) => {
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

  return (
    <div className="space-y-6">
      <ScriptStatsCard scriptStats={scriptStats} />

      <div className="space-y-6">
        <BasicConfigControls 
          config={config}
          onConfigChange={handleInputChange}
        />
        
        <Separator />

        <FormatOptions 
          config={config}
          onConfigChange={handleInputChange}
        />
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
