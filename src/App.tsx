
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import MainLayout from './components/layout/MainLayout';
import { fetchSubscriptionDetails } from './utils/authUtils';
import { SubscriptionDetails } from './services/subscription';
import { AuthContext } from './contexts/AuthContext';
import { saveApiKeyToLocalStorage, clearUserFromLocalStorage, createUserFromSession } from './utils/authUtils';
import CodeAssistantPage from "./pages/CodeAssistant";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // Fix: Replace deprecated supabase.auth.user() with session check
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    }
    checkUser();
  }, []);
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(localStorage.getItem('youtubeApiKey'));
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [userDetails, setUserDetails] = useState(createUserFromSession(null));
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoggedIn(!!session);
      setUserDetails(createUserFromSession(session));
      
      if (session) {
        const sub = await fetchSubscriptionDetails();
        setSubscription(sub);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsLoggedIn(event === 'SIGNED_IN');
      setUserDetails(createUserFromSession(session));
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    saveApiKeyToLocalStorage(key);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    clearUserFromLocalStorage();
    setSubscription(null);
  };

  const checkSubscription = async (): Promise<SubscriptionDetails | null> => {
    const sub = await fetchSubscriptionDetails();
    setSubscription(sub);
    return sub;
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      youtubeApiKey, 
      setYoutubeApiKey: handleSetYoutubeApiKey,
      logout: handleLogout,
      needsApiKey,
      setNeedsApiKey,
      user: userDetails,
      session: session,
      subscription: subscription,
      checkSubscription
    }}>
      <Routes>
        <Route path="/" element={<MainLayout><div>Home Page</div></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><div>Pricing Page</div></MainLayout>} />
        <Route path="/contact" element={<MainLayout><div>Contact Page</div></MainLayout>} />
        <Route path="/account" element={
          <PrivateRoute>
            <MainLayout>
              <div>Account Page</div>
            </MainLayout>
          </PrivateRoute>
        } />
        <Route path="/apikey" element={
          <PrivateRoute>
            <MainLayout>
              <div>API Key Setup</div>
            </MainLayout>
          </PrivateRoute>
        } />
        <Route
          path="/login"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <p className="text-center text-gray-600">
                  Please use the Supabase authentication to log in
                </p>
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <p className="text-center text-gray-600">
                  Please use the Supabase authentication to register
                </p>
              </div>
            </div>
          }
        />
        {/* Rota para o Assistente de Código */}
        <Route 
          path="/code-assistant" 
          element={
            <PrivateRoute>
              <MainLayout>
                <CodeAssistantPage />
              </MainLayout>
            </PrivateRoute>
          } 
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
