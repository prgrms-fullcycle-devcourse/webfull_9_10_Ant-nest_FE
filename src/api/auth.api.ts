import api from '@/lib/api.ts';
import type { ApiResponse, updatePassword } from '@/types/index.types.ts';

/**
 * 닉네임 중복 여부를 확인
 * @param nickname
 * @returns 닉네임 중복 여부
 **/
export const checkNicknameDuplicate = (nickname: string) => {
  return api
    .get<
      ApiResponse<{ result: boolean }>
    >(`/auth/nicknames?nickname=${encodeURIComponent(nickname)}`)
    .then((res) => res.data.data.result);
};

/**
 * 비밀번호 변경
 * @param currentPassword
 * @param newPassword
 * @param checkPassword
 * @returns 변경 완료
 **/
export const changePassword = (
  currentPassword: string,
  newPassword: string,
  checkPassword: string,
) => {
  return api
    .patch<
      ApiResponse<updatePassword>
    >('/members/me/password', { currentPassword, newPassword, checkPassword })
    .then((res) => {
      console.log('ghkrls', res.data);
      debugger;
    });
};
