import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchDiaryList } from '../api/diaries.api';

export const useDiaryListQuery = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['diaries'],
    queryFn: () => fetchDiaryList(),
    enabled: isAuthenticated,
  });
};
