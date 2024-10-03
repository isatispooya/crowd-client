/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPlan = ({
  trace_code,
  persianName,
  industryGroup,
  totalUnits,
  totalPrice,
  crowdFundingType,
  projectStatus,
  settlementDescription,
  realPersonMinPrice,
  picture,
  creation_date,
  crowdFundingtypeDescription,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl max-w-lg mx-auto">
      <div className='flex-col'>
        {picture && (
          <img
            src={picture}
            alt={persianName}
            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
          />
        )}
        <div className="grid  gap-8">
          <h2 className="text-2xl font-bold text-gray-900">{persianName}</h2>
          <p className="text-lg text-gray-600">{crowdFundingtypeDescription}</p>
        </div>

        <div className="grid ">
          <p className="text-sm text-gray-700">
            مبلغ کل: <span className="font-semibold">{totalPrice} ریال</span>
          </p>
          <p className="text-sm text-gray-700">
            تعداد گواهی‌های شراکت: <span className="font-semibold">{totalUnits}</span>
          </p>
          <p className="text-sm text-gray-700">
            نوع تامین مالی: <span className="font-semibold">{crowdFundingType}</span>
          </p>
          <p className="text-sm text-gray-700">
            وضعیت پروژه: <span className="font-semibold">{projectStatus}</span>
          </p>
          <p className="text-sm text-gray-700">
            حداقل سرمایه‌گذاری حقیقی:{' '}
            <span className="font-semibold">{realPersonMinPrice} ریال</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center text-sm text-gray-600 mt-6">
        <button
          className="bg-blue-600 text-white rounded-md px-6 py-3 w-full sm:w-auto transition-transform hover:scale-105 hover:bg-blue-700"
          onClick={handleViewClick}
        >
          مشاهده جزئیات
        </button>
      </div>
    </div>
  );
};

export default CartPlan;
