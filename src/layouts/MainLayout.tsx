import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from './Navbar';

export default function MainLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen max-w-200 mx-auto">
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

      <main className='flex-1 pb-16'>
        <Outlet />
      </main>

      <Navbar />
    </div>
  );
}