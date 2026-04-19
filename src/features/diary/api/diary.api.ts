import api from '@/lib/api.ts';


export const createDiary = (data: {
  title: string;
  content: string;
  emotion: string;
  questionId: string;
  images: File[];
}) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('emotion', data.emotion);
  formData.append('questionId', data.questionId);
  data.images.forEach((file) => {
    formData.append('images', file);
  });

  return api.post('/diaries', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data);
};

export const getQuestion = () => {
  return api.get('/questions').then((res) => res.data);
};

export const updateDiary = (diaryId: string, data: {
  title: string;
  content: string;
  emotion: string;
  images: File[];
}) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('emotion', data.emotion);
  data.images.forEach((file) => {
    formData.append('images', file);
  });

  return api.patch(`/diaries/${diaryId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data);
};

export const deleteDiary = (diaryId: string) => {
  return api.delete(`/diaries/${diaryId}`).then((res) => res.data);
};

export const getDiary = (diaryId: string) => {
  return api.get(`/diaries/${diaryId}`).then((res) => res.data);
};

export const toggleShareDiary = (diaryId: string, isActive: boolean) => {
  return api.patch(`/square/posts/${diaryId}/share`, { isActive }).then((res) => res.data);
};
