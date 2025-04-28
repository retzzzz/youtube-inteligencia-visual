
import React, { useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import TitleGeneratorContainer from "@/components/title-generator/TitleGeneratorContainer";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { 
  TitleData,
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes,
  TitleWithScore,
  TitlePattern,
  MultilingualTitle
} from '@/utils/titleAnalysis';
import { generateTitleVariations } from '@/utils/titleGeneration';
import { TitleVariations } from "@/utils/titleGeneration";
import { RecurrenceStructure, RecurrenceTrigger, PublicationSchedule as RecurrencePublicationSchedule } from "@/utils/titleRecurrence";
import { AudienceProfile, MicroSubnicho, PublicationSchedule as AudiencePublicationSchedule } from "@/utils/audienceAnalysis";

export interface TitleVariation {
  text: string;
  type: "dor" | "esperanca" | "curiosidade";
  saturation: "low" | "medium" | "high";
  language: "pt" | "es" | "en" | "fr";
  translations?: {
    text: string;
    language: "pt" | "es" | "en" | "fr";
  }[];
}

const TitleGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [titulosConcorrentes, setTitulosConcorrentes] = useState<TitleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();
  
  const [variacoesTitulo, setVariacoesTitulo] = useState<TitleVariations | null>(null);
  const [titulosSubnicho, setTitulosSubnicho] = useState<string[]>([]);
  const [titulosPriorizados, setTitulosPriorizados] = useState<TitleWithScore[]>([]);
  const [nicho, setNicho] = useState("");
  const [subnicho, setSubnicho] = useState("");
  const [minViews, setMinViews] = useState(500000);
  const [maxVideos, setMaxVideos] = useState(30);
  const [titulosVirais, setTitulosVirais] = useState<TitleData[]>([]);
  const [padroesTitulos, setPadroesTitulos] = useState<TitlePattern[]>([]);
  const [termosChave, setTermosChave] = useState("");
  const [titulosGerados, setTitulosGerados] = useState<string[]>([]);
  const [idiomasDestino, setIdiomasDestino] = useState<string[]>(["português"]);
  const [titulosMultilingues, setTitulosMultilingues] = useState<MultilingualTitle[]>([]);
  const [loadingVirais, setLoadingVirais] = useState(false);
  const [formatoCanal, setFormatoCanal] = useState("vlog");
  const [estruturasRecorrencia, setEstruturasRecorrencia] = useState<RecurrenceStructure[]>([]);
  const [gatilhosRecorrencia, setGatilhosRecorrencia] = useState<RecurrenceTrigger[]>([]);
  const [assuntoRecorrencia, setAssuntoRecorrencia] = useState("");
  const [titulosRecorrencia, setTitulosRecorrencia] = useState<string[]>([]);
  const [frequenciaPublicacao, setFrequenciaPublicacao] = useState("semanal");
  const [periodoCiclo, setPeriodoCiclo] = useState(28);
  const [cronogramaPublicacao, setCronogramaPublicacao] = useState<RecurrencePublicationSchedule[]>([]);
  const [loadingRecorrencia, setLoadingRecorrencia] = useState(false);
  const [audienceProfile, setAudienceProfile] = useState<AudienceProfile | null>(null);
  const [microSubnichos, setMicroSubnichos] = useState<MicroSubnicho[]>([]);
  const [titulosAdaptados, setTitulosAdaptados] = useState<string[]>([]);
  const [cronogramaAudiencia, setCronogramaAudiencia] = useState<AudiencePublicationSchedule[]>([]);
  const [loadingAudiencia, setLoadingAudiencia] = useState(false);

  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      const basicVariations = generateTitleVariations(keyword, language, emotion);
      setVariations(basicVariations);
      
      const structured = {
        emotional: basicVariations.filter(v => v.type === "dor").map(v => v.text),
        structural: basicVariations.filter(v => v.type === "esperanca").map(v => v.text),
        multilingual: basicVariations.filter(v => v.type === "curiosidade").map(v => v.text)
      };
      setVariacoesTitulo(structured);
      
      let titulos;
      if (youtubeApiKey) {
        titulos = await extrairTitulosConcorrentes(keyword, language, 30, youtubeApiKey);
      } else {
        titulos = simularExtrairTitulosConcorrentes(keyword, language, 30);
      }
      setTitulosConcorrentes(titulos);
      
      toast({
        title: "Títulos gerados com sucesso!",
        description: `${basicVariations.length} variações criadas baseadas em "${keyword}"`,
      });
    } catch (error) {
      console.error("Erro ao gerar títulos:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar os títulos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <TitleGeneratorContainer
          variations={variations}
          titulosConcorrentes={titulosConcorrentes}
          keyword={keyword}
          isLoading={isLoading}
          onGenerate={handleGenerateTitles}
          setVariations={setVariations}
          variacoesTitulo={variacoesTitulo}
          titulosSubnicho={titulosSubnicho}
          titulosPriorizados={titulosPriorizados}
          setVariacoesTitulo={setVariacoesTitulo}
          setTitulosSubnicho={setTitulosSubnicho}
          setTitulosPriorizados={setTitulosPriorizados}
          youtubeApiKey={youtubeApiKey}
          nicho={nicho}
          subnicho={subnicho}
          minViews={minViews}
          maxVideos={maxVideos}
          titulosVirais={titulosVirais}
          padroesTitulos={padroesTitulos}
          termosChave={termosChave}
          titulosGerados={titulosGerados}
          idiomasDestino={idiomasDestino}
          titulosMultilingues={titulosMultilingues}
          loadingVirais={loadingVirais}
          formatoCanal={formatoCanal}
          estruturasRecorrencia={estruturasRecorrencia}
          gatilhosRecorrencia={gatilhosRecorrencia}
          assuntoRecorrencia={assuntoRecorrencia}
          titulosRecorrencia={titulosRecorrencia}
          frequenciaPublicacao={frequenciaPublicacao}
          periodoCiclo={periodoCiclo}
          cronogramaPublicacao={cronogramaPublicacao}
          loadingRecorrencia={loadingRecorrencia}
          audienceProfile={audienceProfile}
          microSubnichos={microSubnichos}
          titulosAdaptados={titulosAdaptados}
          cronogramaAudiencia={cronogramaAudiencia}
          loadingAudiencia={loadingAudiencia}
          setNicho={setNicho}
          setSubnicho={setSubnicho}
          setMinViews={setMinViews}
          setMaxVideos={setMaxVideos}
          setTitulosVirais={setTitulosVirais}
          setPadroesTitulos={setPadroesTitulos}
          setTermosChave={setTermosChave}
          setTitulosGerados={setTitulosGerados}
          setIdiomasDestino={setIdiomasDestino}
          setTitulosMultilingues={setTitulosMultilingues}
          setLoadingVirais={setLoadingVirais}
          setFormatoCanal={setFormatoCanal}
          setEstruturasRecorrencia={setEstruturasRecorrencia}
          setGatilhosRecorrencia={setGatilhosRecorrencia}
          setAssuntoRecorrencia={setAssuntoRecorrencia}
          setTitulosRecorrencia={setTitulosRecorrencia}
          setFrequenciaPublicacao={setFrequenciaPublicacao}
          setPeriodoCiclo={setPeriodoCiclo}
          setCronogramaPublicacao={setCronogramaPublicacao}
          setLoadingRecorrencia={setLoadingRecorrencia}
          setAudienceProfile={setAudienceProfile}
          setMicroSubnichos={setMicroSubnichos}
          setTitulosAdaptados={setTitulosAdaptados}
          setCronogramaAudiencia={setCronogramaAudiencia}
          setLoadingAudiencia={setLoadingAudiencia}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default TitleGenerator;
