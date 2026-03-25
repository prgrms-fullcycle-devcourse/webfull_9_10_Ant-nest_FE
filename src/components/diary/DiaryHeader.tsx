export default function DiaryHeader() {
    return (
        <div className="header h-[75px] leading-[75px] mb-[58px] bg-red shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <button className="back-button cursor-pointer bg-transparent border-none text-[24px] text-[#1E293B]"
                onClick={() => window.history.back()}
            >
                {'<'}
            </button>
        </div>
    );
}