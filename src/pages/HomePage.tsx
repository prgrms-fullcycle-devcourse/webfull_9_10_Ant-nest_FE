import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '8px' }}>
        {isAuthenticated ? `안녕하세요, ${user?.nickname}님` : '달래에 오신 걸 환영합니다'}
      </h1>
      <p style={{ color: 'var(--text)', marginBottom: '32px' }}>
        나만의 다이어리를 기록하고, 캘린더로 돌아보세요.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {[
          { to: '/diary', label: '다이어리', desc: '오늘의 감정을 기록해요' },
          { to: '/calendar', label: '캘린더', desc: '지난 기록을 돌아봐요' },
          { to: '/community', label: '커뮤니티', desc: '다른 사람들과 공유해요' },
        ].map(({ to, label, desc }) => (
          <Link
            key={to}
            to={to}
            style={{
              flex: '1 1 200px',
              padding: '24px',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'var(--text-h)',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '14px', color: 'var(--text)' }}>{desc}</div>
          </Link>
        ))}
      </div>

      {!isAuthenticated && (
        <div style={{ marginTop: '32px' }}>
          <Link
            to="/login"
            style={{
              padding: '10px 24px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            시작하기
          </Link>
        </div>
      )}
    </div>
  );
}