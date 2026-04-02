import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { IconButton } from "@radix-ui/themes";

interface DiaryHeaderProps {
    onBack: () => void;
}

export default function DiaryHeader({ onBack }: DiaryHeaderProps) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-50">
                <div className="max-w-200 mx-auto h-[75px] flex items-center px-[20px]">
                    <IconButton
                        variant="ghost"
                        className="backButton !text-[#000]"
                        onClick={onBack}
                    >
                        <ChevronLeftIcon className="w-[24px] h-[24px]" />
                    </IconButton>
                </div>
            </div>
            <div className="h-[70px]" />
        </>
    );
}