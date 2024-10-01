import React from 'react';
import Payment from '../feature/payment';
import PaymentCalculate from '../feature/paymentcalculate';





const PaymentPage = () => {
    return (
        <div className="grid grid-cols-2  gap-8">
        <div className="p-2 bg-gray-50 rounded-lg shadow-md">
          <Payment />
        </div>
        <div >
          <PaymentCalculate />
        </div>
      </div>
    );
}

export default PaymentPage;
