import { Button } from "@radix-ui/themes";
import type { EmpathyStat } from "../../types/community.types";
import { REACTION_EMO } from "@/constants/emotions";

interface PostCardReactionProps {
    empathyStats: EmpathyStat[];
    myReactionId : number | null;
};

const PostCardReaction = ({empathyStats, myReactionId} : PostCardReactionProps) => {
    return (
        <div className="flex gap-3 mr-3 ml-3">
            {REACTION_EMO.map((emoji) => {
                const stat = empathyStats.find((emo)=> Number(emo.typeId) === emoji.id && emo.count > 0);
                
                if (stat) {
                    return (
                        <Button
                            variant='ghost'
                            key={emoji.id}
                            className={`!bg-transparent !border-none !flex-col !items-center
                                ${myReactionId === emoji.id ? "!drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]" : ""}`}
                            >
                            <img src={emoji.url} alt={emoji.name} className='h-8 w-8 mb-0'
                            />
                            <span 
                                className='block text-xs text-[var(--color-text-default)] leading-none text-center'>
                                {stat.count}
                            </span>
                        </Button>
                    );
                } else {
                    return;
                }
            })}
        </div>
    )
}

export default PostCardReaction;