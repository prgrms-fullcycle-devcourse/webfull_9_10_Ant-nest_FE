import { Dialog } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import dallae from '@/assets/images/characters/character-draw.gif';

type TEditNicknameModal = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentNickname: string;
  onSave: (nickname: string) => void;
};

export default function EditNicknameModal({
  open,
  onOpenChange,
  currentNickname,
  onSave,
}: TEditNicknameModal) {
  const [nickname, setNickname] = useState(currentNickname);
  const trimmedNickname = nickname.trim();

  const errorMessage = useMemo(() => {
    if (!trimmedNickname) return '닉네임을 입력해주세요.';
    if (trimmedNickname.length < 2) return '닉네임은 2자 이상이어야 해요.';
    if (trimmedNickname.length > 10) return '닉네임은 10자 이하로 입력해주세요.';
    return '';
  }, [trimmedNickname]);

  const isDisabled = !!errorMessage || trimmedNickname === currentNickname;

  // 중복 닉네임일 경우
  const handleSave = () => {
    if (isDisabled) return;
    onSave(trimmedNickname);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="360px" className="rounded-2xl">
        <div className="flex justify-center pb-2">
          <img src={dallae} className="size-15" />
        </div>
        <Dialog.Title className="text-center text-lg font-bold text-[var(--color-primary)]">
          닉네임 변경
        </Dialog.Title>

        <Dialog.Description className="mt-2 text-center text-sm text-[var(--color-gray-dark)]">
          새로 사용할 닉네임을 입력해주세요.
        </Dialog.Description>

        <div className="mt-5">
          <label
            htmlFor="nickname"
            className="mb-2 block text-sm font-medium text-[var(--color-gray-dark)]"
          >
            닉네임
          </label>

          <input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
            maxLength={10}
            className="h-11 w-full rounded-xl border border-[var(--color-gray-light)] px-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-red-400">{errorMessage || '\u00A0'}</p>
            <span className="text-xs text-[var(--color-gray)]">{trimmedNickname.length}/10</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
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
            저장
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
