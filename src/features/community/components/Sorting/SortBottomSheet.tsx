import { useCommunityStore } from '@/store/communityStore';
import { Button } from '@radix-ui/themes';

const SortBottomSheet = () => {
  const activeBottomSheet = useCommunityStore((state) => state.activeBottomSheet);
  const setActiveBottomSheet = useCommunityStore((state) => state.setActiveBottomSheet);

  const sortOptions = ['최신순', '오래된순', '공감많은순'];
  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black/25"
        onClick={() => activeBottomSheet === 'sort' && setActiveBottomSheet(null)}
      >
        <div
          className="absolute bottom-0 left-0 w-full min-h-70 rounded-t-2xl bg-white p-5 pr-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="!text-[var(--color-primary)] !text-[15px] !font-medium"
            >
              적용
            </Button>
          </div>

          <div className="mt-2 gap-8 flex flex-col">
            {sortOptions.map((label) => (
              <Button
                key={label}
                variant="ghost"
                className="!font-medium !text-[var(--color-text-default)] !text-base"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBottomSheet;
