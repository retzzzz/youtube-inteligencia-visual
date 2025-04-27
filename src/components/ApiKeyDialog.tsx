
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Key, ShieldCheck } from "lucide-react";
import BaseDialog from "./common/BaseDialog";
import ApiKeyInstructions from "./dialog/ApiKeyInstructions";
import ApiKeyInput from "./dialog/ApiKeyInput";
import ApiKeyAlerts from "./dialog/ApiKeyAlerts";
import RememberKeyCheckbox from "./dialog/RememberKeyCheckbox";
import { useApiKeyValidation } from "@/hooks/useApiKeyValidation";

const ApiKeyDialog = () => {
  const { needsApiKey, setNeedsApiKey, youtubeApiKey, setYoutubeApiKey } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(true);
  
  const {
    isValidating,
    error,
    warning,
    validateAndSaveApiKey,
    forceValidation,
    clearValidationState
  } = useApiKeyValidation((validatedKey) => {
    setYoutubeApiKey(validatedKey);
    setNeedsApiKey(false);
  });

  useEffect(() => {
    if (youtubeApiKey && needsApiKey) {
      setApiKey(youtubeApiKey);
    }
  }, [youtubeApiKey, needsApiKey]);

  const handleValidateAndSaveApiKey = () => {
    validateAndSaveApiKey(apiKey, rememberKey);
  };

  const handleForceValidation = () => {
    forceValidation(apiKey, rememberKey);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    clearValidationState();
  };

  return (
    <BaseDialog
      open={needsApiKey}
      onOpenChange={setNeedsApiKey}
      title="Configurar API do YouTube"
      description="Para usar o YTAnalyzer, você precisa configurar sua chave de API do YouTube Data v3."
      footer={
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleValidateAndSaveApiKey} 
            disabled={isValidating}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <ShieldCheck className="mr-2 h-4 w-4" />
            {isValidating ? "Validando..." : "Validar e Salvar"}
          </Button>
          
          {warning && warning.includes("quota") && (
            <Button 
              onClick={handleForceValidation}
              disabled={isValidating}
              variant="outline"
              className="w-full hover:bg-primary/10 transition-colors duration-300"
            >
              <Key className="mr-2 h-4 w-4" />
              Verificar novamente
            </Button>
          )}
        </div>
      }
    >
      <ApiKeyInstructions />
      
      <div className="space-y-4">
        <ApiKeyInput 
          apiKey={apiKey}
          isValidating={isValidating}
          onChange={handleApiKeyChange}
        />
        
        <ApiKeyAlerts error={error} warning={warning} />
      </div>

      <div className="my-6">
        <RememberKeyCheckbox 
          checked={rememberKey}
          onCheckedChange={setRememberKey}
        />
      </div>
      
      <Alert variant="destructive" className="rounded-xl shadow-md border-red-300 bg-red-50/50 backdrop-blur-sm text-red-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Importante:</strong> Uma chave de API do YouTube válida é OBRIGATÓRIA para usar esta ferramenta. Não é possível prosseguir sem configurar uma chave válida.
        </AlertDescription>
      </Alert>
    </BaseDialog>
  );
};

export default ApiKeyDialog;
