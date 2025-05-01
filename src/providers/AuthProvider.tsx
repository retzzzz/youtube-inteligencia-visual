
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  saveUserToLocalStorage, 
  clearUserFromLocalStorage, 
  saveApiKeyToLocalStorage, 
  fetchSubscriptionDetails,
  createUserFromSession
} from '@/utils/authUtils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const {
    isLoggedIn, setIsLoggedIn,
    youtubeApiKey, setYoutubeApiKey,
    needsApiKey, setNeedsApiKey,
    user, setUser,
    session, setSession,
    subscription, setSubscription
  } = useAuthState();

  // Função para verificar status da assinatura
  const checkSubscription = async () => {
    if (!isLoggedIn) return;
    
    try {
      const subscriptionDetails = await fetchSubscriptionDetails();
      console.log("Dados da assinatura obtidos:", subscriptionDetails);
      
      if (subscriptionDetails) {
        setSubscription(subscriptionDetails);
      } else {
        console.log("Nenhum dado de assinatura encontrado para o usuário.");
      }
    } catch (error) {
      console.error("Erro ao verificar assinatura:", error);
    }
  };

  // Lidar com mudanças de autenticação
  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } = { unsubscribe: () => {} };

    // Configurar ouvinte de estado de autenticação PRIMEIRO
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, sessionData) => {
          console.log("Estado de autenticação alterado:", event);
          
          if (sessionData) {
            // Usuário logado ou sessão atualizada
            const userId = sessionData.user.id;
            const userName = sessionData.user.user_metadata?.name || "Usuário";
            
            saveUserToLocalStorage(userId, userName);
            
            setUser({
              name: userName,
              id: userId
            });
            
            setSession(sessionData);
            setIsLoggedIn(true);
            
            // Verificar status de assinatura após login
            await checkSubscription();
            
            // Obter chave API do local storage se disponível
            const savedApiKey = localStorage.getItem("youtubeApiKey");
            if (savedApiKey) {
              setYoutubeApiKey(savedApiKey);
              setNeedsApiKey(false);
            } else {
              setNeedsApiKey(true);
            }

            // Se o usuário está na página de login ou na raiz, redirecionar para o dashboard
            if (window.location.pathname === '/login' || window.location.pathname === '/') {
              navigate('/dashboard');
            }
          } else if (event === 'SIGNED_OUT') {
            // Usuário deslogado
            clearUserFromLocalStorage();
            setIsLoggedIn(false);
            setUser(null);
            setSession(null);
            setSubscription(null);
            
            // Redirecionar para página de login quando deslogado
            navigate("/login");
          }
        }
      );
      authSubscription = subscription;
    } catch (error) {
      console.error("Erro ao configurar o listener de mudança de estado de autenticação:", error);
    }

    // ENTÃO verificar se há sessão existente
    const initializeAuth = async () => {
      try {
        // Verificar se o usuário tem uma sessão existente
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erro ao obter sessão:", error);
          return;
        }
        
        if (data.session) {
          setSession(data.session);
          setIsLoggedIn(true);
          
          setUser(createUserFromSession(data.session));
          
          // Verificar se há chave API no armazenamento local
          const savedApiKey = localStorage.getItem("youtubeApiKey");
          if (savedApiKey) {
            setYoutubeApiKey(savedApiKey);
            setNeedsApiKey(false);
          } else {
            setNeedsApiKey(true);
          }
          
          // Verificar assinatura
          await checkSubscription();
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
      }
    };

    initializeAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [navigate, setIsLoggedIn, setNeedsApiKey, setSession, setSubscription, setUser, setYoutubeApiKey]);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    saveApiKeyToLocalStorage(key);
    setNeedsApiKey(false);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    } catch (error) {
      console.error("Erro durante logout:", error);
      
      // Fallback para logout manual se a autenticação do Supabase falhar
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    }
  };

  const value = {
    isLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey: handleSetYoutubeApiKey,
    logout,
    needsApiKey,
    setNeedsApiKey,
    user,
    session,
    subscription,
    checkSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
