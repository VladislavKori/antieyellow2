import React from 'react'
import { useAppSelector } from '../hooks/redux'
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: JSX.Element
}

function AdminRoute({children}: AdminRouteProps) {
  
  const location = useLocation();
  const user = useAppSelector((state) => state.user);

    let isAdmin = false;

    if (user) {
      // @ts-ignore
      user.userInfo.roles.map((item: string) => {
        if (item == "ADMIN") { isAdmin = true; }
    })
    }

    

  if (!user && isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default AdminRoute