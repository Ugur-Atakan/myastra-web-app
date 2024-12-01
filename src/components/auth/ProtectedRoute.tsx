import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import AccessDenied from './AccessDenied';
import { getUserTokens } from '../../utils/storage';
import { useAppDispatch } from '../../store/hooks';
import instance from '../../http/instance';
import { login } from '../../store/slices/userSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { userData } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const dispatch=useAppDispatch();

  const userTokens = getUserTokens();
  console.log('User tokens:', userTokens);

  const getUserData = async () => {
    try {
      const response = await instance.post('/user/me');
      console.log('User data:', response.data); 
      dispatch(login(response.data));
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      
      // Hata nesnesini güvenli bir şekilde işle
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message; // Ağ hataları için
      }
  
      console.error('Failed to get user data:', error);
      toast.error(`Failed to get user data because: ${errorMessage}`);
    }
  };

  useEffect (() => {
    if (userTokens) {
      getUserData();
    }
  }, [userTokens]);

  // If there's no token, redirect to login
  if (!userTokens) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If roles are required but user has no roles or doesn't have the required role
  if (requiredRoles && (!userData?.roles || !requiredRoles.some(role => userData.roles.includes(role)))) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}