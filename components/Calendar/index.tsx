'use client';

import { useState } from 'react';
import moment from 'moment';
import { StyledCalendarWrapper, StyledCalendar, StyledDate, StyledToday, StyledDot } from './style';
import { AttendanceLogTypes } from '@/types/Attendance/Attendance.interface';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = ({ attendDay }: { attendDay: string[] }) => {
  const today = new Date();
  const [dates, setDates] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (newDate: Value) => {
    setDates(newDate);
  };

  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDates(today);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        locale="ko"
        value={dates}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format('D')}
        formatYear={(locale, date) => moment(date).format('YYYY')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date, view }) => {
          const html = [];
          if (
            view === 'month' &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            if (!attendDay?.includes(moment(today).format('YYYY-MM-DD'))) {
              html.push(<StyledToday key="today">오늘</StyledToday>);
            }
          }
          if (attendDay.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<StyledDot className="dot" key={moment(date).format('YYYY-MM-DD')} />);
          }
          return <>{html}</>;
        }}
      />
      <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
    </StyledCalendarWrapper>
  );
};

export default Calendar;
