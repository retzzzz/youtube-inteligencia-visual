
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { SubnichoPriorizado } from '@/utils/subnicheValidation';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface SubnicheValidationResultsProps {
  subnichesPriorizados: SubnichoPriorizado[];
}

const SubnicheValidationResults: React.FC<SubnicheValidationResultsProps> = ({ 
  subnichesPriorizados 
}) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Informação copiada para área de transferência."
    });
  };

  if (!subnichesPriorizados || subnichesPriorizados.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Nenhum subnicho priorizado disponível. Execute a validação primeiro.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Subnichos Recomendados</h3>
      
      <div className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subnicho</TableHead>
              <TableHead>Pontuação</TableHead>
              <TableHead>Visualizações</TableHead>
              <TableHead>Crescimento</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subnichesPriorizados.map((subnicho, index) => (
              <TableRow key={`${subnicho.subnicho}-${index}`}>
                <TableCell className="font-medium">{subnicho.subnicho}</TableCell>
                <TableCell>{(subnicho.pontuacao * 100).toFixed(0)}%</TableCell>
                <TableCell>{subnicho.media_visualizacoes_por_video.toLocaleString()}</TableCell>
                <TableCell>{subnicho.taxa_crescimento_inscritos_mensal.toFixed(1)}%</TableCell>
                <TableCell>{subnicho.idade_media_canais.toFixed(1)} meses</TableCell>
                <TableCell>
                  <Badge className={subnicho.validado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {subnicho.validado ? "Validado" : "Não validado"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="space-y-4 mt-6">
          <h4 className="font-semibold">Análise Detalhada</h4>
          
          {subnichesPriorizados.map((subnicho, index) => (
            <Card key={`analysis-${index}`} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-lg">{index + 1}. {subnicho.subnicho}</h5>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold">Pontos fortes:</span> {subnicho.pontos_fortes}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Riscos:</span> {subnicho.riscos}
                    </p>
                  </div>
                  
                  <div className="mt-3">
                    <h6 className="text-sm font-medium mb-1">Canais de exemplo:</h6>
                    <ul className="text-sm list-disc pl-5">
                      {subnicho.canais_exemplos.slice(0, 3).map((canal, cIndex) => (
                        <li key={`canal-${index}-${cIndex}`}>
                          {canal.nome_do_canal} ({canal.total_inscritos.toLocaleString()} inscritos)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(`${subnicho.subnicho}: ${subnicho.pontos_fortes} ${subnicho.riscos}`)}
                >
                  Copiar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SubnicheValidationResults;
