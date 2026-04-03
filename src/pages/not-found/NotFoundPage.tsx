import { useNavigate } from 'react-router-dom';
import { EMOTIONS } from '@/constants/emotions.ts';
import { useAuthStore } from '@/store/authStore.ts';
import { motion } from 'motion/react';
import { Button } from '@radix-ui/themes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const onMove = () => {
    let path = '/';

    if (!isAuthenticated) {
      path = '/login';
    }

    navigate(path);
  };

  return (
    <div className="min-h-screen max-w-200 mx-auto flex items-center justify-center">
      <div className="px-8 pb-10">
        <div className="text-center">
          <b
            className="relative text-[3rem] font-handwriting
          before:content-[''] before:block before:absolute before:top-[0.4rem] before:left-[0.5rem] before:w-[23rem] before:h-[3rem] before:rotate-[365] before:bg-amber-100 before:opacity-30
          max-sm2:text-[2rem] max-sm2:before:w-[15rem] max-sm2:before:h-[2.5rem]"
          >
            페이지를 찾을 수 없습니다.
          </b>
          <p className="mt-4 text-2xl font-handwriting max-sm2:text-[1.4rem]">
            방문하시려는 페이지의 주소가 잘못 입력되었거나,
            <br />
            페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다. 입력하신 주소가
            <br />
            정확한지 다시한번 확인해 주시기 바랍니다.
          </p>
          <Button
            className="!mt-7 !w-[50%] !h-[3rem] !text-base max-sm2:!h-[2.4rem]"
            onClick={onMove}
          >
            돌아가기
          </Button>
        </div>
        <div className="flex gap-3 mx-auto mt-20 w-fit max-sm2:gap-1">
          {Object.values(EMOTIONS).map((item, i) => (
            <motion.img
              key={i}
              className="max-w-12 max-sm2:max-w-6"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              src={item.emo}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}
