
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
