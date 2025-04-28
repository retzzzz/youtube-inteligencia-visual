
import { VideoResult } from "@/types/youtube-types";
import { TableCell, TableRow } from "@/components/ui/table";
import VideoTitleCell from "./VideoTitleCell";
import GrowthTypeCell from "./GrowthTypeCell";
import VideoLinksCell from "./VideoLinksCell";
import { formatNumber, formatCurrency, formatVideoAge, formatLanguage } from "@/utils/formatters";

interface ResultsTableRowProps {
  result: VideoResult;
  onSelectVideo?: (video: VideoResult) => void;
}

const ResultsTableRow = ({ result, onSelectVideo }: ResultsTableRowProps) => {
  return (
    <TableRow 
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
  );
};

export default ResultsTableRow;
