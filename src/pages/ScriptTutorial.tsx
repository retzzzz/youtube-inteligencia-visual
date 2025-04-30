
import React from 'react';
import Header from '@/components/Header';
import ScriptTutorialSteps from '@/components/ScriptTutorialSteps';
import Footer from '@/components/Footer';

const ScriptTutorial = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="max-w-5xl mx-auto mt-8 mb-16 w-full">
          <ScriptTutorialSteps />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScriptTutorial;
