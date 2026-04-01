export interface Emojis {
  id : number;
  name : string;
  url : string
};

export interface Post{
  id: number;
  question: string;
  answer: string;
  isMine: true | false;
}


export type HeaderTab = "전체" | "내글";

export type CommunityHeaderProps = {
    selectedTab : HeaderTab;
}

export type SortOption = "최신순" | "오래된순" | "공감많은순";
export type SortProps = {
  selectedSort : SortOption;
}

export type BottomSheetTab = "sort" | "filter" | null;