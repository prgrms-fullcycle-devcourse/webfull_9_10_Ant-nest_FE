import type { BottomSheetTab, HeaderTab } from "@/features/community/types/community.types";
import { create } from "zustand";

interface CommunityState {
    selectedTab : HeaderTab;
    activeBottomSheet: BottomSheetTab;
    selectedEmotions: string[];

    setSelectedTab: (tab: HeaderTab) => void;
    setActiveBottomSheet: (tab: BottomSheetTab) => void;
    setSelectedEmotions: (ids: string[]) => void;

};

export const useCommunityStore = create<CommunityState>((set)=>(
    {
    selectedTab: "전체",
    activeBottomSheet: null,
    selectedEmotions: [],

    setSelectedTab: (tab) => set({ selectedTab: tab }),
    setActiveBottomSheet: (tab) => set({ activeBottomSheet : tab}),
    setSelectedEmotions: (ids) => set({ selectedEmotions: ids }),
    }
));
