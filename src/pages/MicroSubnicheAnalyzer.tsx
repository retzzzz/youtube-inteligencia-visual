
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { useMicroSubnicheAnalyzer } from '@/hooks/useMicroSubnicheAnalyzer';
import ExtrairTab from '@/components/microSubniches/ExtrairTab';
import AvaliarTab from '@/components/microSubniches/AvaliarTab';
import RecomendarTab from '@/components/microSubniches/RecomendarTab';
import TitulosTab from '@/components/microSubniches/TitulosTab';
import PlanejamentoTab from '@/components/microSubniches/PlanejamentoTab';

const MicroSubnicheAnalyzer = () => {
  const {
    canalId, setCanalId,
    subnichoFrincipal, setSubnichoFrincipal,
    maxVideos, setMaxVideos,
    periodoDias, setPeriodoDias,
    frequencia, setFrequencia,
    ciclos, setCiclos,
    tituloBase, setTituloBase,
    nVariacoes, setNVariacoes,
    topN, setTopN,
    microSubnichos,
    microSubnichosAvaliados,
    microSubnichosRecomendados,
    titulosGerados,
    cronograma,
    isLoading,
    handleExtrairMicroSubnichos,
    handleAvaliarMicroSubnichos,
    handleRecomendarMicroSubnichos,
    handleGerarTitulos,
    handlePlanejarCiclo,
    formatarData,
    getStatusColor
  } = useMicroSubnicheAnalyzer();

  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-6">
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Análise de Micro-Subnichos</h1>
          
          <p className="mb-6 text-muted-foreground">
            Identifique, avalie e planeje conteúdo baseado nos micro-subnichos mais promissores.
          </p>
          
          <Tabs defaultValue="extract" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="extract">1. Extrair</TabsTrigger>
              <TabsTrigger value="evaluate">2. Avaliar</TabsTrigger>
              <TabsTrigger value="recommend">3. Recomendar</TabsTrigger>
              <TabsTrigger value="titles">4. Gerar Títulos</TabsTrigger>
              <TabsTrigger value="plan">5. Planejar Ciclo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="extract">
              <ExtrairTab 
                canalId={canalId}
                setCanalId={setCanalId}
                subnichoFrincipal={subnichoFrincipal}
                setSubnichoFrincipal={setSubnichoFrincipal}
                maxVideos={maxVideos}
                setMaxVideos={setMaxVideos}
                microSubnichos={microSubnichos}
                isLoading={isLoading}
                handleExtrairMicroSubnichos={handleExtrairMicroSubnichos}
              />
            </TabsContent>
            
            <TabsContent value="evaluate">
              <AvaliarTab 
                periodoDias={periodoDias}
                setPeriodoDias={setPeriodoDias}
                microSubnichos={microSubnichos}
                microSubnichosAvaliados={microSubnichosAvaliados}
                isLoading={isLoading}
                handleAvaliarMicroSubnichos={handleAvaliarMicroSubnichos}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            
            <TabsContent value="recommend">
              <RecomendarTab 
                topN={topN}
                setTopN={setTopN}
                microSubnichosAvaliados={microSubnichosAvaliados}
                microSubnichosRecomendados={microSubnichosRecomendados}
                handleRecomendarMicroSubnichos={handleRecomendarMicroSubnichos}
              />
            </TabsContent>
            
            <TabsContent value="titles">
              <TitulosTab 
                tituloBase={tituloBase}
                setTituloBase={setTituloBase}
                nVariacoes={nVariacoes}
                setNVariacoes={setNVariacoes}
                microSubnichosRecomendados={microSubnichosRecomendados}
                titulosGerados={titulosGerados}
                handleGerarTitulos={handleGerarTitulos}
              />
            </TabsContent>
            
            <TabsContent value="plan">
              <PlanejamentoTab 
                frequencia={frequencia}
                setFrequencia={setFrequencia}
                ciclos={ciclos}
                setCiclos={setCiclos}
                microSubnichosRecomendados={microSubnichosRecomendados}
                cronograma={cronograma}
                handlePlanejarCiclo={handlePlanejarCiclo}
                formatarData={formatarData}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MicroSubnicheAnalyzer;
