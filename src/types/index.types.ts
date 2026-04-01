// ===== API =====
export interface ApiResponse<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: T;
  error: string | null;
}

// ===== 사용자 =====
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
  createdAt: string;
}
// ===== 캘린더 / 다이어리목록 =====
export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// ===== 다이어리 =====
export interface Diary {
  id: number;
  userId: number;
  title: string;
  content: string;
  mood?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiaryRequest {
  title: string;
  content: string;
  mood?: string;
  isPublic: boolean;
}

// ===== 커뮤니티 =====
export interface Post {
  id: number;
  userId: number;
  author: Pick<User, 'id' | 'nickname' | 'profileImage'>;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  author: Pick<User, 'id' | 'nickname' | 'profileImage'>;
  content: string;
  createdAt: string;
}

// ===== 캘린더 =====
export interface CalendarEntry {
  id: number;
  userId: number;
  date: string; // YYYY-MM-DD
  diaryId?: number;
  mood?: string;
}
