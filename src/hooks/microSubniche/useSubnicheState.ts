
import { useState } from "react";
import { MicroSubnicho, MicroSubnichoAvaliado, MicroSubnichoRecomendado, PlanejamentoCiclo } from "@/utils/microSubnicheAnalysis";

export const useSubnicheState = () => {
  // Configuration states
  const [canalId, setCanalId] = useState<string>("");
  const [subnichoFrincipal, setSubnichoFrincipal] = useState<string>("");
  const [maxVideos, setMaxVideos] = useState<number>(10);
  const [periodoDias, setPeriodoDias] = useState<number>(7);
  const [frequencia, setFrequencia] = useState<string>("semanal");
  const [ciclos, setCiclos] = useState<number>(4);
  const [tituloBase, setTituloBase] = useState<string>("alcançar sucesso rápido");
  const [nVariacoes, setNVariacoes] = useState<number>(5);
  const [topN, setTopN] = useState<number>(3);
  
  // Result states
  const [microSubnichos, setMicroSubnichos] = useState<MicroSubnicho[]>([]);
  const [microSubnichosAvaliados, setMicroSubnichosAvaliados] = useState<MicroSubnichoAvaliado[]>([]);
  const [microSubnichosRecomendados, setMicroSubnichosRecomendados] = useState<MicroSubnichoRecomendado[]>([]);
  const [titulosGerados, setTitulosGerados] = useState<string[]>([]);
  const [cronograma, setCronograma] = useState<PlanejamentoCiclo[]>([]);
  
  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  return {
    // States
    canalId, setCanalId,
    subnichoFrincipal, setSubnichoFrincipal,
    maxVideos, setMaxVideos,
    periodoDias, setPeriodoDias,
    frequencia, setFrequencia,
    ciclos, setCiclos,
    tituloBase, setTituloBase,
    nVariacoes, setNVariacoes,
    topN, setTopN,
    
    // Result states
    microSubnichos, setMicroSubnichos,
    microSubnichosAvaliados, setMicroSubnichosAvaliados,
    microSubnichosRecomendados, setMicroSubnichosRecomendados,
    titulosGerados, setTitulosGerados,
    cronograma, setCronograma,
    
    // UI states
    isLoading, setIsLoading,
    currentStep, setCurrentStep
  };
};
