
import React from 'react';
import Header from '@/components/Header';
import TutorialSteps from '@/components/TutorialSteps';
import TutorialHeader from '@/components/TutorialHeader';
import Footer from '@/components/Footer';

const Tutorial = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex-grow w-full px-4 md:px-8 py-6">
        <div className="mt-8 mb-16 w-full">
          <TutorialHeader />
          <TutorialSteps />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorial;
