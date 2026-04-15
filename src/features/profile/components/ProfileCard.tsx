import { EMOTIONS } from '@/constants/emotions';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { useNavigate } from 'react-router-dom';

type TProfile = {
  nickname: string;
  totalDiaries: number;
  totalSharedDiaries: number;
  registrationDate?: number;
  attendance?: number;
};

type TProfileCardProps = {
  profile: TProfile;
  onEditNickname: () => void;
  onEditPassword: () => void;
  onDeleteAccount: () => void;
};

export default function ProfileCard({
  profile,
  onEditNickname,
  onEditPassword,
  onDeleteAccount,
}: TProfileCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl shadow-[var(--shadow-middle)]">
      <div className="flex items-start justify-between px-4 py-4">
        <div className="flex gap-3">
          <div className="flex items-center justify-center rounded-full text-2xl ">
            <img className="size-10" src={EMOTIONS.HAPPY.emo} />
          </div>

          <div>
            <div className="mb-1 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-primary)] border border-[var(--color-primary)] px-2 py-1 text-[10px] font-medium text-white">
                함께한 지 {profile.registrationDate ? profile.registrationDate : 1}일째
              </span>
              <span className="rounded-full border border-[var(--color-primary)] px-2 py-1 text-[10px] font-medium text-[var(--color-primary)]">
                연속 출석 {profile.attendance ? profile.attendance : 1}일째
              </span>
            </div>

            <p className="text-sm pl-2 font-bold text-[var(--color-primary)]">
              {profile.nickname ? profile.nickname : '달래'}
              <span className="pl-1 text-slate-700">님</span>
            </p>
          </div>
        </div>
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
      </div>

      <div className="grid grid-cols-2 border-t border-[var(--color-gray-light)]">
        <div
          onClick={() => navigate('/diary')}
          className="flex flex-col items-center justify-center py-2"
        >
          <span className="text-xs text-[var(--color-gray)]">기록한 일기</span>
          <span className="mt-1 text-md font-bold text-[var(--color-primary)]">
            {profile.totalDiaries ? profile.totalDiaries : 0}
          </span>
        </div>
        <div
          onClick={() => navigate('/community')}
          className="flex flex-col items-center justify-center py-2"
        >
          <span className="text-xs text-[var(--color-gray)]">내 광장</span>
          <span className="mt-1 text-md font-bold text-[var(--color-primary)]">
            {profile.totalSharedDiaries ? profile.totalSharedDiaries : 0}
          </span>
        </div>
      </div>
    </div>
  );
}
