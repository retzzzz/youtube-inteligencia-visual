
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
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
} from '@/utils/microSubnicheAnalysis';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight } from "lucide-react";

const MicroSubnicheAnalyzer = () => {
  // Estados para configuração
  const [canalId, setCanalId] = useState<string>('');
  const [subnichoFrincipal, setSubnichoFrincipal] = useState<string>('');
  const [maxVideos, setMaxVideos] = useState<number>(10);
  const [periodoDias, setPeriodoDias] = useState<number>(7);
  const [frequencia, setFrequencia] = useState<string>('semanal');
  const [ciclos, setCiclos] = useState<number>(4);
  const [tituloBase, setTituloBase] = useState<string>('alcançar sucesso rápido');
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
            
            <TabsContent value="extract" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="canalId">ID do Canal</Label>
                  <Input
                    id="canalId"
                    placeholder="Ex: UCxxxxxxxYYY"
                    value={canalId}
                    onChange={(e) => setCanalId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subnichoFrincipal">Subnicho Principal</Label>
                  <Input
                    id="subnichoFrincipal"
                    placeholder="Ex: finanças pessoais"
                    value={subnichoFrincipal}
                    onChange={(e) => setSubnichoFrincipal(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxVideos">Número máximo de vídeos: {maxVideos}</Label>
                <input
                  type="range"
                  id="maxVideos"
                  min="5"
                  max="50"
                  step="5"
                  value={maxVideos}
                  onChange={(e) => setMaxVideos(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleExtrairMicroSubnichos}
                  disabled={isLoading}
                >
                  {isLoading ? "Extraindo..." : "Extrair Micro-Subnichos"}
                </Button>
              </div>
              
              {microSubnichos.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Micro-Subnichos Encontrados</h3>
                  <div className="space-y-4">
                    {microSubnichos.map((subnicho, index) => (
                      <Accordion 
                        key={`subnicho-${index}`}
                        type="single" 
                        collapsible
                        className="border rounded-md"
                      >
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="px-4">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">{subnicho.microsubnicho}</span>
                              <span className="text-sm text-muted-foreground">{subnicho.ocorrencias} ocorrências</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <h4 className="text-sm font-medium mb-2">Exemplos de Títulos:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {subnicho.titulos_exemplo.map((titulo, tIndex) => (
                                <li key={`titulo-${index}-${tIndex}`} className="text-sm text-muted-foreground">
                                  {titulo}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="evaluate" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="periodoDias">Período (dias): {periodoDias}</Label>
                <input
                  type="range"
                  id="periodoDias"
                  min="1"
                  max="30"
                  step="1"
                  value={periodoDias}
                  onChange={(e) => setPeriodoDias(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleAvaliarMicroSubnichos}
                  disabled={isLoading || microSubnichos.length === 0}
                >
                  {isLoading ? "Avaliando..." : "Avaliar Micro-Subnichos"}
                </Button>
              </div>
              
              {microSubnichosAvaliados.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Micro-Subnichos Avaliados</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Micro-Subnicho</TableHead>
                        <TableHead>Visualizações</TableHead>
                        <TableHead>Crescimento</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {microSubnichosAvaliados.map((subnicho, index) => (
                        <TableRow key={`avaliado-${index}`}>
                          <TableCell className="font-medium">{subnicho.microsubnicho}</TableCell>
                          <TableCell>{subnicho.total_visualizacoes.toLocaleString()}</TableCell>
                          <TableCell className={subnicho.growth_rate >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {subnicho.growth_rate >= 0 ? '+' : ''}{subnicho.growth_rate}%
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subnicho.status)}`}>
                              {subnicho.status.replace('_', ' ')}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommend" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topN">Quantidade de recomendações: {topN}</Label>
                <input
                  type="range"
                  id="topN"
                  min="1"
                  max="10"
                  step="1"
                  value={topN}
                  onChange={(e) => setTopN(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleRecomendarMicroSubnichos}
                  disabled={microSubnichosAvaliados.length === 0}
                >
                  Recomendar Micro-Subnichos
                </Button>
              </div>
              
              {microSubnichosRecomendados.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Micro-Subnichos Recomendados</h3>
                  <div className="space-y-4">
                    {microSubnichosRecomendados.map((subnicho, index) => (
                      <div 
                        key={`recomendado-${index}`}
                        className="border p-4 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">{subnicho.microsubnicho}</h4>
                          <Badge variant="secondary" className="ml-2">
                            +{subnicho.growth_rate}% crescimento
                          </Badge>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          {subnicho.insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="titles" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tituloBase">Título Base</Label>
                <Input
                  id="tituloBase"
                  placeholder="Ex: alcançar sucesso rápido"
                  value={tituloBase}
                  onChange={(e) => setTituloBase(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nVariacoes">Número de variações: {nVariacoes}</Label>
                <input
                  type="range"
                  id="nVariacoes"
                  min="1"
                  max="10"
                  step="1"
                  value={nVariacoes}
                  onChange={(e) => setNVariacoes(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleGerarTitulos}
                  disabled={microSubnichosRecomendados.length === 0}
                >
                  Gerar Títulos
                </Button>
              </div>
              
              {titulosGerados.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Títulos Gerados</h3>
                  <div className="space-y-2">
                    {titulosGerados.map((titulo, index) => (
                      <div 
                        key={`titulo-${index}`}
                        className="p-3 rounded-md border bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        {titulo}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="plan" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequencia">Frequência</Label>
                  <Select 
                    value={frequencia} 
                    onValueChange={setFrequencia}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="bisemanal">2x por semana</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ciclos">Ciclos: {ciclos}</Label>
                  <input
                    type="range"
                    id="ciclos"
                    min="1"
                    max="12"
                    step="1"
                    value={ciclos}
                    onChange={(e) => setCiclos(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handlePlanejarCiclo}
                  disabled={microSubnichosRecomendados.length === 0}
                >
                  Planejar Ciclo
                </Button>
              </div>
              
              {cronograma.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Cronograma de Publicações</h3>
                  <div className="space-y-4">
                    {cronograma.map((item, index) => (
                      <div 
                        key={`cronograma-${index}`}
                        className="border p-4 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{formatarData(item.data_publicacao)}</Badge>
                          <Badge>{item.microsubnicho}</Badge>
                        </div>
                        <h4 className="text-md font-medium">{item.titulo_sugerido}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MicroSubnicheAnalyzer;
