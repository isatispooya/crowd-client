import React from "react";
import FullCalendar from "@fullcalendar/react";
import timelinePlugin from "@fullcalendar/timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parse } from 'date-fns-jalali';
import { toGregorian } from 'jalaali-js';

const CalendarComponent = () => {
  const events = [
    { title: "رویداد ۱", start: "2025-02-01" },
    { title: "رویداد ۲", start: "2025-06-15" },
  ];

  // تبدیل تاریخ‌ها به فرمت شمسی
  const formattedEvents = events.map(event => {
    const [year, month, day] = event.start.split('-');
    const gregorianDate = toGregorian(parseInt(year), parseInt(month), parseInt(day));
    return {
      ...event,
      start: new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd)
    };
  });

  return (
    <FullCalendar
      plugins={[timelinePlugin, interactionPlugin]}
      initialView="timelineYear"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timelineYear",
      }}
      views={{
        timelineYear: {
          type: "timeline",
          duration: { years: 1 }, // نمایش یک سال
          slotLabelFormat: (arg) => {
            const date = arg.date.marker || arg.date; // استفاده از marker یا date
            if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
              console.error("Invalid date object:", arg.date);
              return "تاریخ نامعتبر";
            }

            // تبدیل تاریخ گرگوری به رشته ISO
            const isoDate = date.toISOString().split('T')[0]; // yyyy-MM-dd

            // تبدیل تاریخ گرگوری به شمسی
            const jalaliDate = parse(isoDate, 'yyyy-MM-dd'); // تبدیل به شمسی

            // بررسی صحت تاریخ شمسی
            if (!jalaliDate || !jalaliDate.jy || !jalaliDate.jm || !jalaliDate.jd) {
              console.error("Failed to parse Jalali date:", isoDate);
              return "تاریخ نامعتبر";
            }

            // نمایش سال و ماه شمسی
            return `${jalaliDate.jy} ${format(date, 'MMMM')}`;
          },
          slotMinWidth: 100, // عرض هر ستون
          buttonText: "Year",
        },
      }}
      locale="fa" // فارسی‌سازی
      direction="rtl" // راست‌چین کردن
      events={formattedEvents}
      validRange={{
        start: "2023-01-01",
        end: "2030-12-31", // محدوده نمایش سال‌ها
      }}
    />
  );
};

export default CalendarComponent;