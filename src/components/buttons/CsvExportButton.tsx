
import { Button } from "@/components/ui/button";
import { VideoResult } from "@/types/youtube-types";
import { exportToCSV } from "@/services/youtube-mock";
import { FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CsvExportButtonProps {
  results: VideoResult[];
}

const CsvExportButton = ({ results }: CsvExportButtonProps) => {
  const { toast } = useToast();

  const handleExportCsv = () => {
    try {
      exportToCSV(results);
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados para CSV com sucesso."
      });
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados para CSV.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleExportCsv}>
      <FileSpreadsheet className="w-4 h-4 mr-2" />
      Exportar CSV
    </Button>
  );
};

export default CsvExportButton;
