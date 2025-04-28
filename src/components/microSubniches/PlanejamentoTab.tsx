
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MicroSubnichoRecomendado, PlanejamentoCiclo } from '@/utils/microSubnicheAnalysis';

interface PlanejamentoTabProps {
  frequencia: string;
  setFrequencia: (value: string) => void;
  ciclos: number;
  setCiclos: (value: number) => void;
  microSubnichosRecomendados: MicroSubnichoRecomendado[];
  cronograma: PlanejamentoCiclo[];
  handlePlanejarCiclo: () => void;
  formatarData: (dataIso: string) => string;
}

const PlanejamentoTab = ({
  frequencia,
  setFrequencia,
  ciclos,
  setCiclos,
  microSubnichosRecomendados,
  cronograma,
  handlePlanejarCiclo,
  formatarData
}: PlanejamentoTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default PlanejamentoTab;
