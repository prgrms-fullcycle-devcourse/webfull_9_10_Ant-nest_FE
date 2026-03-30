import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import myCharacter from '@/assets/images/characters/DALLAE_ANIMATE_1.gif'
import { Pencil1Icon } from '@radix-ui/react-icons';

export default function HomePage() {
  // const { isAuthenticated, user } = useAuthStore();
  const { user } = useAuthStore();
  const isAuthenticated = true
  // 오늘의 질문 받아올 query
  const question = '오늘 당신을 미소 짓게 만든 것은 무엇인가요?'
  // 일기 작성 여부를 받아올 query
  const [isWrite, setIsWrite] = useState(false)
  // isWrite가 true이면.. 해당 일기 정보 가져오기 (제목, 질문)
  const diary = "맛있는 밥을 먹음"

  const navigate = useNavigate();


  return (
    <div className='h-[calc(100dvh-60px)] overflow-hidden'>
      <div className='grid grid-rows-2 h-full'>
        <section className='flex items-center justify-center px-4'>
          {/* 말풍선 */}
          <div className="shadow-[var(--shadow-middle)] px-4 py-2 rounded-2xl min-h-36 min-w-120">
            {isAuthenticated ? (
              isWrite ? (
                <>
                  <div>
                    <p>오늘도 하나의 꽃을 피워냈어요.</p>
                    <p>내일 또 새로운 질문으로 찾아올게요.</p>
                  </div>
                  <div>
                    <p>{question}</p>
                    <p>{diary}</p>
                  </div>
                </>
              ):(
                <div className='flex flex-col items-center'>
                  <div className='text-center'>
                    <p>안녕하세요, {user?.nickname}님 반가워요!</p>
                    {/* <p className='text-[var(--color-primary)] font-bold'>오늘의 질문</p> */}
                    <div className='text-[var(--color-primary)] font-bold'>
                      {question}
                    </div>
                  </div>
                  <button onClick={() => navigate('/diary/new')} className='mt-2 rounded-full bg-[var(--color-primary)] w-10 h-10 shrink-0 flex items-center justify-center'>
                    <Pencil1Icon className='text-white'/>
                  </button>
                </div>
              )
            ):(
              <div>
                <p>일기를 남기려면 로그인이 필요해요.</p> 
                <p>로그인하여 새로운 꽃을 피워보세요.</p>
                <Link key={'/diary/new'} to={'/diary/new'}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>로그인 페이지로 이동하기</div>
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className='flex items-start justify-center'>
          <img src={myCharacter} className='w-40 h-auto'/>
        </section>
      </div>
    </div>
  );
}