/* eslint-disable react/button-has-type */
import React from 'react';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">پرداخت ناموفق بود!</h1>
        <p className="text-gray-700 mb-6">
          پرداخت شما با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا از روش دیگری استفاده کنید.
        </p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          onClick={() => {
          }}
        >
          بازگشت به صفحه پرداخت
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
