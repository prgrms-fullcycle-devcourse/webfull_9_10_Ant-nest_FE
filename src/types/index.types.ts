import type { EMOTIONS } from '@/constants/emotions';

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
export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  checkPassword: string;
}

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
  totalCount: number;
  diaries: DiaryContents[];
}

export interface DiaryContents {
  diaryId: string;
  title: string;
  diaryDate: string;
  isEdited: boolean;
  emotion: Emotion;
  question: string;
  index?: number;
}

export interface Emotion {
  type: string;
  name: string;
}

export interface CreateDiaryRequest {
  title: string;
  content: string;
  mood?: string;
  isPublic: boolean;
}

export interface DiaryDetail extends DiaryContents {
  content: string;
  createdAt: string;
  updatedAt: string | null;
  photos: DiaryPhotos[];
}

export interface DiaryPhotos {
  photoId: string;
  imageUrl: string;
  displayOrder: number;
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

// ===== 감정 타입 =====
export type EmotionKey = keyof typeof EMOTIONS;

export type EmotionLabel = (typeof EMOTIONS)[EmotionKey]['label'];
