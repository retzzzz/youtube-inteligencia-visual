
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Edit } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      
      <div className="grid gap-6 mt-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Analisador de YouTube</h1>
          <p className="text-muted-foreground mb-6">
            Escolha uma das ferramentas abaixo para começar:
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/video-analyzer">
              <Button variant="outline" className="w-full h-auto py-4 px-6">
                <Youtube className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Analisador de Vídeos</div>
                  <div className="text-sm text-muted-foreground">
                    Analise vídeos do YouTube e receba insights
                  </div>
                </div>
              </Button>
            </Link>
            
            <Link to="/title-generator">
              <Button variant="outline" className="w-full h-auto py-4 px-6">
                <Edit className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Gerador de Títulos</div>
                  <div className="text-sm text-muted-foreground">
                    Crie títulos criativos e envolventes
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
