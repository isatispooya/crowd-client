/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

          
const CartPlan = ({buoyancy,paymentPeriod,profit,picture,totalTime,fundedAmount,companyName,title,id,key,description}) => {
    const navigate = useNavigate ();

 
  const handleViewClick = () => {
    navigate(`/plan/${id}`); 
  };


  return (
    <div className="flex mt-24 flex-wrap justify-center gap-6 bg-white p-4">
     
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
          <h4 className="font-bold text-lg mb-2 h-16">{companyName}</h4>
          <p className="text-base text-gray-800 mb-4">پیش‌بینی میزان سود: <span className="text-sm text-gray-600 font-semibold">{profit}</span></p>
          <p className="text-base text-gray-800 mb-4"> مبلغ سرمایه‌گذاری: <span className="text-sm text-gray-600 font-semibold">{fundedAmount}</span></p>
          {/* <p className="text-base text-gray-800 mb-4">شروع: <span className="text-sm text-gray-600 font-semibold">{card.startDate}</span></p> */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4" style={{ description: 'ltr' }}>
            <div className="bg-blue-900 h-2.5 rounded-full">{description}</div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4 mt-4">
            <p> درصدشناوری: <span className="text-sm text-gray-700 font-semibold">{buoyancy}</span></p>
            {/* <div className="h-6 w-px bg-gray-400 mx-2"></div>  */}
            <p> دوره پرداخت: <span className="text-sm text-gray-700 font-semibold">{paymentPeriod} نفر</span></p>
            {/* <div className="h-6 w-px bg-gray-400 mx-2"></div>  */}
            <p>پیش‌بینی سود: <span className="font-semibold text-gray-700">{profit}</span></p>
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
  picture: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
  buoyancy: PropTypes.number.isRequired,
  fundedAmount: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  paymentPeriod: PropTypes.number.isRequired,
};

export default CartPlan;
