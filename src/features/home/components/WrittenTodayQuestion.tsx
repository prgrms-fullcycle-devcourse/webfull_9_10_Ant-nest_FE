import type { DiaryDetail } from '@/types/index.types';
import { Pencil1Icon } from '@radix-ui/react-icons';

interface Props {
  onClick: () => void;
  diary: DiaryDetail;
}

export default function WrittenTodayQuestion({ onClick, diary }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-[var(--color-text-subtle)]] text-sm">
        <p>오늘도 하나의 꽃을 피워냈어요.</p>
        <p>내일 또 새로운 질문으로 찾아올게요.</p>
      </div>
      <div className="relative flex flex-col justify-center gap-2 px-2 py-4 text-center rounded-2xl min-w-75 bg-[var(--color-gray-light2)]">
        <p className="text-[var(--color-text-placeholder)] text-[var(--color-text-subtle)]] text-sm">
          {diary.question}
        </p>
        <p className="text-[var(--color-primary)]">{diary.title}</p>
        <Pencil1Icon
          className="absolute bottom-2 right-2 text-[var(--color-primary)]"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
