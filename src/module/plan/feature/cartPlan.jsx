import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';

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
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/plan/${id}`);
  };

  return (
    <div className="flex mt-8 justify-center p-4  ">
      <div
        key={id}
        className="shadow-lg flex w-full max-w-4xl rounded-lg bg-white transition-transform hover:scale-105"
      >
        {/* تصویر سمت چپ */}
        <div className="w-1/3 relative">
          <img
            src={`${OnRun}/${picture}`}
            alt={title}
            className="h-full w-full object-cover rounded-l-lg shadow-sm"
          />
        </div>

   
        <div className="flex flex-col justify-between w-2/3 p-6">
          <div>
          
            <h2 className="font-extrabold text-3xl text-blue-900 mb-2">{title}</h2>
            <div className="h-1 w-24 bg-blue-600 rounded mb-4"/>

           
            <p className="text-base text-gray-600 ">
              <span className="font-semibold text-lg text-gray-800">شرکت:</span> {companyName}
            </p>

            <div className="grid grid-cols-2 gap-y-4 ">
              <div className="text-gray-700">
                <span className="font-semibold text-gray-800">سود پیش‌بینی شده:</span> {profit}%
              </div>
              <div className="text-gray-700">
                <span className="font-semibold text-gray-800">مبلغ سرمایه‌گذاری:</span>{' '}
                {fundedAmount.toLocaleString()} ریال
              </div>
              <div className="text-gray-700">
                <span className="font-semibold text-gray-800">مدت زمان طرح:</span> {totalTime} ماه
              </div>
              <div className="text-gray-700">
                <span className="font-semibold text-gray-800">حوزه فعالیت:</span> {activityField}
              </div>
            </div>

         
            <div className="text-base font-semibold text-green-700 ">
              {fundedAmount.toLocaleString()} از {fundedAmount.toLocaleString()} تامین شده
            </div>
          </div>
        </div>
        <h className="font-bold justify-center flex text-lg mb-2 h-16">{title} </h>
        <p className="text-base text-gray-800 mb-2">
          نام شرکت: <span className="text-sm text-gray-600 font-semibold">{companyName}</span>
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

  
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">{remainingDays} روز تا پایان فرصت</p>
            <button
              type="button"
              className="bg-gradient-to-r from-[#004ff9] to-[#000000] text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
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
  profit: PropTypes.number.isRequired,
  buoyancy: PropTypes.number.isRequired,
  fundedAmount: PropTypes.number.isRequired,
  remainingDays: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  activityField: PropTypes.string.isRequired,
  paymentPeriod: PropTypes.number.isRequired,
};

export default CartPlan;
