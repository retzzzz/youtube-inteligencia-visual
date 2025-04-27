
import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface NewKeyNoticeProps {
  isNewKey: boolean;
}

const NewKeyNotice = ({ isNewKey }: NewKeyNoticeProps) => {
  if (!isNewKey) return null;

  return (
    <Alert className="mt-6 bg-blue-50 border-blue-300">
      <Clock className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700">
        <strong>Chave API recém-criada detectada!</strong> As chaves do Google Cloud podem levar alguns minutos para ativação completa. 
        Se estiver recebendo erros, aguarde 5-10 minutos e tente novamente.
      </AlertDescription>
    </Alert>
  );
};

export default NewKeyNotice;
