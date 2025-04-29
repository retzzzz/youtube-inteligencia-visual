
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CopyableTextProps {
  text: string;
  id: string;
  className?: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ text, id, className }) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-between">
      <div className={cn("flex-1", className)}>
        {text}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="h-8 ml-2"
      >
        {copiedId === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default CopyableText;
