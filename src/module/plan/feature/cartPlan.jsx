/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import { Divider } from '@mui/material';

const CartPlan = ({
  buoyancy,
  paymentPeriod,
  faraboursLink,
  profit,
  activityField,
  remainingDays,
  picture,
  totalTime,
  fundedAmount,
  marketer,
  companyName,
  title,
  id,
  key,
  description,
  applicantFundingPercentage,
  nominalPriceCertificate,
  symbol,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    console.log('fgtyhjuiklo;pik');
    navigate(`/plan/${id}`);
  };

  return (
    <div className="flex mt-16 flex-wrap justify-center gap-6 bg-white p-4">
      <div key={key} className="shadow-md w-72 p-4 mt-18 rounded-md border bg-white">
        <div className="relative h-40 w-full mb-4">
          <img
            src={`${OnRun}/${picture}`}
            alt={title}
            className="h-full w-full object-cover rounded-md"
          />
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
            {profit}
          </div>
        </div>
        <h className="font-bold text-lg mb-2 h-16">{title} </h>
        <p className="text-base text-gray-800 mb-2">
          نام شرکت: <span className="text-sm text-gray-600 font-semibold">{companyName}</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          پیش‌بینی میزان سود: <span className="text-sm text-gray-600 font-semibold">{profit}</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          مبلغ سرمایه‌گذاری:
          <span className="text-sm text-gray-600 font-semibold">{fundedAmount}</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          {' '}
          مدت زمان طرح: <span className="text-sm text-gray-600 font-semibold">{totalTime}</span>
        </p>
        <p className="text-base text-gray-800 mb-2">
          {' '}
          حوزه فعالیت : <span className="text-sm text-gray-600 font-semibold">{activityField}</span>
        </p>
        {/* <p className="text-base text-gray-800 mb-4">
          {' '}
          نماد : <span className="text-sm text-gray-600 font-semibold">{symbol}</span>
        </p>
        <p className="text-base text-gray-800 mb-4">
          {' '}
          بازارگردان : <span className="text-sm text-gray-600 font-semibold">{marketer}</span>
        </p>
        <p className="text-base text-gray-800 mb-4">
          {' '}
          درصدتامین متقاضی :{' '}
          <span className="text-sm text-gray-600 font-semibold">{applicantFundingPercentage}</span>
        </p>
        <p className="text-base text-gray-800 mb-4">
          {' '}
          قیمت اسمی هر گواهی:{' '}
          <span className="text-sm text-gray-600 font-semibold">{nominalPriceCertificate}</span>
        </p>
        <p className="text-base text-gray-800 mb-4">
          {' '}
          لینک فرابورس :{' '}
          <span className="text-sm text-gray-600 font-semibold">{faraboursLink}</span>
        </p> */}
        {/* <p className="text-base text-gray-800 mb-4">شروع: <span className="text-sm text-gray-600 font-semibold">{card.startDate}</span></p> */}
        <div className="flex flex-col items-center w-full p-4">
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-900 h-full"
          style={{ width: `${fundedAmount}%` }}
        />
        <div
          className="bg-green-500 h-full"
          style={{ width: `calc(${100 - fundedAmount}% - 0.5rem)` }}
        />
      </div>
      <div className="flex justify-between w-full mt-2 text-gray-800 text-sm font-semibold">
        <span>{`ریال ${fundedAmount.toLocaleString()} از ریال ${fundedAmount.toLocaleString()} تامین شده`}</span>
      </div>
    </div>

        <div className="flex justify-between gap-1 items-center text-sm text-gray-900 mb-4 ">
          <p className=' text-xs '>
            درصدشناوری:
            <span className="text-xs text-gray-700 text-center font-semibold">{buoyancy}</span>
          </p>
          <Divider orientation="vertical" sx={{ borderColor: "black" }} flexItem />
          <p className=' text-xs text-nowrap'>
            دوره پرداخت:
            <span className="text-xs text-gray-700 text-wrap text-center font-semibold">
              {paymentPeriod}
            </span>
          </p>
          <Divider orientation="vertical" sx={{ borderColor: "black" }} flexItem />

          <p className=' text-xs'>
            پیش‌بینی سود: <span className="font-semibold  text-xs text-center text-gray-700">{profit}</span>
          </p>
        </div>
        <div className="flex flex-col justify-between items-center text-sm text-gray-600 mb-4">
          <p>{remainingDays} روز تا پایان فرصت</p>
          <button className="bg-blue-900 text-white rounded-md px-4 mt-8 py-2" onClick={handleViewClick}>
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
  description: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
  buoyancy: PropTypes.number.isRequired,
  fundedAmount: PropTypes.number.isRequired,
  remainingDays: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  marketer: PropTypes.string.isRequired,
  activityField: PropTypes.string.isRequired,
  symbol: PropTypes.number.isRequired,
  paymentPeriod: PropTypes.number.isRequired,
  applicantFundingPercentage: PropTypes.number.isRequired,
  nominalPriceCertificate: PropTypes.number.isRequired,
  faraboursLink: PropTypes.string.isRequired,
};

export default CartPlan;
