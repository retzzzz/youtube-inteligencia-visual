
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorAlertProps {
  error: string | null;
  onRetry: () => void;
  onChangeApiKey: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  onRetry, 
  onChangeApiKey 
}) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mt-2 mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex justify-between items-center w-full">
        <div>
          <span>{error}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-2 whitespace-nowrap"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Tentar novamente
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onChangeApiKey}
            className="ml-2 whitespace-nowrap"
          >
            Configurar nova chave
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
