interface DiaryHeaderProps {
    onBack: () => void;
}

export default function DiaryHeader({ onBack }: DiaryHeaderProps) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-50">
                <div className="max-w-200 mx-auto h-[75px] flex items-center px-[20px]">
                    <button className="back-button cursor-pointer bg-transparent border-none text-[24px] text-[#1E293B]"
                        onClick={onBack}
                    >
                        {'<'}
                    </button>
                </div>
            </div>
            <div className="h-[70px]" />
        </>
    );
}