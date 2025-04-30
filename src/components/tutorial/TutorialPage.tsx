
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
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <Card 
                key={step.number} 
                className="p-6 transition-all hover:shadow-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-semibold text-primary">
                        {step.number}.
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pl-6">
                    {step.content}
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
