// import { useAuthStore } from '../../store/authStore';
import joy from '../../assets/images/emotions/illu-happy.png'
import heart from '../../assets/images/emotions/emotion-excited.png'
import panic from '../../assets/images/emotions/emotion-absurd.png'
import sad from '../../assets/images/emotions/emotion-depressed.png'
import angry from '../../assets/images/emotions/emotion-angry.png'
import normal from '../../assets/images/emotions/illu-default.png'
import gross from '../../assets/images/emotions/emotion-disgusted.png'
import tired from '../../assets/images/emotions/emotion-tired.png'

import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

//  emoji import 설정하기!
const dallaePlaza = [
  {emo: joy},
  {emo: heart},
  {emo: panic},
  {emo: sad},
  {emo: angry}
]

const emotions = [
  {emo: normal},
  {emo: joy},
  {emo: heart},
  {emo: panic},
  {emo: sad},
  {emo: angry},
  {emo: gross},
  {emo: tired},
]
const profile = {
  nickname: '달래',
  todayQuestionCount: 1,
  streak: 4,
  diaryCount: 0,
  plazaCount: 0,
  registrationDate: 1,
  attendance: 1
};


export default function ProfilePage() {
  // const { user } = useAuthStore();
  const navigate = useNavigate()


  return (
    <div className='min-h-full px-4 pb-8 pt-5'>
      <div className='mx-auto flex w-full max-w-[420px] flex-col gap-4'>

        {/* 프로필 카드 */}
        <section className='rounded-2xl bg-white shadow-[var(--shadow-middle)]'>
          <div className='flex items-start justify-between px-4 py-4'>

            <div className='flex gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full text-2xl'>
                <img src={joy} />
              </div>

              <div>
                <div className='mb-1 flex flex-wrap gap-2'>
                  <span className='rounded-full bg-[var(--color-primary)] border border-[var(--color-primary)] px-2 py-1 text-[10px] font-medium text-white'>
                    함께한 지 {profile.registrationDate}일째
                  </span>
                  <span className='rounded-full border border-[var(--color-primary)] px-2 py-1 text-[10px] font-medium text-[var(--color-primary)]'>
                    연속 출석 {profile.attendance}일째
                  </span>
                </div>

                <p className='text-xl font-bold text-[var(--color-primary)]'>
                  {profile.nickname}
                  <span className='ml-1 text-slate-700'>님</span>
                </p>
              </div>
            </div>

            <button
              type='button'
              className='flex h-8 w-8 items-center justify-center text-[var(--color-gray)]'
            >
              <DotsVerticalIcon className='h-4 w-4' />
            </button>
          </div>

          <div className='grid grid-cols-2 border-t border-[var(--color-gray-light)]'>
            <div onClick={() => navigate('/diary')} className='flex flex-col items-center justify-center py-2'>
              <span className='text-xs text-[var(--color-gray)]'>기록한 일기</span>
              <span className='mt-1 text-xl font-bold text-[var(--color-primary)]'>{profile.diaryCount}</span>
            </div>
            <div onClick={() => navigate('/community')} className='flex flex-col items-center justify-center py-2'>
              <span className='text-xs text-[var(--color-gray)]'>내 광장</span>
              <span className='mt-1 text-xl font-bold text-[var(--color-primary)]'>{profile.plazaCount}</span>
            </div>
          </div>
        </section>

        {/* 나의 광장 온도 */}
        <section className='rounded-2xl bg-[#fafafa] px-8 py-4 shadow-[var(--shadow-middle)]'>
          <h2 className='mb-4 font-bold text-[var(--color-gray-dark)]'>나의 광장 온도</h2>

          <div className='flex items-center justify-center gap-8 px-4'>
            {dallaePlaza.map((item, index) => (
              <div key={index} className='flex items-center gap-2'>
                <img src={item.emo} />
                <span className='font-semibold text-[var(--color-gray)]'>0</span>
              </div>
            ))}
          </div>
        </section>

        {/* 이달/이번주 감정 */}
        <section className='rounded-2xl bg-[#fafafa] shadow-[var(--shadow-middle)]'>
          <div className='grid grid-cols-2'>
            <div className='px-4 py-3 text-center font-bold text-slate-500'>
              이 달의 감정
            </div>
            <div className='px-4 py-3 text-center font-bold text-slate-500'>
              이 주의 감정
            </div>
          </div>

          <div className='grid grid-cols-4 gap-2 px-16 py-3'>
            {emotions.map((item, index) => (
              <div key={index} className='flex flex-col items-center'>
                <img src={item.emo} />
                <span className='font-bold text-[var(--color-gray)]'>0</span>
              </div>
            ))}
          </div>
        </section>

        {/* 로그아웃 */}
        <button
          type='button'
          className='pt-2 text-sm font-medium text-red-400'
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
