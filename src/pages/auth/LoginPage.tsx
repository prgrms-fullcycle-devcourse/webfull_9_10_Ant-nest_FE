import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types';

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = (data: LoginRequest) => {
    login.mutate(data);
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
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            {...register('password', { required: '비밀번호를 입력해주세요' })}
            type="password"
            placeholder="비밀번호"
            style={inputStyle}
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>
          )}
        </div>

        {login.error && (
          <p style={{ color: 'red', fontSize: '13px' }}>이메일 또는 비밀번호가 올바르지 않습니다.</p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          style={{
            padding: '11px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: login.isPending ? 'not-allowed' : 'pointer',
            opacity: login.isPending ? 0.7 : 1,
          }}
        >
          {login.isPending ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text)' }}>
        계정이 없으신가요?{' '}
        <Link to="/signup" style={{ color: 'var(--accent)' }}>
          회원가입
        </Link>
      </p>
    </div>
  );
}