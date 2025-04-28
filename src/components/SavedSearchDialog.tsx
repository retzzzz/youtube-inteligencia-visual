
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SavedSearch, YoutubeSearchParams } from "@/types/youtube-types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { saveSearch, getSavedSearches, deleteSavedSearch } from "@/services/youtube-mock";
import { BookmarkPlus, Trash2, Calendar, Search as SearchIcon, ArrowDown } from "lucide-react";

interface SavedSearchDialogProps {
  searchParams: YoutubeSearchParams;
}

const SavedSearchDialog = ({ searchParams }: SavedSearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'save' | 'view'>('save');

  useEffect(() => {
    if (open) {
      loadSavedSearches();
    }
  }, [open, user]);

  const loadSavedSearches = () => {
    if (user) {
      const searches = getSavedSearches();
      // Filter for current user's searches and convert date format if needed
      const userSearches = searches
        .filter(search => search.userId === user.name)
        .map(search => ({
          ...search,
          dateCreated: search.date || search.dateCreated // Handle both date formats
        }));
      setSavedSearches(userSearches);
    }
  };

  const handleSaveSearch = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, forneça um nome para esta pesquisa.",
        variant: "destructive",
      });
      return;
    }

    if (user) {
      // Save the search with the ID of the user
      saveSearch(name, searchParams, user.name);
      toast({
        title: "Pesquisa salva",
        description: "Sua pesquisa foi salva com sucesso.",
      });
      setName("");
      loadSavedSearches();
      setActiveTab('view');
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar pesquisas.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSearch = (id: string) => {
    deleteSavedSearch(id);
    loadSavedSearches();
    
    toast({
      title: "Pesquisa excluída",
      description: "A pesquisa foi excluída com sucesso.",
    });
  };

  const handleLoadSearch = (params: YoutubeSearchParams) => {
    // Redirecionar para a página de pesquisa com os parâmetros carregados
    window.location.href = `/search?params=${encodeURIComponent(JSON.stringify(params))}`;
    setOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BookmarkPlus size={18} />
          Salvar Pesquisa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pesquisas Salvas</DialogTitle>
        </DialogHeader>
        
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'save' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('save')}
          >
            Salvar Nova
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'view' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('view')}
          >
            Visualizar ({savedSearches.length})
          </button>
        </div>
        
        {activeTab === 'save' ? (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="search-name">Nome da pesquisa</Label>
              <Input
                id="search-name"
                placeholder="Ex: Pesquisa de Nicho Gamer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveSearch}>
                Salvar Pesquisa
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4 py-2 max-h-[400px] overflow-y-auto">
            {savedSearches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Você não tem pesquisas salvas.</p>
                <p className="text-sm mt-1">Salve suas pesquisas para acessá-las rapidamente no futuro.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedSearches.map((search) => (
                  <div 
                    key={search.id} 
                    className="flex items-center justify-between p-3 bg-secondary rounded-md hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{search.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(search.dateCreated || search.date || '')}
                        <span className="mx-2">•</span>
                        <SearchIcon className="w-3 h-3 mr-1" />
                        {search.params.keywords}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleLoadSearch(search.params)}
                      >
                        <ArrowDown className="w-3 h-3 mr-1" />
                        Carregar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteSearch(search.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SavedSearchDialog;
