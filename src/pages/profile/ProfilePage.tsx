import { useState } from 'react';
import MonthlyEmo from '@/features/profile/components/MonthlyEmo';
import ProfileCard from '@/features/profile/components/ProfileCard';

import { weeklyEmo } from '@/features/profile/profile.mock';
import WeeklyEmo from '@/features/profile/components/WeeklyEmo';
import { useLogoutMutation } from '@/hooks/useAuth';
import { useProfile } from '@/features/profile/queries/useProfileQuery';
import Loading from '@/components/common/Loading';
import CommunityEmo from '@/features/profile/components/CommunityEmo';
import type { EmotionKey } from '@/types/index.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FullScreenModal from '@/components/common/FullScreenModal.tsx';
import EditNickname from '@/features/profile/components/EditNickname.tsx';
import EditPassword from '@/features/profile/components/EditPassword.tsx';
import { deleteUser } from '@/features/profile/api/profile.api.ts';
import ConfirmModal from '@/components/common/ConfirmModal.tsx';

type TDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TWeeklyEmoItem = {
  index: TDayIndex;
  emotion: EmotionKey;
};

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  const [isNicknameOpen, setIsNicknameOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const logout = useLogoutMutation();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => logout(),
  });

  const handleSaveNickname = async () => {
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
    setIsNicknameOpen(false);
  };

  const handleSavePassword = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    mutate();
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
          onDeleteAccount={() => setIsConfirm(true)}
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
        <FullScreenModal
          isOpen={isNicknameOpen}
          title="닉네임 변경"
          desc="사용할 닉네임을 입력해주세요."
          onClose={() => {
            setIsNicknameOpen(false);
          }}
        >
          <EditNickname
            currentNickname={profile.nickname}
            onSave={handleSaveNickname}
            onClose={() => {
              setIsNicknameOpen(false);
            }}
          />
        </FullScreenModal>
      )}
      {/* 비밀번호 수정 모달 */}
      {isPasswordOpen && (
        <FullScreenModal
          isOpen={isPasswordOpen}
          title="비밀번호 변경"
          desc="새로 사용할 비밀번호를 입력해주세요."
          onClose={() => {
            setIsPasswordOpen(false);
          }}
        >
          <EditPassword
            onClose={() => {
              setIsPasswordOpen(false);
            }}
            onChange={handleSavePassword}
          />
        </FullScreenModal>
      )}
      {/* 탈퇴 확인 모달 */}
      <ConfirmModal
        isOpen={isConfirm}
        title="정말 탈퇴하시겠어요?"
        description="탈퇴 시 계정 정보와 모든 데이터가 삭제되며 복구할 수 없습니다."
        confirmLabel="탈퇴"
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsConfirm(false)}
      />
    </div>
  );
}
