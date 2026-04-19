import { FILTER_EMOJIS } from "@/constants/emotions";

interface Props {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmotionFilterEmojis = ({ selectedIds, setSelectedIds } : Props) => {

  return (
    <div className='mt-7 grid grid-cols-4 gap-y-7 justify-items-center cursor-pointer'>
      {FILTER_EMOJIS.map((emoji)=>
        <img
          key={emoji.id}
          onClick={()=>{
            setSelectedIds(prev => 
              prev.includes(emoji.type) 
                ? prev.filter(type => type !== emoji.type) // 활성화 목록에서 제거
                : [...prev, emoji.type] // 추가
            );
          }}
          src={
            selectedIds.includes(emoji.type)
              ? emoji.activeUrl
              : emoji.inactiveUrl
          } 
          className='h-14 w-14'/>
      )}
    </div>
  );
};

export default EmotionFilterEmojis;
