
import { Zap, TrendingUp, Rocket } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GrowthTypeCellProps {
  type?: string;
}

const GrowthTypeCell = ({ type }: GrowthTypeCellProps) => {
  const getGrowthIcon = (type?: string) => {
    switch (type) {
      case "explosive":
        return <Zap className="h-4 w-4 text-red-500" />;
      case "emerging":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "latent":
        return <Rocket className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getGrowthLabel = (type?: string) => {
    switch (type) {
      case "explosive":
        return "Explosivo";
      case "emerging":
        return "Emergente";
      case "latent":
        return "Latente";
      default:
        return "—";
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5">
          {getGrowthIcon(type)}
          <span className="text-sm">{getGrowthLabel(type)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {type === "explosive" ? "Crescimento explosivo - viral rápido" : 
         type === "emerging" ? "Crescimento consistente e promissor" : 
         type === "latent" ? "Potencial ainda não explorado" : 
         "Padrão de crescimento não classificado"}
      </TooltipContent>
    </Tooltip>
  );
};

export default GrowthTypeCell;
