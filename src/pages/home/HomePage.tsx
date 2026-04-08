import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import myCharacter from '@/assets/images/characters/DALLAE_ANIMATE_1.gif';
import GuestView from '@/features/home/components/GuestView';
import TodayQuestion from '@/features/home/components/TodayQuestion';
import WrittenTodayQuestion from '@/features/home/components/WrittenTodayQuestion';
import { diaries } from '@/features/diaries/diaries.mock';
import QuestionBubble from '@/features/home/components/QuestionBubble';

export default function HomePage() {
  // const { isAuthenticated, user } = useAuthStore();
  const { user } = useAuthStore();
  const isAuthenticated = true;
  // 오늘의 질문 받아올 query
  const question = '오늘 당신을 미소 짓게 만든 것은 무엇인가요?';
  // 일기 작성 여부를 받아올 query
  const [isWrite] = useState(false);
  // isWrite가 true이면.. 해당 일기 정보 가져오기 (제목, 질문)
  const diary = diaries[0];

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      {/* 말풍선 */}
      <QuestionBubble>
        {isAuthenticated ? (
          isWrite ? (
            <WrittenTodayQuestion question={question} diary={diary} />
          ) : (
            <TodayQuestion nickname={user?.nickname || '달래'} question={question} />
          )
        ) : (
          <GuestView />
        )}
      </QuestionBubble>
      <img src={myCharacter} className="w-30 h-auto" />
    </div>
  );
}
