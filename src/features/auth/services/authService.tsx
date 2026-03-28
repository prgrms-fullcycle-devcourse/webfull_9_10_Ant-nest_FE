import api from '@/services/api.ts';
import type { AuthResponse, SignupRequest } from '@/types';

/**
 * * 이메일 중복 여부를 확인한다.
 *  * @param email
 *  * @returns 이메일 중복 여부
 **/
export const checkEmailDuplicate = (email: string) => {
  return api
    .get<{ isDuplicate: boolean }>(`/auth/emails?emails=${email}`)
    .then((res) => res.data.isDuplicate);
};

/**
 * * 닉네임 중복 여부를 확인한다.
 *  * @param nickname
 *  * @returns 닉네임 중복 여부
 **/
export const checkNicknameDuplicate = (nickname: string) => {
  return api
    .get<{ isDuplicate: boolean }>(`/auth/nicknames?nickname=${nickname}`)
    .then((res) => res.data.isDuplicate);
};

export const addUser = (data: SignupRequest) => {
  return api.post<AuthResponse>('/auth/signup', data).then((res) => res.data);
};
