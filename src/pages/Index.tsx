
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BarChart2, FileText, Compass, Target, Youtube } from 'lucide-react'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrendingTopicsSection from '@/components/TrendingTopicsSection';

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
    <div className="flex flex-col min-h-screen bg-[#0E122D] relative" style={{ pointerEvents: 'auto' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(29,58,180,0.15),rgba(0,0,0,0))]" />
      <Header />
      <main className="flex-grow w-full" style={{ pointerEvents: 'auto' }}>
        <div className="container mx-auto px-4 my-6">
          <div className="mb-8">
            <TrendingTopicsSection />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-4 md:px-8 mt-4 w-full mb-8">
          {tools.map((tool, index) => (
            <Link 
              to={tool.path} 
              key={index} 
              className="group relative"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur transition duration-1000 group-hover:opacity-30" />
              <div className="relative h-full backdrop-blur-xl bg-white/5 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/10">
                <div className={`${tool.color} rounded-xl p-3 w-fit mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-white/90">{tool.title}</h3>
                <p className="text-blue-100/70 flex-grow">{tool.description}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                  <span className="text-sm font-medium text-blue-300/80 flex items-center gap-1 group-hover:text-blue-200 transition-colors">
                    Explorar <Search className="h-4 w-4 inline" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
