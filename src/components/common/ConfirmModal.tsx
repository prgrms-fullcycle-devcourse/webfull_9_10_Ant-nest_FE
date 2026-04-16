import { Button } from '@radix-ui/themes';

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 px-[20px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[372px] h-[226px] bg-white rounded-[22px] px-[24px] pt-[40px] pb-[28px] flex flex-col items-center gap-[8px] shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
      >
        <p className="text-[18px] font-extrabold text-[#111] text-center">{title}</p>
        <p className="text-[14px] text-[#B0B0B0] text-center mt-[20px]">{description}</p>

        <div className="flex gap-[30px] mt-[30px]">
          <Button onClick={onCancel} className="basicButton !bg-[#CFD3D0]">
            취소
          </Button>
          <Button onClick={onConfirm} className="basicButton">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
