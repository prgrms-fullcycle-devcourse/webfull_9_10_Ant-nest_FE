import { fetchDiaryDetail, fetchIsWritten, fetchTodayQuestion } from '@/features/home/api/home.api';
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

const today = new Date().toISOString().split('T')[0];

export const useTodayQuestion = () => {
  const { isAuthenticated, user } = useAuthStore();
  return useQuery({
    queryKey: ['todayQuestion', today, user?.id],
    queryFn: fetchTodayQuestion,
    enabled: isAuthenticated,
  });
};

export const useIsWritten = () => {
  const { isAuthenticated, user } = useAuthStore();
  return useQuery({
    queryKey: ['isWritten', today, user?.id],
    queryFn: fetchIsWritten,
    enabled: isAuthenticated,
  });
};

export const useDiaryDetail = (diaryId?: number) => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['diary', 'detail', diaryId, user?.id],
    queryFn: () => fetchDiaryDetail(diaryId!),
    enabled: !!diaryId,
  });
};
