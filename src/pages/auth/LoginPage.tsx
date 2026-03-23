import { Link } from 'react-router-dom';
import {useState} from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

import {Button} from "@radix-ui/themes";

/** 컴포넌트 **/
import FormField from "@/components/signin/FormField.tsx";

/** 이미지 **/
import imgCharacter from '@/assets/images/characters/character-draw.gif'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let message = false

  return (
    <div className="relative h-screen">
      <div className="absolute m-auto inset-0 max-w-[30rem] w-full h-[30rem]">
        <div className="absolute left-0 right-0 top-[-30%]">
          <div className="m-auto w-[4rem]">
            <img src={imgCharacter} alt="" />
          </div>
          <h2 className="font-handwriting text-[5rem] leading-[0.7] text-center">Dallae</h2>
        </div>

        {/* 로그인 */}
        <div className="pt-[4rem] pr-[3rem] pb-[3rem] pl-[3rem] rounded-[4rem] bg-white shadow-middle">
          <form className="block">
            <FormField
                label={'이메일'}
                value={email}
                type={'email'}
                placeholder={'이메일를 입력해주세요.'}
                onChange={setEmail}
            />

            <FormField
                className="mt-[1.5rem]"
                label={'비밀번호'}
                value={password}
                type={'password'}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={setPassword}
            />

            {message &&(
                  <p className="mt-[0.4rem] pl-[0.6rem] font-bold text-sm text-[var(--color-secondary)]">이메일 또는 비밀번호가 올바르지 않습니다.</p>
              )
            }

            <Button type="button" variant="solid" className="!mt-[2rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn]">로그인</Button>

            <b className="block mt-4 text-[var(--color-primary)] text-center text-sm">
              <Link to="">
                게스트로 시작하기
              </Link>
            </b>
          </form>
        </div>

        {/* 안내 */}
        <div className="mt-[2rem] text-center">
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