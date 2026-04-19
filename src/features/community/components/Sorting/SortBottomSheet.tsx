import { useCommunityStore } from '@/store/communityStore';
import { Button } from '@radix-ui/themes';
import type { SortType } from '../../types/community.types';
import { useEffect, useState } from 'react';

type Props = {
  setSort: (sort: SortType | null) => void;
  currentSort: SortType | null;
};

const SortBottomSheet = ({ setSort, currentSort }: Props ) => {
  const activeBottomSheet = useCommunityStore((state) => state.activeBottomSheet);
  const setActiveBottomSheet = useCommunityStore((state) => state.setActiveBottomSheet);

  const [tempSort, setTempSort] = useState<SortType | null>(currentSort);

  useEffect(() => { setTempSort(currentSort); }, [currentSort]);

  const sortOptions: { label: string; value: SortType | null}[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '공감많은순', value: 'POPULAR' },
  ];

  const handleApply = () => {
    if (tempSort) {
    setSort(tempSort);
    } else {
      setSort(null); // 정렬 안함 유지
    }
    setActiveBottomSheet(null);
  };

  const handelClick = (value : SortType | null) => {
    if (tempSort === value) {
      setTempSort(null);
    } else {
      setTempSort(value);
    }
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-100 bg-black/25"
        onClick={() => activeBottomSheet === 'sort' && setActiveBottomSheet(null)}
      >
        <div
          className="absolute bottom-0 left-0 w-full min-h-50 rounded-t-2xl bg-white p-5 pr-6 pl-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="!text-[var(--color-primary)] !text-[15px] !font-medium"
              onClick={handleApply}
            >
              적용
            </Button>
          </div>

          <div className="mt-5 gap-10 flex flex-col">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant="ghost"
                className={`!font-medium !text-base
                  ${tempSort === option.value
                    ? '!text-[var(--color-primary)]'
                    : '!text-[var(--color-text-default)]'}
                `}
                // onClick={() => setTempSort(option.value)}
                onClick={() => handelClick(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBottomSheet;
