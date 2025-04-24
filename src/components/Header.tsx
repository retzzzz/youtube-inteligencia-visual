
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-youtube-red text-white py-4 px-6 rounded-lg mb-6 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="font-bold text-2xl mr-2">YouTube</div>
          <div className="text-2xl">Inteligência Visual</div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-youtube-red">
            <Globe className="mr-2 h-4 w-4" /> Documentação
          </Button>
          <Button variant="secondary" className="bg-white text-youtube-red hover:bg-gray-100">
            Suporte
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
