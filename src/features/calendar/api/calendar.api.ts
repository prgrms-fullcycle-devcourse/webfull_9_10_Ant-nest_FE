import api from '@/lib/api.ts';
import type { ApiResponse, Diary } from '@/types/index.types.ts';

export const diaryCalendarList = async () => {
  return api.get<ApiResponse<Diary>>('/diaries').then((res) => res.data.data);
};

export const deleteDiary = async (id: string) => {
  return api.delete<ApiResponse<null>>(`/diaries/${id}`).then((res) => res.data);
};

// export const diaryCalendarDetail = async (diaryId: string) => {
//   return api.get<ApiResponse<DiaryContents>>(`/diaries/${diaryId}`).then((res) => res.data.data);
// };
