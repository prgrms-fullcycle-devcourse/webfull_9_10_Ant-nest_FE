import type { EMOTIONS } from "@/constants/emotions";

export interface Emojis {
  id : number;
  name : string;
  type: string;
  inactiveUrl: string;
  activeUrl: string;
};

// 커뮤니티 페이지
export interface Post {
    postId: string;
    diaryId: string;
    question: string;
    title: string;
    content: string;
    emotion: {
        type: EmotionKey;
        name: string;
    };
    isMine: boolean;
    isEdited: boolean;
    totalEmpathyCount: number;
    empathyStats: EmpathyStat[];
    myReactionId: number | null;
    sharedAtRelative: string;
}


export type HeaderTab = "전체" | "내글";

export type CommunityHeaderProps = {
    selectedTab : HeaderTab;
}

export type SortType = 'LATEST' | 'POPULAR';

export type BottomSheetTab = "sort" | "filter" | null;

export type EmotionKey = keyof typeof EMOTIONS;

// 커뮤니티 일기 상세페이지
export interface EmpathyStat {
  typeId: string;
  name: string;
  count: number;
}

export interface CommunityPostDetail {
  question: string;
  title: string;
  content: string;
  emotion: {
    type: EmotionKey;
    name: string;
  };
  createdAt: string;
  totalEmpathyCount: number;
  empathyStats: EmpathyStat[];  
  sharedAtRelative: string;
  myReactionId: number | null;

}
