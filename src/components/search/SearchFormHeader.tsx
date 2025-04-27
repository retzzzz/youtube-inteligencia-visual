
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchFormHeaderProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchFormHeader = ({ isLoading, onSubmit }: SearchFormHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold flex items-center">
        <Filter className="w-5 h-5 mr-2" /> Pesquisar Conteúdo
      </h2>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>Pesquisando...</>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Pesquisar
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchFormHeader;
