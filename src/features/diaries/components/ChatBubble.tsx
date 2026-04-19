import questionEmo from '@/assets/images/logos/logo.png';
import { useNavigate } from 'react-router-dom';
import type { DiaryItem } from '../types/diaries.types';
import { EMOTIONS } from '@/constants/emotions';
import Character from '@/assets/images/emotions/emotion-blank.png';

type TChatBubbleProps = {
  diaries: DiaryItem[];
};

export default function ChatBubble({ diaries }: TChatBubbleProps) {
  console.log(diaries);
  const navigate = useNavigate();
  if (diaries.length === 0)
    return (
      <div className="flex flex-1 min-h-[calc(100vh-180px)] justify-center flex-col items-center gap-2">
        <img alt="none" src={Character} className="w-25"></img>
        <div className="text-[var(--color-gray)]">이 달에 기록된 감정이 없어요.</div>
      </div>
    );
  return (
    <div>
      {diaries.map((diary) => {
        const emotionKey = EMOTIONS[diary.emotion.type];
        return (
          <div key={diary.diaryId} className="px-4">
            {/* 날짜 */}
            <div className="flex justify-center py-4">
              <div className="rounded-full bg-[var(--color-gray-light)] opacity-50  px-3 py-1 text-xs text-[var(--color-gray-dark)]">
                {diary.diaryDate}
              </div>
            </div>
            {/* 질문 */}
            <div className="flex justify-start gap-2 py-2">
              <img src={questionEmo} className="size-10" />
              <div className="rounded-2xl max-w-[70%] bg-white text-sm text-[#788678] shadow-sm p-3">
                {diary.question}
              </div>
            </div>
            {/* 답변 */}
            <div
              className="flex justify-end items-end py-2 gap-2"
              onClick={() => navigate(`/diary/${diary.diaryId}`)}
            >
              <div className="w-20 shrink-0 text-xs text-right text-[var(--color-gray-dark)] p-2">
                {diary.isEdited && <div>수정됨</div>}
              </div>
              <div className="flex flex-col max-w-[70%] items-end">
                <div className="flex justify-end gap-1 items-end">
                  <div className="rounded-2xl w-fit flex flex-col gap-1 bg-[#FAFAFA] text-sm text-[#788678] shadow-sm p-3">
                    {diary.title}
                    <div className="text-xs text-end text-[var(--color-gray)]">자세히</div>
                  </div>
                </div>
              </div>

              <img src={emotionKey?.emo} className="size-10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
