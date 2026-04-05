export interface CalendarEmotion {
  id: number;
  name: string;
  emojiUrl: string;
}

export interface CalendarList {
  diaryId: number;
  title: string;
  diaryDate: string;
  isEdited: boolean;
  emotion: CalendarEmotion;
  question: string;
  index?: number;
}
