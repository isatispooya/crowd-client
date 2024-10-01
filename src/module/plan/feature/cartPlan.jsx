/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
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
    <div className="flex flex-col gap-4 justify-between bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      {picture && (
        <img src={picture} alt={persianName} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <p className="text-xl font-bold text-gray-800">تاریخ ایجاد: <span className="text-lg font-normal text-gray-600">{creation_date}</span></p>
      <p className="text-xl font-bold text-gray-800">گروه صنعت: <span className="text-lg font-normal text-gray-600">{industryGroup}</span></p>
      <p className="text-xl font-bold text-gray-800">تعداد کل گواهی‌های شراکت: <span className="text-lg font-normal text-gray-600">{totalUnits}</span></p>
      <p className="text-xl font-bold text-gray-800">عنوان تامین مالی: <span className="text-lg font-normal text-gray-600">{crowdFundingtypeDescription}</span></p>
      <p className="text-xl font-bold text-gray-800">مبلغ کل: <span className="text-lg font-normal text-gray-600">{totalPrice} ریال</span></p>
      <p className="text-xl font-bold text-gray-800">نوع تامین مالی: <span className="text-lg font-normal text-gray-600">{crowdFundingType}</span></p>
      <p className="text-xl font-bold text-gray-800">وضعیت پروژه: <span className="text-lg font-normal text-gray-600">{projectStatus}</span></p>
      <p className="text-xl font-bold text-gray-800">توضیحات تسویه: <span className="text-lg font-normal text-gray-600">{settlementDescription}</span></p>
      <p className="text-xl font-bold text-gray-800">حداقل سرمایه‌گذاری برای شخص حقیقی: <span className="text-lg font-normal text-gray-600">{realPersonMinPrice} ریال</span></p>
      <div className="flex flex-col justify-between items-center text-sm text-gray-600 mt-6">
        <button
          className="bg-blue-600 text-white rounded-md px-6 py-3 mt-4 transition-transform hover:scale-105 hover:bg-blue-700"
          onClick={handleViewClick}
        >
          جزئیات طرح
        </button>
      </div>
    </div>
  );
};

export default CartPlan;
