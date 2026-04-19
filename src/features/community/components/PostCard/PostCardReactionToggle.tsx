import { REACTION_EMO, REACTION_ORDER } from '@/constants/emotions';
import { Button } from '@radix-ui/themes';

interface Props {
  onClose : ()=>void;
  handleReaction : (reactionId: number, isCancel: boolean)=>void;
  myReactionId : number | null;
}


export const ReactionEmojisToggle = ({
  onClose,
  handleReaction,
  myReactionId
  } : Props) => 
  {

  // 선택된 공감 버튼
  const handleSelect = (id : number)=>{
    if (myReactionId === id) {
      handleReaction(id, true); // 선택 취소
    } else {
      handleReaction(id, false); // 선택
    }
    
    onClose();
  };

  return(
    <div className="flex gap-3 mr-3 ml-3">
      {REACTION_ORDER.map((id) => {
        const emoji = REACTION_EMO.find((e) => e.id === id);

        if (!emoji) return null;

        console.log(myReactionId, typeof myReactionId);
        console.log(emoji.id, typeof emoji.id);

        return(
        <Button
          variant='ghost'
          key={emoji.id}
          className={`!bg-transparent !border-none !flex-col !items-center 
            ${myReactionId === emoji.id ? "!scale-110 !drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" : ""}`}
          onClick={()=>handleSelect(emoji.id)}
        >
          <img src={emoji.url} alt={emoji.name} className="h-8 w-8 mb-0"/>
          <span 
            className='block text-[10px] text-[var(--color-text-default)] leading-none text-center'>
              {emoji.name}
          </span>
        </Button>
        )
      })}
    </div>
  )
};