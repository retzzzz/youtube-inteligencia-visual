
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  requireSubscription?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ requireSubscription = false }) => {
  const { isLoggedIn, subscription } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we're not logged in, immediately redirect to login
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // Not logged in
  if (!isLoggedIn) {
    // Return null while the redirect effect takes place
    return null;
  }
  
  // Page requires subscription but user doesn't have an active one
  if (requireSubscription && (!subscription || !subscription.isActive)) {
    return <Navigate to="/subscribe" replace />;
  }
  
  // User is authenticated and has required subscription level
  return <Outlet />;
};
