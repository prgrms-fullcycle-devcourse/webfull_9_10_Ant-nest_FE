import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // [fix] 사용하지 않는 useQuery import 제거
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useEffect } from 'react';
import { validateEmail, validateNickname } from '@/features/auth/utils/validate.ts';
import type { SignupRequest } from '@/types';
import type { UseFormSetError } from 'react-hook-form';
import {
  addUser,
  checkEmailDuplicate,
  checkNicknameDuplicate,
} from '@/features/auth/services/authService.tsx'; // [fix] setError 타입 import 추가

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
 * 회원가입 mutation 훅
 **/
export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupRequest) => addUser(data),

    onSuccess: (data) => {
      navigate('/login', { replace: true });
    },
  });
};
