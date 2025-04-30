
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  requireSubscription?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ requireSubscription = false }) => {
  const { isLoggedIn, subscription } = useAuth();
  const location = useLocation();
  
  // Not logged in
  if (!isLoggedIn) {
    // Redirect to login page, but remember where they were trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Page requires subscription but user doesn't have an active one
  if (requireSubscription && (!subscription || !subscription.isActive)) {
    return <Navigate to="/subscribe" replace />;
  }
  
  // User is authenticated and has required subscription level
  return <Outlet />;
};
