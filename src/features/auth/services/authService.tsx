import api from '@/services/api.ts';
import type { ApiResponse } from '@/types/index.types.ts';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '@/features/auth/types/auth.types.ts';

/**
 * 이메일 중복 여부를 확인한다.
 * @param email
 * @returns 이메일 중복 여부
 **/
export const checkEmailDuplicate = (email: string) => {
  return api
    .get<{ isDuplicate: boolean }>(`/auth/emails?emails=${email}`)
    .then((res) => res.data.isDuplicate);
};

/**
 * 닉네임 중복 여부를 확인한다.
 * @param nickname
 * @returns 닉네임 중복 여부
 **/
export const checkNicknameDuplicate = (nickname: string) => {
  return api
    .get<{ isDuplicate: boolean }>(`/auth/nicknames?nickname=${nickname}`)
    .then((res) => res.data.isDuplicate);
};

/**
 * 회원가입 요청을 보낸다.
 * @param data
 * @returns 회원가입 응답 데이터
 **/
export const signupUser = (data: SignupRequest) => {
  return api.post<ApiResponse<SignupResponse>>('/auth/signup', data).then((res) => res.data);
};

/**
 * 로그인 요청을 보낸다.
 * @param data
 * @returns 로그인 응답 데이터
 **/
export const loginUser = (data: LoginRequest) => {
  return api.post<ApiResponse<LoginResponse>>('/auth/login', data).then((res) => res.data);
};
