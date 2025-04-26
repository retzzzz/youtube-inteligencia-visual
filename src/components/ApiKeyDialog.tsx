
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

const ApiKeyDialog = () => {
  const { needsApiKey, setYoutubeApiKey } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setError("Por favor, insira uma chave de API válida");
      return;
    }
    
    setYoutubeApiKey(apiKey.trim());
  };

  return (
    <Dialog open={needsApiKey} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurar API do YouTube</DialogTitle>
          <DialogDescription>
            Para utilizar todas as funcionalidades, é necessário uma chave de API do YouTube Data v3.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Como obter sua chave de API:
            </p>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li>Acesse o <a 
                href="https://console.developers.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline inline-flex items-center"
              >
                Console de Desenvolvedores do Google <ExternalLink className="h-3 w-3 ml-1" />
              </a></li>
              <li>Crie um novo projeto ou selecione um existente</li>
              <li>No menu lateral, clique em "APIs e Serviços" &gt; "Biblioteca"</li>
              <li>Pesquise por "YouTube Data API v3" e ative-a</li>
              <li>Crie uma credencial do tipo "Chave de API"</li>
              <li>Copie a chave e cole abaixo</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">Chave da API do YouTube</Label>
            <Input 
              id="api-key" 
              value={apiKey} 
              onChange={(e) => {
                setApiKey(e.target.value);
                setError("");
              }} 
              placeholder="AIzaSyC..."
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveApiKey}>Salvar e Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
