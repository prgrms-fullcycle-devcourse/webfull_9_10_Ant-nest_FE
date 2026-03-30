import { TextField, IconButton } from '@radix-ui/themes';
import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { cn } from '@/utils/cn.ts';

interface FormFieldProps {
  className?: string;
  label?: string;
  value: string | number;
  placeholder: string;
  type?: 'number' | 'email' | 'password' | 'text';
  onChange: (value: string) => void;
  error?: string;
  success?: string;
}

export default function FormField({
  className,
  label,
  value,
  placeholder,
  type,
  onChange,
  error,
  success,
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
          { 'is-error': !!error, 'is-success': !error && !!success },
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
            'text-[var(--color-secondary)]': !!error,
            'text-[var(--color-primary)]': !error && !!success,
          })}
        >
          {error ?? success}
        </b>
      )}
    </div>
  );
}
