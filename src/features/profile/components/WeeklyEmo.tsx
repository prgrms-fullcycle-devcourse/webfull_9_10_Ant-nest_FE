import { EMOTIONS } from '@/constants/emotions';
import noneImg from '@/assets/images/emotions/emotion-blank.png';
import type { EmotionKey } from '@/types/index.types';

const WEEK_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

type Emo = { emotion: EmotionKey | null };

type Props = {
  weeklyEmo: Emo[];
};

export default function WeeklyEmo(weeklyEmo: Props) {
  // if (isLoading) return <Loading />;
  return (
    <div className="rounded-2xl shadow-[var(--shadow-middle)] py-3 bg-[#fafafa]">
      <h2 className="pb-4 pl-8 font-bold text-[var(--color-gray-dark)] ">이 주의 감정</h2>
      <div className="grid grid-cols-7 gap-4 px-5">
        {WEEK_LABELS.map((item, index) => {
          const foundEmo = weeklyEmo.weeklyEmo[index];
          console.log('주간이모지', foundEmo);

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className="text-xs text-[var(--color-gray)]">{item}</span>
              {foundEmo?.emotion ? (
                <img src={EMOTIONS[foundEmo.emotion].emo} />
              ) : (
                <img src={noneImg} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
