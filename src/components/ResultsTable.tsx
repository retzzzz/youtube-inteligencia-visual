
import { useState } from "react";
import { VideoResult, ColumnDefinition } from "@/types/youtube-types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ResultsTableProps {
  results: VideoResult[];
}

const ResultsTable = ({ results }: ResultsTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof VideoResult>("views");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Definição das colunas da tabela
  const columns: ColumnDefinition[] = [
    { id: "title", label: "Título do Vídeo", sortable: true },
    { id: "channel", label: "Canal", sortable: true },
    { id: "views", label: "Visualizações", sortable: true },
    { id: "engagement", label: "Engajamento (%)", sortable: true },
    { id: "viralScore", label: "Pontuação Viral", sortable: true },
    { id: "estimatedCPM", label: "CPM Est.", sortable: true },
    { id: "estimatedRPM", label: "RPM Est.", sortable: true },
    { id: "estimatedEarnings", label: "Ganhos Est.", sortable: true },
    { id: "subscribers", label: "Inscritos", sortable: true },
    { id: "videoAge", label: "Idade do Vídeo (dias)", sortable: true },
    { id: "language", label: "Idioma", sortable: true },
  ];

  const handleSort = (column: keyof VideoResult) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Ordenar os resultados
  const sortedResults = [...results].sort((a, b) => {
    const valA = a[sortColumn];
    const valB = b[sortColumn];
    
    if (typeof valA === "string" && typeof valB === "string") {
      return sortDirection === "asc" 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    }
    
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    
    return 0;
  });

  // Formatar números
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  // Formatar valores monetários
  const formatCurrency = (num: number) => {
    return `$${num.toFixed(2)}`;
  };

  // Se não houver resultados, mostrar mensagem
  if (!results.length) {
    return null;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="whitespace-nowrap">
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 -ml-2 font-medium"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                      {sortColumn === column.id && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </Button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="max-w-[200px] truncate" title={result.title}>
                  {result.title}
                </TableCell>
                <TableCell>{result.channel}</TableCell>
                <TableCell>{formatNumber(result.views)}</TableCell>
                <TableCell>{result.engagement}%</TableCell>
                <TableCell>{result.viralScore}</TableCell>
                <TableCell>{formatCurrency(result.estimatedCPM)}</TableCell>
                <TableCell>{formatCurrency(result.estimatedRPM)}</TableCell>
                <TableCell>{formatCurrency(result.estimatedEarnings)}</TableCell>
                <TableCell>{formatNumber(result.subscribers)}</TableCell>
                <TableCell>{result.videoAge}</TableCell>
                <TableCell>{result.language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsTable;
