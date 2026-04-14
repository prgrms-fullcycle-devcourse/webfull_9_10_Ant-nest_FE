import api from '@/lib/api';
import type { ApiResponse } from '@/types/index.types';
import type { DiariesResponse } from '../types/diaries.types';

export const fetchDiaryList = async () => {
  return api.get<ApiResponse<DiariesResponse>>(`/diaries`).then((res) => res.data);
};
