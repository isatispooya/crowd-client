import React from 'react';

import Payment from '../feature/payment';
import PaymentCalculate from '../feature/paymentcalculate';

const PaymentPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
      <div className="p-2 bg-gray-100 shadow-inner rounded-2xl ">
        <Payment />
      </div>
      <div >
      <p className='flex text-center font-bold text-xl items-center justify-center'>دارایی های شما </p>
        <PaymentCalculate />     
      </div>
    </div>
  );
};

export default PaymentPage;
