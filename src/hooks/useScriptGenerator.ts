
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface ScriptStats {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
}

export interface ScriptBlock {
  text: string;
  imagePrompt?: string;
}

export interface ScriptConfig {
  blocks: number;
  charactersPerBlock: number;
  targetDuration: number;
  ctaStyle: "emocional" | "apelativo" | "reflexivo" | null;
  generateMasterPrompt: boolean;
  generateImagePrompts: boolean;
  convertToSrt: boolean;
}

export interface ProcessedScript {
  originalText: string;
  blocks: ScriptBlock[];
  stats: ScriptStats;
  masterPrompt?: string;
  srtContent?: string;
}

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
  });
  const [processedScript, setProcessedScript] = useState<ProcessedScript | null>(null);
  const [currentStep, setCurrentStep] = useState<"input" | "config" | "output">("input");
  const { toast } = useToast();

  const handleScriptInput = (text: string) => {
    setScriptText(text);
    const stats = calculateScriptStats(text);
    setScriptStats(stats);
    setCurrentStep("config");
    
    toast({
      title: "Texto recebido!",
      description: `${stats.words} palavras, ${stats.charactersWithSpaces} caracteres.`,
    });
  };

  const calculateScriptStats = (text: string): ScriptStats => {
    return {
      charactersWithSpaces: text.length,
      charactersWithoutSpaces: text.replace(/\s/g, "").length,
      words: text.split(/\s+/).filter(word => word.length > 0).length,
      lines: text.split(/\r\n|\r|\n/).length,
    };
  };

  const handleConfigSubmit = (config: ScriptConfig) => {
    setScriptConfig(config);
    const processed = processScript(scriptText, config);
    setProcessedScript(processed);
    setCurrentStep("output");
    
    toast({
      title: "Roteiro processado!",
      description: `Roteiro dividido em ${processed.blocks.length} blocos.`,
    });
  };

  const processScript = (text: string, config: ScriptConfig): ProcessedScript => {
    // Dividir o texto em blocos com base na configuração
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const blocksCount = config.blocks;
    const wordsPerBlock = Math.ceil(words.length / blocksCount);
    
    const blocks: ScriptBlock[] = [];
    
    for (let i = 0; i < blocksCount; i++) {
      const startIdx = i * wordsPerBlock;
      const endIdx = Math.min(startIdx + wordsPerBlock, words.length);
      
      if (startIdx >= words.length) break;
      
      const blockText = words.slice(startIdx, endIdx).join(" ");
      
      blocks.push({
        text: blockText,
        imagePrompt: config.generateImagePrompts 
          ? generateImagePrompt(blockText) 
          : undefined
      });
    }
    
    // Se solicitado, adicionar CTA ao final
    if (config.ctaStyle) {
      const ctaText = generateCTA(config.ctaStyle);
      blocks.push({
        text: ctaText,
        imagePrompt: config.generateImagePrompts 
          ? "Professional content creator speaking directly to camera, warm lighting, emotional connection, call to action moment" 
          : undefined
      });
    }
    
    // Gerar SRT se solicitado
    let srtContent: string | undefined = undefined;
    if (config.convertToSrt) {
      srtContent = convertToSrt(blocks);
    }
    
    return {
      originalText: text,
      blocks: blocks,
      stats: calculateScriptStats(text),
      masterPrompt: config.generateMasterPrompt 
        ? generateMasterPrompt(text) 
        : undefined,
      srtContent: srtContent
    };
  };

  const generateCTA = (style: "emocional" | "apelativo" | "reflexivo"): string => {
    switch(style) {
      case "emocional":
        return "E aí, essa história tocou seu coração? Se você também já passou por algo parecido, compartilhe sua experiência nos comentários. Sua história pode inspirar outras pessoas que estão passando pelo mesmo. Não se esqueça de se inscrever no canal e ativar o sininho para mais conteúdos que vão tocar sua alma.";
      case "apelativo":
        return "CLIQUE JÁ no botão de inscrição e ative o sininho! AGORA é a hora de você fazer parte dessa comunidade incrível. Deixe seu LIKE e COMENTE o que achou! Seus comentários me motivam a continuar trazendo mais conteúdos como esse. COMPARTILHE com seus amigos, eles PRECISAM ver isso!";
      case "reflexivo":
        return "Antes de encerrarmos, quero que você reflita: como essa mensagem se conecta com sua própria jornada? Talvez haja uma razão para você estar assistindo este vídeo exatamente agora. Se esse conteúdo te fez pensar, considere se inscrever para continuarmos essa conversa. Obrigado por dedicar seu tempo aqui.";
      default:
        return "";
    }
  };

  const generateImagePrompt = (text: string): string => {
    // Simplificado para demonstração
    const keywords = text
      .split(' ')
      .filter(word => word.length > 3)
      .slice(0, 5)
      .join(', ');
    
    return `Cinematic scene, emotional storytelling, high quality, professional lighting, ${keywords}, 4k detailed image`;
  };

  const generateMasterPrompt = (text: string): string => {
    // Análise simplificada do texto para gerar um prompt mestre
    const isPositive = text.match(/feliz|alegr|sorri|conquist|supera|venc/gi);
    const isNegative = text.match(/trist|dor|sofr|perda|lut|difícil/gi);
    const isNeutral = !isPositive && !isNegative;
    
    if (isPositive) {
      return "Cinematic documentary style, warm vibrant colors, soft natural lighting, motivated characters, emotional intimate moments, depth of field, believable environments, hope and triumph theme, professional videography quality";
    } else if (isNegative) {
      return "Cinematic documentary style, muted colors, dramatic lighting with shadows, reflective mood, emotional weight, realistic environments, struggle and resilience theme, professional videography quality";
    } else {
      return "Cinematic documentary style, balanced lighting, natural color palette, authentic environments, storytelling moments, emotional connection, professional videography quality";
    }
  };

  const convertToSrt = (blocks: ScriptBlock[]): string => {
    // Implementação simplificada de conversão para SRT
    let srt = "";
    let index = 1;
    let currentTime = 0;
    
    blocks.forEach(block => {
      // Estima 10 segundos por bloco para este exemplo
      const startTime = formatSrtTime(currentTime);
      currentTime += 10;
      const endTime = formatSrtTime(currentTime);
      
      srt += `${index}\n${startTime} --> ${endTime}\n${block.text}\n\n`;
      index++;
    });
    
    return srt;
  };

  const formatSrtTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };

  return {
    scriptText,
    setScriptText,
    scriptStats,
    scriptConfig,
    processedScript,
    currentStep,
    setCurrentStep,
    handleScriptInput,
    handleConfigSubmit
  };
};
