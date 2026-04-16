import { useState } from 'react';
import EditNicknameModal from '@/features/profile/components/EditNicknameModal';
import EditPasswordModal from '@/features/profile/components/EditPasswordModal';
import MonthlyEmo from '@/features/profile/components/MonthlyEmo';
import ProfileCard from '@/features/profile/components/ProfileCard';

import { weeklyEmo } from '@/features/profile/profile.mock';
import WeeklyEmo from '@/features/profile/components/WeeklyEmo';
import { useLogoutMutation } from '@/hooks/useAuth';
import { useProfile } from '@/features/profile/queries/useProfileQuery';
import Loading from '@/components/common/Loading';
import CommunityEmo from '@/features/profile/components/CommunityEmo';
import type { EmotionKey } from '@/types/index.types';
import { useQueryClient } from '@tanstack/react-query';

type TDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TWeeklyEmoItem = {
  index: TDayIndex;
  emotion: EmotionKey;
};

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  const [isNicknameOpen, setIsNicknameOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const logout = useLogoutMutation();
  const queryClient = useQueryClient();

  const handleSaveNickname = () => {
    // 닉네임 변경 후 프로필 반영
    queryClient.invalidateQueries();
  };

  const handleSavePassword = () => {
    console.log('비밀번호 변경하기.. API');
  };

  const handleDeleteAccount = () => {
    console.log('회원탈퇴 api 정말 탈퇴하시겠습니까? 모달 띄우기!');
  };

  if (isLoading) return <Loading />;
  if (!profile) return;
  return (
    <div className="min-h-full px-4 pb-8 pt-5">
      <div className="mx-auto flex w-full flex-col gap-4">
        {/* 프로필 카드 */}
        <ProfileCard
          profile={profile}
          onEditNickname={() => setIsNicknameOpen(true)}
          onEditPassword={() => setIsPasswordOpen(true)}
          onDeleteAccount={handleDeleteAccount}
        />
        {/* 나의 광장 온도 */}
        <CommunityEmo emo={profile.receivedEmpathies ?? []} />

        {/* 이달/이번주 감정 */}
        <WeeklyEmo data={weeklyEmo} />
        <MonthlyEmo data={profile.monthlyEmotions} />
        {/* 로그아웃 */}
        <button type="button" className="pt-2 text-sm font-medium text-red-400" onClick={logout}>
          로그아웃
        </button>
      </div>

      {/* 닉네임 수정 모달 */}
      {isNicknameOpen && (
        <EditNicknameModal
          open={isNicknameOpen}
          onOpenChange={setIsNicknameOpen}
          currentNickname={profile.nickname}
          onSave={handleSaveNickname}
        />
      )}
      {/* 비밀번호 수정 모달 */}
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
