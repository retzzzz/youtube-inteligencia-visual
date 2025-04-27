
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
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
            className="w-full"
          >
            {isValidating ? "Validando..." : "Validar e Salvar"}
          </Button>
          
          {warning && warning.includes("quota") && (
            <Button 
              onClick={handleForceValidation}
              disabled={isValidating}
              variant="outline"
              className="w-full"
            >
              Verificar novamente
            </Button>
          )}
        </div>
      }
    >
      <ApiKeyInstructions />
      
      <div className="space-y-2">
        <ApiKeyInput 
          apiKey={apiKey}
          isValidating={isValidating}
          onChange={handleApiKeyChange}
        />
        
        <ApiKeyAlerts error={error} warning={warning} />
      </div>

      <RememberKeyCheckbox 
        checked={rememberKey}
        onCheckedChange={setRememberKey}
      />
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Importante:</strong> Uma chave de API do YouTube válida é OBRIGATÓRIA para usar esta ferramenta. Não é possível prosseguir sem configurar uma chave válida.
        </AlertDescription>
      </Alert>
    </BaseDialog>
  );
};

export default ApiKeyDialog;
