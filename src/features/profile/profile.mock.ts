import { EMOTIONS } from '@/constants/emotions';
import type { TWeeklyEmoItem } from '@/pages/profile/ProfilePage';

// 유저 정보
export const profile = {
  profile: {
    email: 'email@email.com',
    nickname: '달래',
  },
  statistics: {
    totalDiaries: 1,
    totalSharedDiaries: 1,
    // streak: 4,
    // plazaCount: 0,
    // 회원가입 날짜? 함께한지 n일째.. api 에서 넘겨달라고 하기!

    // registrationDate: 1,
    // attendance: 1,
    // 광장온도
    empathyDetail: [
      {
        name: 'joy',
        count: 15,
      },
      {
        name: 'heart',
        count: 8,
      },
      {
        name: 'panic',
        count: 5,
      },
      {
        name: 'sad',
        count: 8,
      },
      {
        name: 'angry',
        count: 2,
      },
    ],
  },
};

export const monthlyEmoCount = [
  {
    month: '2026-03',
    emotions: [
      { key: 'heart', label: '설렘', count: 14, color: '#F6A6D7', icon: EMOTIONS.HEART.emo },
      { key: 'joy', label: '기쁨', count: 10, color: '#f9e3c9', icon: EMOTIONS.JOY.emo },
      { key: 'normal', label: '기본', count: 1, color: '#ffb6b6', icon: EMOTIONS.NORMAL.emo },
      { key: 'sad', label: '슬픔', count: 1, color: '#accbef', icon: EMOTIONS.SAD.emo },
      { key: 'angry', label: '화남', count: 1, color: '#F8876E', icon: EMOTIONS.ANGRY.emo },
      { key: 'panic', label: '당황', count: 0, color: '#F8876E', icon: EMOTIONS.PANIC.emo },
      { key: 'gross', label: '불쾌', count: 0, color: '#F8876E', icon: EMOTIONS.GROSS.emo },
      { key: 'tired', label: '피곤', count: 0, color: '#F8876E', icon: EMOTIONS.TIRED.emo },
    ],
  },
];

export const weeklyEmo: TWeeklyEmoItem[] = [
  { index: 0, emotion: 'JOY' },
  { index: 2, emotion: 'SAD' },
] as const;
