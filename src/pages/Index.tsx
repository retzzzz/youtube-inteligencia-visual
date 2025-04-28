
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
      color: "bg-gradient-to-br from-red-500/90 to-rose-600",
      icon: <Youtube className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Títulos",
      description: "Crie títulos otimizados para maximizar visualizações e engajamento.",
      path: "/title-generator",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600", 
      icon: <FileText className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Roteiros",
      description: "Desenvolva roteiros estruturados e persuasivos para seus vídeos.",
      path: "/script-generator",
      color: "bg-gradient-to-br from-purple-500 to-violet-600",
      icon: <BarChart2 className="h-6 w-6 text-white" />
    },
    {
      title: "Validador de Subnichos",
      description: "Encontre e valide subnichos lucrativos no YouTube.",
      path: "/subnicho-validator",
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
      icon: <Target className="h-6 w-6 text-white" />
    },
    {
      title: "Analisador de Micro-Subnichos",
      description: "Identifique e explore micro-subnichos promissores.",
      path: "/micro-subnicho-analyzer",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      icon: <Compass className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-6 max-w-[1200px] relative">
        <Header />
        <WelcomeMessage />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tools.map((tool, index) => (
            <Link 
              to={tool.path} 
              key={index} 
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 blur transition duration-1000 group-hover:opacity-30" />
              <Card className="relative h-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/10">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className={`${tool.color} rounded-xl p-3 w-fit mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{tool.title}</h3>
                  <p className="text-muted-foreground flex-grow">{tool.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                    <span className="text-sm font-medium text-primary/80 flex items-center gap-1 group-hover:text-primary transition-colors">
                      Explorar <Search className="h-4 w-4 inline" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
