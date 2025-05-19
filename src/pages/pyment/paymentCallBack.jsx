import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';
import usePaymentCallBack from 'src/module/plan/payment/service/usePaymentCallBack';

const containerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

const contentAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.2 },
};

const iconAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, delay: 0.3 },
};

const PaymentCallBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const params = new URLSearchParams(location.search);
  const invoicePayment = params.get('invoiceId');
  const referenceNumber = params.get('referenceNumber');
  const codeStatusPayment = params.get('status');
  const trackId = params.get('trackId');

  useEffect(() => {
    if (!invoicePayment) {
      setError('خطا: پارامتر invoiceId در URL وجود ندارد');
    }
  }, [invoicePayment]);

  const { isLoading, error: apiError } = usePaymentCallBack({
    invoice_payment: invoicePayment,
    reference_number: referenceNumber,
    code_status_payment: codeStatusPayment,
    track_id: trackId,
  });

  useEffect(() => {
    if (apiError) {
      setError(`خطا در پردازش پرداخت: ${apiError.message || 'خطای نامشخص'}`);
    }
  }, [apiError]);

  const handleReturnToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <motion.div
        className="bg-gray-50 border border-gray-200 shadow-sm w-full h-full p-8 text-center overflow-hidden relative rounded-md"
        {...containerAnimation}
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-300/40 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-blue-300/40 blur-2xl" />
        <motion.div {...contentAnimation} className="relative z-10 mt-60 max-w-md mx-auto">
          <motion.div
            {...iconAnimation}
            className="w-16 h-16 bg-red-100 text-red-700 mx-auto mb-4 rounded-full flex items-center justify-center border border-red-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">خطا در پرداخت</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            type="button"
            className="bg-gray-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-gray-700 transition duration-300 mt-4"
            onClick={handleReturnToHome}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            بازگشت به صفحه اصلی
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gray-50 border border-gray-200 shadow-sm w-full h-full p-8 text-center overflow-hidden relative rounded-md"
      {...containerAnimation}
    >
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-300/40 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-blue-300/40 blur-2xl" />
      <motion.div {...contentAnimation} className="relative z-10 mt-60 max-w-md mx-auto">
        {codeStatusPayment === 'success' ? (
          <>
            <motion.div
              {...iconAnimation}
              className="w-16 h-16 bg-green-100 text-green-700 mx-auto mb-4 rounded-full flex items-center justify-center border border-green-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">پرداخت موفق</h1>
            <p className="text-gray-600 mb-6">پرداخت شما با موفقیت انجام شد.</p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-gray-500 text-sm mb-4">
                اطلاعات این تراکنش در پنل کاربری شما قابل مشاهده است.
              </p>
            </div>
          </>
        ) : (
          <>
            <motion.div
              {...iconAnimation}
              className="w-16 h-16 bg-red-100 text-red-700 mx-auto mb-4 rounded-full flex items-center justify-center border border-red-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">پرداخت ناموفق</h1>
            <p className="text-gray-600 mb-6">متأسفانه پرداخت انجام نشد.</p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-gray-500 text-sm mb-4">
                در صورت کسر وجه از حساب شما، مبلغ حداکثر تا ۷۲ ساعت به حساب شما برگشت داده خواهد شد.
              </p>
            </div>
          </>
        )}
        <motion.button
          type="button"
          className="bg-gray-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-gray-700 transition duration-300 mt-4"
          onClick={handleReturnToHome}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          بازگشت به صفحه اصلی
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentCallBack;
