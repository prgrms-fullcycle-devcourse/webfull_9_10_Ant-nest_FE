import { Link } from 'react-router-dom';
import {useState} from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

import {Button, Checkbox, Flex, Text} from "@radix-ui/themes";

/** 컴포넌트 **/
import FormField from "@/features/auth/components/FormField.tsx";

/** 이미지 **/
import imgCharacter from '@/assets/images/characters/character-draw.gif'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let message = false

  return (
    <div className="relative h-screen">
      <div className="absolute top-[25%] m-auto inset-0 max-w-[30rem] w-full
      max-sm2:top-[20%]
      ">
        <div className="absolute left-0 right-0 top-[-25%]
        max-sm2:top-[-13%]
        ">
          <div className="m-auto w-[4rem]
          max-sm2:w-[3rem]
          ">
            <img src={imgCharacter} alt="" />
          </div>
          <h2 className="font-handwriting text-[5rem] leading-[0.7] text-center
          max-sm2:text-[4rem]
          ">Dallae</h2>
        </div>

        {/* 로그인 */}
        <div className="pt-[4rem] pr-[3rem] pb-[3rem] pl-[3rem] rounded-[4rem] bg-white shadow-middle
        max-sm2:p-[2rem] max-sm2:boxshadow-none max-sm2:bg-transparent max-sm2:shadow-none
        ">
          <form className="block">
            <FormField
                value={email}
                type={'email'}
                placeholder={'이메일를 입력해주세요.'}
                onChange={setEmail}
            />

            <FormField
                className="mt-[1.5rem]"
                value={password}
                type={'password'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={setPassword}
            />

            {message &&(
                  <p className="mt-[0.4rem] pl-[0.6rem] font-bold text-sm text-[var(--color-secondary)]">이메일 또는 비밀번호가 올바르지 않습니다.</p>
              )
            }

            <Text as="label" size="2" className="inline-block !mt-[1rem]">
              <Flex gap="2">
                <Checkbox defaultChecked />
                자동로그인
              </Flex>
            </Text>


            <Button type="button" variant="solid" className="!mt-[1rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn]
            max-sm2:!text-[1.2rem]
            ">로그인</Button>

            <b className="block mt-4 text-[var(--color-primary)] text-center text-sm">
              <Link to="">
                게스트로 시작하기
              </Link>
            </b>
          </form>
        </div>

        {/* 안내 */}
        <div className="mt-[2rem] text-center
        max-sm2:mt-0
        ">
          <p className="text-[var(--color-text-default)] text-sm font-bold">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="text-[var(--color-secondary)]">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}