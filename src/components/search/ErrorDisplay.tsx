
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

  return (
    <Alert variant="destructive" className="mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex justify-between items-center w-full">
        <div>
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
          {error.includes("chave foi criada recentemente") && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-2 whitespace-nowrap"
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
