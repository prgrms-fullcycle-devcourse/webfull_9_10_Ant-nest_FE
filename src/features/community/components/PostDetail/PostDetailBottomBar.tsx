import { Button } from "@radix-ui/themes"
import { useState } from "react";
import { ReactionEmojisToggle } from "../PostCard/PostCardReactionToggle";
import reactionToggle from "@/assets/images/emotions/emotion-blank.png"
import { useReaction } from "../../hooks/useReaction";
import PostCardReaction from "../PostCard/PostCardReaction";
import type { EmpathyStat } from "../../types/community.types";

interface Props {
    myReactionId:number | null;
    postId: string;
    empathyStats: EmpathyStat[];
    totalEmpathyCount: number;
}
const PostDetailBottomBar = ({myReactionId, postId, empathyStats,totalEmpathyCount} : Props) => {
    // 리액션 토글 스위치
    const [showReactions, setShowReactions] = useState<true|false>(false);
    
    const { mutate } = useReaction();
    const handleReaction = (reactionId: number, isCancel: boolean) => {
        mutate({
        postId: postId,
        reactionId,
        isCancel,
        });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] z-50
                max-w-200 mx-auto flex items-center justify-between px-[20px] py-[12px]">
                <div className="h-[54px] gap-[4px] pt-1">
                    {/* 감정 버튼 영역 */}
                    <div className="relative flex items-start justify-end">
                        {/* 버튼 클릭 시 감정 버튼들 나옴 */}
                        <div className="relative flex-col items-start justify-end">
                            <Button
                                variant='ghost'
                                onClick={() => setShowReactions((prev) => !prev)}
                                >
                                <img src={reactionToggle} className='h-8 w-8'/>
                            </Button>
                            <div className="text-[var(--color-text-default)] text-center mt-0.5 text-[11px] text-[#66BB6A] font-semibold text-center">
                                {totalEmpathyCount}
                            </div>
                        </div>
                        {showReactions 
                            ?<ReactionEmojisToggle 
                                onClose={() => setShowReactions(false)} 
                                handleReaction = {handleReaction}
                                myReactionId={myReactionId}/>
                            :<PostCardReaction
                                empathyStats={empathyStats}
                                myReactionId = {myReactionId}   
                                />
                        }


                    </div>
                </div>
        </div>
    )
}

export default PostDetailBottomBar