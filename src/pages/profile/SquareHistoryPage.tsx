import Header from '@/components/common/Header';
import Loading from '@/components/common/Loading';
import { MySquareList } from '@/features/profile/components/MySquareList';
import { useSquareHistory } from '@/features/profile/queries/useProfileQuery';

export default function SquareHistoryPage() {
  const { data, isLoading } = useSquareHistory();

  if (isLoading || !data) return <Loading />;
  const post = data.data;
  return (
    <div>
      <Header text="나의 광장 기록" />
      <MySquareList post={post} />
    </div>
  );
}
