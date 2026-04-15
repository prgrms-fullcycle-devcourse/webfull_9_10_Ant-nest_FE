import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore.ts';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 로그아웃 훅
 **/
export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return () => {
    queryClient.clear();
    logout();
    navigate('/login', { replace: true });
  };
};
