import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import { BsCalendarXFill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';

const CountdownTimer = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const initialTime = () => {
    if (now < start) {
      return Math.ceil((start - now) / 1000);
    }
    if (now > start && now < end) {
      return Math.ceil((end - now) / 1000);
    }
    return 0;
  };
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  if (initialTime() === 0 || timeRemaining === 0) {
    return (
      <div className=" flex items-center justify-between text-center text-xl border-2 p-2 rounded-2xl shadow-inner ">
        <h1>طرح پایان یافته!</h1>
        <BsCalendarXFill className="text-2xl text-blue-500" />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 max-w-xs mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-sm text-gray-600 font-bold"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
   {`${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`}
      </motion.p>
      <p className="text-base text-blue-500 mt-2 ">تا {now < start ? 'شروع' : 'پایان'} طرح</p>
      <GiSandsOfTime className="text-yellow-600 w-8 h-8  " />
    </motion.div>
  );
};

CountdownTimer.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default CountdownTimer;
