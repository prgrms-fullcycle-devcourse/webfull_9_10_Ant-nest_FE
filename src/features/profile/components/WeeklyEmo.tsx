import { EMOTIONS } from '@/constants/emotions';
import noneImg from '@/assets/images/emotions/emotion-blank.png';
import type { TWeeklyEmoItem } from '@/pages/profile/ProfilePage';

const WEEK_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

type TWeeklyEmoProps = {
  data: TWeeklyEmoItem[];
};

export default function WeeklyEmo({ data }: TWeeklyEmoProps) {
  return (
    <div className="rounded-2xl shadow-[var(--shadow-middle)] px-5 py-3 bg-[#fafafa]">
      <h2 className="pb-4 pl-8 font-bold text-[var(--color-gray-dark)] ">이 주의 감정</h2>
      <div className="grid grid-cols-7 gap-2">
        {WEEK_LABELS.map((item, index) => {
          const foundEmo = data.find((emo) => emo.index === index);

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className="text-xs text-[var(--color-gray)]">{item}</span>
              {foundEmo ? (
                <img className="size-10" src={EMOTIONS[foundEmo.emotion].emo} />
              ) : (
                <img className="size-10" src={noneImg} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
