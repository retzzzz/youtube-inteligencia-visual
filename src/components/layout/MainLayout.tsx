
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ApiKeyDialog from '@/components/ApiKeyDialog';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex-grow w-full px-4 md:px-8 py-6 mb-8 relative z-0">
        {children}
      </div>
      <Footer />
      <ApiKeyDialog />
      <Toaster />
    </div>
  );
};

export default MainLayout;
