
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeyAlertsProps {
  error: string;
  warning: string;
}

const ApiKeyAlerts = ({ error, warning }: ApiKeyAlertsProps) => {
  const isNewKeyWarning = warning.includes("nova") || warning.includes("recém-criada");
  
  return (
    <>
      {error && (
        <Alert variant="destructive" className="py-2 shadow-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {warning && (
        <Alert 
          variant="default" 
          className={`py-2 ${isNewKeyWarning 
            ? "border-blue-400 bg-blue-50" 
            : "border-yellow-500 bg-yellow-50"} shadow-md`}
        >
          {isNewKeyWarning ? (
            <Clock className="h-4 w-4 text-blue-500" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
          <AlertDescription className={`text-sm ${isNewKeyWarning ? "text-blue-700" : "text-yellow-700"}`}>
            <strong>{isNewKeyWarning ? "Chave nova detectada: " : "Atenção: "}</strong>
            {warning}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ApiKeyAlerts;
