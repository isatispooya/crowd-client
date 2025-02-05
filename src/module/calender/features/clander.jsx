import React from 'react';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const Calender = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col">
        <Calendar
          numberOfMonths={6}
          disableMonthPicker
          disableYearPicker
          calendar={persian}
          locale={persian_fa}
        />
        <Calendar
          numberOfMonths={6}
          disableMonthPicker
          disableYearPicker
          calendar={persian}
          locale={persian_fa}
        />
      </div>
    </div>
  );
};

export default Calender;
