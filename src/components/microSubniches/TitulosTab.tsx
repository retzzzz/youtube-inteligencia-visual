
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MicroSubnichoRecomendado } from '@/utils/microSubnicheAnalysis';

interface TitulosTabProps {
  tituloBase: string;
  setTituloBase: (value: string) => void;
  nVariacoes: number;
  setNVariacoes: (value: number) => void;
  microSubnichosRecomendados: MicroSubnichoRecomendado[];
  titulosGerados: string[];
  handleGerarTitulos: () => void;
}

const TitulosTab = ({
  tituloBase,
  setTituloBase,
  nVariacoes,
  setNVariacoes,
  microSubnichosRecomendados,
  titulosGerados,
  handleGerarTitulos
}: TitulosTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default TitulosTab;
