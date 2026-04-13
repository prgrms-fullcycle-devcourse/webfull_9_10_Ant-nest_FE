import { Button } from '@radix-ui/themes';

/** 컴포넌트 **/
import PetalEffect from '@/features/auth/components/PetalEffect.tsx';

/** 이미지 **/
import listIcon from '@/assets/images/icons/icon-flower.svg';
import sprout from '@/assets/images/icons/icon_sprout.svg';
import { useNavigate } from 'react-router-dom';

export default function SignupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center flex-col relative overflow-hidden">
      <PetalEffect />

      <div className="text-center relative z-20">
        <img className="mx-auto mb-[0.4rem]" src={sprout} alt="" />
        <h2 className="text-[2rem] font-bold">회원가입이 완료되었습니다.</h2>
        <span className="inline-block mt-4">오늘의 질문이 당신을 기다리고 있어요</span>
      </div>

      <div>
        <ul className="my-4 p-11 rounded-[3rem] relative z-20">
          <li className="flex items-start gap-4">
            <img className="w-[1.7rem]" src={listIcon} alt="" />
            <p className="leading-[1.8]">
              <span className="bg-[rgb(240_224_149/39%)]">질문으로 시작하는 하루</span>
              <br /> 무엇을 쓸지 고민하지 않아도 괜찮아요
            </p>
          </li>

          <li className="flex items-start gap-4 mt-9">
            <img className="w-[1.7rem]" src={listIcon} alt="" />
            <p className="leading-[1.8]">
              <span className="bg-[rgb(240_224_149/39%)]">감정을 남기는 시간</span>
              <br />
              짧은 한 줄도 충분한 기록이에요
            </p>
          </li>

          <li className="flex items-start gap-4 mt-9">
            <img className="w-[1.7rem]" src={listIcon} alt="" />
            <p className="leading-[1.8]">
              <span className="bg-[rgb(240_224_149/39%)]">쌓여가는 나의 마음</span>
              <br />
              기록은 당신을 더 단단하게 만들어요
            </p>
          </li>
        </ul>

        <Button
          className="!block !w-4/5 !h-12 !text-[1.3rem] !mx-auto"
          onClick={() => navigate('/login')}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
