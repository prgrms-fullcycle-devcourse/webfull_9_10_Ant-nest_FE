import ChatBubble from '@/features/diaries/components/ChatBubble';
// import { diaries } from '@/features/diaries/diaries.mock';
import CalendarHeader from '@/components/common/CalendarHeader.tsx';
import { useState } from 'react';
import type { Value } from '@/types/index.types.ts';
import { useDiaryListQuery } from '@/features/diaries/queries/useDiariesQuery';
import Loading from '@/components/common/Loading';
// import { diaries } from '@/features/diaries/diaries.mock';

export default function DiaryListPage() {
  const [value, setValue] = useState<Value>(new Date());
  const { data: diaryList, isLoading } = useDiaryListQuery();
  console.log(diaryList?.data);
  if (isLoading) {
    return <Loading />;
  }
  if (!diaryList || diaryList?.data.totalCount === 0) {
    return <div>작성된 일기가 없습니다.</div>;
  }
  return (
    <div>
      <CalendarHeader move="calendar" value={value} onChange={setValue} />
      {/* TODO: 다이어리 기능 구현 */}
      <ChatBubble diaries={diaryList.data.diaries} />
    </div>
  );
}
