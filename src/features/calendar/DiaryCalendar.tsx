import { useState } from 'react';
import Calendar from 'react-calendar';
import { Button } from '@radix-ui/themes';

/** 컴포넌트 **/

/** 이미지 **/
import flower from '@/assets/images/illustrations/illu-flower.png';
import list from '@/assets/images/icons/icon-list.svg';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DiaryCalendar() {
  const [value, setValue] = useState<Value>(new Date());

  const prevMonth = () => {
    const date = new Date(value as Date);

    date.setMonth(date.getMonth() - 1);
    setValue(date);
  };

  const nextMonth = () => {
    const date = new Date(value as Date);

    date.setMonth(date.getMonth() + 1);
    setValue(date);
  };

  const moveList = () => {};

  return (
    <div>
      <header className="calendar-header">
        <Button className="prev-btn" onClick={prevMonth}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Button>
        <span>
          {(value as Date).getFullYear()}년 {(value as Date).getMonth() + 1}월
        </span>
        <Button className="list-btn" onClick={moveList}>
          <img src={list} alt="일기 리스트" />
        </Button>
        <Button className="next-btn" onClick={nextMonth}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Button>
      </header>
      <Calendar
        calendarType="gregory"
        value={null}
        showNavigation={false}
        showNeighboringMonth={false}
        activeStartDate={value as Date}
        formatDay={(locale, date) => date.getDate().toString()}
        onChange={setValue}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return null;
          const today = new Date();
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return isToday ? 'is-today' : null;
        }}
        tileContent={({ date, view }) => {
          if (view !== 'month') return null;

          return <img src={flower} alt="" />;
        }}
      />
    </div>
  );
}
