import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // [fix] 사용하지 않는 useQuery import 제거
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useEffect, useState } from 'react';
import { validateEmail, validateNickname } from '@/features/auth/utils/validate.ts';
import {
  signupUser,
  checkEmailDuplicate,
  checkNicknameDuplicate,
  loginUser,
} from '@/features/auth/services/auth.service.ts';
import { useAuthStore } from '@/store/authStore.ts';
import type { User } from '@/types/index.types.ts';

/**
 * 이메일 중복 여부를 확인
 * @param email
 * @param setError
 */
export const useCheckEmailDuplicate = (email: string) => {
  const debouncedEmail = useDebounce(email, 300);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    setIsDuplicate(false);
  }, [email]);

  useEffect(() => {
    if (!debouncedEmail || validateEmail(debouncedEmail) !== true) return;

    checkEmailDuplicate(debouncedEmail)
      .then(setIsDuplicate)
      .catch(() => {});
  }, [debouncedEmail]);

  return isDuplicate;
};

/**
 * 닉네임 중복 여부를 확인
 * @param nickname
 * @param setError
 **/
export const useCheckNicknameDuplicate = (nickname: string) => {
  const debouncedNickname = useDebounce(nickname, 300);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    setIsDuplicate(false);
  }, [nickname]);

  useEffect(() => {
    if (!debouncedNickname || validateNickname(debouncedNickname) !== true) return;

    checkNicknameDuplicate(debouncedNickname)
      .then(setIsDuplicate)
      .catch(() => {});
  }, [debouncedNickname]);

  return isDuplicate;
};

/**
 * 회원가입 데이터 생성 훅
 **/
export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupUser,

    onSuccess: () => {
      navigate('/signup/success', { replace: true });
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
    mutationFn: loginUser,

    onSuccess: (data, variables) => {
      if (variables.autoLogin) {
        localStorage.setItem('token', data.data.accessToken);
      } else {
        sessionStorage.setItem('token', data.data.accessToken);
      }

      const user: User = {
        id: data.data.userId,
        email: variables.email,
        nickname: data.data.nickname,
        createdAt: '',
      };

      login(user, data.data.accessToken);
      navigate('/', { replace: true });
    },
  });
};
