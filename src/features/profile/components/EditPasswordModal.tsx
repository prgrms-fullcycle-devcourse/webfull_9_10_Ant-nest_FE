import { Dialog } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import dallae from '@/assets/images/characters/character-draw.gif';

type TEditPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: { currentPassword: string; newPassword: string }) => void;
};

export default function EditPasswordModal({ open, onOpenChange, onSave }: TEditPasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;

  const errorMessage = useMemo(() => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return '모든 값을 입력해주세요.';
    }
    if (newPassword.length < 8 || newPassword.length > 14 || !passwordRegex.test(newPassword)) {
      return '비밀번호는 8~14자의 영문, 숫자, 특수문자 조합으로 해주세요.';
    }
    if (newPassword !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    if (currentPassword === newPassword) {
      return '현재 비밀번호와 다른 비밀번호를 입력해주세요.';
    }
    return '';
  }, [currentPassword, newPassword, confirmPassword]);

  const isDisabled = !!errorMessage;

  const handleClose = (check: boolean) => {
    if (check) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    onOpenChange(check);
  };

  const handleSave = () => {
    if (isDisabled) return;
    onSave({
      currentPassword,
      newPassword,
    });
    handleClose(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content maxWidth="360px" className="rounded-2xl">
        <div className="flex justify-center pb-2">
          <img src={dallae} className="size-15" />
        </div>
        <Dialog.Title className="text-center text-lg font-bold text-[var(--color-primary)]">
          비밀번호 변경
        </Dialog.Title>

        <Dialog.Description className="mt-2 text-center text-sm text-[var(--color-gray-dark)]">
          새로 사용할 비밀번호을 입력해주세요.
        </Dialog.Description>
        <div className="mt-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium text-[var(--color-gray-dark)]"
            >
              현재 비밀번호
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호 입력"
              className="h-11 w-full rounded-xl border border-[var(--color-gray-light)] px-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-[var(--color-gray-dark)]"
            >
              새로운 비밀번호
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호 입력"
              className="h-11 w-full rounded-xl border border-[var(--color-gray-light)] px-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-[var(--color-gray-dark)]"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              className="h-11 w-full rounded-xl border border-[var(--color-gray-light)] px-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
        <p className="mt-2 pl-2 text-xs text-red-400">{errorMessage || '\u00A0'}</p>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => handleClose(false)}
            className="flex-1 rounded-xl bg-[var(--color-gray-light)] px-4 py-3 text-sm font-medium text-[var(--color-gray-dark)]"
          >
            취소
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isDisabled}
            className="flex-1 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            변경
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
