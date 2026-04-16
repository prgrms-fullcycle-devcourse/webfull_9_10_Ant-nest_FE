import type { EmotionKey } from '@/types/index.types';

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
