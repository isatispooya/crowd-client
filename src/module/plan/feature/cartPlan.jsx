import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import { handleKeyPress } from 'src/utils/enterKey';
import invesment from './investment-svgrepo-com.svg';

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
    <div className="flex mt-8 justify-center p-4">
      <div
        role="button"
        tabIndex={0}
        onClick={handleViewClick}
        onKeyPress={handleKeyPress}
        className="shadow-lg flex w-full max-w-4xl rounded-lg bg-white transition-transform hover:scale-105"
      >
        <div className="w-1/3 relative">
          <img
            src={picture ? `${OnRun}/${picture}` : invesment}
            alt={title}
            className="h-full w-full object-cover rounded-l-lg shadow-sm"
          />
        </div>

        <div className="flex flex-col justify-between w-2/3 p-6">
          <div>
            <h2 className="font-extrabold text-2xl text-blue-900 mb-4">{title}</h2>
            <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

            <p className="text-lg text-gray-800 mb-2">
              <span className="font-semibold">شرکت:</span> {companyName}
            </p>

            <div className="grid grid-cols-2 gap-y-4 text-gray-700">
              <div>
                <span className="font-semibold text-gray-800">سود پیش‌بینی شده:</span> {profit}%
              </div>
              <div>
                <span className="font-semibold text-gray-800">مبلغ سرمایه‌گذاری:</span>{' '}
                {fundedAmount.toLocaleString()} ریال
              </div>
              <div>
                <span className="font-semibold text-gray-800">مدت زمان طرح:</span> {totalTime} ماه
              </div>
              <div>
                <span className="font-semibold text-gray-800">حوزه فعالیت:</span> {activityField}
              </div>
            </div>

            <div className="mt-4 text-base font-semibold text-green-600">
              {fundedAmount.toLocaleString()} از {fundedAmount.toLocaleString()} تأمین شده
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">{remainingDays} روز تا پایان فرصت</p>
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-gray-900 text-white px-5 py-2 rounded-lg hover:from-blue-600 transition-all duration-200"
              onClick={handleViewClick}
            >
              جزئیات طرح
            </button>
          </div>
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
