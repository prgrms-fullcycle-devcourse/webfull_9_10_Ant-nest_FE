import type { CalendarList } from '@/features/calendar/types/calendar.types.ts';
import joy from '@/assets/images/emotions/illu-happy.png';
import tired from '@/assets/images/emotions/emotion-tired.png';

export const calendarMock: CalendarList[] = [
  {
    diaryId: 105,
    title: '선물 같은 하루',
    diaryDate: '2026-04-02',
    isEdited: false,
    emotion: {
      id: 3,
      name: '행복해요',
      emojiUrl: joy,
    },
    question: '오늘 당신의 마음을 따뜻하게 해준 순간은 언제였나요?', // 질문 내용 포함
  },
  {
    diaryId: 106,
    title: '조금 피곤한 수요일',
    diaryDate: '2026-04-04',
    isEdited: true,
    emotion: {
      id: 5,
      name: '지쳐요',
      emojiUrl: tired,
    },
    question: '피곤한 하루 끝에 나를 위로해준 작은 보상은 무엇인가요?',
  },
  {
    diaryId: 107,
    title: '맛있지만 컨디션이 안좋은 날',
    diaryDate: '2026-04-05',
    isEdited: true,
    emotion: {
      id: 5,
      name: '지쳐요',
      emojiUrl: tired,
    },
    question: '오늘 하루는 어떤가요?',
  },
];
