import type { Emojis } from '@/features/community/types/community.types';
import { Button } from '@radix-ui/themes';

type ReactionEmojisToggleProps = {
  reactionEmojis : Emojis[];
};

export const ReactionEmojisToggle = ({reactionEmojis}: ReactionEmojisToggleProps)=>{
  return(
    <div className="flex gap-3 mr-3">
      {reactionEmojis.map((emoji) => (
        <Button
          variant='ghost'
          key={emoji.id}
          className="!bg-transparent !border-none !flex-col !items-center"
        >
          <img src={emoji.url} alt={emoji.name} className="h-8 w-8"/>
          <span className="block text-[10px] text-[var(--color-text-default)] leading-none text-center mt-0.5">
              {emoji.name}
          </span>
        </Button>
      ))}
    </div>
  )
};