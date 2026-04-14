import Calendar from 'react-calendar';
import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn.ts';
import { formatDateKey } from '@/utils/formatDate.ts';
import { EMOTIONS } from '@/constants/emotions.ts';

/** 컴포넌트 **/
import CalendarHeader from '@/components/common/CalendarHeader.tsx';

/** 이미지 **/
import flower from '@/assets/images/illustrations/illu-flower.png';

/** 타입 **/
import type { DiaryContents, Value } from '@/types/index.types.ts';

interface Props {
  diaryMap: Map<string, DiaryContents>;
  onClick: (data: Date) => void;
  selectedDate?: Date | null;
}

export default function DiaryCalendar({ diaryMap = new Map(), onClick, selectedDate = null }: Props) {
  const [value, setValue] = useState<Value>(new Date());
  const today = useMemo(() => new Date(), []);

  const getTileClassName = (date: Date, view: string) => {
    if (view !== 'month') return null;

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isSelected =
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    return cn({ 'is-active': isSelected, 'is-today': isToday }) || null;
  };

  const getTileContent = (date: Date, view: string) => {
    if (view !== 'month') return null;

    const key = formatDateKey(date);
    const entry = diaryMap.get(key);

    const emotionKey = entry?.emotion?.type?.toUpperCase() as keyof typeof EMOTIONS;
    const imgSrc = (entry && EMOTIONS[emotionKey]?.emo) ?? flower;
    return <img src={imgSrc} alt="" />;
  };

  return (
    <div>
      <CalendarHeader move="diary" value={value} onChange={setValue} />

      <Calendar
        calendarType="gregory"
        value={null}
        showNavigation={false}
        showNeighboringMonth={false}
        activeStartDate={value as Date}
        formatDay={(_locale, date) => date.getDate().toString()}
        onChange={setValue}
        tileClassName={({ date, view }) => getTileClassName(date, view)}
        tileContent={({ date, view }) => getTileContent(date, view)}
        onClickDay={onClick}
      />
    </div>
  );
}
