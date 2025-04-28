
import React from 'react';
import Header from '@/components/Header';
import ScriptTutorialSteps from '@/components/ScriptTutorialSteps';
import Footer from '@/components/Footer';

const ScriptTutorial = () => {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-6">
      <Header />
      <div className="mt-8 mb-16 w-full">
        <ScriptTutorialSteps />
      </div>
    </div>
  );
};

export default ScriptTutorial;
