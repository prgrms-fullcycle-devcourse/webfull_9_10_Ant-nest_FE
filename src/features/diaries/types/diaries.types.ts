import type { EmotionKey, EmotionLabel } from '@/types/index.types';

export interface DiaryItem {
  diaryId: number;
  title: string;
  diaryDate: string;
  isEdited: boolean;
  emotion: {
    type: EmotionKey;
    name: EmotionLabel;
  };
  question: string;
}

export interface DiariesResponse {
  totalCount: number;
  diaries: DiaryItem[];
}
