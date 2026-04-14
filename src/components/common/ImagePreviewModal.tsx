import { IconButton } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ImagePreviewModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export default function ImagePreviewModal({ imageUrl, onClose }: ImagePreviewModalProps) {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4">
        <IconButton
          variant="ghost"
          size="3"
          style={{ color: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Cross2Icon width={24} height={24} />
        </IconButton>
      </div>

      <div
        className="w-[85%] max-h-[70vh] overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="미리보기 확대" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}