// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, component: Component }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
