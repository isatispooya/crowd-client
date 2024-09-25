/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import { Divider } from '@mui/material';
import { formatNumber } from 'src/utils/formatNumbers';

const CartPlan = ({
  buoyancy,
  paymentPeriod,
  profit,
  activityField,
  remainingDays,
  picture,
  totalTime,
  fundedAmount,
  companyName,
  title,
  id,
  key,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/plan/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 bg-white p-6 ">
      <div
        key={key}
        className=" w-80 p-4 duration-300 bg-white shadow-lg rounded-2xl    cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
      >
        <div className="relative h-44 w-full mb-4 rounded-lg overflow-hidden shadow-md">
          <img src={`${OnRun}/${picture}`} alt={title} className="h-full w-full object-cover" />
          <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-sm rounded-tr-lg rounded-bl-lg shadow-md">
            {profit}%
          </div>
         
        </div>

        <h3 className="font-bold text-xl text-center mb-4">{title}</h3>
        <p className="text-base text-gray-800 mb-2">
          نام شرکت: <span className="font-semibold text-gray-600">{companyName}</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          پیش‌بینی میزان سود: <span className="font-semibold text-gray-600">{profit}%</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          مبلغ سرمایه‌گذاری:
          <span className="font-semibold text-gray-600">{ fundedAmount!==null && fundedAmount!==undefined ?formatNumber(fundedAmount):0} ریال</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          مدت زمان طرح: <span className="font-semibold text-gray-600">{totalTime} روز</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          حوزه فعالیت: <span className="font-semibold text-gray-600">{activityField}</span>
        </p>


        <div className="mt-6">
          <p className="text-sm text-center mb-2">مبلغ سرمایه‌گذاری</p>
          <div className="relative w-full h-3 bg-[#001F5F] rounded-lg">
            <div
              className="absolute top-0 h-3 rounded-lg bg-[#41ca41]"
              style={{ width: `${0.5 * 100}%` }}
            />
          </div>
          <div className="flex  mt-2 text-xs text-gray-700 font-medium">
            <span>{ fundedAmount!==null && fundedAmount!==undefined ?formatNumber(fundedAmount):0} ریال تأمین شده</span>
            <span>از {formatNumber(50000000000)} ریال</span>
          </div>
        </div>

    
        <div className="flex justify-between items-center text-sm text-gray-900 mt-6">
          <p className="text-xs">
            درصد شناوری: <span className="font-semibold">{buoyancy}%</span>
          </p>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'black' }} />
          <p className="text-xs">
            دوره پرداخت: <span className="font-semibold">{paymentPeriod} ماه</span>
          </p>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'black' }} />
          <p className="text-xs">
            پیش‌بینی سود: <span className="font-semibold">{profit}%</span>
          </p>
        </div>

    
        <div className="flex flex-col justify-between items-center text-sm text-gray-600 mt-6">
          <p>{remainingDays} روز تا پایان فرصت</p>
          <button
            className="bg-blue-900 text-white rounded-md px-6 py-2 mt-4 transition-transform hover:scale-105"
            onClick={handleViewClick}
          >
            جزئیات طرح
          </button>
        </div>
      </div>
    </div>
  );
};

CartPlan.propTypes = {
  id: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
  buoyancy: PropTypes.number.isRequired,
  fundedAmount: PropTypes.number.isRequired,
  remainingDays: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  activityField: PropTypes.string.isRequired,
  paymentPeriod: PropTypes.number.isRequired,
};

export default CartPlan;
