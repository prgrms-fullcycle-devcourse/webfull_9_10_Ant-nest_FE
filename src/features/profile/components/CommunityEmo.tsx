import { REACTION_EMO } from '@/constants/emotions';
import type { ReceivedEmpathies } from '../types/profile.types';

type Props = {
  emo: ReceivedEmpathies[];
};

export default function CommunityEmo({ emo }: Props) {
  console.log('emo', emo);
  return (
    <div className="rounded-2xl shadow-[var(--shadow-middle)] py-3 bg-[#fafafa]">
      <h2 className="pb-4 pl-8 font-bold text-[var(--color-gray-dark)]">나의 광장 온도</h2>
      <div className="grid grid-cols-5 gap-4 px-8 justify-items-center">
        {REACTION_EMO.map((reaction) => {
          const matched = emo.find((e) => e.name === reaction.tag);
          const emoCount = matched?.count ?? 0;
          return (
            <div>
              <div
                key={reaction.id}
                className="flex flex-col items-center bg-white max-w-12 rounded-2xl p-2 shadow-sm gap-2"
              >
                <div className="text-[var(--color-gray)] rounded-full size-5 text-center text-sm">
                  {emoCount}
                </div>

                <img src={reaction.url} className="animate-side size-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
