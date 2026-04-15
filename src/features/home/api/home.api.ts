import api from '@/lib/api';
import type { ApiResponse, DiaryDetail } from '@/types/index.types';
import type { IsWrittenResponse, QuestionResponse } from '../types/home.types';

export const fetchTodayQuestion = () => {
  return api.get<ApiResponse<QuestionResponse>>(`/questions`).then((res) => res.data.data);
};

export const fetchIsWritten = () => {
  return api.get<ApiResponse<IsWrittenResponse>>(`/diaries/today`).then((res) => res.data.data);
};

export const fetchDiaryDetail = (diaryId: number) => {
  return api.get<ApiResponse<DiaryDetail>>(`/diaries/${diaryId}`).then((res) => res.data);
};
