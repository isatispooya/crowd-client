/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import { toast, ToastContainer } from 'react-toastify';
import PaymentContext from '../service/paymentContext';
import usePlan from '../../service/use-plan';
import 'react-toastify/dist/ReactToastify.css';

const PaymentGateway = () => {
  const { traceCode } = useParams();
  const { paymentMethod , inputValueGateWay, setInputValueGateWay } = useContext(PaymentContext);
  const { data } = usePlan(traceCode);
  const totalPrice = data?.plan?.real_person_minimum_availabe_price;

  

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ''); 
    const value = rawValue === '' ? '' : Number(rawValue);

    if (value === '' || value <= totalPrice) {
      setInputValueGateWay(value);
    } else {
      toast.error(`حداکثر مقدار معتبر ${formatNumber(totalPrice)} ریال`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
      {paymentMethod === 'dargah' && (
        <div className="space-y-4">
          <input
            type="text"
            id="show-name"
            value={inputValueGateWay !== '' ? formatNumber(inputValueGateWay) : ''}
            onChange={handleInputChange}
            placeholder="مبلغ را وارد کنید"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <motion.button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputValueGateWay || inputValueGateWay === 0}
          >
            ارجاع به درگاه پرداخت
          </motion.button>

          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
