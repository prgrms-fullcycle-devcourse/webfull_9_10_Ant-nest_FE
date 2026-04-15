import ChatBubble from '@/features/diaries/components/ChatBubble';
// import { diaries } from '@/features/diaries/diaries.mock';
import CalendarHeader from '@/components/common/CalendarHeader.tsx';
import { useState } from 'react';
import type { Value } from '@/types/index.types.ts';
import { useDiaryListQuery } from '@/features/diaries/queries/useDiariesQuery';
import Loading from '@/components/common/Loading';
import { useAuthStore } from '@/store/authStore';
import DiaryForGeust from '@/features/diaries/components/DiaryForGuest';
import DiaryIsEmpty from '@/features/diaries/components/DiaryIsEmpty';
// import { diaries } from '@/features/diaries/diaries.mock';

export default function DiaryListPage() {
  const [value, setValue] = useState<Value>(new Date());
  const { data: diaryList, isLoading } = useDiaryListQuery();
  console.log(diaryList?.data);
  const { isGuest } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }
  if (isGuest) {
    return <DiaryForGeust />;
  }
  if (!diaryList || diaryList?.data.totalCount === 0) {
    return <DiaryIsEmpty />;
  }

  const sortedDiaries = [...diaryList.data.diaries].sort(
    (a, b) => new Date(a.diaryDate).getTime() - new Date(b.diaryDate).getTime(),
  );

  return (
    <div>
      <CalendarHeader move="calendar" value={value} onChange={setValue} />
      {/* TODO: 다이어리 기능 구현 */}
      <ChatBubble diaries={sortedDiaries} />
    </div>
  );
}
