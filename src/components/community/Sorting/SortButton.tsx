import type { SortProps } from "@/pages/community/types";
import icon from "../../../assets/images/icons/caret-down.svg";
import { useCommunityStore } from "@/store/communityStore";

export const SortButton = ({selectedSort}:SortProps)=>{
    const activeBottomSheet = useCommunityStore((state)=>state.activeBottomSheet);
    const setActiveBottomSheet = useCommunityStore((state)=>state.setActiveBottomSheet);
    return(
        <div>
            <button className="flex item-center text-sm text-[var(--color-text-default)]"
                onClick={()=>activeBottomSheet === null && setActiveBottomSheet("sort")}>
                {selectedSort}
                <img src={icon} className="h-5 w-5 translate-y-[1px]"></img>
            </button>
        </div>
    )
}