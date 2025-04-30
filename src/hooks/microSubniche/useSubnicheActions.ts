
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  extrairMicroSubnichos,
  avaliarMicroSubnichos,
  recomendarMicroSubnicho,
  gerarTitulosMicroSubnicho,
  planejarCicloMicroSubnicho
} from "@/utils/microSubnicheAnalysis";

export const useSubnicheActions = (state: any) => {
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();
  
  const {
    canalId, subnichoFrincipal, maxVideos, periodoDias,
    frequencia, ciclos, tituloBase, nVariacoes, topN,
    
    setMicroSubnichos, setMicroSubnichosAvaliados,
    setMicroSubnichosRecomendados, setTitulosGerados, setCronograma,
    
    setIsLoading, setCurrentStep,
    
    microSubnichos, microSubnichosAvaliados, microSubnichosRecomendados
  } = state;

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

  return {
    handleExtrairMicroSubnichos,
    handleAvaliarMicroSubnichos,
    handleRecomendarMicroSubnichos,
    handleGerarTitulos,
    handlePlanejarCiclo,
  };
};
