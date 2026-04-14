import { fetchIsWritten, fetchTodayQuestion } from '@/features/home/api/home.api';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

export const useTodayQuestion = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['todayQuestion'],
    queryFn: fetchTodayQuestion,
    enabled: isAuthenticated,
  });
};

export const useIsWritten = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['isWritten'],
    queryFn: fetchIsWritten,
    enabled: isAuthenticated,
  });
};
