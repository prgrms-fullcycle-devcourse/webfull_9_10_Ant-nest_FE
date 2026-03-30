interface Emotion {
  id: string;
  label: string;
  img: string;
}

interface DiaryFormProps {
  selectedEmotionData?: Emotion;
  dateStr: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  images: {file: File; preview: string}[];  // ← 이거 추가
  handleAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  setPreviewModal: (url: string) => void;
}

export default function DiaryForm({
  selectedEmotionData,
  dateStr,
  title,
  setTitle,
  content,
  setContent,
  images,
  handleAddImages,
  handleRemoveImage,
  setPreviewModal
}: DiaryFormProps) {
  return (
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
      
      <p className="text-[#8d8d8d] text-[9px] text-center mb-[20px]">
        {dateStr}
      </p>
      <input type="text"
        placeholder="오늘 하루 어땠나요?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={`mb-[48px] h-[84px] w-full box-border rounded-[16px] border border-[#F1F1F1] shadow-[0_0_8px_rgba(0,0,0,0.05)] bg-[#FAFAFA] p-[14px] text-[16px] ${
          title ? 'text-left' : 'text-center'
        }`}
      />
      <div className="relative">
        <textarea placeholder='더 하고 싶은 말이 있나요?'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`h-[210px] w-full box-border rounded-[16px] border border-[#F1F1F1] shadow-[0_0_8px_rgba(0,0,0,0.05)] bg-[#FAFAFA] text-[16px] ${content 
          ? 'p-[14px] text-left'
          : 'pt-[90px] text-center'}`}
        />
        <div className="absolute left-[16px] bottom-[18px] flex items-center gap-[8px]">
          {/* + 버튼: 항상 표시 */}
          <label
            className="w-[55px] h-[55px] rounded-[16px] text-[#66BB6A] text-[30px] flex items-center justify-center shadow-[0px_4px_8px_rgba(0,0,0,0.05)] cursor-pointer bg-white border-none"
            htmlFor="imageUpload"
          >
            {'+'}
          </label>
          {/* 미리보기: 사진이 있을 때만 표시 */}
          {images.length > 0 && (
            <div className="relative w-[55px] h-[55px]">
          <img
            src={images[0].preview}
            alt="첨부 사진"
            onClick={() => setPreviewModal(images[0].preview)}
            className="w-full h-full object-cover rounded-[12px] cursor-pointer"
          />
              <button
                type="button"
                onClick={() => handleRemoveImage(0)}
                className="absolute top-[-6px] right-[-6px] w-[18px] h-[18px] rounded-full bg-[#ff6b6b] text-white text-[12px] font-bold flex items-center justify-center border-none cursor-pointer"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleAddImages}
        />
      </div>

    </div>
    );
}
