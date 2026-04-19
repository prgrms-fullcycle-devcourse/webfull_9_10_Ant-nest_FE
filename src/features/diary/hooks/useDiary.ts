import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  createDiary,
  deleteDiary,
  getDiary,
  getQuestion,
  toggleShareDiary,
  updateDiary,
} from '../api/diary.api';

export const useCreateDiary = (onCreated?: (diaryId: string) => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiary,
    onSuccess: (res) => {
      const diaryId = res.data?.diaryId;
      if (diaryId && onCreated) {
        onCreated(diaryId);
      }
      queryClient.invalidateQueries();
      navigate('/');
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      if (status === 409) alert(message);
      if (status === 403) alert(message);
      if (status === 400) alert(message);
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
    mutationFn: ({
      diaryId,
      data,
    }: {
      diaryId: string;
      data: { title: string; content: string; emotion: string; images: File[] };
    }) => updateDiary(diaryId, data),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diaryId: string) => deleteDiary(diaryId),
    onSuccess: () => {
      queryClient.clear();
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

export const useToggleShare = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ diaryId, isActive }: { diaryId: string; isActive: boolean }) =>
      toggleShareDiary(diaryId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
