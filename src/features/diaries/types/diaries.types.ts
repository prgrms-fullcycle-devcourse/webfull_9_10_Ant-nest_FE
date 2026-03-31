type TDiaryQuestion = {
  content: string;
};
type TDiaryAnswer = {
  title: string;
  content: string;
  image?: string;
  emo: string;
};

export type TDiaryItem = {
  id: number;
  date: string;
  createdAt: string;
  question: TDiaryQuestion;
  answer: TDiaryAnswer;
};
