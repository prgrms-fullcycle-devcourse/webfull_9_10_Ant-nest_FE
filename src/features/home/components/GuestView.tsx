import { Link } from 'react-router-dom';

export default function GuestView() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2 text-[var(--color-gray-dark)]">
        <p>일기를 작성하려면 로그인이 필요해요.</p>
        <p>로그인하여 새로운 꽃을 피워보세요.</p>
      </div>
      <Link to={'/login'}>
        <div className="text-[var(--color-primary)] text-sm">로그인 페이지로 이동하기</div>
      </Link>
    </div>
  );
}
