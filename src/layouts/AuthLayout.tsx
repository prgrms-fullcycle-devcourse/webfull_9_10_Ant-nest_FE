import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 700,
          fontSize: '28px',
          color: 'var(--accent)',
          textDecoration: 'none',
          marginBottom: '32px',
        }}
      >
        달래
      </Link>

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          background: 'var(--bg)',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}