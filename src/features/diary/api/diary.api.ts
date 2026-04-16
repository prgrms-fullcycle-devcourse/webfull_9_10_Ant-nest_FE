import api from '@/lib/api.ts';

interface CreateDiaryRequest {
  title: string;
  content: string;
  emotion: string;        
  questionId: string;
  photoUrls: string[];
}

export const createDiary = (data: CreateDiaryRequest) => {
  return api.post('/diaries', data).then((res) => res.data);
};

export const getQuestion = () => {
  return api.get('/questions').then((res) => res.data);
};

interface UpdateDiaryRequest {
  title: string;
  content: string;
  emotion: string;
  photoUrls: string[];
}

export const updateDiary = (diaryId: string, data: UpdateDiaryRequest) => {
  return api.put(`/diaries/${diaryId}`, data).then((res) => res.data);
};

export const deleteDiary = (diaryId: string) => {
  return api.delete(`/diaries/${diaryId}`).then((res) => res.data);
};