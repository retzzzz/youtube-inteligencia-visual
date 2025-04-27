
import React from 'react';
import Header from '@/components/Header';
import TutorialSteps from '@/components/TutorialSteps';
import TutorialHeader from '@/components/TutorialHeader';

const Tutorial = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px] min-h-screen bg-background">
      <Header />
      <div className="mt-8 mb-16">
        <TutorialHeader />
        <TutorialSteps />
      </div>
    </div>
  );
};

export default Tutorial;
