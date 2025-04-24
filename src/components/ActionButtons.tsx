
import { Button } from "@/components/ui/button";
import { VideoResult } from "@/types/youtube-types";
import { exportToCSV } from "@/services/youtube-mock-service";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

interface ActionButtonsProps {
  results: VideoResult[];
}

const ActionButtons = ({ results }: ActionButtonsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  // Se não houver resultados, não renderizar botões
  if (!results.length) return null;
  
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
  
  const handleExportPdf = async () => {
    setIsExporting(true);
    toast({
      title: "Preparando PDF",
      description: "Aguarde enquanto criamos seu relatório..."
    });
    
    try {
      // Primeiro, capturar os KPIs e gráficos
      const dashboardElement = document.getElementById("dashboard-section");
      if (!dashboardElement) {
        throw new Error("Elemento do dashboard não encontrado");
      }
      
      // Capture a screenshot of the dashboard section
      const canvas = await html2canvas(dashboardElement, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      // Criar novo PDF
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Adicionar imagem do dashboard ao PDF
      pdf.text("Relatório de Análise YouTube", 14, 10);
      pdf.setFontSize(10);
      pdf.text("Data do relatório: " + new Date().toLocaleDateString('pt-BR'), 14, 16);
      pdf.text(`Total de vídeos analisados: ${results.length}`, 14, 22);
      
      pdf.addImage(imgData, 'PNG', 10, 25, pdfWidth - 20, pdfHeight - 20);
      
      // Adicionar tabela de resultados resumidos
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Dados Detalhados", 14, 10);
      
      const tableCol = ["Título", "Canal", "Visualizações", "Pontuação Viral", "CPM Est."];
      const tableRows = results.slice(0, 15).map(item => [
        item.title.substring(0, 30) + (item.title.length > 30 ? "..." : ""),
        item.channel,
        item.views.toLocaleString('pt-BR'),
        item.viralScore.toString(),
        "$" + item.estimatedCPM.toFixed(2)
      ]);
      
      pdf.setFontSize(8);
      pdf.text("* Exibindo até 15 resultados", 14, 16);
      
      pdf.autoTable({
        startY: 20,
        head: [tableCol],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [255, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        }
      });
      
      // Salvar PDF
      pdf.save(`youtube-analise-${new Date().toLocaleDateString('pt-BR')}.pdf`);
      
      toast({
        title: "PDF gerado com sucesso",
        description: "O relatório foi exportado em formato PDF."
      });
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-2 my-4">
      <Button variant="outline" onClick={handleExportCsv}>
        <Download className="w-4 h-4 mr-2" />
        Exportar CSV
      </Button>
      
      <Button variant="default" onClick={handleExportPdf} disabled={isExporting}>
        {isExporting ? "Gerando PDF..." : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
