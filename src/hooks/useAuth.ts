import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, SignupRequest, AuthResponse } from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) =>
      api.post<AuthResponse>('/auth/login', data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      navigate('/');
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) =>
      api.post<AuthResponse>('/auth/signup', data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      navigate('/');
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation,
    signup: signupMutation,
    logout: handleLogout,
  };
}