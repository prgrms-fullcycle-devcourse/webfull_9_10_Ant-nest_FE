import type { DiaryItem } from './types/diaries.types';

export const diaries: DiaryItem[] = [
  {
    diaryId: 1,
    title: '맛있는 밥을 먹음!',
    diaryDate: '2026-03-29',
    isEdited: false,
    emotion: {
      type: 'HAPPY',
      name: '기쁨',
    },
    question: '오늘 당신을 미소 짓게 만든 것은 무엇인가요?',
  },
];
