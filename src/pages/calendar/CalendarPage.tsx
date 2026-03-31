import DiaryCalendar from '@/features/calendar/components/DiaryCalendar.tsx';
import CalendarDiaryCard from '@/features/calendar/components/CalendarDiaryCard.tsx';

/** 컴포넌트 **/

export default function CalendarPage() {
  return (
    <div>
      <DiaryCalendar />
      <div className="pt-[2rem] px-[1rem]">
        <CalendarDiaryCard />
      </div>
    </div>
  );
}
