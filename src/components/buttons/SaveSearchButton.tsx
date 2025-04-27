
import { Button } from "@/components/ui/button";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { saveSearch } from "@/services/youtube-mock";
import BaseDialog from "@/components/common/BaseDialog";

interface SaveSearchButtonProps {
  searchParams: YoutubeSearchParams | null;
}

const SaveSearchButton = ({ searchParams }: SaveSearchButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleOpenDialog = () => {
    if (!searchParams) {
      toast({
        title: "Erro ao salvar",
        description: "Não há pesquisa atual para salvar.",
        variant: "destructive",
      });
      return;
    }
    setIsOpen(true);
  };

  const handleSaveSearch = () => {
    if (!searchParams) {
      toast({
        title: "Erro ao salvar",
        description: "Não há pesquisa atual para salvar.",
        variant: "destructive",
      });
      return;
    }

    if (!searchName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite um nome para esta pesquisa.",
        variant: "destructive",
      });
      return;
    }

    const userId = user?.name || 'anonymous';
    
    saveSearch(searchName, searchParams, userId);
    setIsOpen(false);
    setSearchName("");

    toast({
      title: "Pesquisa salva",
      description: `A pesquisa "${searchName}" foi salva com sucesso.`,
    });
  };

  return (
    <>
      <Button variant="outline" onClick={handleOpenDialog}>
        <Save className="w-4 h-4 mr-2" />
        Salvar Pesquisa
      </Button>
      
      <BaseDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Salvar Pesquisa"
        description="Dê um nome para sua pesquisa para salvá-la e acessá-la facilmente no futuro."
        onConfirm={handleSaveSearch}
        confirmText="Salvar Pesquisa"
      >
        <div className="space-y-2">
          <Label htmlFor="search-name">Nome da pesquisa</Label>
          <Input
            id="search-name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Ex: Canais de marketing com alta performance"
          />
        </div>
        
        {searchParams && (
          <div className="bg-secondary p-3 rounded-md text-sm">
            <p>Palavras-chave: <span className="font-medium">{searchParams.keywords}</span></p>
            <p>Tipo: <span className="font-medium">{searchParams.searchType}</span></p>
            <p>Idioma: <span className="font-medium">{searchParams.language || "Todos"}</span></p>
          </div>
        )}
      </BaseDialog>
    </>
  );
};

export default SaveSearchButton;
