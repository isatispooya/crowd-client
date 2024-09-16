/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers'; // مطمئن شوید که این تابع به درستی ایمپورت شده است.
import usePlan from '../service/use-plan';

const Calculate = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(0);
  const [payment, setPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);
  
  console.log("yyy", data);

  useEffect(() => {
    if (!isNaN(inputValue) && inputValue !== '' && data) {
      const {profit} = data;
      const totalTime = data.total_time;
      const paymentPeriod = data.payment_period;

      // محاسبه سود دریافتی در هر پرداخت
      const result = (Number(inputValue) * ((profit/100) / (12 / paymentPeriod)));
      const payment = ((12 / paymentPeriod) * (totalTime / 12));
      const totalAmount = result * payment;

      setResult(result);
      setTotalAmount(totalAmount);
      setPayment(payment);
    } else {
      setResult(0);
      setTotalAmount(0);
      setPayment(0);
    }
  }, [inputValue, data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4">محاسبه</h1>

      <input
        type="text"
        value={formatNumber(inputValue)}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="عدد خود را وارد کنید"
        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <div className="text-base">
        سود دریافتی در هر پرداخت
        (ریال)
        :
         <span className="font-semibold">{formatNumber(result)}</span>
      </div>

      <p className='mt-8'>تعداد پرداخت: <span>{formatNumber(payment)}</span></p>
      
      <p className='mt-8'>کل سود دریافتی
      (ریال)
        :
         <span>{formatNumber(totalAmount)}</span></p>
    </div>
  );
};

export default Calculate;
