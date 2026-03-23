import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import type { SignupRequest } from '../../types';
import imgCharacter from "@/assets/images/characters/character-draw.gif";
import FormField from "@/components/signin/FormField.tsx";
import {Button} from "@radix-ui/themes";
import {useState} from "react";
import Header from "@/components/common/Header.tsx";

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')


  return (
      <div className="relative h-screen">
          <Header
            text="회원가입"
          />

          <div className="absolute m-auto inset-0 max-w-[30rem] w-full h-[30rem]">
              <div className="absolute left-0 right-0 top-[-16%] m-auto w-[4rem]">
                  <img src={imgCharacter} alt="" />
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
                          label={'닉네임'}
                          value={password}
                          type={'text'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setPassword}
                      />

                      <FormField
                          className="mt-[1.5rem]"
                          label={'비밀번호'}
                          value={password}
                          type={'password'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setPassword}
                      />

                      <FormField
                          className="mt-[1.5rem]"
                          label={'비밀번호 확인'}
                          value={password}
                          type={'password'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setPassword}
                      />

                      <Button type="button" variant="solid" className="!mt-[2rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn]">로그인</Button>
                  </form>
              </div>
          </div>
      </div>
  );
}