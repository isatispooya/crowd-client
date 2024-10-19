import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDargahResult from 'src/module/plan/payment/service/useDargahResualt';

const PaymentResualt = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const invoiceId = queryParams.get('invoiceId');
  const navigate = useNavigate();
  const { traceCode } = useParams();

  const handleReturnToHome = () => {
    navigate('/');
  };
  const { data } = useDargahResult(traceCode, invoiceId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 text-center">
        {data === true ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">پرداخت موفق بود!</h1>
            <p className="text-gray-700 mb-6">
              پرداخت شما با موفقیت انجام شد. از خرید شما متشکریم!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">پرداخت ناموفق</h1>
            <p className="text-gray-700 mb-6">پرداخت شما ناموفق بود. لطفاً مجدداً تلاش کنید.</p>
          </>
        )}
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleReturnToHome}
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default PaymentResualt;
