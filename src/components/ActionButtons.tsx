
import { Button } from "@/components/ui/button";
import { VideoResult } from "@/types/youtube-types";
import { exportToCSV } from "@/services/youtube-mock";
import { Download, FileSpreadsheet, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable';
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
      // First, capture the KPIs and graphs
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
      
      // Create new PDF
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add dashboard image to PDF
      pdf.text("Relatório de Análise YouTube - YTOptimizer", 14, 10);
      pdf.setFontSize(10);
      pdf.text("Data do relatório: " + new Date().toLocaleDateString('pt-BR'), 14, 16);
      pdf.text(`Total de vídeos analisados: ${results.length}`, 14, 22);
      
      pdf.addImage(imgData, 'PNG', 10, 25, pdfWidth - 20, pdfHeight - 20);
      
      // Add summary results table
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Vídeos Emergentes e Nichos Promissores", 14, 10);
      
      // Sort by viral score for the PDF
      const sortedResults = [...results].sort((a, b) => b.viralScore - a.viralScore);
      
      const tableCol = [
        "Título", "Canal", "Visualizações", "Pontuação Viral", 
        "Nicho", "Idioma", "Idade", "CPM Est."
      ];
      
      const tableRows = sortedResults.slice(0, 20).map(item => [
        item.title.substring(0, 40) + (item.title.length > 40 ? "..." : ""),
        item.channel,
        item.views.toLocaleString('pt-BR'),
        item.viralScore.toString(),
        item.mainNiche || "Diversos",
        item.language,
        item.videoAge < 1 ? `${Math.round(item.videoAge * 24)}h` : `${Math.round(item.videoAge)}d`,
        "$" + item.estimatedCPM.toFixed(2)
      ]);
      
      pdf.setFontSize(8);
      pdf.text("* Exibindo até 20 resultados dos vídeos mais promissores", 14, 16);
      
      // Fix: Use the correct way to call autoTable with jsPDF
      // @ts-ignore - Using typecasting to access autoTable
      const autoTable = require('jspdf-autotable').default;
      autoTable(pdf, {
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
      
      // Save PDF
      pdf.save(`youtube-optimizer-${new Date().toLocaleDateString('pt-BR')}.pdf`);
      
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
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Exportar CSV
      </Button>
      
      <Button variant="default" onClick={handleExportPdf} disabled={isExporting}>
        {isExporting ? "Gerando PDF..." : (
          <>
            <File className="w-4 h-4 mr-2" />
            Exportar PDF
          </>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
