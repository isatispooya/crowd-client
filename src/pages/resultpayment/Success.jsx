/* eslint-disable react/button-has-type */
import React from 'react';

const PaymentConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">پرداخت موفق بود!</h1>
        <p className="text-gray-700 mb-6">
          پرداخت شما با موفقیت انجام شد. از خرید شما متشکریم!
        </p>
        <p className="text-gray-600 mb-4">
          شناسه تراکنش: <span className="font-medium">123456789</span>
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => {
          }}
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
