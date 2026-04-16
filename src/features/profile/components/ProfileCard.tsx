import { useNavigate } from 'react-router-dom';
import type { ProfileResponse } from '../types/profile.types';
import { EMOTIONS } from '@/constants/emotions';
import { ProfileEditPopover } from './ProfileEditPopover';

type TProfileCardProps = {
  profile: ProfileResponse;
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
                함께한 지 {profile.daysSinceJoining ? profile.daysSinceJoining : 1}일째
              </span>
              <span className="rounded-full border border-[var(--color-primary)] px-2 py-1 text-[10px] font-medium text-[var(--color-primary)]">
                연속 출석 {profile.consecutiveDays ? profile.consecutiveDays : 1}일째
              </span>
            </div>

            <p className="text-sm pl-2 font-bold text-[var(--color-primary)]">
              {profile.nickname ? profile.nickname : '달래'}
              <span className="pl-1 text-slate-700">님</span>
            </p>
          </div>
        </div>
        <ProfileEditPopover
          onEditNickname={onEditNickname}
          onEditPassword={onEditPassword}
          onDeleteAccount={onDeleteAccount}
        />
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
