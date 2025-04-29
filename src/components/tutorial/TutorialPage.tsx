
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

interface TutorialStep {
  number: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface TutorialPageProps {
  title: string;
  description: string;
  steps: TutorialStep[];
}

const TutorialPage = ({ title, description, steps }: TutorialPageProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              {description}
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 transition-all hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                    <div className="space-y-2">
                      {step.content}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorialPage;
