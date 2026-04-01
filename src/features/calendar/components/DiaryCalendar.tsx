import { useState } from 'react';
import Calendar from 'react-calendar';

/** 컴포넌트 **/
import CalendarHeader from '@/components/common/CalendarHeader.tsx';

/** 이미지 **/
import flower from '@/assets/images/illustrations/illu-flower.png';

/** 타입 **/
import type { Value } from '@/types/index.types.ts';

export default function DiaryCalendar() {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
        tileClassName={({ date, view }) => {
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

          if (isToday) return 'is-today';
          if (isSelected) return 'is-active';

          return null;
        }}
        tileContent={({ view }) => {
          if (view !== 'month') return null;

          return <img src={flower} alt="" />;
        }}
        onClickDay={(date) => {
          setSelectedDate(date);
        }}
      />
    </div>
  );
}
