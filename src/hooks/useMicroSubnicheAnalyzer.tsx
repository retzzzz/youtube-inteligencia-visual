
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  MicroSubnicho,
  MicroSubnichoAvaliado,
  MicroSubnichoRecomendado,
  PlanejamentoCiclo,
  extrairMicroSubnichos,
  avaliarMicroSubnichos,
  recomendarMicroSubnicho,
  gerarTitulosMicroSubnicho,
  planejarCicloMicroSubnicho
} from "@/utils/microSubnicheAnalysis";

export const useMicroSubnicheAnalyzer = () => {
  // Estados para configuração
  const [canalId, setCanalId] = useState<string>("");
  const [subnichoFrincipal, setSubnichoFrincipal] = useState<string>("");
  const [maxVideos, setMaxVideos] = useState<number>(10);
  const [periodoDias, setPeriodoDias] = useState<number>(7);
  const [frequencia, setFrequencia] = useState<string>("semanal");
  const [ciclos, setCiclos] = useState<number>(4);
  const [tituloBase, setTituloBase] = useState<string>("alcançar sucesso rápido");
  const [nVariacoes, setNVariacoes] = useState<number>(5);
  const [topN, setTopN] = useState<number>(3);
  
  // Estados para resultados
  const [microSubnichos, setMicroSubnichos] = useState<MicroSubnicho[]>([]);
  const [microSubnichosAvaliados, setMicroSubnichosAvaliados] = useState<MicroSubnichoAvaliado[]>([]);
  const [microSubnichosRecomendados, setMicroSubnichosRecomendados] = useState<MicroSubnichoRecomendado[]>([]);
  const [titulosGerados, setTitulosGerados] = useState<string[]>([]);
  const [cronograma, setCronograma] = useState<PlanejamentoCiclo[]>([]);
  
  // Estados para carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  // Extração de micro-subnichos
  const handleExtrairMicroSubnichos = async () => {
    if (!canalId || !subnichoFrincipal) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, informe o ID do canal e o subnicho principal.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const resultado = await extrairMicroSubnichos(
        canalId, 
        subnichoFrincipal, 
        maxVideos, 
        youtubeApiKey
      );
      
      setMicroSubnichos(resultado);
      setCurrentStep(2);
      
      toast({
        title: "Micro-subnichos extraídos",
        description: `Foram encontrados ${resultado.length} micro-subnichos.`,
      });
    } catch (error) {
      console.error("Erro ao extrair micro-subnichos:", error);
      toast({
        title: "Erro na extração",
        description: "Não foi possível extrair os micro-subnichos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Avaliação de micro-subnichos
  const handleAvaliarMicroSubnichos = async () => {
    if (microSubnichos.length === 0) {
      toast({
        title: "Micro-subnichos não encontrados",
        description: "Extraia os micro-subnichos primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const resultado = await avaliarMicroSubnichos(
        microSubnichos, 
        canalId, 
        periodoDias, 
        youtubeApiKey
      );
      
      setMicroSubnichosAvaliados(resultado);
      setCurrentStep(3);
      
      toast({
        title: "Micro-subnichos avaliados",
        description: `Foram avaliados ${resultado.length} micro-subnichos.`,
      });
    } catch (error) {
      console.error("Erro ao avaliar micro-subnichos:", error);
      toast({
        title: "Erro na avaliação",
        description: "Não foi possível avaliar os micro-subnichos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Recomendação de micro-subnichos
  const handleRecomendarMicroSubnichos = () => {
    if (microSubnichosAvaliados.length === 0) {
      toast({
        title: "Micro-subnichos não avaliados",
        description: "Avalie os micro-subnichos primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultado = recomendarMicroSubnicho(microSubnichosAvaliados, topN);
      
      setMicroSubnichosRecomendados(resultado);
      setCurrentStep(4);
      
      toast({
        title: "Micro-subnichos recomendados",
        description: `Foram recomendados ${resultado.length} micro-subnichos.`,
      });
    } catch (error) {
      console.error("Erro ao recomendar micro-subnichos:", error);
      toast({
        title: "Erro na recomendação",
        description: "Não foi possível recomendar os micro-subnichos.",
        variant: "destructive",
      });
    }
  };

  // Geração de títulos
  const handleGerarTitulos = () => {
    if (microSubnichosRecomendados.length === 0) {
      toast({
        title: "Micro-subnichos não recomendados",
        description: "Recomende os micro-subnichos primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Vamos gerar títulos para o primeiro micro-subnicho recomendado
      const microSubnicho = microSubnichosRecomendados[0].microsubnicho;
      const resultado = gerarTitulosMicroSubnicho(microSubnicho, tituloBase, nVariacoes);
      
      setTitulosGerados(resultado);
      setCurrentStep(5);
      
      toast({
        title: "Títulos gerados",
        description: `Foram gerados ${resultado.length} títulos para o micro-subnicho "${microSubnicho}".`,
      });
    } catch (error) {
      console.error("Erro ao gerar títulos:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar os títulos.",
        variant: "destructive",
      });
    }
  };

  // Planejamento do ciclo
  const handlePlanejarCiclo = () => {
    if (microSubnichosRecomendados.length === 0) {
      toast({
        title: "Micro-subnichos não recomendados",
        description: "Recomende os micro-subnichos primeiro.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultado = planejarCicloMicroSubnicho(microSubnichosRecomendados, frequencia, ciclos);
      
      setCronograma(resultado);
      
      toast({
        title: "Ciclo planejado",
        description: `Foi criado um cronograma com ${resultado.length} publicações.`,
      });
    } catch (error) {
      console.error("Erro ao planejar ciclo:", error);
      toast({
        title: "Erro no planejamento",
        description: "Não foi possível planejar o ciclo.",
        variant: "destructive",
      });
    }
  };

  // Formatar data
  const formatarData = (dataIso: string) => {
    const data = new Date(dataIso);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  // Função para determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_alta':
        return 'bg-green-100 text-green-800';
      case 'estavel':
        return 'bg-blue-100 text-blue-800';
      case 'em_queda':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    canalId,
    setCanalId,
    subnichoFrincipal,
    setSubnichoFrincipal,
    maxVideos,
    setMaxVideos,
    periodoDias,
    setPeriodoDias,
    frequencia,
    setFrequencia,
    ciclos,
    setCiclos,
    tituloBase,
    setTituloBase,
    nVariacoes,
    setNVariacoes,
    topN,
    setTopN,
    microSubnichos,
    microSubnichosAvaliados,
    microSubnichosRecomendados,
    titulosGerados,
    cronograma,
    isLoading,
    currentStep,
    handleExtrairMicroSubnichos,
    handleAvaliarMicroSubnichos,
    handleRecomendarMicroSubnichos,
    handleGerarTitulos,
    handlePlanejarCiclo,
    formatarData,
    getStatusColor
  };
};
