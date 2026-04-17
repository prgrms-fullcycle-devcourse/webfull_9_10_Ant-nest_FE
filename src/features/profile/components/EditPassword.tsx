import { Button } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';

// ----------- Components -----------
import FormField from '@/components/common/FormField.tsx';
import { validateCheckPassword, validatePassword } from '@/features/auth/utils/validate.ts';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth.api.ts';

interface Props {
  onClose: () => void;
  onChange: () => void;
}

export default function EditPassword({ onClose, onChange }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    trigger,
    formState: { isValid },
  } = useForm<any>({ mode: 'onChange' });
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const checkPassword = watch('checkPassword');

  const { mutate } = useMutation({
    mutationFn: () => changePassword(currentPassword, newPassword, checkPassword),
    // onSuccess: () => handleChange(),
    // onError: (error) => {
    //   console.log('모야?', error);
    // },
  });

  const handleChange = () => {
    console.log('하잉');
    // onChange();
    mutate();
  };

  return (
    <div>
      <Controller
        name="currentPassword"
        control={control}
        defaultValue=""
        rules={{ validate: validatePassword }}
        render={({ field, fieldState }) => (
          <FormField
            className="mt-[1.5rem]"
            label="현재 비밀번호"
            type="password"
            placeholder="8~14자리 영문, 숫자, 특수문자 조합"
            value={field.value}
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
            success={
              fieldState.isDirty && !fieldState.error
                ? '비밀번호가 일치합니다.' // [fix] '사용 가능한 닉네임입니다.' → 올바른 메시지로 수정
                : undefined
            }
            onChange={field.onChange}
          />
        )}
      />
      <div className="modal-bottom">
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleChange}>변경</Button>
      </div>
    </div>
  );
}
