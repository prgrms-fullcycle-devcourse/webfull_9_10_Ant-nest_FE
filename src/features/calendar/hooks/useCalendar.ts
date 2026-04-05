import { useEffect, useState } from 'react';
import type { CalendarList } from '@/features/calendar/types/calendar.types.ts';
import { calendarMock } from '@/features/calendar/calendar.mock.ts';

/**
 * 캘린더 데이터 조회
 */
export const useDiaryCalendar = () => {
  const [diaryMap, setDiaryMap] = useState<Map<string, CalendarList>>(new Map());

  useEffect(() => {
    const map = new Map<string, CalendarList>();
    calendarMock.forEach((entry, index) => {
      map.set(entry.diaryDate, { ...entry, index: index + 1 });
    });

    setDiaryMap(map);
  }, []);

  return diaryMap;
};
