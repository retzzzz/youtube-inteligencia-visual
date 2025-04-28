
import { useState, useEffect } from "react";
import { VideoResult, ColumnDefinition } from "@/types/youtube-types";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import ResultsTableHeader from "./table/ResultsTableHeader";
import ResultsTableRow from "./table/ResultsTableRow";

interface ResultsTableProps {
  results: VideoResult[];
  onSelectVideo?: (video: VideoResult) => void;
}

const ResultsTable = ({ results, onSelectVideo }: ResultsTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof VideoResult>("viralScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [displayCount, setDisplayCount] = useState(50);
  const [loadedResults, setLoadedResults] = useState<VideoResult[]>([]);

  const columns: ColumnDefinition[] = [
    { id: "title", label: "Título do Vídeo", sortable: true },
    { id: "channel", label: "Canal", sortable: true },
    { id: "views", label: "Visualizações", sortable: true },
    { id: "engagement", label: "Engajamento (%)", sortable: true },
    { id: "viralScore", label: "Pontuação Viral", sortable: true },
    { id: "mainNiche", label: "Nicho", sortable: true },
    { id: "growthType", label: "Crescimento", sortable: true },
    { id: "viewsPerHour", label: "Views/Hora", sortable: true },
    { id: "estimatedCPM", label: "CPM Est.", sortable: true },
    { id: "subscribers", label: "Inscritos", sortable: true },
    { id: "videoAge", label: "Idade", sortable: true },
    { id: "language", label: "Idioma", sortable: true },
    { id: "id", label: "Links", sortable: false },
  ];

  useEffect(() => {
    setLoadedResults(results.slice(0, displayCount));
  }, [results, displayCount]);

  const handleSort = (column: keyof VideoResult) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleLoadMore = () => {
    const newDisplayCount = Math.min(displayCount + 50, results.length);
    setDisplayCount(newDisplayCount);
    setLoadedResults(results.slice(0, newDisplayCount));
  };

  const sortedResults = [...loadedResults].sort((a, b) => {
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

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-4 animate-fade-in">
        <div className="w-full overflow-visible" style={{ minWidth: "1200px" }}>
          <Table className="w-full">
            <ResultsTableHeader
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <TableBody>
              {sortedResults.map((result) => (
                <ResultsTableRow
                  key={result.id}
                  result={result}
                  onSelectVideo={onSelectVideo}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Exibindo {loadedResults.length} de {results.length} resultados
          </p>
          
          {loadedResults.length < results.length && (
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="transition-all duration-300 hover:shadow-md"
            >
              Carregar mais 50 resultados
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResultsTable;
