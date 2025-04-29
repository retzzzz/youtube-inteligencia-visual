
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  requireSubscription?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ requireSubscription = false }) => {
  const { isLoggedIn, subscription } = useAuth();
  
  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  // Page requires subscription but user doesn't have an active one
  if (requireSubscription && (!subscription || !subscription.isActive)) {
    return <Navigate to="/subscribe" />;
  }
  
  // User is authenticated and has required subscription level
  return <Outlet />;
};
