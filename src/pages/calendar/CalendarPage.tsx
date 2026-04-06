import { useState } from 'react';
import { useDiaryCalendar } from '@/features/calendar/hooks/useCalendar.ts';
import { koreanOrder } from '@/utils/koreanOrder.ts';

/** 컴포넌트 **/
import CalendarDiaryCard from '@/features/calendar/components/CalendarDiaryCard.tsx';
import DiaryCalendar from '@/features/calendar/components/DiaryCalendar.tsx';
import ConfirmModal from '@/components/common/ConfirmModal.tsx';

/** 이미지 **/
import emptyEmoji from '@/assets/images/emotions/emotion-blank.png';

/** 타입 **/
import type { CalendarList } from '@/features/calendar/types/calendar.types.ts';
import { formatDateKey } from '@/utils/formatDate.ts';

export default function CalendarPage() {
  const [value, setValue] = useState<CalendarList | null>(null);
  const [modal, setModal] = useState(false);
  // const { diaryMap, isLoading, error } = useDiaryCalendar();
  const diaryMap = useDiaryCalendar();

  const calendarClick = (date: Date) => {
    const key = formatDateKey(date);
    const entry = diaryMap.get(key);

    setValue(entry ?? null);
  };

  const deleteClick = () => {
    setModal(true);
  };

  const modalConfirm = () => {
    setModal(false);
  };

  return (
    <div>
      <DiaryCalendar diaryMap={diaryMap} onClick={calendarClick} />
      <div className="pt-[2rem] px-[1rem]">
        {value ? (
          <CalendarDiaryCard
            emoji={value?.emotion?.emojiUrl}
            title={value?.title}
            count={koreanOrder(value?.index ?? 0)}
            onClick={deleteClick}
          />
        ) : (
          <div className="flex items-center justify-center flex-col h-[7rem]">
            <img className="max-w-[3rem]" src={emptyEmoji} alt="" />
            <p className="mt-[0.4rem] text-center text-[var(--color-gray)]">
              이 날에 대한 이야기가 남겨지지 않았어요.
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={modal}
        title="이 날의 기록을 삭제할까요?"
        description="삭제한 기록은 다시 복구할 수 없습니다."
        confirmLabel="삭제"
        onConfirm={modalConfirm}
        onCancel={() => setModal(false)}
      />
    </div>
  );
}
