import { DotsVerticalIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';

type Props = {
  onEditNickname: () => void;
  onEditPassword: () => void;
  onDeleteAccount: () => void;
};

export const ProfileEditPopover = ({ onEditNickname, onEditPassword, onDeleteAccount }: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-[var(--color-gray)]"
        >
          <DotsVerticalIcon className="h-4 w-4" />
        </button>
      </Popover.Trigger>
      <Popover.Content
        side="bottom"
        align="center"
        className="rounded-xl bg-white shadow-lg overflow-hidden min-w-35"
      >
        <Popover.Close asChild>
          <div>
            <p
              className="text-sm text-[var(--color-gray-dark)] text-center p-3 hover:bg-[var(--color-gray-light)] hover:text-[var(--color-primary)]"
              onClick={() => onEditNickname()}
            >
              닉네임 변경
            </p>
            <div className="h-px bg-[var(--color-gray-light)]" />
            <p
              className="text-sm text-[var(--color-gray-dark)] text-center p-3 hover:bg-[var(--color-gray-light)] hover:text-[var(--color-primary)]"
              onClick={() => onEditPassword()}
            >
              비밀번호 변경
            </p>
            <div className="h-px bg-[var(--color-gray-light)]" />
            <p
              className="text-sm text-[var(--color-secondary)] text-center p-3 hover:bg-[var(--color-gray-light)]"
              onClick={() => onDeleteAccount()}
            >
              회원 탈퇴
            </p>
          </div>
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
};
