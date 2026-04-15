import questionEmo from '@/assets/images/logos/logo.png';
import { useNavigate } from 'react-router-dom';
import type { DiaryItem } from '../types/diaries.types';
import { EMOTIONS } from '@/constants/emotions';

type TChatBubbleProps = {
  diaries: DiaryItem[];
};

export default function ChatBubble({ diaries }: TChatBubbleProps) {
  const navigate = useNavigate();
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
              onClick={() => navigate('/diary/1')}
            >
              <div className="w-20 shrink-0 text-xs text-right text-[var(--color-gray-dark)] p-2">
                {/* {!chat.answer.image ? time : ''} */}
              </div>
              <div className="flex flex-col max-w-[70%] items-end">
                <div className="flex justify-end gap-1 items-end">
                  <div className="rounded-2xl w-fit  bg-[#FAFAFA] text-sm text-[#788678] shadow-sm p-3">
                    {diary.title}
                    {/* {item.answer.content} */}
                  </div>
                </div>
                {/* {item.answer.image && (
              <div className="mt-3 flex justify-end gap-2 items-end">
                <div className="flex items-end gap-1">
                  <div className="text-xs text-[var(--color-gray-dark)] p-2">{time}</div>
                  <div className="rounded-2xl bg-[#FAFAFA] text-[#788678] shadow-sm p-3">
                    <img src={item.answer.image} className="max-w-[180px] rounded-xl" />
                  </div>
                </div>
              </div>
            )} */}
              </div>

              <img src={emotionKey?.emo} className="size-10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
