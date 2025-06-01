/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { format, getDaysInMonth, startOfMonth, addMonths, subMonths } from 'date-fns-jalali';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import useGetDashbord from 'src/module/dashboard/hooks/use-getDashbord';

const PersianCalendar = () => {
  const { data, isLoading, error } = useGetDashbord();
  console.log(data, 'data');
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
  const [events, setEvents] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(null); // State to manage tooltip visibility

  // Generate days of the month
  const generateDaysOfMonth = () => {
    const totalDays = getDaysInMonth(currentDate);
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  };

  // Process events to normalize dates
  const processEvents = (profitData) => {
    return profitData
      .filter((item) => item && item.date)
      .map((item) => {
        const [year, month, day] = item.date.split('-').map(Number);
        const normalizedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
          2,
          '0'
        )}`;
        return {
          title: `${item.amount.toLocaleString()} ریال`,
          date: normalizedDate,
          details: item,
          type: item.type,
        };
      });
  };

  useEffect(() => {
    if (data && data.profit) {
      const processedEvents = processEvents(data.profit);
      setEvents(processedEvents);
    }
  }, [data]);

  // Navigation handlers
  const goToNextMonth = () => setCurrentDate(startOfMonth(addMonths(currentDate, 1)));
  const goToPreviousMonth = () => setCurrentDate(startOfMonth(subMonths(currentDate, 1)));

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    const jalaliDate = `${format(currentDate, 'yyyy')}-${format(currentDate, 'MM')}-${String(
      day
    ).padStart(2, '0')}`;
    return events.filter((event) => event.date === jalaliDate);
  };

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p className="text-xl font-semibold text-gray-800">در حال بارگذاری...</p>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p className="text-xl font-semibold text-red-500">خطا در دریافت داده‌ها</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-full p-4 bg-gray-50 rounded-lg shadow-lg sm:h-[900px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-4xl font-bold text-gray-800">تقویم سود</h3>
          <p className="text-lg font-medium text-gray-800">نمایش رویدادهای ماه جاری</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          قبلی
        </button>
        <span className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          بعدی
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-5 gap-2 mt-2 sm:grid-cols-7">
        {generateDaysOfMonth().map((day, index) => {
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={index}
              className="relative h-24 p-2 overflow-hidden border rounded-lg bg-white sm:h-32"
            >
              {/* Day Number */}
              <span className="block text-sm font-bold text-gray-800">{day}</span>

              {/* Events */}
              {dayEvents.length > 0 ? (
                <>
                  {/* Desktop View */}
                  <div className="hidden sm:block">
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((event, idx) => (
                        <Tooltip
                          key={idx}
                          title={
                            <div className="p-2 text-sm text-gray-800 bg-white rounded shadow">
                              <p className="font-bold">{event.details.plan_name}</p>
                              <p>مبلغ: {event.details.amount.toLocaleString()} ریال</p>
                              {event.type === '2' ? (
                                <p>سود مربوطه از مشارکت شما در طرح {event.details.plan_name}.</p>
                              ) : (
                                <p>
                                  اصل پول مربوطه از مشارکت شما در طرح {event.details.plan_name}.
                                </p>
                              )}
                            </div>
                          }
                          placement="top"
                          arrow
                        >
                          <motion.div
                            className={`w-full px-2 py-1 text-xs font-bold rounded ${
                              event.type === '1'
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-500 text-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {event.title}
                          </motion.div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="sm:hidden">
                    <div className="flex gap-1">
                      {dayEvents.map((event, idx) => (
                        <Tooltip
                          key={idx}
                          title={
                            <div className="p-2 text-sm text-gray-800 bg-white rounded shadow">
                              <p className="font-bold">{event.details.plan_name}</p>
                              <p>مبلغ: {event.details.amount.toLocaleString()} ریال</p>
                              {event.type === '2' ? (
                                <p>سود مربوطه از مشارکت شما در طرح {event.details.plan_name}.</p>
                              ) : (
                                <p>
                                  اصل پول مربوطه از مشارکت شما در طرح {event.details.plan_name}.
                                </p>
                              )}
                            </div>
                          }
                          placement="top"
                          arrow
                          open={tooltipOpen === `${day}-${idx}`}
                          onClose={() => setTooltipOpen(null)}
                          onOpen={() => setTooltipOpen(`${day}-${idx}`)}
                        >
                          <div
                            className={`w-3 h-3 rounded-full cursor-pointer ${
                              event.type === '1' ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            onClick={() => setTooltipOpen(`${day}-${idx}`)}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PersianCalendar;
