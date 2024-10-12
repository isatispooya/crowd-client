import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // اضافه کردن PropTypes

const DateDifference = ({ startDate, endDate }) => {
  const [message, setMessage] = useState('');
  const [differenceInDays, setDifferenceInDays] = useState(null);

  useEffect(() => {
    const today = new Date();
    const StartDate = new Date(startDate);
    const EndeDate = new Date(endDate);

    let differenceInTime;
    let days;

    if (StartDate > today) {
      differenceInTime = StartDate.getTime() - today.getTime();
      days = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setMessage(` ${days} روز مانده به شروع `);
      setDifferenceInDays(days);
    } else if (EndeDate > today) {
      differenceInTime = EndeDate.getTime() - today.getTime();
      days = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setMessage(` ${days} روز مانده به پایان `);
      setDifferenceInDays(days);
    } else {
      setMessage('طرح مورد نظر منقضی شده است.');
    }
  }, [startDate, endDate]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

DateDifference.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default DateDifference;
