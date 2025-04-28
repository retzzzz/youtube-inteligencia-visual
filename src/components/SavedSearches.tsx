import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { SavedSearch, YoutubeSearchParams } from "@/types/youtube-types";
import { getSavedSearches, deleteSavedSearch } from "@/services/youtube-mock";
import { Calendar, Search as SearchIcon, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedSearchesProps {
  currentSearch: YoutubeSearchParams | null;
  onLoadSearch: (params: YoutubeSearchParams) => void;
  hideCurrentSaveButton?: boolean;
}

const SavedSearches = ({ currentSearch, onLoadSearch, hideCurrentSaveButton = false }: SavedSearchesProps) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const { toast } = useToast();

  // Carregar buscas salvas ao montar o componente
  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = () => {
    const searches = getSavedSearches().map(search => ({
      ...search,
      dateCreated: search.date || search.dateCreated // Handle both date formats
    }));
    setSavedSearches(searches);
  };

  const handleDeleteSearch = (id: string) => {
    deleteSavedSearch(id);
    loadSavedSearches();
    
    toast({
      title: "Pesquisa excluída",
      description: "A pesquisa foi excluída com sucesso.",
    });
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  };

  // Atualizar a lista de pesquisas salvas quando alguma ação de salvamento ou exclusão ocorrer
  useEffect(() => {
    const refreshSavedSearches = () => {
      loadSavedSearches();
    };
    
    // Criar um listener para atualizar quando o localStorage mudar
    const handleStorageChange = () => {
      refreshSavedSearches();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar periodicamente por mudanças (como fallback)
    const interval = setInterval(refreshSavedSearches, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold">Pesquisas Salvas</h2>
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
                  {formatDate(search.dateCreated || search.date)}
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
  );
};

export default SavedSearches;
