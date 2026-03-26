import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import type { SignupRequest } from '../../types';
import imgCharacter from "@/assets/images/characters/character-draw.gif";
import FormField from "@/features/auth/components/FormField.tsx";
import {Button} from "@radix-ui/themes";
import {useState} from "react";
import Header from "@/components/common/Header.tsx";

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')


  return (
      <div className="relative h-auto min-h-screen">
          <Header
            text="회원가입"
          />

          <div className="absolute top-[25%] m-auto inset-0 max-w-[30rem] w-full
          max-sm2:top-[20%]
          ">
              <div className="absolute left-0 right-0 top-[-16%] m-auto w-[4rem]
              max-sm2:top-[-8%]
              ">
                  <img src={imgCharacter} alt="" />
              </div>

              {/* 회원가입 */}
              <div className="pt-[4rem] pr-[3rem] pb-[3rem] pl-[3rem] rounded-[4rem] bg-white shadow-middle
              max-sm2:p-[2rem] max-sm2:boxshadow-none max-sm2:bg-transparent max-sm2:shadow-none
              ">
                  <form className="block">
                      <FormField
                          label={'이메일'}
                          value={email}
                          type={'email'}
                          placeholder={'이메일를 입력해주세요.'}
                          onChange={setEmail}
                      />

                      <FormField
                          className="mt-[1.3rem]"
                          label={'닉네임'}
                          value={name}
                          type={'text'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setName}
                      />

                      <FormField
                          className="mt-[1.3rem]"
                          label={'비밀번호'}
                          value={password}
                          type={'password'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setPassword}
                      />

                      <FormField
                          className="mt-[1.3rem]"
                          label={'비밀번호 확인'}
                          value={passwordCheck}
                          type={'password'}
                          placeholder={'비밀번호를 입력해주세요.'}
                          onChange={setPasswordCheck}
                      />

                      <Button type="button" variant="solid" className="!mt-[3.1rem] !w-full !h-[4rem] !text-[1.3rem] !font-bold !text-base green-btn]
                        max-sm2:!text-[1.2rem]
                        ">회원가입</Button>
                  </form>
              </div>
          </div>
      </div>
  );
}