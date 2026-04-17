import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore.ts';
import { useDebounce } from '@/hooks/useDebounce.ts';
import { useEffect, useState } from 'react';
import { validateNickname } from '@/features/auth/utils/validate.ts';
import { checkNicknameDuplicate } from '@/api/auth.api.ts';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 로그아웃 훅
 **/
export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    navigate('/login', { replace: true });
  };
};

/**
 * 닉네임 중복 여부를 확인
 * @param nickname
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
