import { TextField, IconButton } from '@radix-ui/themes';
import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { cn } from '@/utils/cn.ts';

interface FormFieldProps {
  className?: string;
  label?: string;
  success?: string;
  value: string | number; // 입력 데이터
  placeholder: string;
  type?: 'number' | 'email' | 'password' | 'text';
  onChange: (value: string) => void; // 데이터 넘겨주기
  error?: string; // 타입체크 에러메시지
}

export default function FormField({
  className,
  label,
  success,
  value,
  placeholder,
  type,
  onChange,
  error,
}: FormFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={cn(className)}>
      {label && (
        <b
          className="pl-[0.8rem] text-base text-[var(--color-text-default)]
            max-sm2:text-sm
            "
        >
          {label}
        </b>
      )}

      <TextField.Root
        className={cn(
          'relative mt-[0.5rem] [&.rt-TextFieldRoot]:!h-[3.7rem] [&>input]:!py-0 [&>input]:!pr-[0.8rem] [&>input]:!pl-[1.4rem] input-shadow',
          { 'is-error': error, 'is-success': success },
        )}
        value={value}
        placeholder={placeholder}
        type={type === 'password' ? (show ? 'text' : 'password') : type}
        onChange={(e) => onChange(e.target.value)}
      >
        {type === 'password' &&
          ((
            <TextField.Slot side="right">
              <IconButton
                type="button"
                className="!relative !right-[0.6rem] [&:hover]:!bg-transparent"
                variant="ghost"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeClosedIcon className="w-[1.4rem] h-[2rem] text-[var(--color-gray)]" />
                ) : (
                  <EyeOpenIcon className="w-[1.4rem] h-[2rem] text-[var(--color-gray)]" />
                )}
              </IconButton>
            </TextField.Slot>
          ) as React.ReactNode)}
      </TextField.Root>
      {(error || success) && (
        <b
          className={cn('inline-block mt-[0.6rem] text-sm', {
            'text-[var(--color-primary)]': success,
            'text-[var(--color-secondary)]': error,
          })}
        >
          {error || success}
        </b>
      )}
    </div>
  );
}
