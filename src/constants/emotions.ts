import happy from '@/assets/images/emotions/illu-happy.png';
import excited from '@/assets/images/emotions/emotion-excited.png';
import absurd from '@/assets/images/emotions/emotion-absurd.png';
import depressed from '@/assets/images/emotions/emotion-depressed.png';
import angry from '@/assets/images/emotions/emotion-angry.png';
import blank from '@/assets/images/emotions/illu-default.png';
import disgusted from '@/assets/images/emotions/emotion-disgusted.png';
import tired from '@/assets/images/emotions/emotion-tired.png';

import type { Emojis } from '@/features/community/types/community.types'

import happyInactive from '@/assets/images/emotions_inactive/happy-inactive.png'
import excitedInactive from '@/assets/images/emotions_inactive/excited-inactive.png'
import absurdInactive from '@/assets/images/emotions_inactive/absurd-inactive.png'
import sadInactive from '@/assets/images/emotions_inactive/sad-inactive.png'
import angryInactive from '@/assets/images/emotions_inactive/angry-inactive.png'
import normalInactive from '@/assets/images/emotions_inactive/default-inactive.png'
import disgustedInactive from '@/assets/images/emotions_inactive/disgusted-inactive.png'
import tiredInactive from '@/assets/images/emotions_inactive/tired-inactive.png'


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
    { id: 1, name: '화나요', tag: '화남', url: angry },
    { id: 2, name: '설레요', tag: '설렘', url: excited },
    { id: 3, name: '기뻐요', tag: '신남', url: happy },
    { id: 4, name: '황당해요', tag: '황당', url: absurd },
    { id: 5, name: '슬퍼요', tag: '슬픔', url: depressed },
] as const

// UI용 감정 순서
export const REACTION_ORDER = [3, 2, 5, 1, 4]; 

// 필터용 감정 이모지
export const FILTER_EMOJIS: Emojis[] = [
    { id: 1, type: 'HAPPY', name: '기쁨', inactiveUrl: happyInactive, activeUrl: happy},
    { id: 2, type: 'EXCITED', name: '설렘', inactiveUrl: excitedInactive, activeUrl: excited},
    { id: 3, type: 'ABSURD', name: '황당', inactiveUrl: absurdInactive, activeUrl: absurd},
    { id: 4, type: 'DEPRESSED', name: '슬픔', inactiveUrl: sadInactive, activeUrl: depressed},
    { id: 5, type: 'ANGRY', name: '화남', inactiveUrl: angryInactive, activeUrl: angry},
    { id: 6, type: 'BLANK', name: '기본', inactiveUrl: normalInactive, activeUrl: blank},
    { id: 7, type: 'DISGUSTED', name: '불쾌', inactiveUrl: disgustedInactive, activeUrl: disgusted},
    { id: 8, type: 'TIRED', name: '피곤', inactiveUrl: tiredInactive, activeUrl: tired},
] as const;
