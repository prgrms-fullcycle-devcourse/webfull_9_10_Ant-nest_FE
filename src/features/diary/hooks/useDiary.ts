import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createDiary, deleteDiary, getDiary, getQuestion, updateDiary } from '../api/diary.api';
import type { UpdateDiaryRequest } from '../api/diary.api';


export const useCreateDiary = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) alert(message); // 오늘 이미 작성함
      if (status === 403) alert(message); // 날짜 제한
      if (status === 400) alert(message); // 유효성 오류
    },
  });
};

export const useGetQuestion = () => {
  return useQuery({
    queryKey: ['question'],
    queryFn: getQuestion,
  });
};

export const useUpdateDiary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ diaryId, data }: { diaryId: string; data: UpdateDiaryRequest }) =>
      updateDiary(diaryId, data),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;
      alert(message);
    },
  });
};

export const useDeleteDiary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (diaryId: string) => deleteDiary(diaryId),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message;
      alert(message);
    },
  });
};

export const useGetDiary = (diaryId?: string) => {
  return useQuery({
    queryKey: ['diary', diaryId],
    queryFn: () => getDiary(diaryId!),
    enabled: !!diaryId,
  });
};