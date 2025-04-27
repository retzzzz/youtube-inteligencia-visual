
import React from "react";
import { RefreshCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyInputProps {
  apiKey: string;
  isValidating: boolean;
  onChange: (value: string) => void;
}

const ApiKeyInput = ({ apiKey, isValidating, onChange }: ApiKeyInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="api-key" className="flex items-center justify-between">
        Chave da API do YouTube
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => onChange("")}
          disabled={isValidating || !apiKey}
          title="Limpar"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Limpar</span>
        </Button>
      </Label>
      <Input 
        id="api-key" 
        value={apiKey} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder="AIzaSyC..."
        disabled={isValidating}
      />
    </div>
  );
};

export default ApiKeyInput;
