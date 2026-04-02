import joy from '@/assets/images/emotions/illu-happy.png'
import heart from '@/assets/images/emotions/emotion-excited.png'
import panic from '@/assets/images/emotions/emotion-absurd.png'
import sad from '@/assets/images/emotions/emotion-depressed.png'
import angry from '@/assets/images/emotions/emotion-angry.png'
import normal from '@/assets/images/emotions/illu-default.png'
import gross from '@/assets/images/emotions/emotion-disgusted.png'
import tired from '@/assets/images/emotions/emotion-tired.png'


export const EMOTIONS = {
    normal: { id: 'normal', label: '기본', emo: normal },
    joy: { id: 'joy', label: '기쁨', emo: joy },
    heart: { id: 'heart', label: '설렘', emo: heart },
    panic: { id: 'panic', label: '당황', emo: panic },
    sad: { id: 'sad', label: '슬픔', emo: sad },
    angry: { id: 'angry', label: '화남', emo: angry },
    gross: { id: 'gross', label: '불쾌', emo: gross },
    tired: { id: 'tired', label: '피곤', emo: tired },
} as const

export const SQUARE_EMO = [
    'joy',
    'heart',
    'panic',
    'sad',
    'angry'
] as const

// 공감 이모지
export const REACTION_EMO = [
  { id: 1, name: '기뻐요', url: joy },
  { id: 2, name: '설레요', url: heart },
  { id: 3, name: '슬퍼요', url: sad },
  { id: 4, name: '화나요', url: angry },
  { id: 5, name: '황당해요', url: panic },
] as const