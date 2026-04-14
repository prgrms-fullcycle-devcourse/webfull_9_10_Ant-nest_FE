import api from '@/lib/api.ts';
import type { ApiResponse, Diary } from '@/types/index.types.ts';

export const diaryCalendarList = async (data: Diary) => {
  return api.get<ApiResponse<Diary>>('/diaries').then((res) => res.data);
};
