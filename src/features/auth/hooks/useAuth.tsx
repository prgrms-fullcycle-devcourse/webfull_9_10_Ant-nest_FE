import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // [fix] 사용하지 않는 useQuery import 제거
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useEffect } from 'react';
import { validateEmail, validateNickname } from '@/features/auth/utils/validate.ts';
import type { LoginRequest, SignupRequest } from '@/types/index.types.ts';
import type { UseFormSetError } from 'react-hook-form';
import {
  signupUser,
  checkEmailDuplicate,
  checkNicknameDuplicate,
  loginUser,
} from '@/features/auth/services/authService.tsx';
import { useAuthStore } from '@/store/authStore.ts'; // [fix] setError 타입 import 추가

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

/**
 * 이메일 중복 여부를 확인
 * @param email
 * @param setError
 */
export const useCheckEmail = (email: string, setError: UseFormSetError<SignupFormValues>) => {
  const debouncedEmail = useDebounce(email, 500);

  useEffect(() => {
    if (!debouncedEmail || validateEmail(debouncedEmail) !== true) return;

    checkEmailDuplicate(debouncedEmail)
      .then((isDuplicate) => {
        if (isDuplicate) setError('email', { message: '이미 사용 중인 이메일입니다.' });
      })
      .catch(() => {});
  }, [debouncedEmail, setError]);
};

/**
 * 닉네임 중복 여부를 확인
 * @param nickname
 * @param setError
 **/
export const useCheckNickname = (nickname: string, setError: UseFormSetError<SignupFormValues>) => {
  const debouncedNickname = useDebounce(nickname, 500);

  useEffect(() => {
    if (!debouncedNickname || validateNickname(debouncedNickname) !== true) return;

    checkNicknameDuplicate(debouncedNickname)
      .then((isDuplicate) => {
        if (isDuplicate) setError('nickname', { message: '이미 사용중인 닉네임입니다.' });
      })
      .catch(() => {});
  }, [debouncedNickname, setError]);
};

/**
 * 회원가입 데이터 생성 훅
 **/
export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupRequest) => signupUser(data),

    onSuccess: (data) => {
      navigate('/login', { replace: true });
    },
  });
};

/**
 * 로그인 데이터 확인 훅
 **/
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),

    onSuccess: (data, variables) => {
      if (variables.autoLogin) {
        localStorage.setItem('token', data.accessToken);
      } else {
        sessionStorage.setItem('token', data.accessToken);
      }

      login(data.userId, data.accessToken);
      navigate('/', { replace: true });
    },
  });
};
