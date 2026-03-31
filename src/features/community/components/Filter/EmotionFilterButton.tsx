import { useCommunityStore } from "@/store/communityStore";
import icon from "../../../../assets/images/icons/caret-down.svg";
import { Button } from "@radix-ui/themes";

export const FilterButton = ()=>{
    const activeBottomSheet = useCommunityStore((state)=>state.activeBottomSheet);
    const setActiveBottomSheet = useCommunityStore((state)=>state.setActiveBottomSheet);
    return(
        <div>
            <Button
                className="!flex !item-center !text-sm !text-[var(--color-text-default)]"
                onClick={()=>activeBottomSheet === null && setActiveBottomSheet("filter")}
                variant="ghost"  
            >
                감정별
                <img src={icon} className="h-5 w-5 translate-y-[1px]"></img>
            </Button>
        </div>
    )
}