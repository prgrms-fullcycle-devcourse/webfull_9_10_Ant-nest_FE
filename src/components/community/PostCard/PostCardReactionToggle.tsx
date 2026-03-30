import type { Emojis } from '@/pages/community/types';

type ReactionEmojisToggleProps = {
  reactionEmojis : Emojis[];
};

export const ReactionEmojisToggle = ({reactionEmojis}: ReactionEmojisToggleProps)=>{
  return(
    <div className="flex gap-3 mr-3">
      {reactionEmojis.map((emoji) => (
        <button 
          key={emoji.id}
          className="p-0 bg-transparent border-none"
        >
          <img src={emoji.url} alt={emoji.name} className="h-8 w-8"/>
          <span className="block text-[10px] text-[var(--color-text-default)] leading-none text-center mt-1">
            {emoji.name}
          </span>
        </button>
      ))}
    </div>
  )
};