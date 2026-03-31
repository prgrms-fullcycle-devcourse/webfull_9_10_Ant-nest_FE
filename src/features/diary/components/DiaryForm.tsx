  import DiaryImageUploader from "./DiaryImageUploader";

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
    setPreviewModal,
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
        <DiaryImageUploader
          images={images}
          handleAddImages={handleAddImages}
          handleRemoveImage={handleRemoveImage}
          setPreviewModal={setPreviewModal}
        />  
        </div>

      </div>
      );
  }
