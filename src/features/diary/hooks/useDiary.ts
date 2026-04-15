import { useMutation, useQuery } from '@tanstack/react-query'; 
import { useNavigate } from 'react-router-dom';
import { createDiary, getQuestion } from '../api/diary.api';  


export const useCreateDiary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      navigate('/');
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
