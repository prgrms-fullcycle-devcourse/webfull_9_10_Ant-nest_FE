import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

interface DiaryImageUploaderProps {
  images: { file: File; preview: string }[];
  handleAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  setPreviewModal: (url: string) => void;
}


export default function DiaryImageUploader({
  images,
  handleAddImages,
  handleRemoveImage,
  setPreviewModal
}: DiaryImageUploaderProps) {
  return (
    <>
      <div className="absolute left-[16px] bottom-[18px] flex items-center gap-[8px]">
        {/* + 버튼: 항상 표시 */}
        <IconButton
          variant="ghost"
          className="!w-[55px] !h-[55px] !rounded-[16px] !shadow-[0px_4px_8px_rgba(0,0,0,0.05)] !bg-white !p-0"
          asChild
        >
          <label htmlFor="imageUpload" className="cursor-pointer flex items-center justify-center">
            <PlusIcon style={{ color: '#5AB261' }} className="!w-[24px] !h-[24px]" />
          </label>
        </IconButton>
        {/* 미리보기: 사진이 있을 때만 표시 */}
        {images.length > 0 && (
        <div className="relative w-[55px] h-[55px]">
          <img
            src={images[0].preview}
            alt="첨부 사진"
            onClick={() => setPreviewModal(images[0].preview)}
            className="w-full h-full object-cover rounded-[12px] cursor-pointer"
          />
            <IconButton
              type="button"
              variant="solid"
              radius="full"
              className="!absolute !top-[-6px] !right-[-6px] !w-[20px] !h-[20px] !bg-[#ff6b6b] !text-white !border-none"
              onClick={() => handleRemoveImage(0)}>
              <Cross2Icon />
            </IconButton>
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
    </>
  );
}