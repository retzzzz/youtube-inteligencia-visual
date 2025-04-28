
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Text } from "lucide-react";

interface DownloadButtonsProps {
  blocks: Array<{ text: string }>;
  srtContent?: string;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ blocks, srtContent }) => {
  const { toast } = useToast();

  const downloadAsText = () => {
    const fullText = blocks.map(block => block.text).join("\n\n");
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roteiro.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "O arquivo de texto foi baixado com sucesso."
    });
  };

  const downloadSrt = () => {
    if (!srtContent) return;
    
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roteiro.srt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "O arquivo SRT foi baixado com sucesso."
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={downloadAsText}
      >
        <Text className="mr-2 h-4 w-4" />
        Baixar TXT
      </Button>
      
      {srtContent && (
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSrt}
        >
          <Download className="mr-2 h-4 w-4" />
          Baixar SRT
        </Button>
      )}
    </div>
  );
};

export default DownloadButtons;
