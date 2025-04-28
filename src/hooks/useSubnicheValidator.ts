
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  extrairSubnichos,
  calcularMetricasSubnicho,
  validarSubnicho,
  priorizarSubniches,
  CriteriosValidacao,
  SubnichoPriorizado
} from '@/utils/subnicho-analysis';

export function useSubnicheValidator() {
  const [nicho, setNicho] = useState<string>('');
  const [idioma, setIdioma] = useState<string>('português');
  const [maxCanais, setMaxCanais] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subnichesPriorizados, setSubnichesPriorizados] = useState<SubnichoPriorizado[]>([]);
  const [minTaxaCrescimento, setMinTaxaCrescimento] = useState<number>(10);
  const [minMediaVisualizacoes, setMinMediaVisualizacoes] = useState<number>(5000);
  const [maxIdadeMediaCanais, setMaxIdadeMediaCanais] = useState<number>(30);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isNewKey, setIsNewKey] = useState<boolean>(false);
  
  const { toast } = useToast();
  const { youtubeApiKey, setNeedsApiKey } = useAuth();

  const handleValidateSubniches = async () => {
    if (!nicho) {
      toast({
        title: "Nicho obrigatório",
        description: "Por favor, informe o nicho principal.",
        variant: "destructive",
      });
      return;
    }

    if (!youtubeApiKey) {
      toast({
        title: "API Key necessária",
        description: "Configure sua chave da API do YouTube nas configurações.",
        variant: "destructive",
      });
      setNeedsApiKey(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsNewKey(false);
    
    try {
      setCurrentStep(0);
      const canaisPromissores = await extrairSubnichos(nicho, idioma, maxCanais, youtubeApiKey);
      
      setCurrentStep(1);
      const subnichos = canaisPromissores;
      
      setCurrentStep(2);
      const criterios: CriteriosValidacao = {
        min_taxa_crescimento: minTaxaCrescimento,
        min_media_visualizacoes: minMediaVisualizacoes,
        max_idade_media_canais: maxIdadeMediaCanais
      };
      
      const subnichos_validados = validarSubnicho(calcularMetricasSubnicho(subnichos), criterios);
      
      setCurrentStep(3);
      const recomendacoes = priorizarSubniches(subnichos_validados);
      
      setSubnichesPriorizados(recomendacoes);
      
      toast({
        title: "Análise concluída!",
        description: `Foram analisados ${canaisPromissores.length} canais e identificados ${recomendacoes.length} subnichos promissores.`,
      });
    } catch (error) {
      console.error("Erro ao validar subnichos:", error);
      
      let errorMessage = "Não foi possível completar a análise de subnichos.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Verificar se é um erro relacionado a chaves API novas
        if (errorMessage.includes("chave foi criada recentemente") || 
            errorMessage.includes("minutos para") || 
            errorMessage.includes("nova")) {
          setIsNewKey(true);
        }
      }
      
      setError(errorMessage);
      
      toast({
        title: "Erro na análise",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeApiKey = () => {
    setNeedsApiKey(true);
  };

  const handleRetry = () => {
    handleValidateSubniches();
  };

  return {
    nicho,
    setNicho,
    idioma,
    setIdioma,
    maxCanais,
    setMaxCanais,
    isLoading,
    subnichesPriorizados,
    minTaxaCrescimento,
    setMinTaxaCrescimento,
    minMediaVisualizacoes,
    setMinMediaVisualizacoes,
    maxIdadeMediaCanais,
    setMaxIdadeMediaCanais,
    currentStep,
    error,
    isNewKey,
    youtubeApiKey,
    handleValidateSubniches,
    handleChangeApiKey,
    handleRetry
  };
}
