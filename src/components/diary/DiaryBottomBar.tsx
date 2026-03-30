interface DiaryBottomBarProps {
  isPublic: boolean;
  onTogglePublic: () => void;
  onSave: () => void;
}

export default function DiaryBottomBar({ isPublic, onTogglePublic, onSave }: DiaryBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] z-50">
      <div className="max-w-200 mx-auto flex items-center justify-between px-[20px] py-[12px]">

        {/* 광장에 게시 토글 */}
        <div className="flex flex-col items-center gap-[4px]">
          <span className="text-[11px] text-[#66BB6A] font-semibold">광장에 게시</span>
          <button
            onClick={onTogglePublic}
            className={`relative w-[48px] h-[26px] rounded-full border-none cursor-pointer transition-all duration-300 ${
              isPublic ? 'bg-[#DFF3E3]' : 'bg-[#E5E7EB]'
            }`}
          >
            <div className={`absolute w-[30px] h-[30px] rounded-full top-[-2px] transition-all duration-300 shadow-md ${
              isPublic ? 'left-[20px] bg-[#66BB6A]' : 'left-[-2px] bg-[#9CA3AF]'
            }`} />
          </button>
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={onSave}
          className="w-[116px] h-[54px] rounded-[14px] bg-[#66BB6A] text-white font-semibold text-[16px] border-none cursor-pointer"
        >
          저장
        </button>

      </div>
    </div>
  );
}