/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns-jalali';
import { toGregorian } from 'jalaali-js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tooltip, Typography } from '@mui/material';
import useGetDashbord from 'src/module/dashboard/components/service/use-getDashbord';
import { motion } from 'framer-motion';
import './calender.css';
import PropTypes from 'prop-types';

const locales = {
  'fa-IR': {
    formats: {
      dateFormat: 'jYYYY/jMM/jDD',
      dayFormat: 'jDD',
      monthFormat: 'jMMMM jYYYY',
      yearFormat: 'jYYYY',
    },
    firstDayOfWeek: 6,
    months: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    days: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
    narrowWeekdays: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  },
};

const localizer = dateFnsLocalizer({
  format: (date, fmt) => format(date, fmt, { locale: null }),
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 6 }),
  getDay,
  locales,
});

const processEvents = (profitData) => {
  const today = new Date();

  return profitData
    .filter((item) => {
      if (!item || !item.date) {
        console.error('Invalid data:', item);
        return false;
      }

      const [year, month, day] = item.date.split('-').map(Number);
      const { gy, gm, gd } = toGregorian(year, month, day);
      const jalaliDate = new Date(gy, gm - 1, gd);
      return jalaliDate >= today;
    })
    .map((item) => {
      const [year, month, day] = item.date.split('-').map(Number);
      const { gy, gm, gd } = toGregorian(year, month, day);
      const jalaliDate = new Date(gy, gm - 1, gd);

      return {
        title: ` ${item.amount.toLocaleString()} تومان`,
        start: jalaliDate,
        end: jalaliDate,
        allDay: true,
        details: item,
        type: item.type,
      };
    });
};

const CustomEvent = ({ event }) => {
  if (!event || !event.title) {
    console.error('Invalid event:', event);
    return null;
  }

  const getEventColor = (type) => {
    if (type === '1') return 'bg-green-500 '; 
    if (type === '2') return 'bg-blue-500'; 
    return 'bg-gray-500'; 
  };

  return (
    <Tooltip
      title={
        <div>
          {/* Plan Name */}
          <Typography variant="body1" fontWeight="bold">
            {event.details.plan_name}
          </Typography>

          {/* Amount Details */}
          <Typography variant="body2">
            مبلغ: {event.details.amount.toLocaleString()} تومان
          </Typography>

          {/* Description Based on Event Type */}
          {event.type === '2' ? (
            <Typography variant="body2">
              سود مربوطه از مشارکت شما در طرح {event.details.plan_name}.
            </Typography>
          ) : (
            <Typography variant="body2">
              اصل پول مربوطه از مشارکت شما در طرح {event.details.plan_name}.
            </Typography>
          )}
        </div>
      }
      placement="top"
      arrow
    >
      {/* Event Title with Hover Effects */}
      <motion.div
        className={`${getEventColor(event.type)} text-white  rounded-lg cursor-pointer`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {event.title}
      </motion.div>
    </Tooltip>
  );
};

const eventStyleGetter = (event, start, end, isSelected ) => {
  const style = {
    backgroundColor: 'transparent',
    color: event.type === 'income' ? '#155724' : '#721c24',
    borderRadius: '5px',
    border: 'none',
  };

  return {
    style,
    className: event.type === 'income' ? 'income-event' : 'expense-event',
  };
};

const CustomToolbar = ({ onNavigate, label }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToToday = () => {
    onNavigate('TODAY');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        type="button"
        onClick={goToBack}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        قبلی
      </button>
      <span className="text-xl font-semibold">{label}</span>
      <button
        type="button"
        onClick={goToNext}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        بعدی
      </button>
      <button
        type="button"
        onClick={goToToday}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        امروز
      </button>
    </div>
  );
};

// Main Component
const MyCalendar = () => {
  const { data, isLoading, error } = useGetDashbord();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data && data.profit) {
      const processedEvents = processEvents(data.profit);
      setEvents(processedEvents);
    }
  }, [data]);

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-xl font-semibold">در حال بارگذاری...</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-xl font-semibold text-red-500">خطا در دریافت داده‌ها</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-[700px] rtl text-right p-4 bg-gray-50 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.MONTH}
        views={['month', 'year']}
        culture="fa-IR"
        eventPropGetter={eventStyleGetter}
        locale='fa-IR'
        components={{
          event: CustomEvent,
          toolbar: CustomToolbar,
        }}
        className="rounded-lg overflow-hidden" // Add Tailwind classes here
      />
    </motion.div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // Validate event.type
    details: PropTypes.object.isRequired,
  }).isRequired,
};

export default MyCalendar;
