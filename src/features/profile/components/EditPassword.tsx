import { Button } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { validateCheckPassword, validatePassword } from '@/features/auth/utils/validate.ts';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth.api.ts';
import { useRef } from 'react';

// ----------- Components -----------
import FormField from '@/components/common/FormField.tsx';

// ----------- Types -----------
import type { AxiosError } from 'axios';

interface EditPasswordValues {
  currentPassword: string;
  newPassword: string;
  checkPassword: string;
}

interface Props {
  onClose: () => void;
  onChange: () => void;
}

export default function EditPassword({ onClose, onChange }: Props) {
  const {
    control,
    watch,
    setError,
    formState: { isValid },
  } = useForm<EditPasswordValues>({ mode: 'onChange' });
  const isPendingRef = useRef(false);
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const checkPassword = watch('checkPassword');

  const { mutate, isPending } = useMutation({
    mutationFn: () => changePassword(currentPassword, newPassword, checkPassword),
    onSuccess: () => onChange(),
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        setError('currentPassword', { message: '현재 비밀번호가 일치하지 않습니다.' });
      }
      if (error.response?.status === 400) {
        setError('newPassword', {
          message: '새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다.',
        });
        setError('checkPassword', {
          message: '새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다.',
        });
      }
    },
    onSettled: () => {
      isPendingRef.current = false;
    },
  });

  const handleChange = () => {
    if (isPendingRef.current) return;
    isPendingRef.current = true;
    mutate();
  };

  return (
    <div>
      <Controller
        name="currentPassword"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <FormField
            className="mt-[1.5rem]"
            label="현재 비밀번호"
            type="password"
            placeholder="현재 비밀번호"
            value={field.value}
            error={fieldState.error?.message}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        rules={{ validate: validatePassword }}
        render={({ field, fieldState }) => (
          <FormField
            className="mt-[1.5rem]"
            label="새 비밀번호"
            type="password"
            placeholder="8~14자리 영문, 숫자, 특수문자 조합"
            value={field.value}
            error={fieldState.error?.message}
            success={
              fieldState.isDirty && !fieldState.error ? '사용 가능한 비밀번호입니다.' : undefined
            }
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="checkPassword"
        defaultValue=""
        control={control}
        rules={{ validate: validateCheckPassword(newPassword) }}
        render={({ field, fieldState }) => (
          <FormField
            className="mt-[1.5rem]"
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호 확인"
            value={field.value}
            error={fieldState.error?.message}
            success={fieldState.isDirty && !fieldState.error ? '비밀번호가 일치합니다.' : undefined}
            onChange={field.onChange}
          />
        )}
      />
      <div className="modal-bottom">
        <Button onClick={onClose}>취소</Button>
        <Button disabled={isPending || !isValid} onClick={handleChange}>
          변경
        </Button>
      </div>
    </div>
  );
}
