
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { SavedSearch, YoutubeSearchParams } from "@/types/youtube-types";
import { saveSearch, getSavedSearches, deleteSavedSearch } from "@/services/youtube-mock";
import { SaveIcon, Calendar, Search as SearchIcon, ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SavedSearchesProps {
  currentSearch: YoutubeSearchParams | null;
  onLoadSearch: (params: YoutubeSearchParams) => void;
}

const SavedSearches = ({ currentSearch, onLoadSearch }: SavedSearchesProps) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const { toast } = useToast();

  // Carregar buscas salvas ao montar o componente
  useEffect(() => {
    setSavedSearches(getSavedSearches());
  }, []);

  const handleSaveSearch = () => {
    if (!currentSearch) {
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

    // Salvar busca e atualizar estado
    const newSearch = saveSearch(searchName, currentSearch);
    setSavedSearches([...savedSearches, newSearch]);
    setIsDialogOpen(false);
    setSearchName("");

    toast({
      title: "Pesquisa salva",
      description: `A pesquisa "${searchName}" foi salva com sucesso.`,
    });
  };

  const handleDeleteSearch = (id: string) => {
    deleteSavedSearch(id);
    setSavedSearches(savedSearches.filter((search) => search.id !== id));
    
    toast({
      title: "Pesquisa excluída",
      description: "A pesquisa foi excluída com sucesso.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Pesquisas Salvas</h2>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(true)}
              disabled={!currentSearch}
            >
              <SaveIcon className="w-4 h-4 mr-2" />
              Salvar Pesquisa Atual
            </Button>
          </div>
        </div>

        {savedSearches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Você não tem pesquisas salvas.</p>
            <p className="text-sm mt-1">Salve suas pesquisas para acessá-las rapidamente no futuro.</p>
          </div>
        ) : (
          <div className="space-y-2 mt-4">
            {savedSearches.map((search) => (
              <div 
                key={search.id} 
                className="flex items-center justify-between p-3 bg-secondary rounded-md hover:bg-accent/10 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{search.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(search.date)}
                    <span className="mx-2">•</span>
                    <SearchIcon className="w-3 h-3 mr-1" />
                    {search.params.keywords}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onLoadSearch(search.params)}
                  >
                    <ArrowDown className="w-3 h-3 mr-1" />
                    Carregar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteSearch(search.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diálogo para salvar pesquisa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Pesquisa</DialogTitle>
            <DialogDescription>
              Dê um nome para sua pesquisa para salvá-la e acessá-la facilmente no futuro.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="search-name">Nome da pesquisa</Label>
              <Input
                id="search-name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Ex: Canais de marketing com alta performance"
              />
            </div>
            
            {currentSearch && (
              <div className="bg-secondary p-3 rounded-md text-sm">
                <p>Palavras-chave: <span className="font-medium">{currentSearch.keywords}</span></p>
                <p>Tipo: <span className="font-medium">{currentSearch.searchType}</span></p>
                <p>Idioma: <span className="font-medium">{currentSearch.language || "Todos"}</span></p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveSearch}>Salvar Pesquisa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavedSearches;
