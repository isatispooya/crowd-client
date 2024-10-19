/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import PaymentContext from '../service/paymentContext';

const PayCheck = () => {
  const {
    paymentMethod,
    setAttachment,
    description,
    setDescription,
    paymentId,
    setPaymentId,
    handleSubmit,
  } = useContext(PaymentContext);

  return (
    <>
      {paymentMethod === 'fesh' && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 px-8">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">پیوست:</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="shadow-md bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">توضیحات:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات"
              className="shadow-md bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              rows="3"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">شناسه پرداخت:</label>
            <input
              type="text"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              placeholder="شناسه پرداخت"
              className="shadow-md bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            ثبت
          </button>
          <ToastContainer />
        </form>
      )}
    </>
  );
};

export default PayCheck;
