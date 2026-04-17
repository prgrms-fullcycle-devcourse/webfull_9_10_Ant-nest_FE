import { useCommunityStore } from '@/store/communityStore';
import EmotionFilterEmojis from './EmotionFilterEmojis';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import { FILTER_EMOJIS } from '@/constants/emotions';
import ConfirmModal from '@/components/common/ConfirmModal';


const FilterBottomSheet = () => {
  const activeBottomSheet = useCommunityStore((state) => state.activeBottomSheet);
  const setActiveBottomSheet = useCommunityStore((state) => state.setActiveBottomSheet);

  // 필터 적용된 이모지
  const selectedEmotions = useCommunityStore((state) => state.selectedEmotions);
  const setSelectedEmotions = useCommunityStore((state) => state.setSelectedEmotions);

  // 선택된 이모지
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedEmotions);
  const isAllSelected = (selectedIds.length === FILTER_EMOJIS.length);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 전체 선택
  const handleSelectAll = () => {
    setSelectedIds(FILTER_EMOJIS.map(e => e.type));
  };

  // 전체 해제
  const handleClear = () => {
    setSelectedIds([]);
  };

  // 적용
  const handleSubmit = ()=>{
    if (selectedIds.length === 0) {
      alert('감정을 선택해주세요');
      return;
    }

    setIsModalOpen(true);
  }

  const onConfirm = ()=>{
    setSelectedEmotions(selectedIds);
    console.log('선택된 감정:', selectedIds);

    setIsModalOpen(false);
    setActiveBottomSheet(null);
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-100 bg-black/25"
        onClick={() => activeBottomSheet === 'filter' && setActiveBottomSheet(null)}
      >
        <div className="absolute bottom-0 left-0 w-full min-h-65 rounded-t-2xl bg-white p-5 pr-6 pl-6">
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end gap-6">
              <Button 
                onClick={ ()=> {
                  if (isAllSelected) {
                    handleClear();
                  } else {
                    handleSelectAll();        
                  }}}
                variant="ghost" 
                className="!text-[#F8876E] !text-[15px] !font-medium"
              >
                {isAllSelected ? "전체 해제" : "전체 선택"}
              </Button>
              <Button
                variant="ghost"
                className="!text-[var(--color-primary)] !text-[15px] !font-medium"
                onClick={handleSubmit}
              >
                적용
              </Button>
            </div>

            <div>
              <EmotionFilterEmojis
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              ></EmotionFilterEmojis>
            </div>

            <ConfirmModal
              isOpen={isModalOpen}
              title="감정 필터"
              description={`선택한 감정 ${selectedIds.length}개를 적용할까요?`}
              confirmLabel="적용"
              onCancel={() => setIsModalOpen(false)}
              onConfirm={() => onConfirm()}
            />


          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
