interface Props {
  children: React.ReactNode;
}

export default function QuestionBubble({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center shadow-[var(--shadow-middle)] px-4 py-2 text-center rounded-2xl min-h-36 min-w-80 mx-4">
      {children}
    </div>
  );
}
