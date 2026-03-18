import { useAuthStore } from '../../store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '8px' }}>
        프로필
      </h1>
      {user && (
        <p style={{ color: 'var(--text)' }}>
          {user.nickname} ({user.email})
        </p>
      )}
      {/* TODO: 프로필 기능 구현 */}
    </div>
  );
}