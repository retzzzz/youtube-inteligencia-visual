
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ScriptBlock } from "@/hooks/useScriptGenerator";

interface DownloadButtonsProps {
  blocks: ScriptBlock[];
  srtContent?: string;
  remodeledScript?: {
    title?: string;
    hook?: string;
    introduction?: string;
    conclusion?: string;
  };
}

const DownloadButtons = ({ blocks, srtContent, remodeledScript }: DownloadButtonsProps) => {
  const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadScript = () => {
    let content = "";
    
    if (remodeledScript) {
      // Roteiro remodelado
      content += `TÍTULO: ${remodeledScript.title || ""}\n\n`;
      content += `HOOK: ${remodeledScript.hook || ""}\n\n`;
      content += `INTRODUÇÃO: ${remodeledScript.introduction || ""}\n\n`;
      
      blocks.forEach((block, index) => {
        content += `BLOCO ${index + 1}:\n${block.text}\n`;
        if (block.mini_cta) {
          content += `MINI-CTA: ${block.mini_cta}\n`;
        }
        content += "\n";
      });
      
      content += `CONCLUSÃO: ${remodeledScript.conclusion || ""}\n`;
    } else {
      // Roteiro simples
      blocks.forEach((block, index) => {
        content += `BLOCO ${index + 1}:\n${block.text}\n\n`;
      });
    }
    
    downloadTextFile(content, "roteiro.txt");
  };

  const handleDownloadSrt = () => {
    if (srtContent) {
      downloadTextFile(srtContent, "legendas.srt");
    }
  };
  
  const handleDownloadJson = () => {
    if (!remodeledScript) return;
    
    const jsonData = {
      titulo: remodeledScript.title,
      hook: remodeledScript.hook,
      introducao: remodeledScript.introduction,
      blocos: blocks.map((block) => ({
        texto: block.text,
        mini_cta: block.mini_cta || ""
      })),
      conclusao: remodeledScript.conclusion,
      stats: {
        caracteres_com_espacos: blocks.reduce((acc, block) => acc + block.text.length, 0),
        caracteres_sem_espacos: blocks.reduce((acc, block) => acc + block.text.replace(/\s/g, "").length, 0),
        palavras: blocks.reduce((acc, block) => acc + block.text.split(/\s+/).filter(Boolean).length, 0),
        duracao_min: Math.round(blocks.reduce((acc, block) => acc + block.text.split(/\s+/).filter(Boolean).length, 0) / 150)
      }
    };
    
    const content = JSON.stringify(jsonData, null, 2);
    downloadTextFile(content, "roteiro.json");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadScript}
        className="flex items-center"
      >
        <Download className="h-4 w-4 mr-2" />
        Baixar TXT
      </Button>

      {srtContent && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadSrt}
          className="flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar SRT
        </Button>
      )}
      
      {remodeledScript && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadJson}
          className="flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Baixar JSON
        </Button>
      )}
    </div>
  );
};

export default DownloadButtons;
