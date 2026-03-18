import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/diary', label: '다이어리' },
  { to: '/calendar', label: '캘린더' },
  { to: '/community', label: '커뮤니티' },
  { to: '/profile', label: '프로필' },
];

export default function MainLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          height: '56px',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '20px', color: 'var(--text-h)' }}>
          달래
        </span>

        <nav style={{ display: 'flex', gap: '8px', flex: 1 }}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                padding: '6px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                color: isActive ? 'var(--accent)' : 'var(--text)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              fontSize: '14px',
              color: 'var(--text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        ) : (
          <NavLink
            to="/login"
            style={{ fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}
          >
            로그인
          </NavLink>
        )}
      </header>

      <main style={{ flex: 1, padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  );
}