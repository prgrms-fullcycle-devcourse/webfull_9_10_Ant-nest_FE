import questionEmo from '@/assets/images/logos/logo.png';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import type { TDiaryItem } from '../types/diaries.types';

type TChatBubbleProps = {
  chat: TDiaryItem[];
};

export default function ChatBubble({ chat }: TChatBubbleProps) {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      {chat.map((item) => {
        const time = format(new Date(item.createdAt), 'a h:mm', { locale: ko });
        return (
          <div key={item.id}>
            {/* 날짜 */}
            <div className="flex justify-center py-4">
              <div className="rounded-full bg-[var(--color-gray-light)] opacity-50  px-3 py-1 text-xs text-[var(--color-gray-dark)]">
                {item.date}
              </div>
            </div>
            {/* 질문 */}
            <div className="flex justify-start gap-2 py-2">
              <img src={questionEmo} className="size-10" />
              <div className="rounded-2xl max-w-[70%] bg-white text-sm text-[#788678] shadow-sm p-3">
                {item.question.content}
              </div>
            </div>
            {/* 답변 */}
            <div
              className="flex justify-end items-end py-2 gap-2"
              onClick={() => navigate('/diary/new')}
            >
              <div className="w-20 shrink-0 text-xs text-right text-[var(--color-gray-dark)] p-2">
                {!item.answer.image ? time : ''}
              </div>
              <div className="flex flex-col max-w-[70%] items-end">
                <div className="flex justify-end gap-1 items-end">
                  {/* {!item.answer.image && (
                    <div className="text-xs text-[var(--color-gray-dark)] p-2">{time}</div>
                  )} */}
                  <div className="rounded-2xl w-fit  bg-[#FAFAFA] text-sm text-[#788678] shadow-sm p-3">
                    {/* <div className="flex justify-end gap-2 pb-2">
                      <span className="text-[var(--color-primary)] text-sm">수정</span>
                      <span className="text-[var(--color-secondary)]  text-sm">삭제</span>
                    </div> */}
                    {item.answer.title}
                    {item.answer.content}
                  </div>
                  {/* {!item.answer.image && <img src={item.answer.emo} className="size-10" />} */}
                </div>
                {/* 이미지 있을경우 */}
                {item.answer.image && (
                  <div className="mt-3 flex justify-end gap-2 items-end">
                    <div className="flex items-end gap-1">
                      <div className="text-xs text-[var(--color-gray-dark)] p-2">{time}</div>
                      <div className="rounded-2xl bg-[#FAFAFA] text-[#788678] shadow-sm p-3">
                        <img src={item.answer.image} className="max-w-[180px] rounded-xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <img src={item.answer.emo} className="size-10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
