import ChatBubble from '@/features/diaries/components/ChatBubble';
import { diaries } from '@/features/diaries/diaries.mock';
import CalendarHeader from '@/components/common/CalendarHeader.tsx';
import { useState } from 'react';
import type { Value } from '@/types/index.types.ts';

export default function DiaryListPage() {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <div>
      <CalendarHeader move="calendar" value={value} onChange={setValue} />
      {/* TODO: 다이어리 기능 구현 */}
      <ChatBubble chat={diaries} />
    </div>
  );
}
