
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TitleData } from '@/utils/titleAnalysis';

interface AnalyzeTabProps {
  titulosConcorrentes: TitleData[];
}

const AnalyzeTab = ({ titulosConcorrentes }: AnalyzeTabProps) => {
  if (titulosConcorrentes.length === 0) return null;

  return (
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
  );
};

export default AnalyzeTab;
