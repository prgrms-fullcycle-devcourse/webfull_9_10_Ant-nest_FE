import { Button } from '@radix-ui/themes';

/** 이미지 **/
import iconDelete from '@/assets/images/icons/trashcan.svg';
import emoji from '@/assets/images/emotions/emotion-absurd.png';

export default function CalendarDiaryCard() {
  const setEmoji = () => {
    let emoji = 'emoji';

    return `@/assets/images/icons/${emoji}.svg`;
  };

  return (
    <div className="pr-[1rem] pb-[1rem] shadow-[var(--shadow-middle)] rounded-2xl">
      <div className="flex mb-[0.3rem]">
        <Button className="block !ml-[auto] !pl-0 !pr-0 !bg-transparent">
          <img
            src={iconDelete}
            alt="삭제"
            style={{
              filter:
                'invert(58%) sepia(54%) saturate(407%) hue-rotate(74deg) brightness(96%) contrast(88%)',
            }}
          />
        </Button>
      </div>
      <div className="flex item-center justify-start">
        <div className="flex flex-[0.24] items-center flex-col min-w-[7rem]">
          <img className="w-[3rem]" src={emoji} alt="" />
          <span className="inline-block mt-[0.4rem] text-xs text-[var(--color-text-default)]">
            두 번째 일기
          </span>
        </div>
        <div className="flex-1 p-[1.7rem] border-x border-[var(--color-gray-light)] rounded-2xl shadow-[var(--shadow-middle)] bg-[var(--color-gray-light2)]">
          <p className="text-base text-[var(--color-text-default)]">완전완전 맛있는 밥을 먹음.</p>
        </div>
      </div>
    </div>
  );
}
