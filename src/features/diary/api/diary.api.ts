import api from '@/services/api';

interface CreateDiaryRequest {
  title: string;
  content: string;
  emotionId: number;
  questionId: number;
  questionType: 'AI' | 'DEFAULT';
  photoUrls: string[];
  isPublic: boolean;

}

export const createDiary = (data: CreateDiaryRequest) => {
  return api.post('/diaries', data).then((res) => res.data);
};