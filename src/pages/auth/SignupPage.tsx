import { Controller, useForm } from 'react-hook-form';
import {
  useSignupMutation,
  useCheckEmail,
  useCheckNickname,
} from '@/features/auth/hooks/useAuth.tsx';

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

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<SignupFormValues>({ mode: 'onChange' });

  const password = watch('password');
  const email = watch('email');
  const nickname = watch('nickname');

  useCheckEmail(email, setError);
  useCheckNickname(nickname, setError);

  const signupMutation = useSignupMutation();

  // [fix] form onSubmit={handleSubmit(onSubmit)} 과 이중 중첩되지 않도록 수정
  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate(data, {
      onError: (error: any) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message ?? '';

        if (status === 400) {
          setError('password', { message });
        }

        if (status === 409) {
          if (message.includes('이메일')) {
            setError('email', { message });
          }

          if (message.includes('닉네임')) {
            setError('nickname', { message });
          }
        }
      },
    });
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
                      ? '비밀번호가 일치합니다.' // [fix] '사용 가능한 닉네임입니다.' → 올바른 메시지로 수정
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
