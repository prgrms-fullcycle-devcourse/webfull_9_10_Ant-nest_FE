import { EMOTIONS } from '@/constants/emotions';
import type { TDiaryItem } from './types/diaries.types';
import emo from '@/assets/images/characters/character-draw.gif';

export const diaries: TDiaryItem[] = [
  {
    id: 1,
    date: '2026-03-29',
    createdAt: '2026-03-29T18:19:59',
    question: {
      content: '오늘 당신을 미소 짓게 만든 것은 무엇인가요?',
    },
    answer: {
      title: '맛있는 밥을 먹음!',
      content: '빠네가 먹고싶었는데 맛있는 빠네 집을 찾았다. 빠네 빵까지 싹싹 주워먹고 옴.',
      image: '',
      emo: EMOTIONS.joy.emo,
    },
  },
  {
    id: 2,
    date: '2026-03-30',
    createdAt: '2026-03-30T22:29:35',
    question: {
      content: '오늘은 어떤 음식을 먹었는지 궁금해요',
    },
    answer: {
      title: '방탕한 하루 보내기',
      content: '점심부터 매운 떡볶이로 위장 뿌수고 아이스크림까지 먹어줬다.',
      image: emo,
      emo: EMOTIONS.heart.emo,
    },
  },
  {
    id: 3,
    date: '2026-03-31',
    createdAt: '2026-03-31T10:22:34',
    question: {
      content: '벌써 꽃이 피는 봄이 왔어요! 달래님은 봄에 하고 싶은 일이 있나요',
    },
    answer: {
      title: '하루종일 잠자기',
      content: '자도자도 졸려서 24시간자라고 하면 잘 수 있을 것 같음.',
      image: emo,
      emo: EMOTIONS.tired.emo,
    },
  },
];
