import { useCommunityStore } from "@/store/communityStore"

export const CommunityHeader = ()=>{
    const selectedTab = useCommunityStore((state)=>state.selectedTab);
    const setSelectedTab = useCommunityStore((state)=>state.setSelectedTab);
    return(
        <div>
            <button type="button" 
                onClick={()=>{setSelectedTab("전체")}}
                className={`w-40 relative pb-3 text-sm font-medium 
                ${selectedTab === "전체"
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-subtle)]"
                }`}>
                전체

                {selectedTab === "전체" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--color-primary)]" />
                )}
            </button>

            <button type="button" 
                onClick={()=>{setSelectedTab("내글")}}
                className={`w-40 relative pb-3 text-sm font-medium 
                ${selectedTab === "내글"
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-subtle)]"
                }`}>
                내글

                {selectedTab === "내글" && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--color-primary)]" />
                )}
            </button>
        </div>
    )
}