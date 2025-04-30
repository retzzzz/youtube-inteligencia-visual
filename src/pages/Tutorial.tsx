
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { ArrowRight, Video, Type, FileText, Search, BarChart3, BarChart, BookOpen } from 'lucide-react';

const Tutorial = () => {
  const tutorials = [
    {
      title: "Analisador de Vídeos",
      description: "Aprenda a analisar vídeos do YouTube e descobrir o que os torna populares.",
      icon: Video,
      path: "/video-analyzer-tutorial",
      color: "from-blue-600/20 to-blue-800/10 border-blue-500/30 hover:border-blue-400/50",
      iconClass: "text-blue-400"
    },
    {
      title: "Gerador de Títulos",
      description: "Crie títulos irresistíveis que geram mais cliques e visualizações.",
      icon: Type,
      path: "/title-generator-tutorial",
      color: "from-purple-600/20 to-purple-800/10 border-purple-500/30 hover:border-purple-400/50",
      iconClass: "text-purple-400"
    },
    {
      title: "Roteirizador",
      description: "Organize suas ideias em roteiros profissionais ou crie roteiros do zero.",
      icon: FileText,
      path: "/script-generator-tutorial",
      color: "from-green-600/20 to-green-800/10 border-green-500/30 hover:border-green-400/50",
      iconClass: "text-green-400"
    },
    {
      title: "Validador de Subnichos",
      description: "Descubra temas específicos com alto potencial de crescimento.",
      icon: BarChart,
      path: "/subnicho-validator-tutorial",
      color: "from-amber-600/20 to-amber-800/10 border-amber-500/30 hover:border-amber-400/50",
      iconClass: "text-amber-400"
    },
    {
      title: "Pesquisador",
      description: "Use nossa pesquisa avançada para encontrar oportunidades no YouTube.",
      icon: Search,
      path: "/search-tutorial",
      color: "from-rose-600/20 to-rose-800/10 border-rose-500/30 hover:border-rose-400/50",
      iconClass: "text-rose-400"
    },
    {
      title: "Analisador de Micro-Subnichos",
      description: "Encontre temas super específicos e crie um plano de conteúdo otimizado.",
      icon: BarChart3,
      path: "/micro-subnicho-analyzer-tutorial",
      color: "from-indigo-600/20 to-indigo-800/10 border-indigo-500/30 hover:border-indigo-400/50",
      iconClass: "text-indigo-400"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full shadow-lg border border-white/10">
                <BookOpen className="h-10 w-10 text-blue-300" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Tutoriais do YTAnalyzerPro
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Escolha uma ferramenta abaixo para aprender como usá-la de forma simples e eficiente. 
              Todos os tutoriais são criados para serem fáceis de entender e seguir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Link key={index} to={tutorial.path}>
                <Card className={`h-full p-6 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${tutorial.color} border border-white/10 shadow-lg backdrop-blur-sm flex flex-col`}>
                  <div className={`w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center mb-6 ${tutorial.iconClass}`}>
                    <tutorial.icon className="h-6 w-6" />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-white">{tutorial.title}</h2>
                  <p className="text-muted-foreground flex-grow">{tutorial.description}</p>
                  
                  <div className={`flex items-center mt-4 ${tutorial.iconClass}`}>
                    <span className="font-medium">Ver tutorial</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tutorial;
