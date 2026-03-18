import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import type { SignupRequest } from '../../types';

export default function SignupPage() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit = (data: SignupRequest) => {
    signup.mutate(data);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '15px',
    color: 'var(--text-h)',
    background: 'var(--bg)',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>회원가입</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <input
            {...register('nickname', { required: '닉네임을 입력해주세요', minLength: { value: 2, message: '닉네임은 2자 이상이어야 합니다' } })}
            type="text"
            placeholder="닉네임"
            style={inputStyle}
          />
          {errors.nickname && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.nickname.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('email', { required: '이메일을 입력해주세요' })}
            type="email"
            placeholder="이메일"
            style={inputStyle}
          />
          {errors.email && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('password', { required: '비밀번호를 입력해주세요', minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다' } })}
            type="password"
            placeholder="비밀번호 (8자 이상)"
            style={inputStyle}
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>
          )}
        </div>

        {signup.error && (
          <p style={{ color: 'red', fontSize: '13px' }}>회원가입에 실패했습니다. 다시 시도해주세요.</p>
        )}

        <button
          type="submit"
          disabled={signup.isPending}
          style={{
            padding: '11px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: signup.isPending ? 'not-allowed' : 'pointer',
            opacity: signup.isPending ? 0.7 : 1,
          }}
        >
          {signup.isPending ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text)' }}>
        이미 계정이 있으신가요?{' '}
        <Link to="/login" style={{ color: 'var(--accent)' }}>
          로그인
        </Link>
      </p>
    </div>
  );
}