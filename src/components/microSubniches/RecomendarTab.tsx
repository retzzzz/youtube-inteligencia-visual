
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MicroSubnichoAvaliado, MicroSubnichoRecomendado } from '@/utils/microSubnicheAnalysis';

interface RecomendarTabProps {
  topN: number;
  setTopN: (value: number) => void;
  microSubnichosAvaliados: MicroSubnichoAvaliado[];
  microSubnichosRecomendados: MicroSubnichoRecomendado[];
  handleRecomendarMicroSubnichos: () => void;
}

const RecomendarTab = ({
  topN,
  setTopN,
  microSubnichosAvaliados,
  microSubnichosRecomendados,
  handleRecomendarMicroSubnichos
}: RecomendarTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default RecomendarTab;
