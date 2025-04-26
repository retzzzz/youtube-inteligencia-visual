import { useState, useEffect } from "react";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import VideoTitleCell from "./table/VideoTitleCell";
import GrowthTypeCell from "./table/GrowthTypeCell";
import VideoLinksCell from "./table/VideoLinksCell";
import { formatNumber, formatCurrency, formatVideoAge, formatLanguage } from "@/utils/formatters";

interface ResultsTableProps {
  results: VideoResult[];
  onSelectVideo?: (video: VideoResult) => void;
}

const ResultsTable = ({ results, onSelectVideo }: ResultsTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof VideoResult>("viralScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [displayCount, setDisplayCount] = useState(50);
  const [loadedResults, setLoadedResults] = useState<VideoResult[]>([]);

  useEffect(() => {
    setLoadedResults(results.slice(0, displayCount));
  }, [results, displayCount]);

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
    <TooltipProvider>
      <div className="space-y-4 animate-fade-in">
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead 
                      key={column.id} 
                      className={`whitespace-nowrap 
                        ${column.id === 'title' ? 'w-[500px] min-w-[400px]' : ''} 
                        ${column.id === 'videoAge' ? 'w-[60px]' : ''} 
                        ${column.id === 'id' ? 'w-[80px] text-center' : ''}
                        ${column.id === 'language' ? 'w-[120px]' : ''}
                      `}
                    >
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
                  <TableRow 
                    key={result.id} 
                    className={onSelectVideo ? "cursor-pointer hover:bg-muted" : ""}
                    onClick={() => onSelectVideo && onSelectVideo(result)}
                  >
                    <TableCell className="max-w-[500px] min-w-[400px] pr-4">
                      <VideoTitleCell video={result} />
                    </TableCell>
                    <TableCell>
                      {result.channelUrl ? (
                        <a 
                          href={result.channelUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {result.channel}
                        </a>
                      ) : (
                        result.channel
                      )}
                    </TableCell>
                    <TableCell>{formatNumber(result.views)}</TableCell>
                    <TableCell>{result.engagement}%</TableCell>
                    <TableCell className="font-medium">{result.viralScore}</TableCell>
                    <TableCell>{result.mainNiche || "Diversos"}</TableCell>
                    <TableCell>
                      <GrowthTypeCell type={result.growthType} />
                    </TableCell>
                    <TableCell>
                      {result.viewsPerHour ? formatNumber(result.viewsPerHour) : "—"}
                    </TableCell>
                    <TableCell>{formatCurrency(result.estimatedCPM)}</TableCell>
                    <TableCell>{formatNumber(result.subscribers)}</TableCell>
                    <TableCell>{formatVideoAge(result.videoAge)}</TableCell>
                    <TableCell>{formatLanguage(result.language)}</TableCell>
                    <TableCell className="text-center">
                      <VideoLinksCell 
                        videoUrl={result.videoUrl} 
                        channelUrl={result.channelUrl} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
