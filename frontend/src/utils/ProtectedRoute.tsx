import React from 'react'
import { useAppSelector } from '../hooks/redux'
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({children}: ProtectedRouteProps) {
  
  const location = useLocation();
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute