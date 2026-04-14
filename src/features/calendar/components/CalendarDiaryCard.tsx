import { Button } from '@radix-ui/themes';
import { koreanOrder } from '@/utils/koreanOrder.ts';
import { EMOTIONS } from '@/constants/emotions.ts';

/** 이미지 **/
import iconDelete from '@/assets/images/icons/trashcan.svg';

/** 타입 **/
import type { DiaryContents } from '@/types/index.types.ts';
import type { EmotionKey } from '@/types/index.types.ts';

interface Props {
  cardInfo: DiaryContents;
  moveDetail: (data: string) => void;
  deleteClick: (data: string) => void;
}

export default function CalendarDiaryCard({ cardInfo, moveDetail, deleteClick }: Props) {
  return (
    <div
      className="pr-[1rem] pb-[1rem] shadow-[var(--shadow-middle)] rounded-2xl"
      onClick={() => moveDetail(cardInfo.diaryId)}
    >
      <div className="flex mb-[0.3rem]">
        <Button className="block !ml-[auto] !pl-0 !pr-0 !bg-transparent">
          <img
            src={iconDelete}
            alt="삭제"
            style={{
              filter:
                'invert(58%) sepia(54%) saturate(407%) hue-rotate(74deg) brightness(96%) contrast(88%)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteClick(cardInfo.diaryId);
            }}
          />
        </Button>
      </div>
      <div className="flex item-center justify-start">
        <div className="flex flex-[0.24] items-center flex-col min-w-[7rem]">
          <img
            className="w-[3rem]"
            src={EMOTIONS[cardInfo.emotion.type.toUpperCase() as EmotionKey]?.emo}
            alt=""
          />
          <span className="inline-block mt-[0.4rem] text-xs text-[var(--color-text-default)]">
            {koreanOrder(cardInfo.index ?? 0)} 번째 일기
          </span>
        </div>
        <div className="flex-1 p-[1.7rem] border-x border-[var(--color-gray-light)] rounded-2xl shadow-[var(--shadow-middle)] bg-[var(--color-gray-light2)]">
          <p className="text-base text-[var(--color-text-default)]">{cardInfo.title}</p>
        </div>
      </div>
    </div>
  );
}
