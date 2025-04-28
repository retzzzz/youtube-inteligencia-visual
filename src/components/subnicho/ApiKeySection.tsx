
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Key } from 'lucide-react';

interface ApiKeySectionProps {
  youtubeApiKey: string | null;
  isNewKey: boolean;
  onChangeApiKey: () => void;
}

const ApiKeySection: React.FC<ApiKeySectionProps> = ({ 
  youtubeApiKey, 
  isNewKey,
  onChangeApiKey 
}) => {
  if (!youtubeApiKey) return null;
  
  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="text-sm text-muted-foreground">
          Usando chave API: {youtubeApiKey.substring(0, 5)}...{youtubeApiKey.substring(youtubeApiKey.length - 4)}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onChangeApiKey}
          >
            <Key className="h-3 w-3 mr-1" /> Alterar chave API
          </Button>
        </div>
      </div>
      
      {isNewKey && (
        <Alert className="mt-2 mb-4 bg-blue-50 border-blue-300">
          <Clock className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            <strong>Chave API recém-criada detectada!</strong> As chaves do Google Cloud podem levar alguns minutos para ativação completa. 
            Aguarde 5-15 minutos e tente novamente.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ApiKeySection;
