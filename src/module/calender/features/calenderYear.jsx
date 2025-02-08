import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment-jalaali';
import { Tooltip, Typography } from '@mui/material';
import { toGregorian } from 'jalaali-js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useGetDashbord from 'src/module/dashboard/components/service/use-getDashbord';
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
        title: `${item.amount.toLocaleString()} تومان`,
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
    if (type === '1') return 'bg-green-500';
    if (type === '2') return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <Tooltip
      title={
        <div>
          <Typography variant="body1" fontWeight="bold">
            {event.details.plan_name}
          </Typography>

          <Typography variant="body2">
            مبلغ: {event.details.amount.toLocaleString()} ریال
          </Typography>

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
      <motion.div
        className={`${getEventColor(event.type)} text-white rounded-lg cursor-pointer`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {event.title}
      </motion.div>
    </Tooltip>
  );
};

const MyCalendar = () => {
  const { data, isLoading, error } = useGetDashbord();
  const [events, setEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(moment().jYear());

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
    <div className="w-full min-h-screen py-8">
      <div className="w-full max-w-full mx-auto p-8 rounded-2xl shadow-lg bg-gradient-to-br bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold text-gray-800">تقویم سود</h3>
            <p className="text-lg font-medium text-gray-800">نمایش رویدادهای سال جاری</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() => setCurrentYear(currentYear - 1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            قبلی
          </button>

          <span className="text-2xl font-semibold">{currentYear}</span>
          <button
            type="button"
            onClick={() => setCurrentYear(currentYear + 1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            بعدی
          </button>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {locales['fa-IR'].months.map((month, index) => {
            const monthEvents = events.filter(
              (event) =>
                moment(event.start).jYear() === currentYear &&
                moment(event.start).jMonth() === index
            );

            return (
              <div key={index} className="border rounded-lg p-6 shadow-sm bg-white">
                <h4 className="font-bold text-blue-700 text-xl">{month}</h4>
                <ul className="mt-4 space-y-2">
                  {monthEvents.length > 0 ? (
                    monthEvents.map((event, idx) => (
                      <li key={idx}>
                        <CustomEvent event={event} />
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">این ماه رویدادی وجود ندارد</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
  }).isRequired,
};

export default MyCalendar;
