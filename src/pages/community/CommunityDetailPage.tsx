import type { CommunityPostDetail } from '@/features/community/types/community.types';
import DiaryHeader from '@/components/common/DiaryHeader';
import DiaryQuestion from '@/components/common/DiaryQuestion';
import { useNavigate } from 'react-router-dom';
import mockIcecream from '../../assets/mock-icecream-diary.jpeg';
import { EMOTIONS } from '@/constants/emotions';
import PostDetailForm from '@/features/community/components/PostDetail/PostDetailForm';
import { formatDateStr } from '@/utils/formatDate';
import PostDetailBottomBar from '@/features/community/components/PostDetail/PostDetailBottomBar';

export default function CommunityDetailPage() {
  // 사용할 때 useParams import 해오기
  // const {id} = useParams();

  const post: CommunityPostDetail = {
    postId: 1,
    question: '오늘 당신을 미소 짓게 만든 것은 무엇인가요?',
    title: '완전 완전 맛있는 밥을 먹었음',
    content:
      '떡볶이 먹고 너무 매워서 아이스크림까지 먹었음. 역시 맛있는 걸 먹는 게 인생의 행복이다. 진정한 행복이란 이런 순간에 있는 것 같다. 배는 부른데 마음은 더 먹고 싶다고 외치는 중.',
    emotionEmoji: { id: 'happy', label: '행복', img: EMOTIONS.JOY.emo }, // 일기 감정
    empathyStats: [{ typeId: 1, name: '응원해요', count: 10 }], // 받은 공감
    totalScore: 150,
    timeStamp: '2026-03-27T17:15:00.012Z',
    images: [mockIcecream],
  };

  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      // 히스토리 있으면
      navigate(-1);
    } else {
      navigate('/community');
    }
  };

  return (
    <div>
      <DiaryHeader onBack={handleBack} />
      <DiaryQuestion question={post.question} />
      <PostDetailForm
        selectedEmotionData={post.emotionEmoji}
        dateStr={formatDateStr(post.timeStamp)}
        title={post.title}
        content={post.content}
        images={post.images}
      />
      <PostDetailBottomBar />
      <div className="h-[80px]" />
    </div>
  );
}
