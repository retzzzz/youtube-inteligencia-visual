
import {
  MicroSubnicho,
  MicroSubnichoAvaliado,
  MicroSubnichoRecomendado,
  PlanejamentoCiclo
} from "@/utils/microSubnicheAnalysis";

export interface MicroSubnicheState {
  // Configuration states
  canalId: string;
  subnichoFrincipal: string;
  maxVideos: number;
  periodoDias: number;
  frequencia: string;
  ciclos: number;
  tituloBase: string;
  nVariacoes: number;
  topN: number;
  
  // Result states
  microSubnichos: MicroSubnicho[];
  microSubnichosAvaliados: MicroSubnichoAvaliado[];
  microSubnichosRecomendados: MicroSubnichoRecomendado[];
  titulosGerados: string[];
  cronograma: PlanejamentoCiclo[];
  
  // UI states
  isLoading: boolean;
  currentStep: number;
}

export type MicroSubnicheActions = {
  // Config setters
  setCanalId: (value: string) => void;
  setSubnichoFrincipal: (value: string) => void;
  setMaxVideos: (value: number) => void;
  setPeriodoDias: (value: number) => void;
  setFrequencia: (value: string) => void;
  setCiclos: (value: number) => void;
  setTituloBase: (value: string) => void;
  setNVariacoes: (value: number) => void;
  setTopN: (value: number) => void;
  
  // Action handlers
  handleExtrairMicroSubnichos: () => Promise<void>;
  handleAvaliarMicroSubnichos: () => Promise<void>;
  handleRecomendarMicroSubnichos: () => void;
  handleGerarTitulos: () => void;
  handlePlanejarCiclo: () => void;
  
  // Helper functions
  formatarData: (dataIso: string) => string;
  getStatusColor: (status: string) => string;
}

export type MicroSubnicheHookReturn = MicroSubnicheState & MicroSubnicheActions;
