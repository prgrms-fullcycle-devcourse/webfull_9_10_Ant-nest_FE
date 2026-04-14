import Calendar from 'react-calendar';
import { useState } from 'react';
import { cn } from '@/utils/cn.ts';
import { formatDateKey } from '@/utils/formatDate.ts';

/** 컴포넌트 **/
import CalendarHeader from '@/components/common/CalendarHeader.tsx';

/** 이미지 **/
import flower from '@/assets/images/illustrations/illu-flower.png';

/** 타입 **/
import type { Diary, Value } from '@/types/index.types.ts';

interface Props {
  diaryMap: Map<string, Diary>;
  onClick: (data: Date) => void;
}

export default function DiaryCalendar({ diaryMap, onClick }: Props) {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (data: Date) => {
    setSelectedDate(data);

    onClick(data);
  };

  const getTileClassName = (date: Date, view: string) => {
    if (view !== 'month') return null;

    const today = new Date();
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

    return <img src={entry ? entry.emotion.emojiUrl : flower} alt="" />;
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
        onClickDay={(data) => handleChange(data)}
      />
    </div>
  );
}
