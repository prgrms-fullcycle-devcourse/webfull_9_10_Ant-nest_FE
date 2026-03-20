import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types';

/** 이미지 **/
import imgCharacter from '@/assets/images/characters/character-draw2.gif'

export default function LoginPage() {
  return (
    <div className="relative">
      <div className="absolute m-auto w-fit left-0 right-0">
        <div>
          <h2 className="font-handwriting text-5xl text-center">Dallae</h2>
        </div>
        <div className="w-3xs">
          <img src={imgCharacter} alt="" />
        </div>
      </div>

      <div className="absolute m-auto">
        <form>
          <div>
            <input
                type="email"
                placeholder="이메일"
            />

          </div>

          <div>
            <input
                type="password"
                placeholder="비밀번호"
            />

          </div>

          <p style={{ color: 'red', fontSize: '13px' }}>이메일 또는 비밀번호가 올바르지 않습니다.</p>

          <button
              type="submit"
          >
            로그인
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text)' }}>
          계정이 없으신가요?{' '}
          <Link to="/signup" style={{ color: 'var(--accent)' }}>
            회원가입
          </Link>
        </p>
      </div>



    </div>
  );
}