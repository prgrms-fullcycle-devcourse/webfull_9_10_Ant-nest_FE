import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore.ts';

/**
 * 로그아웃 훅
 **/
export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return () => {
    logout();
    navigate('/login', { replace: true });
  };
};
