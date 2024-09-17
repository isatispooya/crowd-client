import React from 'react';

const PaymentResult = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-12 shadow-2xl rounded-lg text-center w-96 md:w-[500px] lg:w-[600px]">
        <div className="bg-gradient-to-r from-[#004ff9] to-[#000000] shadow-2xl w-full text-white rounded-t-md p-4 text-center mb-6">
          <h1 className="text-3xl font-extrabold">نتیجه پرداخت</h1>
        </div>
        <p className="text-green-500 text-lg mb-8">پرداخت با موفقیت انجام شد</p>

        {/* Detail Card */}
        <div className="bg-gray-100 text-right p-4 rounded-lg mb-8 shadow-inner ">
          <p className="text-gray-700 mb-2"><strong>شناسه تراکنش:</strong> 123456789</p>
          <p className="text-gray-700 mb-2"><strong>مبلغ:</strong> 500,000 تومان</p>
          <p className="text-gray-700"><strong>تاریخ:</strong> 1403/02/10</p>
        </div>

        <button
          type="button"
          className="px-8 py-3 rounded-md border bg-gradient-to-r from-[#004ff9] to-[#000000] text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
        >
          بازگشت به کیف پول
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
