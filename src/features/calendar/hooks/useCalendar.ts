import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDiary, diaryCalendarList } from '@/features/calendar/api/calendar.api.ts';
import { formatMonth } from '@/utils/formatDate.ts';
import type { DiaryContents } from '@/types/index.types.ts';

const QUERY_KEY = ['diaryCalendar'];

/**
 * 캘린더 데이터 조회
 */
export const useDiaryCalendar = (currentMonth: Date) => {
  const queryClient = useQueryClient();
  const monthKey = formatMonth(currentMonth);

  const { data: diaries = [], isLoading, error } = useQuery({
    queryKey: [...QUERY_KEY, monthKey],
    queryFn: async () => {
      const data = await diaryCalendarList();
      const monthly = data.diaries.filter((d) => d.diaryDate.startsWith(monthKey));
      return data.diaries.map((entry) => {
        const monthlyIndex = monthly.findIndex((m) => m.diaryId === entry.diaryId);
        return {
          ...entry,
          index: monthlyIndex >= 0 ? monthly.length - monthlyIndex : undefined,
        };
      });
    },
  });

  const diaryMap = useMemo(() => buildDiaryMap(diaries), [diaries]);

  const { mutate: deleteDetail } = useMutation({
    mutationFn: deleteDiary,
    onMutate: async (diaryId) => {
      await queryClient.cancelQueries({ queryKey: [...QUERY_KEY, monthKey] });

      const snapshot = queryClient.getQueryData([...QUERY_KEY, monthKey]);

      queryClient.setQueryData<DiaryContents[]>(
        [...QUERY_KEY, monthKey],
        (curr = []) => curr.filter((d) => d.diaryId !== diaryId)
      );

      return { snapshot };
    },
    onError: (_err, _diaryId, context) => {
      queryClient.setQueryData([...QUERY_KEY, monthKey], context?.snapshot);
    },
  });

  return { diaryMap, deleteDetail, isLoading, error };
};

/**
 * 캘린더 데이터 배열을 날짜 기준 Map으로 변환
 * @param entries - 캘린더 데이터 배열
 */
const buildDiaryMap = (entries: DiaryContents[]): Map<string, DiaryContents> => {
  const map = new Map<string, DiaryContents>();
  entries.forEach((entry) => {
    map.set(entry.diaryDate, entry);
  });
  return map;
};
