
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberKeyCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const RememberKeyCheckbox = ({ checked, onCheckedChange }: RememberKeyCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="remember" 
        checked={checked} 
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)} 
      />
      <Label 
        htmlFor="remember" 
        className="text-sm cursor-pointer"
      >
        Lembrar minha chave API neste dispositivo
      </Label>
    </div>
  );
};

export default RememberKeyCheckbox;
