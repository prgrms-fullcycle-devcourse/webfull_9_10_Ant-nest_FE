import { EMOTIONS } from "@/constants/emotions";
import type { CommunityPostDetail } from "../../types/community.types";
import { formatDateStr } from "@/utils/formatDate";


const PostDetailForm = ({post} : {post : CommunityPostDetail}) => {
    const {emotion, createdAt, title, content} = post

    return (
        <div>
        <div className="diaryWrap border-0 shadow-[0_0_8px_rgba(0,0,0,0.05)] rounded-[16px] p-4 pb-[4px]">
            {emotion && (
                <div className="mb-[12px] flex min-h-[44px] items-center justify-center text-center">
                <img
                    src={EMOTIONS[emotion.type].emo}
                    alt={EMOTIONS[emotion.type].label}
                    className="h-[44px] w-[44px] object-contain"
                />
                </div>
            )}
            
            <p className="text-[#8d8d8d] text-[16px] text-center mb-[20px]">
                {formatDateStr(createdAt)}
            </p>

            {/* 일기 */}
            <div
                className={`mb-[48px] h-[84px] w-full box-border rounded-[16px] border border-[#F1F1F1] shadow-[0_0_8px_rgba(0,0,0,0.05)] bg-[#FAFAFA] p-[14px] text-[16px] ${
                title ? 'text-left' : 'text-center'
                }`}
            >
                {title}
            </div>

            {/* 상세 내용 */}
            <div 
                className={`relative h-[210px] w-full box-border rounded-[16px] border border-[#F1F1F1] shadow-[0_0_8px_rgba(0,0,0,0.05)] bg-[#FAFAFA] text-[16px] ${content 
                ? 'p-[14px] text-left'
                : 'pt-[90px] text-center text-gray-400'}`}
            >
                {content ? content : "작성된 내용이 없어요."}
            </div>
        </div>

    </div>
    )
}

export default PostDetailForm