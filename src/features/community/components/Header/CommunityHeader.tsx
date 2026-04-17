import { useCommunityStore } from "@/store/communityStore"
import { Button } from "@radix-ui/themes";

export const CommunityHeader = ()=>{

    const selectedTab = useCommunityStore((state)=>state.selectedTab);
    const setSelectedTab = useCommunityStore((state)=>state.setSelectedTab);

    return(
        <div className="flex w-full">
            <Button
                variant="ghost"
                onClick={()=>{setSelectedTab("전체")}}
                className={`!flex-1 !relative !pb-3 !text-sm !font-medium !mr-0
                ${selectedTab === "전체"
                ? "!text-[var(--color-primary)]"
                : "!text-[var(--color-text-subtle)]"
                }`}
            >
                전체

                {selectedTab === "전체" && (
                    <span className="!absolute !bottom-0 !left-0 !h-[2px] !w-[100%] !rounded-full bg-[var(--color-primary)]" />
                )}
            </Button>

            <Button
                variant="ghost"
                onClick={()=>{setSelectedTab("내글")}}
                className={`!flex-1 !relative !pb-3 !text-sm !font-medium  !ml-0
                ${selectedTab === "내글"
                ? "!text-[var(--color-primary)]"
                : "!text-[var(--color-text-subtle)]"
                }`}
            >
                내글
                {selectedTab === "내글" && (
                    <span className="!absolute !bottom-0 !left-0 !h-[2px] !w-full !rounded-full !bg-[var(--color-primary)]" />
                )}
            </Button>

        </div>
    )
}