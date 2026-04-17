import ChatBubble from '@/features/diaries/components/ChatBubble';
import CalendarHeader from '@/components/common/CalendarHeader.tsx';
import { useEffect, useRef, useState } from 'react';
import type { Value } from '@/types/index.types.ts';
import { useDiaryListQuery } from '@/features/diaries/queries/useDiariesQuery';
import Loading from '@/components/common/Loading';
import { useAuthStore } from '@/store/authStore';
import DiaryForGeust from '@/features/diaries/components/DiaryForGuest';
import DiaryIsEmpty from '@/features/diaries/components/DiaryIsEmpty';

export default function DiaryListPage() {
  const [value, setValue] = useState<Value>(new Date());
  const { data: diaryList, isLoading } = useDiaryListQuery();
  console.log(diaryList?.data);
  const { isGuest } = useAuthStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const sortedDiaries = diaryList?.data.diaries
    .filter((diary) => {
      if (!value) return true;

      const diaryDate = new Date(diary.diaryDate);
      const selected = value instanceof Date ? value : new Date(value as unknown as string);

      return (
        diaryDate.getFullYear() === selected.getFullYear() &&
        diaryDate.getMonth() === selected.getMonth()
      );
    })
    .sort((a, b) => new Date(a.diaryDate).getTime() - new Date(b.diaryDate).getTime());
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sortedDiaries, value]);
  if (isLoading) {
    return <Loading />;
  }
  if (isGuest) {
    return <DiaryForGeust />;
  }
  if (!sortedDiaries || !diaryList || diaryList?.data.totalCount === 0) {
    return <DiaryIsEmpty />;
  }

  return (
    <div>
      <CalendarHeader move="calendar" value={value} onChange={setValue} />
      {/* TODO: 다이어리 기능 구현 */}
      <ChatBubble diaries={sortedDiaries} />
      <div ref={scrollRef} />
    </div>
  );
}
