
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { ArrowRight, Video, Type, FileText, Search, BarChart3, BarChart } from 'lucide-react';

const Tutorial = () => {
  const tutorials = [
    {
      title: "Analisador de Vídeos",
      description: "Aprenda a analisar vídeos do YouTube e descobrir o que os torna populares.",
      icon: Video,
      path: "/video-analyzer-tutorial",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Gerador de Títulos",
      description: "Crie títulos irresistíveis que geram mais cliques e visualizações.",
      icon: Type,
      path: "/title-generator-tutorial",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Roteirizador",
      description: "Organize suas ideias em roteiros profissionais ou crie roteiros do zero.",
      icon: FileText,
      path: "/script-generator-tutorial",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Validador de Subnichos",
      description: "Descubra temas específicos com alto potencial de crescimento.",
      icon: BarChart,
      path: "/subnicho-validator-tutorial",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Pesquisador",
      description: "Use nossa pesquisa avançada para encontrar oportunidades no YouTube.",
      icon: Search,
      path: "/search-tutorial",
      color: "bg-rose-100 text-rose-800"
    },
    {
      title: "Analisador de Micro-Subnichos",
      description: "Encontre temas super específicos e crie um plano de conteúdo otimizado.",
      icon: BarChart3,
      path: "/micro-subnicho-analyzer-tutorial",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Tutoriais do YTAnalyzerPro</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escolha uma ferramenta abaixo para aprender como usá-la de forma simples e eficiente. 
              Todos os tutoriais são criados para serem fáceis de entender e seguir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Link key={index} to={tutorial.path}>
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className={`w-12 h-12 rounded-lg ${tutorial.color} flex items-center justify-center mb-4`}>
                    <tutorial.icon className="h-6 w-6" />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">{tutorial.title}</h2>
                  <p className="text-muted-foreground flex-grow">{tutorial.description}</p>
                  
                  <div className="flex items-center mt-4 text-primary">
                    <span>Ver tutorial</span>
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
