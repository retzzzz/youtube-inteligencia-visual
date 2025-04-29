
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { analyzeScriptNiche, estimateOptimalBlocksCount, estimateOptimalCharsPerBlock, identifyScriptTone } from "@/utils/script-niche-analyzer";
import { ScriptStats, ScriptBlock, ScriptConfig, ProcessedScript } from "./script-generator/types";
import { calculateScriptStats } from "@/utils/script-utils/script-analyzer";
import { processScript } from "@/utils/script-utils/script-processor";

export { ScriptStats, ScriptBlock, ScriptConfig, ProcessedScript };

export const useScriptGenerator = () => {
  const [scriptText, setScriptText] = useState<string>("");
  const [scriptStats, setScriptStats] = useState<ScriptStats | null>(null);
  const [scriptConfig, setScriptConfig] = useState<ScriptConfig>({
    blocks: 8,
    charactersPerBlock: 400,
    targetDuration: 5,
    ctaStyle: null,
    generateMasterPrompt: false,
    generateImagePrompts: false,
    convertToSrt: false,
    processingType: "simple",
    language: "pt"
  });
  const [processedScript, setProcessedScript] = useState<ProcessedScript | null>(null);
  const [currentStep, setCurrentStep] = useState<"input" | "config" | "output">("input");
  const { toast } = useToast();

  const handleScriptInput = (text: string) => {
    setScriptText(text);
    const stats = calculateScriptStats(text);
    setScriptStats(stats);
    
    const nicheInfo = analyzeScriptNiche(text);
    
    const optimalBlocks = estimateOptimalBlocksCount(text);
    
    const optimalCharsPerBlock = estimateOptimalCharsPerBlock(text, optimalBlocks);
    
    const predominantTone = identifyScriptTone(text);
    
    setScriptConfig(prev => ({
      ...prev,
      blocks: optimalBlocks,
      charactersPerBlock: optimalCharsPerBlock,
      ctaStyle: predominantTone,
      autoIdentifiedNiche: nicheInfo
    }));
    
    setCurrentStep("config");
    
    toast({
      title: "Texto recebido!",
      description: `${stats.words} palavras, ${stats.charactersWithSpaces} caracteres.`,
    });
  };

  const handleConfigSubmit = (config: ScriptConfig) => {
    setScriptConfig(config);
    const processed = processScript(scriptText, config);
    setProcessedScript(processed);
    setCurrentStep("output");
    
    toast({
      title: config.processingType === "remodel" ? "Roteiro remodelado!" : "Roteiro processado!",
      description: `Roteiro dividido em ${processed.blocks.length} blocos.`,
    });
  };

  return {
    scriptText,
    scriptStats,
    scriptConfig,
    processedScript,
    currentStep,
    setCurrentStep,
    handleScriptInput,
    handleConfigSubmit
  };
};
