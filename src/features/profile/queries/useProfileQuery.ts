import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile.api';

export const useProfile = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: fetchProfile,
  });
};
