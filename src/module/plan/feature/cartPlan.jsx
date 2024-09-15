/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useNavigate } from 'react-router-dom';

          
const CartPlan = ({buoyancy,paymentPeriod,profit,picture,totalTime,fundedAmount,companyName,title,id,key,nominalPriceCertificate,applicantFundingPercentage,faraboursLink,symbol,marketer,remainingDays,activityField,planStatus,description}) => {
    const navigate = useNavigate ();

 
  const handleViewClick = () => {
    navigate(`/plan/${id}`); 
  };


  return (
    <div className="flex flex-wrap justify-center gap-6 bg-white p-4">
     
        <div key={key} className="shadow-md w-72 p-4 mt-18 rounded-md border bg-white">
          <div className="relative h-40 w-full mb-4">
            <image
              src={picture}
              alt={picture}
 
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
              {profit}
            </div>
          </div>
          <h3 className="font-bold text-lg mb-2 h-16">{title}</h3>
          <p className="text-base text-gray-800 mb-4">پیش‌بینی میزان سود: <span className="text-sm text-gray-600 font-semibold">{profit}</span></p>
          <p className="text-base text-gray-800 mb-4"> مبلغ سرمایه‌گذاری: <span className="text-sm text-gray-600 font-semibold">{fundedAmount}</span></p>
          <p className="text-base text-gray-800 mb-4">شروع: <span className="text-sm text-gray-600 font-semibold">{card.startDate}</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4" style={{ description: 'ltr' }}>
            {/* <div className="bg-blue-900 h-2.5 rounded-full" style={{ width: `${card.progress}%` }}></div> */}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4 mt-4">
            <p>سرمایه‌گذاری شده: <span className="text-sm text-gray-700 font-semibold">{card.investedAmount}</span></p>
            <div className="h-6 w-px bg-gray-400 mx-2"></div> 
            <p>تعداد سرمایه‌گذاران: <span className="text-sm text-gray-700 font-semibold">{card.investors} نفر</span></p>
            <div className="h-6 w-px bg-gray-400 mx-2"></div> 
            <p>پیش‌بینی سود: <span className="font-semibold text-gray-700">{card.profitRate}</span></p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <p>{totalTime} روز تا پایان فرصت</p>
            <button
              className="bg-blue-900 text-white rounded-md px-4 py-2"
              onClick={() => handleViewClick} 

              >
              جزییات طرح
            </button>
          </div>
        </div>
     
    </div>
  );
};

CartPlan.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  expert: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  handledDate: PropTypes.string.isRequired,
  trackingCode: PropTypes.string.isRequired,
};

export default CartPlan;
