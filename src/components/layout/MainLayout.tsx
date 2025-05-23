
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import { SubscriptionBanner } from '@/components/subscription/SubscriptionBanner';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isLoggedIn, subscription } = useAuth();
  
  console.log("MainLayout rendering with auth state:", { isLoggedIn, subscription });
  
  const handleMainLayoutClick = (e: React.MouseEvent) => {
    console.log("MainLayout clicked:", e.target);
  };

  return (
    <div 
      className="flex flex-col min-h-screen w-full"
      onClick={handleMainLayoutClick}
      style={{ isolation: "isolate" }} // Creates a stacking context
    >
      <Header />
      
      {/* Alert Banner for Trial Period - Outside content area */}
      {isLoggedIn && (
        <div className="w-full px-4 md:px-8 mt-2" style={{ zIndex: 5 }}>
          <SubscriptionBanner />
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-grow w-full px-4 md:px-8 py-6 mb-8 z-0">
        {children}
      </div>
      
      <Footer />
      <ApiKeyDialog />
      <Toaster />
    </div>
  );
};

export default MainLayout;
