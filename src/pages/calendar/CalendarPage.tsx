import { useEffect, useState } from 'react';
import { useDiaryCalendar } from '@/features/calendar/hooks/useCalendar.ts';
import { formatDateKey } from '@/utils/formatDate.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

/** 컴포넌트 **/
import CalendarDiaryCard from '@/features/calendar/components/CalendarDiaryCard.tsx';
import DiaryCalendar from '@/features/calendar/components/DiaryCalendar.tsx';
import ConfirmModal from '@/components/common/ConfirmModal.tsx';

/** 이미지 **/
import emptyEmoji from '@/assets/images/emotions/emotion-blank.png';

/** 타입 **/
import type { DiaryContents } from '@/types/index.types.ts';

export default function CalendarPage() {
  const [info, setInfo] = useState<DiaryContents | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { diaryMap, deleteDetail } = useDiaryCalendar();
  const navigate = useNavigate();
  const query = searchParams.get('id');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!query) return;

    const entry = [...diaryMap.values()].find((d) => d.diaryId === query);

    setInfo(entry ?? null);

    if (entry?.diaryDate) setSelectedDate(new Date(entry.diaryDate));
  }, [query, diaryMap]);

  const calendarClick = (date: Date) => {
    const key = formatDateKey(date);
    const entry = diaryMap.get(key);

    setSelectedDate(date);
    navigate(entry?.diaryId ? `/diary/calendar?id=${entry.diaryId}` : `/diary/calendar`);
  };

  const moveDetail = (diaryId: string) => {
    navigate(`/diary/${diaryId}`);
  };

  const deleteClick = (diaryId: string) => {
    setModal(true);
    setPendingDeleteId(diaryId);
  };

  const modalConfirm = () => {
    if (pendingDeleteId) {
      deleteDetail(pendingDeleteId);
      setPendingDeleteId(null);
      setInfo(null);
      setSelectedDate(null);
      queryClient.clear();
    }
    setModal(false);
  };

  return (
    <div>
      <DiaryCalendar
        diaryMap={diaryMap}
        onClick={(data) => calendarClick(data)}
        selectedDate={selectedDate}
      />
      <div className="pt-[2rem] px-[1rem]">
        {query ? (
          info && (
            <CalendarDiaryCard cardInfo={info} moveDetail={moveDetail} deleteClick={deleteClick} />
          )
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
