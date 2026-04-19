import type { Emotion, EmotionKey } from '@/types/index.types';

export interface ProfileResponse {
  email: string;
  nickname: string;
  daysSinceJoining: number;
  consecutiveDays: number;
  totalDiaries: number;
  totalSharedDiaries: number;
  receivedEmpathies: ReceivedEmpathies[];
  monthlyEmotions: EmoCount[];
}

export interface ReceivedEmpathies {
  typeId: string;
  name: string;
  count: number;
}

export interface EmoCount {
  type: EmotionKey;
  count: number;
}

export interface updateNickname {
  nickname: string;
}

export interface Days {
  day: number;
  diaryId: number;
  emotion: Emotion;
}

export interface MonthlyEmoResponse {
  year: number;
  month: number;
  days: Days[];
}

export interface SquareHistoryResponse {
  postId: string;
  diaryId: string;
  title: string;
  content: string;
  totalEmpathyCount: number;
  empathyStats: ReceivedEmpathies[];
  sharedAt: string;
  isActive: boolean;
}
