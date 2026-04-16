import happy from '@/assets/images/emotions/illu-happy.png';
import excited from '@/assets/images/emotions/emotion-excited.png';
import absurd from '@/assets/images/emotions/emotion-absurd.png';
import depressed from '@/assets/images/emotions/emotion-depressed.png';
import angry from '@/assets/images/emotions/emotion-angry.png';
import blank from '@/assets/images/emotions/illu-default.png';
import disgusted from '@/assets/images/emotions/emotion-disgusted.png';
import tired from '@/assets/images/emotions/emotion-tired.png';

export const EMOTIONS = {
  BLANK: { id: 'blank', label: '기본', emo: blank, color: '#ffb6b6' },
  HAPPY: { id: 'happy', label: '기쁨', emo: happy, color: '#f9e3c9' },
  EXCITED: { id: 'excited', label: '설렘', emo: excited, color: '#F6A6D7' },
  ABSURD: { id: 'absurd', label: '황당', emo: absurd, color: '#F8876E' },
  DEPRESSED: { id: 'depressed', label: '슬픔', emo: depressed, color: '#accbef' },
  ANGRY: { id: 'angry', label: '화남', emo: angry, color: '#FD5E71' },
  DISGUSTED: { id: 'disgusted', label: '불쾌', emo: disgusted, color: 'DEA8DF' },
  TIRED: { id: 'tired', label: '피곤', emo: tired, color: 'BAE2FB' },
} as const;

export const SQUARE_EMO = ['HAPPY', 'EXCITED', 'ABSURD', 'DEPRESSED', 'ANGRY'] as const;

// 공감 이모지
export const REACTION_EMO = [
  { id: 1, name: '기뻐요', tag: '신남', url: happy },
  { id: 2, name: '설레요', tag: '설렘', url: excited },
  { id: 3, name: '슬퍼요', tag: '슬픔', url: depressed },
  { id: 4, name: '화나요', tag: '화남', url: angry },
  { id: 5, name: '황당해요', tag: '황당', url: absurd },
] as const;
