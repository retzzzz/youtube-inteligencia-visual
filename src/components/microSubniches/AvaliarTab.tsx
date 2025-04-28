
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MicroSubnicho, MicroSubnichoAvaliado } from '@/utils/microSubnicheAnalysis';

interface AvaliarTabProps {
  periodoDias: number;
  setPeriodoDias: (value: number) => void;
  microSubnichos: MicroSubnicho[];
  microSubnichosAvaliados: MicroSubnichoAvaliado[];
  isLoading: boolean;
  handleAvaliarMicroSubnichos: () => Promise<void>;
  getStatusColor: (status: string) => string;
}

const AvaliarTab = ({
  periodoDias,
  setPeriodoDias,
  microSubnichos,
  microSubnichosAvaliados,
  isLoading,
  handleAvaliarMicroSubnichos,
  getStatusColor
}: AvaliarTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AvaliarTab;
