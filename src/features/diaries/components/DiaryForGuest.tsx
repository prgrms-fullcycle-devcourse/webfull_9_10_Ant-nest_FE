import QuestionBubble from '@/features/home/components/QuestionBubble';
import { Link } from 'react-router-dom';

export default function DiaryForGeust() {
  return (
    <QuestionBubble>
      <div className="flex gap-3 flex-col">
        <div>
          <p className="px-3">익명의 달래님,</p>
          <p>일기를 작성하고 확인하려면 로그인이 필요해요.</p>
        </div>
        <Link to="/login">로그인하러 가기</Link>
      </div>
    </QuestionBubble>
  );
}
