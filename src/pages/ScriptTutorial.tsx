
import React from 'react';
import Header from '@/components/Header';
import ScriptTutorialSteps from '@/components/ScriptTutorialSteps';
import Footer from '@/components/Footer';

const ScriptTutorial = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px] min-h-screen bg-background">
      <Header />
      <div className="mt-8 mb-16">
        <ScriptTutorialSteps />
      </div>
      <Footer />
    </div>
  );
};

export default ScriptTutorial;
