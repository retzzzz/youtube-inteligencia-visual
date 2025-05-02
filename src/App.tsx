import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Account } from './pages/Account';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { MainLayout } from './components/layout/MainLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { fetchSubscriptionDetails } from './utils/authUtils';
import { SubscriptionDetails } from './services/subscription';
import { AuthContext } from './contexts/AuthContext';
import { saveApiKeyToLocalStorage, clearUserFromLocalStorage, createUserFromSession } from './utils/authUtils';
import { YoutubeSearchPage } from './pages/YoutubeSearchPage';
import { ScriptGeneratorPage } from './pages/ScriptGeneratorPage';
import { ApiKeySetup } from './pages/ApiKeySetup';
import CodeAssistantPage from "./pages/CodeAssistant";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [supabaseClient] = useSupabaseClient();
  const user = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(localStorage.getItem('youtubeApiKey'));
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [session, setSession] = useState(null);
  const [userDetails, setUserDetails] = useState(createUserFromSession(null));
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      setSession(session);
      setIsLoggedIn(!!session);
      setUserDetails(createUserFromSession(session));
      
      if (session) {
        const sub = await fetchSubscriptionDetails();
        setSubscription(sub);
      }
    };

    initializeAuth();

    supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsLoggedIn(event === 'SIGNED_IN');
      setUserDetails(createUserFromSession(session));
    });
  }, [supabaseClient]);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    saveApiKeyToLocalStorage(key);
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
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
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/youtube-search" element={
          <PrivateRoute>
            <MainLayout>
              <YoutubeSearchPage />
            </MainLayout>
          </PrivateRoute>
        } />
        <Route path="/script-generator" element={
          <PrivateRoute>
            <MainLayout>
              <ScriptGeneratorPage />
            </MainLayout>
          </PrivateRoute>
        } />
        <Route path="/account" element={
          <PrivateRoute>
            <MainLayout>
              <Account />
            </MainLayout>
          </PrivateRoute>
        } />
        <Route path="/apikey" element={
          <PrivateRoute>
            <MainLayout>
              <ApiKeySetup />
            </MainLayout>
          </PrivateRoute>
        } />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Auth
                supabaseClient={supabaseClient}
                appearance={{ theme: ThemeSupa }}
                providers={['google']}
                redirectTo={`${window.location.origin}/account`}
              />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Auth
                supabaseClient={supabaseClient}
                appearance={{ theme: ThemeSupa }}
                providers={['google']}
                redirectTo={`${window.location.origin}/account`}
                onlyThirdPartyProviders={true}
              />
            </AuthLayout>
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
