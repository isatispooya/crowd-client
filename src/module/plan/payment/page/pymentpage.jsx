import React from 'react';

import Payment from '../feature/payment';
import PaymentCalculate from '../feature/paymentcalculate';

const PaymentPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
      <div className="p-2 bg-gray-200 shadow-inner rounded-2xl hover:bg-blue-300 duration-700">
        <Payment />
      </div>
      <div>
        <PaymentCalculate />
      
      </div>
    </div>
  );
};

export default PaymentPage;
