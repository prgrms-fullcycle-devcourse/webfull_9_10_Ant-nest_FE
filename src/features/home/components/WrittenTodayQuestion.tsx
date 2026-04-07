import type { TDiaryItem } from '@/features/diaries/types/diaries.types';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

interface Props {
  question: string;
  diary: TDiaryItem;
}

export default function WrittenTodayQuestion({ question, diary }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-[var(--color-text-subtle)]] text-sm">
        <p>오늘도 하나의 꽃을 피워냈어요.</p>
        <p>내일 또 새로운 질문으로 찾아올게요.</p>
      </div>
      <div className="relative flex flex-col justify-center gap-2 px-2 py-4 text-center rounded-2xl min-w-75 bg-[var(--color-gray-light2)]">
        <p className="text-[var(--color-text-placeholder)] text-[var(--color-text-subtle)]] text-sm">
          {question}
        </p>
        <p className="text-[var(--color-primary)]">{diary.answer.title}</p>
        <Link to="/diary/1" className="absolute bottom-2 right-2">
          <Pencil1Icon className="text-[var(--color-primary)]" />
        </Link>
      </div>
    </div>
  );
}
