
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import LanguageSelector from '@/components/LanguageSelector';
import TitleVariations from '@/components/TitleVariations';

import {
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes,
  avaliarEPriorizarTitulos,
  TitleData,
  TitleWithScore
} from '@/utils/titleAnalysis';

import {
  gerarVariacoesTitulo,
  gerarVariacoesEstruturadas,
  subnichearTitulos,
  TitleVariations as TitleVariationsType
} from '@/utils/titleGeneration';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const TitleAnalyzer = () => {
  // Estados para configuração
  const [subnicho, setSubnicho] = useState<string>('');
  const [idioma, setIdioma] = useState<string>('português');
  const [maxVideos, setMaxVideos] = useState<number>(30);
  const [termosPrincipais, setTermosPrincipais] = useState<string>('');
  const [tituloOriginal, setTituloOriginal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estados para resultados
  const [titulosConcorrentes, setTitulosConcorrentes] = useState<TitleData[]>([]);
  const [variacoesTitulo, setVariacoesTitulo] = useState<TitleVariationsType | null>(null);
  const [titulosSubnicho, setTitulosSubnicho] = useState<string[]>([]);
  const [titulosPriorizados, setTitulosPriorizados] = useState<TitleWithScore[]>([]);
  
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  // Extração de títulos concorrentes
  const handleExtrairTitulos = async () => {
    if (!subnicho) {
      toast({
        title: "Subnicho obrigatório",
        description: "Por favor, informe o subnicho para análise.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let titulos;
      
      if (youtubeApiKey) {
        titulos = await extrairTitulosConcorrentes(subnicho, idioma, maxVideos, youtubeApiKey);
      } else {
        titulos = simularExtrairTitulosConcorrentes(subnicho, idioma, maxVideos);
        toast({
          title: "Modo simulação",
          description: "Configure sua chave da API do YouTube para dados reais.",
        });
      }
      
      setTitulosConcorrentes(titulos);
      
      if (titulos.length > 0) {
        toast({
          title: "Títulos extraídos",
          description: `Foram encontrados ${titulos.length} vídeos para análise.`,
        });
      } else {
        toast({
          title: "Nenhum título encontrado",
          description: "Tente outro subnicho ou idioma.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao extrair títulos:", error);
      toast({
        title: "Erro na extração",
        description: "Não foi possível extrair os títulos concorrentes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Geração de variações de título
  const handleGerarVariacoes = () => {
    if (!tituloOriginal) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, informe o título original para gerar variações.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const variacoes = gerarVariacoesEstruturadas(tituloOriginal);
      setVariacoesTitulo(variacoes);
      
      toast({
        title: "Variações geradas",
        description: `Foram geradas ${variacoes.emotional.length + variacoes.structural.length + variacoes.multilingual.length} variações de título.`,
      });
    } catch (error) {
      console.error("Erro ao gerar variações:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar as variações de título.",
        variant: "destructive",
      });
    }
  };

  // Geração de subnichos de título
  const handleSubnichearTitulos = () => {
    if (!tituloOriginal || !termosPrincipais) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, informe o título original e os termos principais.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const termos = termosPrincipais.split(',').map(termo => termo.trim());
      const titulos = subnichearTitulos(tituloOriginal, termos, idioma);
      setTitulosSubnicho(titulos);
      
      toast({
        title: "Subnichos gerados",
        description: `Foram gerados ${titulos.length} títulos subnichados.`,
      });
    } catch (error) {
      console.error("Erro ao subnichear títulos:", error);
      toast({
        title: "Erro na subnichagem",
        description: "Não foi possível gerar os títulos subnichados.",
        variant: "destructive",
      });
    }
  };

  // Avaliação e priorização de títulos
  const handleAvaliarTitulos = () => {
    if (titulosSubnicho.length === 0 && !variacoesTitulo) {
      toast({
        title: "Sem títulos para avaliar",
        description: "Gere variações ou subnichos de título primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    // Combinar todos os títulos gerados para avaliação
    let todosTitulos: string[] = [...titulosSubnicho];
    
    if (variacoesTitulo) {
      todosTitulos = [
        ...todosTitulos,
        ...variacoesTitulo.emotional,
        ...variacoesTitulo.structural,
        ...variacoesTitulo.multilingual
      ];
    }
    
    // Se não temos concorrentes, usamos dados simulados
    const concorrentes = titulosConcorrentes.length > 0 
      ? titulosConcorrentes 
      : simularExtrairTitulosConcorrentes(subnicho, idioma, 10);
    
    const criterios = {
      max_repeticoes: 3,
      min_score_inovacao: 0.5
    };
    
    const titulos = avaliarEPriorizarTitulos(todosTitulos, concorrentes, criterios);
    setTitulosPriorizados(titulos);
    
    toast({
      title: "Análise concluída",
      description: `Foram avaliados ${todosTitulos.length} títulos e priorizados ${titulos.length}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analisador de Títulos</h1>
          
          <p className="mb-6 text-muted-foreground">
            Analise títulos concorrentes, gere variações e descubra os melhores títulos para seu conteúdo.
          </p>
          
          <Tabs defaultValue="extract" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="extract">1. Extrair Concorrentes</TabsTrigger>
              <TabsTrigger value="variations">2. Gerar Variações</TabsTrigger>
              <TabsTrigger value="subniches">3. Subnichear Títulos</TabsTrigger>
              <TabsTrigger value="evaluate">4. Avaliar e Priorizar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="extract" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subnicho">Subnicho</Label>
                  <Input
                    id="subnicho"
                    placeholder="Ex: histórias de milionários, conselhos financeiros"
                    value={subnicho}
                    onChange={(e) => setSubnicho(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <LanguageSelector 
                    value={idioma}
                    onChange={setIdioma}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxVideos">Número máximo de vídeos: {maxVideos}</Label>
                <input
                  type="range"
                  id="maxVideos"
                  min="10"
                  max="100"
                  step="5"
                  value={maxVideos}
                  onChange={(e) => setMaxVideos(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleExtrairTitulos}
                  disabled={isLoading}
                >
                  {isLoading ? "Extraindo..." : "Extrair Títulos"}
                </Button>
              </div>
              
              {titulosConcorrentes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Títulos Concorrentes</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Canal</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Visualizações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {titulosConcorrentes.slice(0, 10).map((titulo, index) => (
                        <TableRow key={`titulo-${index}`}>
                          <TableCell className="font-medium">{titulo.titulo}</TableCell>
                          <TableCell>{titulo.canal}</TableCell>
                          <TableCell>{new Date(titulo.data_publicacao).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">{titulo.visualizacoes.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="variations" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tituloOriginal">Título Original</Label>
                <Input
                  id="tituloOriginal"
                  placeholder="Ex: Como ficar rico em 30 dias"
                  value={tituloOriginal}
                  onChange={(e) => setTituloOriginal(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleGerarVariacoes}>
                  Gerar Variações
                </Button>
              </div>
              
              {variacoesTitulo && (
                <div className="mt-6">
                  <TitleVariations variations={variacoesTitulo} />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="subniches" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tituloOriginalSubnicho">Título Original</Label>
                <Input
                  id="tituloOriginalSubnicho"
                  placeholder="Ex: Millionaire Obsessed by a Woman"
                  value={tituloOriginal}
                  onChange={(e) => setTituloOriginal(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termosPrincipais">Termos Principais (separados por vírgula)</Label>
                <Input
                  id="termosPrincipais"
                  placeholder="Ex: millionaire, rich, wealthy"
                  value={termosPrincipais}
                  onChange={(e) => setTermosPrincipais(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idiomaSubnicho">Idioma</Label>
                <LanguageSelector 
                  value={idioma}
                  onChange={setIdioma}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSubnichearTitulos}>
                  Subnichear Títulos
                </Button>
              </div>
              
              {titulosSubnicho.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Títulos Subnichados</h3>
                  <div className="space-y-2">
                    {titulosSubnicho.map((titulo, index) => (
                      <div 
                        key={`subnicho-${index}`}
                        className="p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        {titulo}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="evaluate" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={handleAvaliarTitulos}>
                  Avaliar e Priorizar
                </Button>
              </div>
              
              {titulosPriorizados.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Títulos Priorizados</h3>
                  <div className="space-y-4">
                    {titulosPriorizados.map((titulo, index) => (
                      <div 
                        key={`priorizado-${index}`}
                        className="p-4 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{titulo.titulo}</h4>
                          <Badge variant={titulo.score_inovacao > 0.7 ? "success" : "secondary"}>
                            Score: {(titulo.score_inovacao * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Repetições detectadas: {titulo.repeticoes}</span>
                        </div>
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

export default TitleAnalyzer;
