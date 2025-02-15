/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { format, getDaysInMonth, startOfMonth, addMonths, subMonths } from 'date-fns-jalali';
import { Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useGetDashbord from 'src/module/dashboard/components/service/use-getDashbord';
import './calender.css';

const PersianCalendar = () => {
  const { data, isLoading, error } = useGetDashbord();
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date())); // Start with the first day of the current month
  const [events, setEvents] = useState([]);

  // Generate days of the month using date-fns-jalali
  const generateDaysOfMonth = () => {
    const daysInMonth = [];
    const totalDays = getDaysInMonth(currentDate); // Total days in the Jalali month

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      daysInMonth.push(day);
    }

    return daysInMonth;
  };

  // Process events from the dashboard data
  const processEvents = (profitData) => {
    return profitData
      .filter((item) => item && item.date)
      .map((item) => {
        const [year, month, day] = item.date.split('-').map(Number);

        return {
          title: `${item.amount.toLocaleString()} ریال`,
          date: `${year}-${month}-${day}`,
          details: item,
          type: item.type,
        };
      });
  };

  useEffect(() => {
    if (data && data.profit) {
      const processedEvents = processEvents(data.profit);
      console.log('Processed Events:', processedEvents); // Debugging log
      setEvents(processedEvents);
    }
  }, [data]);

  // Handle navigation between months
  const goToNextMonth = () => setCurrentDate(startOfMonth(addMonths(currentDate, 1)));
  const goToPreviousMonth = () => setCurrentDate(startOfMonth(subMonths(currentDate, 1)));

  // Check if a day has an event
  const getEventsForDay = (day) => {
    if (!day) return [];
    const jalaliDate = `${format(currentDate, 'yyyy')}-${format(currentDate, 'MM')}-${day}`;
    console.log('Checking Events for Date:', jalaliDate); // Debugging log
    console.log('All Events:', events); // Debugging log
    const dayEvents = events.filter((event) => event.date === jalaliDate);
    console.log('Events for Day:', dayEvents); // Debugging log
    return dayEvents;
  };

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
      className="h-[900px] rtl text-right p-4 bg-gray-50 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-4xl font-bold text-gray-800">تقویم سود</h3>
          <p className="text-lg font-medium text-gray-800">{format(currentDate, 'MMMM yyyy')}</p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            قبلی
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            بعدی
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {generateDaysOfMonth().map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={index} className={`relative h-20 p-2 border rounded-lg bg-white`}>
              {/* Day Number */}
              <span className="block text-sm font-bold">{day}</span>

              {/* Events for the Day */}
              {dayEvents.length > 0 ? (
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event, idx) => (
                    <Tooltip
                      key={idx}
                      title={
                        <div>
                          <Typography variant="body1" fontWeight="bold">
                            {event.details.plan_name}
                          </Typography>
                          <Typography variant="body2">
                            مبلغ: {event.details.amount.toLocaleString()} تومان
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
                        className={`rounded-lg px-2 py-1 text-xs ${
                          event.type === '1' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {event.title}
                      </motion.div>
                    </Tooltip>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-xs">بدون رویداد</div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PersianCalendar;
