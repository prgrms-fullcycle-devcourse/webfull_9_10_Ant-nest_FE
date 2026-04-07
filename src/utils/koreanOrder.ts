import { KOREAN_NUMBERS } from '@/constants/koreanNumbers.ts';

export const koreanOrder = (index: number): string => {
  if (index <= 10) return KOREAN_NUMBERS[index];
  return `${index}`;
};
