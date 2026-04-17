import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { changeNickname } from '@/features/profile/api/profile.api.ts';
import { useMutation } from '@tanstack/react-query';
import { validateNickname } from '@/features/auth/utils/validate.ts';
import { useCheckNicknameDuplicate } from '@/hooks/useAuth.ts';
import { Button } from '@radix-ui/themes';

// ----------- Component -----------
import FormField from '@/components/common/FormField.tsx';

interface Props {
  currentNickname: string;
  onClose: () => void;
  onSave: () => void;
}

interface NicknameValue {
  nickname: string;
}

export default function EditNickname({ currentNickname, onClose, onSave }: Props) {
  const {
    control,
    watch,
    trigger,
    setError,
    formState: { isValid },
  } = useForm<NicknameValue>({ mode: 'onChange' });
  const isPendingRef = useRef(false);
  const { mutate, isPending } = useMutation({
    mutationFn: () => changeNickname(nickname),
    onSuccess: onSave,
    onError: () => setError('nickname', { message: '닉네임 변경에 실패했습니다.' }),
    onSettled: () => {
      isPendingRef.current = false;
    },
  });
  const nickname = watch('nickname');

  const isNicknameDuplicate = useCheckNicknameDuplicate(nickname);

  useEffect(() => {
    if (nickname == currentNickname) return;
    if (isNicknameDuplicate) trigger('nickname');
  }, [isNicknameDuplicate, trigger]);

  const handleSave = () => {
    if (isPendingRef.current) return;
    isPendingRef.current = true;
    mutate();
  };

  return (
    <div>
      <div className="mt-5">
        <Controller
          name="nickname"
          defaultValue={currentNickname}
          control={control}
          rules={{
            validate: (value) => {
              const result = validateNickname(value);

              if (result !== true) return result;
              if (isNicknameDuplicate) return '이미 사용중인 닉네임입니다.';
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormField
              className="mt-[1.5rem]"
              label="닉네임"
              type="text"
              placeholder="2~8자리 닉네임 입력"
              value={field.value}
              error={fieldState.error?.message}
              success={
                fieldState.isDirty && !fieldState.error ? '사용 가능한 닉네임입니다.' : undefined
              }
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="modal-bottom">
        <Button type="button" onClick={onClose}>
          취소
        </Button>

        <Button
          type="button"
          disabled={isPending || !isValid || nickname === currentNickname}
          onClick={handleSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
