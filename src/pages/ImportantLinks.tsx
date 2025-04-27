
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

const ImportantLinks = () => {
  const importantLinks = [
    {
      title: 'Tutorial Canal Dark',
      description: 'Aprenda a criar e crescer seu canal no YouTube com estratégias eficientes.',
      path: '/tutorial'
    },
    {
      title: 'Tutorial de Roteiros',
      description: 'Descubra como criar roteiros envolventes e de alta qualidade.',
      path: '/script-tutorial'
    },
    {
      title: 'Dicas Importantes',
      description: 'Informações cruciais para o sucesso do seu canal de YouTube.',
      content: [
        'Evite postagens excessivas de conteúdo similar em curto período para não sofrer shadowban',
        'Interaja genuinamente com sua audiência para aumentar o engajamento',
        'Mantenha uma consistência na programação de uploads para treinar o algoritmo',
        'Títulos clickbait podem aumentar visualizações iniciais mas prejudicam retenção a longo prazo',
        'Thumbnails personalizadas têm 43% mais chances de conversão do que capturas automáticas',
        'Estude métricas de retenção para identificar momentos onde a audiência perde interesse',
        'Colaborações estratégicas podem expandir seu alcance para novos públicos',
        'SEO adaptado para YouTube é fundamental - use tags relevantes e descrições detalhadas'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px] min-h-screen bg-background">
      <Header />
      
      <div className="space-y-8 mt-8">
        <h1 className="text-4xl font-bold text-center mb-12">Links Importantes</h1>
        
        {importantLinks.map((link, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-all">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{link.title}</h2>
              {link.description && <p className="text-muted-foreground">{link.description}</p>}
              
              {link.path && (
                <Link 
                  to={link.path} 
                  className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  Ver Tutorial
                </Link>
              )}
              
              {link.content && (
                <div className="mt-4">
                  <div className="flex items-center text-primary font-semibold mb-3">
                    <Info className="mr-2 w-5 h-5" />
                    Dicas Importantes
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {link.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default ImportantLinks;

