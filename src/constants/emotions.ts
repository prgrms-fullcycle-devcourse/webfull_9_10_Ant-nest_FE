import happy from '@/assets/images/emotions/illu-happy.png';
import excited from '@/assets/images/emotions/emotion-excited.png';
import absurd from '@/assets/images/emotions/emotion-absurd.png';
import depressed from '@/assets/images/emotions/emotion-depressed.png';
import angry from '@/assets/images/emotions/emotion-angry.png';
import blank from '@/assets/images/emotions/illu-default.png';
import disgusted from '@/assets/images/emotions/emotion-disgusted.png';
import tired from '@/assets/images/emotions/emotion-tired.png';

export const EMOTIONS = {
  BLANK: { id: 'blank', label: '기본', emo: blank },
  HAPPY: { id: 'happy', label: '기쁨', emo: happy },
  EXCITED: { id: 'excited', label: '설렘', emo: excited },
  ABSURD: { id: 'absurd', label: '당황', emo: absurd },
  DEPRESSED: { id: 'depressed', label: '슬픔', emo: depressed },
  ANGRY: { id: 'angry', label: '화남', emo: angry },
  DISGUSTED: { id: 'disgusted', label: '불쾌', emo: disgusted },
  TIRED: { id: 'tired', label: '피곤', emo: tired },
} as const;

export const SQUARE_EMO = ['HAPPY', 'EXCITED', 'ABSURD', 'DEPRESSED', 'ANGRY'] as const;

// 공감 이모지
export const REACTION_EMO = [
  { id: 1, name: '기뻐요', url: happy },
  { id: 2, name: '설레요', url: excited },
  { id: 3, name: '슬퍼요', url: depressed },
  { id: 4, name: '화나요', url: angry },
  { id: 5, name: '황당해요', url: absurd },
] as const;
