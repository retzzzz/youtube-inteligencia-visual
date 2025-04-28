
import React from 'react';
import Header from '@/components/Header';
import TutorialSteps from '@/components/TutorialSteps';
import TutorialHeader from '@/components/TutorialHeader';

const Tutorial = () => {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-6">
      <Header />
      <div className="mt-8 mb-16 w-full">
        <TutorialHeader />
        <TutorialSteps />
      </div>
    </div>
  );
};

export default Tutorial;
