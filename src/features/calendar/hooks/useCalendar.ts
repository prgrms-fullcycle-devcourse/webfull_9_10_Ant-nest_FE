import { useEffect, useState } from 'react';
import { deleteDiary, diaryCalendarList } from '@/features/calendar/api/calendar.api.ts';
import type { DiaryContents } from '@/types/index.types.ts';

/**
 * 캘린더 데이터 조회
 */
export const useDiaryCalendar = () => {
  const [diaryMap, setDiaryMap] = useState<Map<string, DiaryContents>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const deleteDetail = (diaryId: string) => {
    const snapshot = new Map(diaryMap);

    setDiaryMap((curr) => {
      const next = new Map(curr);

      for (const [key, val] of next) {
        if (val.diaryId === diaryId) {
          next.delete(key);
          break;
        }
      }

      return next;
    });

    deleteDiary(diaryId).catch(() => setDiaryMap(snapshot));
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await diaryCalendarList();

        setDiaryMap(buildDiaryMap(data.diaries));
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, []);

  return { diaryMap, deleteDetail, isLoading, error };
};

/**
 * 캘린더 데이터 배열을 날짜 기준 Map으로 변환
 * @param entries - 캘린더 데이터 배열
 */
const buildDiaryMap = (entries: DiaryContents[]): Map<string, DiaryContents> => {
  const map = new Map<string, DiaryContents>();
  entries.forEach((entry, index) => {
    map.set(entry.diaryDate, { ...entry, index: entries.length - index });
  });

  return map;
};
