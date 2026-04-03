import { useState } from "react";
import type { PostDetailFormProps } from "../../types/community.types";


const PostDetailForm = ({
    selectedEmotionData,
    dateStr,
    title,
    content,
    images
} : PostDetailFormProps) => {

    const [previewModal, setPreviewModal] = useState(false);
    return (
        <div>
        <div className="diaryWrap border-0 shadow-[0_0_8px_rgba(0,0,0,0.05)] rounded-[16px] p-4 pb-[4px]">
            {selectedEmotionData && (
                <div className="mb-[12px] flex min-h-[44px] items-center justify-center text-center">
                <img
                    src={selectedEmotionData.img}
                    alt={selectedEmotionData.label}
                    className="h-[44px] w-[44px] object-contain"
                />
                </div>
            )}
            
            <p className="text-[#8d8d8d] text-[16px] text-center mb-[20px]">
                {dateStr}
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

                {/* 이미지 */}
                <div className="absolute left-[16px] bottom-[18px] flex items-center gap-[8px]">
                    {images.length > 0 && (
                        <div className="relative w-[55px] h-[55px]">
                        <img
                            src={images[0]}
                            alt="첨부 사진"
                            onClick={() => setPreviewModal(true)}
                            className="w-full h-full object-cover rounded-[12px] cursor-pointer"
                        />
                        </div>
                    )}
                </div>

            </div>
        </div>

        {/* 이미지 확대 모달 */}
        {previewModal && (
            <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setPreviewModal(false)}
            >
            <img
                src={images[0]}
                alt="미리보기 확대"
                className="max-h-full max-w-full object-contain cursor-zoom-out"
            />
            </div>
        )}

    </div>
  )
}

export default PostDetailForm