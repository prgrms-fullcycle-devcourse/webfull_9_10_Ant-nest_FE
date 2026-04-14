import { Pencil1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface Props {
  nickname?: string;
  question: string;
}

export default function TodayQuestion({ nickname, question }: Props) {
  const questionLetter = question?.split('');

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-1 text-center ">
        <p className="text-sm text-[var(--color-gray-dark)]">안녕하세요, {nickname}님 반가워요!</p>
        <div className="text-[var(--color-primary)] font-handwriting text-xl">
          {questionLetter?.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0 }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
      <Link
        to="/diary/new"
        className=" rounded-full bg-[var(--color-primary)] w-10 h-10 shrink-0 flex items-center justify-center shadow-2xl"
      >
        <Pencil1Icon className="text-white" />
      </Link>
    </div>
  );
}
