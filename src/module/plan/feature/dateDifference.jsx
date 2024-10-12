import React, { useEffect, useState } from 'react';
import useGetPlans from '../service/use-plans';

const DateDifference = () => {
  const { data, isPending, error } = useGetPlans();
  const [message, setMessage] = useState('');

  console.log("jki",data)
  useEffect(() => {
    if (data && data.plan) {
      const today = new Date(); 
      const startDate = new Date(data.plan.approved_underwriting_start_date);
      const endDate = new Date(data.plan.approved_underwriting_end_date);
      let differenceInDays;
      let calculatedMessage;

      if (startDate > today) {
        const differenceInTime = startDate.getTime() - today.getTime(); 
        differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        calculatedMessage = ` ${differenceInDays} روز مانده به شروع `;
      } else if (endDate > today) {
        const differenceInTime = endDate.getTime() - today.getTime(); 
        differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        calculatedMessage = ` ${differenceInDays} روز مانده به پایان `;
      } else {
        calculatedMessage = 'طرح مورد نظر منقضی شده است.';
      }

      setMessage(calculatedMessage);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default DateDifference;
