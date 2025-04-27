
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Check, Calendar, Users, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudienceProfile, MicroSubnicho, PublicationSchedule } from '@/utils/audienceAnalysis';

interface AudienceAnalysisResultsProps {
  audienceProfile: AudienceProfile | null;
  microSubnichos: MicroSubnicho[];
  titulosAdaptados: string[];
  cronogramaPublicacao: PublicationSchedule[];
}

const AudienceAnalysisResults = ({ 
  audienceProfile, 
  microSubnichos, 
  titulosAdaptados,
  cronogramaPublicacao
}: AudienceAnalysisResultsProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Texto copiado para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (!audienceProfile) return null;

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-bold">Resultados da Análise de Audiência</h2>
      
      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="perfil">Perfil da Audiência</TabsTrigger>
          <TabsTrigger value="microsubnichos">Micro-Subnichos</TabsTrigger>
          <TabsTrigger value="titulos">Títulos Adaptados</TabsTrigger>
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-bold">Perfil da Audiência</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Dados Demográficos</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Gênero majoritário:</span>
                    <span className="font-medium">{audienceProfile.genero_majoritario}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Faixa etária principal:</span>
                    <span className="font-medium">{audienceProfile.top_faixa_etaria}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Principais Países</h4>
                <div className="space-y-2">
                  {audienceProfile.top_paises.map((pais, index) => (
                    <div key={pais} className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "Principal" : `#${index + 1}`}
                      </Badge>
                      <span>{pais}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Retenção por Segmento</h4>
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(audienceProfile.retencao_por_segmento).map(([faixa, valor]) => (
                    <div key={faixa} className="text-center">
                      <div className="text-sm text-muted-foreground">{faixa}</div>
                      <div className="font-medium text-lg">{(valor * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="microsubnichos" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5" />
              <h3 className="text-lg font-bold">Micro-Subnichos Identificados</h3>
            </div>
            
            <div className="space-y-6">
              {microSubnichos.map((item, index) => (
                <div 
                  key={`micro-${index}`}
                  className="p-4 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <h4 className="font-medium text-lg">{item.microsubnicho}</h4>
                    <Badge variant="outline">{item.pais}</Badge>
                    <Badge>{item.faixa_etaria}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">
                    {item.justificativa}
                  </p>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => copyToClipboard(item.microsubnicho, `micro-${index}`)}
                    >
                      {copiedId === `micro-${index}` ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      Copiar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="titulos" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold">Títulos Adaptados para Audiência</h3>
            </div>
            
            <div className="space-y-2">
              {titulosAdaptados.map((titulo, index) => (
                <div 
                  key={`titulo-${index}`}
                  className="flex justify-between items-center p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <p className="flex-1 mr-2">{titulo}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(titulo, `titulo-${index}`)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === `titulo-${index}` ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="cronograma" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5" />
              <h3 className="text-lg font-bold">Cronograma de Publicação</h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Micro-Subnicho</TableHead>
                  <TableHead>Título Sugerido</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cronogramaPublicacao.map((item, index) => (
                  <TableRow key={`cronograma-${index}`}>
                    <TableCell>
                      {new Date(item.data_publicacao).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{item.microsubnicho}</TableCell>
                    <TableCell>{item.titulo_sugerido}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(item.titulo_sugerido, `cronograma-${index}`)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedId === `cronograma-${index}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AudienceAnalysisResults;
