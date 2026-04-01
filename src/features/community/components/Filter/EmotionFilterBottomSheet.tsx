import { useCommunityStore } from '@/store/communityStore';
import EmotionFilterEmojis from './EmotionFilterEmojis';
import type { Emojis } from '@/features/community/types/community.types';
import joy from '../../../../assets/images/emotions/illu-happy.png';
import heart from '../../../../assets/images/emotions/emotion-excited.png';
import panic from '../../../../assets/images/emotions/emotion-absurd.png';
import sad from '../../../../assets/images/emotions/emotion-depressed.png';
import angry from '../../../../assets/images/emotions/emotion-angry.png';
import normal from '../../../../assets/images/emotions/illu-default.png';
import gross from '../../../../assets/images/emotions/emotion-disgusted.png';
import tired from '../../../../assets/images/emotions/emotion-tired.png';
import { Button } from '@radix-ui/themes';
// 필터용 감정 이모지
const filterEmojis: Emojis[] = [
  { id: 1, name: 'joy', url: joy },
  { id: 2, name: 'heart', url: heart },
  { id: 3, name: 'panic', url: panic },
  { id: 4, name: 'sad', url: sad },
  { id: 5, name: 'angry', url: angry },
  { id: 6, name: 'normal', url: normal },
  { id: 7, name: 'gross', url: gross },
  { id: 8, name: 'tired', url: tired },
];

const FilterBottomSheet = () => {
  const activeBottomSheet = useCommunityStore((state) => state.activeBottomSheet);
  const setActiveBottomSheet = useCommunityStore((state) => state.setActiveBottomSheet);
  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black/25"
        onClick={() => activeBottomSheet === 'filter' && setActiveBottomSheet(null)}
      >
        <div className="absolute bottom-0 left-0 w-full min-h-70 rounded-t-2xl bg-white p-5 pr-6">
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end gap-6">
              <Button variant="ghost" className="!text-[#F8876E] !text-[15px] !font-medium">
                전체 선택
              </Button>
              <Button
                variant="ghost"
                className="!text-[var(--color-primary)] !text-[15px] !font-medium"
              >
                적용
              </Button>
            </div>

            <div>
              <EmotionFilterEmojis filterEmojis={filterEmojis}></EmotionFilterEmojis>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
