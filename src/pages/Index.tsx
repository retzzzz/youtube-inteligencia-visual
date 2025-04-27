
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Navigation } from 'lucide-react'; 
import WelcomeMessage from '@/components/WelcomeMessage';
import Header from '@/components/Header';

const Index = () => {
  const tools = [
    {
      title: "Analisador de Vídeos",
      description: "Extraia insights e oportunidades de vídeos populares no YouTube.",
      path: "/video-analyzer",
      color: "bg-blue-500",
      icon: <Navigation className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Títulos",
      description: "Crie títulos otimizados para maximizar visualizações e engajamento.",
      path: "/title-generator",
      color: "bg-green-500", 
      icon: <Navigation className="h-6 w-6 text-white" />
    },
    {
      title: "Gerador de Roteiros",
      description: "Desenvolva roteiros estruturados e persuasivos para seus vídeos.",
      path: "/script-generator",
      color: "bg-purple-500",
      icon: <Navigation className="h-6 w-6 text-white" />
    },
    {
      title: "Validador de Subnichos",
      description: "Encontre e valide subnichos lucrativos no YouTube.",
      path: "/subnicho-validator",
      color: "bg-amber-500",
      icon: <Navigation className="h-6 w-6 text-white" />
    },
    {
      title: "Analisador de Micro-Subnichos",
      description: "Identifique e explore micro-subnichos promissores.",
      path: "/micro-subnicho-analyzer",
      color: "bg-rose-500",
      icon: <Navigation className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Header />
      
      <WelcomeMessage />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {tools.map((tool, index) => (
          <Link to={tool.path} key={index}>
            <Card className="p-6 h-full hover:shadow-md transition-shadow">
              <div className={`${tool.color} rounded-full p-2 w-fit mb-4`}>
                {tool.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{tool.title}</h3>
              <p className="text-muted-foreground">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
