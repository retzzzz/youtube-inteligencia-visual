
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        'Escolha um nicho específico e bem definido',
        'Estude seu público-alvo',
        'Crie títulos e miniaturas que chamem a atenção',
        'Seja consistente na produção de conteúdo',
        'Analise seus dados e métricas constantemente',
        'Invista em equipamentos de qualidade gradualmente',
        'Aprenda técnicas de edição de vídeo',
        'Mantenha-se atualizado sobre as tendências do YouTube'
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
                <Accordion type="single" collapsible>
                  <AccordionItem value="dicas-importantes">
                    <AccordionTrigger>Expandir Dicas</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {link.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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

