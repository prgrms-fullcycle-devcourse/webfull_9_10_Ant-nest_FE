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

// 커뮤니티 일기 상세페이지
export interface EmpathyStat {
  typeId: number;
  name: string;
  count: number;
}

export interface Emotion {
  id: string;
  label: string;
  img: string;
}

export interface CommunityPostDetail {
  postId: number;
  title: string;
  content: string;
  emotionEmoji: Emotion; // 일기 감정
  empathyStats: EmpathyStat[]; // 받은 공감
  totalScore: 150;
  timeStamp: string;
  images: string[];
}

export interface Emotion {
  id: string;
  label: string;
  img: string;
}

export interface PostDetailFormProps {
  selectedEmotionData : Emotion;
  dateStr: string;
  title: string;
  content: string;
  images: string[];
  setPreviewModal: (url: string) => void;
}