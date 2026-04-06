// export const formatDateStr = (date: Date): string => {
//   return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
// };

export const formatDateStr = (date: Date | string): string => {
  const d = new Date(date); // Date 객체로 변환

  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export const formatDateKey = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
