
import React from 'react';
import Header from '@/components/Header';
import ScriptTutorialSteps from '@/components/ScriptTutorialSteps';
import Footer from '@/components/Footer';

const ScriptTutorial = () => {
  return (
    <div className="min-h-screen flex flex-col w-full pb-32">
      <Header />
      <div className="flex-grow w-full px-4 md:px-8 py-6">
        <div className="mt-8 mb-16 w-full">
          <ScriptTutorialSteps />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptTutorial;
