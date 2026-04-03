interface DiaryQuestionProp {
  question: string
}

export default function DiaryQuestion({question}: DiaryQuestionProp) {
  return (
    <div className = "questionWrap h-[52px] text-center mb-1">
      <p className = "text-[#5AB261] font-bold text-[12px] leading-[16px] tracking-[0.6px] mb-1">
          오늘의 질문
      </p>
      <h1 className = "text-[#1E293B] font-bold text-[16px] leading-[22px]">
          {question}
      </h1>
    </div>
  );
}