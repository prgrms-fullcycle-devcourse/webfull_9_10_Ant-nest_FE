import ChatBubble from '@/features/diaries/components/ChatBubble';
import { diaries } from '@/features/diaries/diaries.mock';

export default function DiaryListPage() {
  return (
    <div>
      {/* TODO: 다이어리 기능 구현 */}
      <ChatBubble chat={diaries} />
    </div>
  );
}
