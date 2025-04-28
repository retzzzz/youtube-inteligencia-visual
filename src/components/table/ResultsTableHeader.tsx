
import { ColumnDefinition, VideoResult } from "@/types/youtube-types";
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultsTableHeaderProps {
  columns: ColumnDefinition[];
  sortColumn: keyof VideoResult;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof VideoResult) => void;
}

const ResultsTableHeader = ({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: ResultsTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead 
            key={column.id} 
            className={`whitespace-nowrap 
              ${column.id === 'title' ? 'w-[350px] min-w-[250px]' : ''} 
              ${column.id === 'videoAge' ? 'w-[60px]' : ''} 
              ${column.id === 'id' ? 'w-[70px] text-center' : ''}
              ${column.id === 'language' ? 'w-[100px]' : ''}
              ${column.id === 'channel' ? 'w-[180px]' : ''}
              ${column.id === 'views' || column.id === 'subscribers' ? 'w-[120px]' : ''}
            `}
          >
            {column.sortable ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 -ml-2 font-medium"
                onClick={() => onSort(column.id)}
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
                {column.id === 'viralScore' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent 
                        side="bottom" 
                        className="w-[350px] p-4 z-[100]"
                      >
                        <p className="font-medium mb-2">Como é calculada a Pontuação Viral?</p>
                        <ul className="space-y-2 text-sm">
                          <li>• Vídeos muito recentes (24-72h) recebem multiplicador especial</li>
                          <li>• Taxa de crescimento: mais views em menos tempo = maior pontuação</li>
                          <li>• Engajamento tem peso importante (likes, comentários)</li>
                          <li>• Canais menores recebem bônus na pontuação</li>
                          <li>• Vídeos já virais (&gt;500k views) recebem penalidade</li>
                        </ul>
                        <p className="text-sm mt-2 text-muted-foreground">
                          Escala: 0-1000 (baixo), 1000-2000 (médio), 2000+ (alto potencial viral)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </Button>
            ) : (
              column.label
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default ResultsTableHeader;
