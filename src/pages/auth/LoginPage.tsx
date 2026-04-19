import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/auth/hooks/useAuth.ts';
import { motion, useAnimate } from 'motion/react';
import { useEffect, useRef } from 'react';

import { Button, Checkbox, Flex, Text } from '@radix-ui/themes';

/** 컴포넌트 **/
import FormField from '@/components/common/FormField.tsx';

/** 이미지 **/
import imgCharacter from '@/assets/images/characters/character-draw.gif';

interface LoginFormValues {
  email: string;
  password: string;
  saveEmail: boolean;
}

let animationPlayed = false;

const introText = '매일 새로운 질문으로 나를 알아가는 시간';
const dallaeText = 'Dallae';

export default function LoginPage() {
  const savedEmail = localStorage.getItem('savedEmail') ?? '';
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: savedEmail,
      saveEmail: !!savedEmail,
    },
  });

  const loginMutation = useLoginMutation();
  const [scope, animate] = useAnimate();
  const formRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLSpanElement>(null);
  const introCursorRef = useRef<HTMLSpanElement>(null);
  const dallaeWrapRef = useRef<HTMLHeadingElement>(null);
  const dallaeRef = useRef<HTMLSpanElement>(null);
  const dallaeCursorRef = useRef<HTMLSpanElement>(null);

  const onSubmit = (data: LoginFormValues) => {
    if (!data.email) {
      setError('email', { message: '이메일을 입력해주세요.' });
      return;
    }
    if (!data.password) {
      setError('email', { message: '비밀번호를 입력해주세요.' });
      return;
    }

    if (data.saveEmail) {
      localStorage.setItem('savedEmail', data.email);
    } else {
      localStorage.removeItem('savedEmail');
    }

    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onError: () => {
          setError('email', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        },
      },
    );
  };

  useEffect(() => {
    // 이미 재생된 경우 완성된 텍스트 즉시 표시
    if (animationPlayed) {
      if (introRef.current) introRef.current.textContent = introText;
      if (introCursorRef.current) introCursorRef.current.style.display = 'none';
      if (dallaeWrapRef.current) dallaeWrapRef.current.style.display = 'block';
      if (dallaeRef.current) dallaeRef.current.textContent = dallaeText;
      return;
    }

    const el = scope.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = window.innerWidth / 2 - rect.left - rect.width / 2;
    const y = window.innerHeight / 2 - rect.top - rect.height / 2;

    const startTyping = (
      targetRef: React.RefObject<HTMLSpanElement | null>,
      cursorRef: React.RefObject<HTMLSpanElement | null>,
      text: string,
      speed: number,
      onDone: () => void,
    ) => {
      let i = 0;
      const interval = setInterval(() => {
        if (targetRef.current) targetRef.current.textContent = text.slice(0, i + 1);
        i++;
        if (i === text.length) {
          clearInterval(interval);
          if (cursorRef.current) cursorRef.current.style.display = 'none';
          onDone();
        }
      }, speed);
    };

    const sequence = async () => {
      if (formRef.current) animate(formRef.current, { opacity: 0 }, { duration: 0 });

      await animate(el, { x, y, opacity: 0, scale: 5 }, { duration: 0 });
      await animate(el, { opacity: 1 }, { duration: 0.5 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await animate(el, { x: 0, y: 0, scale: 1 }, { duration: 0.8, ease: [0, 0.71, 0.2, 1.01] });

      if (formRef.current) animate(formRef.current, { opacity: 1 }, { duration: 0.5 });

      startTyping(introRef, introCursorRef, introText, 40, () => {
        if (dallaeWrapRef.current) dallaeWrapRef.current.style.display = 'block';
        startTyping(dallaeRef, dallaeCursorRef, dallaeText, 80, () => {
          animationPlayed = true;
        });
      });
    };

    sequence();
  }, []);

  return (
    <div className="relative h-screen">
      <div
        className="absolute top-[25%] m-auto inset-0 max-w-[30rem] w-full
      max-sm2:top-[20%]"
      >
        <div
          className="absolute left-0 right-0 top-[-24%]
        max-sm2:top-[-15%]"
        >
          <motion.div ref={scope} className="m-auto w-[4rem] max-sm2:w-[3rem]">
            <img src={imgCharacter} alt="" />
          </motion.div>

          <div className="text-center mt-2">
            <p className="font-handwriting text-[1.2rem] text-[var(--color-gray-dark)]">
              <span ref={introRef} />
              <motion.span
                ref={introCursorRef}
                className="inline-block ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </p>

            <h2
              ref={dallaeWrapRef}
              className="font-handwriting text-[3rem] leading-[0.7] text-center hidden
              max-sm2:text-[2.4rem]"
            >
              <span ref={dallaeRef} />
              <motion.span
                ref={dallaeCursorRef}
                className="inline-block ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </h2>
          </div>
        </div>

        {/* 로그인 */}
        <div ref={formRef}>
          <div
            className="pt-[4rem] pb-[3rem] px-[3rem] rounded-[4rem] bg-white shadow-middle
        max-sm2:p-[2rem] max-sm2:boxshadow-none max-sm2:bg-transparent max-sm2:shadow-none"
          >
            <form className="block" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormField
                    type="email"
                    value={field.value}
                    placeholder="이메일을 입력해주세요."
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <FormField
                    className="mt-[1.5rem]"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              {errors.email?.message && (
                <p className="mt-[0.4rem] pl-[0.6rem] font-bold text-sm text-[var(--color-secondary)]">
                  {errors.email?.message}
                </p>
              )}

              <Controller
                name="saveEmail"
                control={control}
                render={({ field }) => (
                  <Text as="label" size="2" className="inline-block !mt-[1rem]">
                    <Flex gap="2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      이메일 저장
                    </Flex>
                  </Text>
                )}
              />

              <Button
                type="submit"
                variant="solid"
                className="!mt-[1rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn
            max-sm2:!text-[1.2rem]"
                disabled={loginMutation.isPending}
              >
                로그인
              </Button>
            </form>
          </div>

          {/* 안내 */}
          <div className="mt-[2rem] text-center max-sm2:mt-0">
            <p className="text-[var(--color-text-default)] text-sm font-bold">
              아직 회원이 아니신가요?{' '}
              <Link to="/signup" className="text-[var(--color-secondary)]">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
