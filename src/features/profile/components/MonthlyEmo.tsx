import { useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import type { TMonthlyEmoItem } from '@/pages/profile/ProfilePage';
import { addMonths, format, isSameMonth, subMonths } from 'date-fns';

type TMonthlyEmoProps = {
  data: TMonthlyEmoItem[];
};

export default function MonthlyEmo({ data }: TMonthlyEmoProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const currentMonthData = useMemo(() => {
    return data.find((item) => item.month === format(currentMonth, 'yyyy-MM'));
  }, [data, currentMonth]);

  const maxCount = useMemo(() => {
    if (!currentMonthData) return 1;
    return Math.max(...currentMonthData.emotions.map((item) => item.count), 1);
  }, [currentMonthData]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const isCurrentRealMonth = useMemo(() => {
    return isSameMonth(currentMonth, new Date());
  }, [currentMonth]);

  return (
    <section className="rounded-2xl bg-white shadow-[var(--shadow-middle)]">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-gray-dark)]"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <h2 className="text-base font-bold text-[var(--color-gray-dark)]">
          {format(currentMonth, 'yyyy년 M월')}
        </h2>

        <button
          type="button"
          onClick={handleNextMonth}
          disabled={isCurrentRealMonth}
          className="flex h-9 w-9 items-center justify-center bg-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-gray-light)]"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="px-10 pb-5 min-h-76">
        {!currentMonthData ? (
          <div className="flex flex-col items-center justify-center rounded-2xl px-4 py-10 text-center">
            <p className="text-sm font-medium text-[var(--color-gray-dark)]">
              아직 이 달의 감정 기록이 없어요
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {currentMonthData.emotions.map((item) => {
              const widthPercent = `${(item.count / maxCount) * 100}%`;

              return (
                <div key={item.key} className="grid grid-cols-[24px_1fr_36px] items-center gap-3">
                  <img src={item.icon} alt={item.label} className="h-8 w-8 object-contain" />

                  <div className="h-3 overflow-hidden rounded-full bg-[var(--color-gray-light)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: widthPercent,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  <span className="text-right text-sm font-semibold text-[var(--color-gray-dark)]">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
