import type { SquareHistoryResponse } from '../types/profile.types';
import { EMOTIONS } from '@/constants/emotions';

type Props = {
  post: SquareHistoryResponse;
};
export const MySquareCard = ({ post }: Props) => {
  console.log(post);

  return (
    <article
      className={`min-h-[10rem] rounded-2xl p-4 shadow-[var(--shadow-middle)] m-4 mt-6
      bg-[#FCFCF4]`}
    >
      <div className="bg-[var(--color-primary)] mb-2 rounded-xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]">
        <h3 className="m-2 text-sm font-semibold text-white">{post.title}</h3>
      </div>

      <div className="bg-[#FAFAFA] p-2 mb-2 rounded-xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5.5 text-[var(--color-text-default)]">
          {post.content}
        </p>
      </div>

      {/* 감정 버튼 영역 */}
      <div className="relative mt-4 flex items-start justify-end gap-2">
        {post.empathyStats.map((emoji) => {
          const emoLabel = emoji.name === '신남' ? '기쁨' : emoji.name;
          const emo = Object.values(EMOTIONS).find((e) => e.label === emoLabel);

          console.log(emo);
          return (
            <div className="flex flex-row gap-2 justify-center items-center">
              <img src={emo?.emo} alt={emo?.id} className="h-8 w-8 mb-0" />
              <span className="text-[var(--color-gray-dark)] text-sm">{emoji.count}</span>
            </div>
          );
        })}
      </div>
      <div className="mb-3 flex gap-2 justify-end">
        <span className="mt-2 text-xs text-gray-400 ">
          공유된 날짜 {post.sharedAt.split('T')[0]}
        </span>
      </div>
    </article>
  );
};
