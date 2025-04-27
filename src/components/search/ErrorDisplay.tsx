
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string | null;
  onForceSearch: () => void;
  onRetry: () => void;
  onChangeApiKey: () => void;
}

const ErrorDisplay = ({ error, onForceSearch, onRetry, onChangeApiKey }: ErrorDisplayProps) => {
  if (!error) return null;
  
  const isNewKeyError = error.includes("chave foi criada recentemente") || 
                        error.includes("alguns minutos para ficar") ||
                        error.includes("recém-criada") ||
                        error.includes("ativar completamente");

  return (
    <Alert 
      variant={isNewKeyError ? "default" : "destructive"} 
      className={`mt-6 ${isNewKeyError ? "bg-blue-50 border-blue-300" : ""} shadow-md`}
    >
      {isNewKeyError ? (
        <Clock className="h-5 w-5 text-blue-600" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <AlertDescription className="flex justify-between items-center w-full">
        <div className={isNewKeyError ? "text-blue-700 font-medium" : ""}>
          <span>{error}</span>
        </div>
        <div className="flex gap-2">
          {error.includes("quota") && (
            <Button
              variant="outline"
              size="sm"
              onClick={onForceSearch}
              className="ml-2 whitespace-nowrap"
            >
              <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
              Tentar mesmo assim
            </Button>
          )}
          {isNewKeyError && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-2 whitespace-nowrap bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Clock className="h-3 w-3 mr-1 text-blue-500" />
              Tentar novamente
            </Button>
          )}
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

export default ErrorDisplay;
