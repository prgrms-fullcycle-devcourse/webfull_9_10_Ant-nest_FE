import { EMOTIONS, SQUARE_EMO } from '@/constants/emotions';
import { useState } from 'react';
import EditNicknameModal from '@/features/profile/components/EditNicknameModal';
import EditPasswordModal from '@/features/profile/components/EditPasswordModal';
import MonthlyEmo from '@/features/profile/components/MonthlyEmo';
import ProfileCard from '@/features/profile/components/ProfileCard';

import { monthlyEmoCount, profile, weeklyEmo } from '@/features/profile/profile.mock';
import WeeklyEmo from '@/features/profile/components/WeeklyEmo';

type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};

type TDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type TEmotionKey = keyof typeof EMOTIONS;

export type TWeeklyEmoItem = {
  index: TDayIndex;
  emotion: TEmotionKey;
};

type TEmoItem = {
  key: string;
  label: string;
  count: number;
  color: string;
  icon: string;
};

export type TMonthlyEmoItem = {
  month: string; // yyyy-mm
  emotions: TEmoItem[];
};

export default function ProfilePage() {
  const [isNicknameOpen, setIsNicknameOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [nickname, setNickname] = useState(profile.profile.nickname);
  const user = {
    nickname,
    totalDiaries: profile.statistics.totalDiaries,
    totalSharedDiaries: profile.statistics.totalSharedDiaries,
  };

  const handleSaveNickname = (newNickname: string) => {
    setNickname(newNickname);
  };

  const handleSavePassword = ({ currentPassword, newPassword }: TChangePassword) => {
    console.log('비밀번호 변경하기.. API', currentPassword, newPassword);
  };

  const handleDeleteAccount = () => {
    console.log('회원탈퇴 api 정말 탈퇴하시겠습니까? 모달 띄우기!');
  };

  return (
    <div className="min-h-full px-4 pb-8 pt-5">
      <div className="mx-auto flex w-full flex-col gap-4">
        {/* 프로필 카드 */}
        <ProfileCard
          profile={user}
          onEditNickname={() => setIsNicknameOpen(true)}
          onEditPassword={() => setIsPasswordOpen(true)}
          onDeleteAccount={handleDeleteAccount}
        />
        {/* 나의 광장 온도 */}
        <section className="rounded-2xl shadow-[var(--shadow-middle)] px-5 py-3 bg-[#fafafa]">
          <h2 className="pb-4 pl-8 font-bold text-[var(--color-gray-dark)]">나의 광장 온도</h2>
          <div className="grid grid-cols-5 gap-4 px-4 justify-items-center">
            {SQUARE_EMO.map((item) => (
              <div
                key={item}
                className="flex flex-col items-center bg-white max-w-12 rounded-2xl p-2 shadow-sm gap-1"
              >
                <div className="text-[var(--color-gray)] rounded-full size-5 text-center">-</div>
                <img src={EMOTIONS[item].emo} className="animate-side size-6" />
              </div>
            ))}
          </div>
        </section>
        {/* 이달/이번주 감정 */}
        <WeeklyEmo data={weeklyEmo} />
        <MonthlyEmo data={monthlyEmoCount} />
        {/* 로그아웃 */}
        <button type="button" className="pt-2 text-sm font-medium text-red-400">
          로그아웃
        </button>
      </div>
      {isNicknameOpen && (
        <EditNicknameModal
          key={nickname}
          open={isNicknameOpen}
          onOpenChange={setIsNicknameOpen}
          currentNickname={nickname}
          onSave={handleSaveNickname}
        />
      )}
      {isPasswordOpen && (
        <EditPasswordModal
          open={isPasswordOpen}
          onOpenChange={setIsPasswordOpen}
          onSave={handleSavePassword}
        />
      )}
    </div>
  );
}
