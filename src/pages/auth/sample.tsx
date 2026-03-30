import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse, SignupRequest } from '@/types';
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
} from '@/features/auth/utils/validate.ts';

// ----------- Component -----------
import FormField from '@/features/auth/components/FormField.tsx';
import Header from '@/components/common/Header.tsx';
import { Button } from '@radix-ui/themes';

// ----------- IMG -----------
import imgCharacter from '@/assets/images/characters/character-draw.gif';

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

// ────────────────────────────────────────────────────────────────
// useSignupForm hook
// ────────────────────────────────────────────────────────────────

// 백엔드 API 엔드포인트에 맞게 수정 필요
const checkEmailDuplicate = (email: string) =>
  api
    .get<{ isDuplicate: boolean }>(`/auth/check-email?email=${email}`)
    .then((res) => res.data.isDuplicate);

const checkNicknameDuplicate = (nickname: string) =>
  api
    .get<{ isDuplicate: boolean }>(`/auth/check-nickname?nickname=${nickname}`)
    .then((res) => res.data.isDuplicate);

export function useSignupForm() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<SignupFormValues>({ mode: 'onChange' });

  const emailValue = watch('email');
  const nicknameValue = watch('nickname');
  const passwordValue = watch('password');

  const debouncedEmail = useDebounce(emailValue, 500);
  const debouncedNickname = useDebounce(nicknameValue, 500);

  // 이메일 중복 확인
  useEffect(() => {
    if (!debouncedEmail || validateEmail(debouncedEmail) !== true) return;

    checkEmailDuplicate(debouncedEmail)
      .then((isDuplicate) => {
        if (isDuplicate) setError('email', { message: '이미 사용 중인 이메일입니다.' });
      })
      .catch(() => {});
  }, [debouncedEmail, setError]);

  // 닉네임 중복 확인
  useEffect(() => {
    if (!debouncedNickname || validateNickname(debouncedNickname) !== true) return;

    checkNicknameDuplicate(debouncedNickname)
      .then((isDuplicate) => {
        if (isDuplicate) setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      })
      .catch(() => {});
  }, [debouncedNickname, setError]);

  // 회원가입 mutation
  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) =>
      api.post<AuthResponse>('/auth/signup', data).then((res) => res.data),

    onSuccess: (data) => {
      login(data.user, data.accessToken);
      navigate('/', { replace: true });
    },

    onError: (error: any) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message ?? '';

      if (status === 409) {
        if (message.includes('email') || message.includes('이메일')) {
          setError('email', { message: '이미 사용 중인 이메일입니다.' });
        } else if (message.includes('nickname') || message.includes('닉네임')) {
          setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        }
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    signupMutation.mutate({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
  });

  const rules = {
    email: { validate: validateEmail },
    nickname: { validate: validateNickname },
    password: { validate: validatePassword },
    passwordConfirm: { validate: validatePasswordConfirm(passwordValue) },
  };

  return {
    control,
    onSubmit,
    rules,
    isValid,
    isSubmitting: isSubmitting || signupMutation.isPending,
  };
}

// ────────────────────────────────────────────────────────────────
// SignupPage 컴포넌트 (원본)
// ────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<SignupFormValues>({ mode: 'onChange' });

  const password = watch('password');

  const onSubmit = async (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <div className="relative h-auto min-h-screen">
      <Header text="회원가입" />

      <div
        className="absolute top-[25%] m-auto inset-0 max-w-[30rem] w-full
          max-sm2:top-[20%]"
      >
        <div
          className="absolute left-0 right-0 top-[-16%] m-auto w-[4rem]
              max-sm2:top-[-8%]"
        >
          <img src={imgCharacter} alt="" />
        </div>

        {/* 회원가입 */}
        <div
          className="pt-[4rem] pr-[3rem] pb-[3rem] pl-[3rem] rounded-[4rem] bg-white shadow-middle
              max-sm2:p-[2rem] max-sm2:boxshadow-none max-sm2:bg-transparent max-sm2:shadow-none"
        >
          <form className="block" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field, fieldState }) => (
                <FormField
                  label="이메일"
                  type="email"
                  placeholder="example@email.com"
                  value={field.value}
                  error={fieldState.error?.message}
                  success={
                    fieldState.isDirty && !fieldState.error
                      ? '사용 가능한 이메일입니다.'
                      : undefined
                  }
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="nickname"
              defaultValue=""
              control={control}
              rules={{ validate: validateNickname }}
              render={({ field, fieldState }) => (
                <FormField
                  className="mt-[1.5rem]"
                  label="닉네임"
                  type="text"
                  placeholder="2~10자리 닉네임 입력"
                  value={field.value}
                  error={fieldState.error?.message}
                  success={
                    fieldState.isDirty && !fieldState.error
                      ? '사용 가능한 닉네임입니다.'
                      : undefined
                  }
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ validate: validatePassword }}
              render={({ field, fieldState }) => (
                <FormField
                  className="mt-[1.5rem]"
                  label="비밀번호"
                  type="password"
                  placeholder="8~20자리 영문, 숫자, 특수문자 조합"
                  value={field.value}
                  error={fieldState.error?.message}
                  success={
                    fieldState.isDirty && !fieldState.error
                      ? '사용 가능한 비밀번호입니다.'
                      : undefined
                  }
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              defaultValue=""
              control={control}
              rules={{ validate: validatePasswordConfirm(password) }}
              render={({ field, fieldState }) => (
                <FormField
                  className="mt-[1.5rem]"
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={field.value}
                  error={fieldState.error?.message}
                  success={
                    fieldState.isDirty && !fieldState.error
                      ? '사용 가능한 닉네임입니다.'
                      : undefined
                  }
                  onChange={field.onChange}
                />
              )}
            />

            <Button
              type="submit"
              variant="solid"
              className="!mt-[3.1rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn]
                        max-sm2:!text-[1.2rem]"
              disabled={isSubmitting || !isValid}
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
