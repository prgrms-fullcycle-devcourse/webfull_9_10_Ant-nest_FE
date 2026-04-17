import api from '@/lib/api';
import type { ApiResponse } from '@/types/index.types';
import type { MonthlyEmoResponse, ProfileResponse, updateNickname } from '../types/profile.types';

export const fetchProfile = () => {
  return api.get<ApiResponse<ProfileResponse>>(`/members/me`).then((res) => res.data.data);
};

/**
 * 닉네임 변경
 * @param nickname
 **/
export const changeNickname = (nickname: string) => {
  return api
    .patch<ApiResponse<updateNickname>>('/members/me', { nickname })
    .then((res) => res.data);
};

/**
 * 회원탈퇴
 **/
export const deleteUser = () => {
  return api.delete<ApiResponse<null>>('/members/me').then((res) => res.data);
};

export const fetchMonthlyEmo = (year: number, month: number) => {
  return api
    .get<
      ApiResponse<MonthlyEmoResponse>
    >(`members/me/monthly-emotions`, { params: { year, month } })
    .then((res) => res.data.data);
};
