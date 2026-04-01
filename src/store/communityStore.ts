import type { BottomSheetTab, HeaderTab } from "@/features/community/types/community.types";
import { create } from "zustand";

interface CommunityState {
    selectedTab : HeaderTab;
    activeBottomSheet: BottomSheetTab;

    setSelectedTab: (tab: HeaderTab) => void;
    setActiveBottomSheet: (tab: BottomSheetTab) => void;
};

export const useCommunityStore = create<CommunityState>((set)=>(
    {
    selectedTab: "전체",
    activeBottomSheet: null,

    setSelectedTab: (tab) => set({ selectedTab: tab }),
    setActiveBottomSheet: (tab) => set({ activeBottomSheet : tab}),

    }
));
