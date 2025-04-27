
import { VideoResult, YoutubeSearchParams } from "@/types/youtube-types";
import SaveSearchButton from "./buttons/SaveSearchButton";
import CsvExportButton from "./buttons/CsvExportButton";
import PdfExportButton from "./buttons/PdfExportButton";

interface ActionButtonsProps {
  results: VideoResult[];
  searchParams: YoutubeSearchParams | null;
}

const ActionButtons = ({ results, searchParams }: ActionButtonsProps) => {
  // Se não houver resultados, não renderizar botões
  if (!results.length) return null;

  return (
    <div className="flex flex-wrap justify-end gap-2 my-4">
      <SaveSearchButton searchParams={searchParams} />
      <CsvExportButton results={results} />
      <PdfExportButton results={results} />
    </div>
  );
};

export default ActionButtons;
