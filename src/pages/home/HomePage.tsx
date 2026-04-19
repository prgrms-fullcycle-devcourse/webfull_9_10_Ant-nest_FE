import { useAuthStore } from '../../store/authStore';
import myCharacter from '@/assets/images/characters/DALLAE_ANIMATE_1.gif';
import GuestView from '@/features/home/components/GuestView';
import TodayQuestion from '@/features/home/components/TodayQuestion';
import WrittenTodayQuestion from '@/features/home/components/WrittenTodayQuestion';
import QuestionBubble from '@/features/home/components/QuestionBubble';
import {
  useDiaryDetail,
  useIsWritten,
  useTodayQuestion,
} from '@/features/home/queries/useQuestionQuery';
import Loading from '@/components/common/Loading';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // 오늘의 질문
  const { data: todayQuestion } = useTodayQuestion();
  // 일기 작성 여부를 받아올 query
  const { data: isWritten } = useIsWritten();
  console.log(isWritten);
  const isWrittenCheck = isWritten?.isWritten;

  // isWrite가 true이면.. id값으로 상세 조회 해당 일기 정보 가져오기 (제목, 질문)
  const { data: diary } = useDiaryDetail(isWritten?.diaryId);
  const diaryData = diary?.data;
  console.log(diary?.data);

  const handleClick = (diaryId: string) => {
    navigate(`/diary/${diaryId}`);
  };

  if (isWrittenCheck && !diaryData) return <Loading />;
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      {/* 말풍선 */}
      <QuestionBubble>
        {isAuthenticated ? (
          isWrittenCheck ? (
            diaryData && (
              <WrittenTodayQuestion
                onClick={() => handleClick(diaryData.diaryId)}
                diary={diaryData}
              />
            )
          ) : (
            <TodayQuestion
              nickname={user?.nickname || '달래'}
              question={todayQuestion?.content ?? ''}
            />
          )
        ) : (
          <GuestView />
        )}
      </QuestionBubble>
      <img alt="" src={myCharacter} className="w-30 h-auto" />
    </div>
  );
}
