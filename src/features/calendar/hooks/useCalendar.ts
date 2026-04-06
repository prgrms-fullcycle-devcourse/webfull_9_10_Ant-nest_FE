import { useEffect, useState } from 'react';
import type { CalendarList } from '@/features/calendar/types/calendar.types.ts';
import { calendarMock } from '@/features/calendar/calendar.mock.ts';
// import { getDiaries } from '@/features/calendar/services/calendarService.ts';

/**
 * 캘린더 데이터 조회
 */
export const useDiaryCalendar = () => {
  const [diaryMap, setDiaryMap] = useState<Map<string, CalendarList>>(new Map());
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const fetch = async () => {
    //   try {
    //     const data = await getDiaries();
    //
    //     setDiaryMap(buildDiaryMap(data));
    //   } catch (error) {
    //     setError(error as Error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetch();

    setDiaryMap(buildDiaryMap(calendarMock));
  }, []);

  return diaryMap;
};

/**
 * 캘린더 데이터 배열을 날짜 기준 Map으로 변환
 * @param entries - 캘린더 데이터 배열
 */
const buildDiaryMap = (entries: CalendarList[]): Map<string, CalendarList> => {
  const map = new Map<string, CalendarList>();
  entries.forEach((entry, index) => {
    map.set(entry.diaryDate, { ...entry, index: index + 1 });
  });

  return map;
};
