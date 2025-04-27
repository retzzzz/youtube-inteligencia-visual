
import { YoutubeSearchParams } from "@/types/youtube-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface AdvancedSearchOptionsProps {
  params: YoutubeSearchParams;
  onParamChange: (name: keyof YoutubeSearchParams, value: any) => void;
}

const AdvancedSearchOptions = ({ params, onParamChange }: AdvancedSearchOptionsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="minViews">Visualizações mínimas</Label>
        <Input
          id="minViews"
          type="number"
          min="0"
          value={params.minViews}
          onChange={(e) => onParamChange("minViews", Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxViews">Visualizações máximas</Label>
        <Input
          id="maxViews"
          type="number"
          min="0"
          value={params.maxViews || ""}
          onChange={(e) => onParamChange("maxViews", e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minSubs">Inscritos mínimos</Label>
        <Input
          id="minSubs"
          type="number"
          min="0"
          value={params.minSubscribers || ""}
          onChange={(e) => onParamChange("minSubscribers", e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxSubs">Inscritos máximos</Label>
        <Input
          id="maxSubs"
          type="number"
          min="0"
          value={params.maxSubscribers || ""}
          onChange={(e) => onParamChange("maxSubscribers", e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div className="space-y-2 flex items-center">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="excludeMusic" 
            checked={params.excludeMusic} 
            onCheckedChange={(checked) => 
              onParamChange("excludeMusic", checked === "indeterminate" ? true : checked)
            }
          />
          <Label htmlFor="excludeMusic" className="text-sm font-medium">
            Excluir vídeos musicais
          </Label>
        </div>
      </div>
    </>
  );
};

export default AdvancedSearchOptions;
