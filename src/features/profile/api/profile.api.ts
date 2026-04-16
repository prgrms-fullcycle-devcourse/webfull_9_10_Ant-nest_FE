import api from '@/lib/api';
import type { ApiResponse } from '@/types/index.types';
import type { ProfileResponse, updateNickname } from '../types/profile.types';

export const fetchProfile = () => {
  return api.get<ApiResponse<ProfileResponse>>(`/members/me`).then((res) => res.data.data);
};

export const changeNickname = (nickname: string) => {
  return api
    .patch<ApiResponse<updateNickname>>('/members/me', { nickname })
    .then((res) => res.data);
};
