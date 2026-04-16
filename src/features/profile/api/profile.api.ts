import api from '@/lib/api';
import type { ApiResponse } from '@/types/index.types';
import type { ProfileResponse } from '../types/profile.types';

export const fetchProfile = () => {
  return api.get<ApiResponse<ProfileResponse>>(`/members/me`).then((res) => res.data.data);
};
