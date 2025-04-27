
import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface NewKeyNoticeProps {
  isNewKey: boolean;
  onRetry?: () => void;
}

const NewKeyNotice = ({ isNewKey, onRetry }: NewKeyNoticeProps) => {
  if (!isNewKey) return null;

  return (
    <Alert className="mt-6 bg-blue-50 border-blue-300 shadow-md">
      <Clock className="h-5 w-5 text-blue-600" />
      <AlertDescription className="flex justify-between items-center w-full">
        <div className="text-blue-700 font-medium">
          <strong>Chave API recém-criada detectada!</strong> As chaves do Google Cloud podem levar 5-15 minutos para ativação completa. 
          Se estiver recebendo erros, aguarde alguns minutos e tente novamente.
        </div>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="ml-2 border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Clock className="h-3 w-3 mr-1" /> Tentar novamente
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default NewKeyNotice;
