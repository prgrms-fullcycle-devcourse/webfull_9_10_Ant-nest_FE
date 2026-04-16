// import { useState } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
// import { addMonths, format, isSameMonth, subMonths } from 'date-fns';
import { EMOTIONS } from '@/constants/emotions';
import type { EmoCount } from '../types/profile.types';
import type { EmotionKey } from '@/types/index.types';

type Props = {
  data: EmoCount[];
};

export default function MonthlyEmo({ data }: Props) {
  const emoMap = Object.fromEntries(data.map((e) => [e.type, e.count]));
  const emotionKeys = Object.keys(EMOTIONS) as EmotionKey[];

  const fullEmo = emotionKeys
    .map((key) => ({
      type: key,
      count: emoMap[key] ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...fullEmo.map((e) => e.count), 1);
  console.log(fullEmo);

  return (
    <div className="rounded-2xl bg-white py-3 shadow-[var(--shadow-middle)]">
      <h2 className="pb-4 pl-8 font-bold text-[var(--color-gray-dark)] ">이 달의 감정</h2>
      <div className="px-10 pb-5 min-h-76 flex justify-center items-center">
        <div className="space-y-1 w-full">
          {fullEmo.map((item, index) => {
            const widthPercent = `${(item.count / maxCount) * 100}%`;
            console.log(EMOTIONS[item.type].emo);
            return (
              <div key={index} className="grid grid-cols-[24px_1fr_36px] items-center gap-3">
                <img
                  src={EMOTIONS[item.type].emo}
                  alt={EMOTIONS[item.type].label}
                  className="h-8 w-8 object-contain"
                />

                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-gray-light)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: widthPercent,
                      backgroundColor: EMOTIONS[item.type].color,
                    }}
                  />
                </div>

                <span className="text-right text-sm font-semibold text-[var(--color-gray-dark)]">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
