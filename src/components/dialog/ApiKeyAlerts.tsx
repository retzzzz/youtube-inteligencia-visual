
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeyAlertsProps {
  error: string;
  warning: string;
}

const ApiKeyAlerts = ({ error, warning }: ApiKeyAlertsProps) => {
  return (
    <>
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {warning && (
        <Alert variant="default" className="py-2 border-yellow-500 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-xs">
            {warning}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ApiKeyAlerts;
