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
import { ArrowUp, ArrowDown, Youtube, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ResultsTableProps {
  results: VideoResult[];
  onSelectVideo?: (video: VideoResult) => void;
}

const ResultsTable = ({ results, onSelectVideo }: ResultsTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof VideoResult>("viralScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 50;

  const columns: ColumnDefinition[] = [
    { id: "title", label: "Título do Vídeo", sortable: true },
    { id: "channel", label: "Canal", sortable: true },
    { id: "views", label: "Visualizações", sortable: true },
    { id: "engagement", label: "Engajamento (%)", sortable: true },
    { id: "viralScore", label: "Pontuação Viral", sortable: true },
    { id: "mainNiche", label: "Nicho", sortable: true },
    { id: "estimatedCPM", label: "CPM Est.", sortable: true },
    { id: "estimatedRPM", label: "RPM Est.", sortable: true },
    { id: "estimatedEarnings", label: "Ganhos Est.", sortable: true },
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const formatCurrency = (num: number) => {
    return `$${num.toFixed(2)}`;
  };

  const formatVideoAge = (days: number) => {
    if (days < 1) {
      const hours = Math.round(days * 24);
      return `${hours} h`;
    } else if (days < 30) {
      return `${Math.round(days)} d`;
    } else if (days < 365) {
      const months = Math.round(days / 30);
      return `${months} m`;
    } else {
      const years = Math.round(days / 365);
      return `${years} a`;
    }
  };

  const totalPages = Math.ceil(results.length / resultsPerPage);
  
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentPageResults = sortedResults.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationNumbers = () => {
    const pageItems = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pageItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, startPage + 3);
      
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 3);
      }
      
      if (startPage > 2) {
        pageItems.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (endPage < totalPages - 1) {
        pageItems.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      pageItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pageItems;
  };

  const formatLanguage = (languageCode: string): string => {
    const languageMap: Record<string, string> = {
      "pt-BR": "Português (BR)",
      "en-US": "Inglês (EUA)",
      "es-ES": "Espanhol",
      "fr-FR": "Francês",
      "de-DE": "Alemão",
      "it-IT": "Italiano",
      "ja-JP": "Japonês",
      "ko-KR": "Coreano",
      "ru-RU": "Russo",
      "zh-CN": "Chinês"
    };
    
    return languageMap[languageCode] || languageCode;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={column.id} 
                    className={`whitespace-nowrap 
                      ${column.id === 'title' ? 'w-[500px] min-w-[300px]' : ''} 
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
              {currentPageResults.map((result) => (
                <TableRow 
                  key={result.id} 
                  className={onSelectVideo ? "cursor-pointer hover:bg-muted" : ""}
                  onClick={() => onSelectVideo && onSelectVideo(result)}
                >
                  <TableCell className="max-w-[500px] min-w-[300px] pr-4" title={result.title}>
                    <div className="truncate">
                      {result.videoUrl ? (
                        <a 
                          href={result.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {result.title}
                        </a>
                      ) : result.title}
                    </div>
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
                  <TableCell>{formatCurrency(result.estimatedCPM)}</TableCell>
                  <TableCell>{formatCurrency(result.estimatedRPM)}</TableCell>
                  <TableCell>{formatCurrency(result.estimatedEarnings)}</TableCell>
                  <TableCell>{formatNumber(result.subscribers)}</TableCell>
                  <TableCell>{formatVideoAge(result.videoAge)}</TableCell>
                  <TableCell>{formatLanguage(result.language)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {result.videoUrl && (
                        <a 
                          href={result.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-youtube-red hover:text-red-700"
                          title="Assistir no YouTube"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube className="h-5 w-5" />
                        </a>
                      )}
                      {result.channelUrl && (
                        <a 
                          href={result.channelUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-gray-500 hover:text-gray-700"
                          title="Visitar Canal"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {renderPaginationNumbers()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      <div className="text-sm text-muted-foreground text-right">
        Exibindo {startIndex + 1}-{Math.min(endIndex, results.length)} de {results.length} resultados
      </div>
    </div>
  );
};

export default ResultsTable;
