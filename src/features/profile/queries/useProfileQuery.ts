import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyEmo, fetchProfile, fetchSquareHistory } from '../api/profile.api';
import { endOfWeek, startOfWeek } from 'date-fns';
import { useMemo } from 'react';
import { getCurrentWeek } from '@/utils/formatDate';
import type { EmotionKey } from '@/types/index.types';

export const useProfile = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: fetchProfile,
  });
};

export const useMonthlyEmo = (year: number, month: number) => {
  const { user } = useAuthStore();
  console.log('emo test', year, month, user?.nickname);
  return useQuery({
    queryKey: ['monthlyEmo', !!user?.nickname, year, month],
    queryFn: () => fetchMonthlyEmo(year, month),
    enabled: !!user?.nickname,
  });
};

export const useWeeklyEmo = () => {
  const currentDate = new Date();
  console.log(currentDate);
  // 월요일 / 일요일의 날짜
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  const startYear = start.getFullYear();
  const startMonth = start.getMonth() + 1;

  const endYear = end.getFullYear();
  const endMonth = end.getMonth() + 1;

  const isSameMonth = startYear === endYear && startMonth === endMonth;

  const firstQuery = useMonthlyEmo(startYear, startMonth);
  const secondQuery = useMonthlyEmo(endYear, isSameMonth ? startMonth : endMonth);

  console.log('use..', firstQuery, secondQuery);
  const weeklyEmo = useMemo(() => {
    const monthlyData = isSameMonth
      ? (firstQuery.data?.days ?? [])
      : [...(firstQuery.data?.days ?? []), ...(secondQuery.data?.days ?? [])];

    const emoMap = new Map(monthlyData.map((d) => [d.day, d]));
    const week = getCurrentWeek(); // 월~일 Date[]

    return week.map((date) => {
      const key = date.getDate();
      const found = emoMap.get(key);
      return { emotion: (found?.emotion?.type as EmotionKey) ?? null };
    });
  }, [firstQuery.data, secondQuery.data, isSameMonth]);

  return {
    data: weeklyEmo,
    isLoading: firstQuery.isLoading || secondQuery.isLoading,
    isError: firstQuery.isError || secondQuery.isError,
  };
};

export const useSquareHistory = () => {
  return useQuery({
    queryKey: ['squareHistory'],
    queryFn: fetchSquareHistory,
  });
};
