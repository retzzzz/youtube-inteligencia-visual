
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart2, FileText, Compass, Target, Youtube } from 'lucide-react'; 
import WelcomeMessage from '@/components/WelcomeMessage';
import Header from '@/components/Header';

const Index = () => {
  const tools = [
    {
      title: "Analisador de Vídeos",
      description: "Extraia insights e oportunidades de vídeos populares no YouTube.",
      path: "/video-analyzer",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <Youtube className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Títulos",
      description: "Crie títulos otimizados para maximizar visualizações e engajamento.",
      path: "/title-generator",
      color: "bg-gradient-to-br from-green-500 to-green-600", 
      icon: <FileText className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Roteiros",
      description: "Desenvolva roteiros estruturados e persuasivos para seus vídeos.",
      path: "/script-generator",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: <BarChart2 className="h-6 w-6 text-white" />
    },
    {
      title: "Validador de Subnichos",
      description: "Encontre e valide subnichos lucrativos no YouTube.",
      path: "/subnicho-validator",
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      icon: <Target className="h-6 w-6 text-white" />
    },
    {
      title: "Analisador de Micro-Subnichos",
      description: "Identifique e explore micro-subnichos promissores.",
      path: "/micro-subnicho-analyzer",
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      icon: <Compass className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <WelcomeMessage />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {tools.map((tool, index) => (
          <Link to={tool.path} key={index} className="card-3d-effect">
            <Card className="h-full border shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white dark:bg-black/20 backdrop-blur-sm">
              <div className="h-2 w-full" style={{ background: `var(--tool-gradient, ${tool.color})` }}></div>
              <CardContent className="p-6 h-full flex flex-col">
                <div className={`${tool.color} rounded-xl p-3 w-fit mb-4 shadow-lg`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{tool.title}</h3>
                <p className="text-muted-foreground flex-grow">{tool.description}</p>
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    Explorar <Search className="h-4 w-4 inline" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
