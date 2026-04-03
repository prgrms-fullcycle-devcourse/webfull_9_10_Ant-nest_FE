import { REACTION_EMO } from '@/constants/emotions';
import { Button } from '@radix-ui/themes';


export const ReactionEmojisToggle = ()=>{
  return(
    <div className="flex gap-3 mr-3 ml-3">
      {REACTION_EMO.map((emoji) => (
        <Button
          variant='ghost'
          key={emoji.id}
          className="!bg-transparent !border-none !flex-col !items-center"
        >
          <img src={emoji.url} alt={emoji.name} className="h-8 w-8 mb-0"/>
          <span className="block text-[10px] text-[var(--color-text-default)] leading-none text-center">
              {emoji.name}
          </span>
        </Button>
      ))}
    </div>
  )
};