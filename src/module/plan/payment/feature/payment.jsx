/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { formatNumber } from 'src/utils/formatNumbers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgreementPopup from 'src/components/Agreement';
import { motion } from 'framer-motion';
import usePlan from '../../service/use-plan';
import PaymentContext from '../service/paymentContext';
import usePayment from '../service/use-postpayment';
import PayCheck from './payCheck';
import PaymentGateway from './PaymentGateway';

const Payment = () => {
  const { traceCode } = useParams();

 
  const {
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    attachment,
    setAttachment,
    paymentId,
    setPaymentId,
    description,
    setDescription,
    status,
    setStatus,
    isPopupOpen,
    setIsPopupOpen,
  } = useContext(PaymentContext);

  const { data } = usePlan(traceCode);
  const totalPrice = Number(data?.plan?.unit_price) * Number(amount) || '';
  const { mutate } = usePayment(traceCode);
  


  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method !== 'fesh') {
      setAttachment(null);
      setDescription('');
      setPaymentId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 1000) {
      alert('حداقل گواهی مشارکت باید 1000 عدد باشد.');
      return;
    }
    mutate(
      {
        amount,
        name_status: status,
        payment_id: paymentId,
        description,
        risk_statement: true,
        picture: attachment,
      },
      {
        onSuccess: () => toast.success('پرداخت با موفقیت ثبت شد!'),
        onError: (error) => toast.error(`خطا در ثبت پرداخت: ${error.message}`),
      }
    );
  };

  const handleAgreementAccept = () => setIsPopupOpen(false);

  return (
    <div className="flex-col gap-6 p-8 max-w-4xl mx-auto">
      <h4 className="text-3xl text-center font-bold text-gray-900 mb-6">شروع سرمایه گذاری</h4>
      <p className="text-blue-800 text-lg font-semibold">
        قیمت هر گواهی: <span>{formatNumber(data?.plan?.unit_price)}</span>
      </p>

      <div className="flex flex-col w-full mb-4 px-8">
        <label className="text-gray-700 font-medium mb-2">تعداد گواهی مشارکت:</label>
        <input
          type="number"
          placeholder="تعداد گواهی مشارکت"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="shadow-md bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-lg transition-all"
        />
      </div>

      <div className="px-8">
        <p className="text-blue-800 text-lg font-semibold">
          مبلغ کل : <span>{formatNumber(totalPrice)}</span>
        </p>
      </div>

      <div className="mt-6 px-8">
        <h3 className="text-gray-800 text-xl font-semibold mb-4">روش پرداخت:</h3>
        <div className="flex space-x-12">
          {['fesh', 'dargah'].map((method) => (
            <motion.button
              key={method}
              type="button"
              onClick={() => handlePaymentMethodSelect(method)}
              className={`px-4 py-2 rounded-lg border ${
                paymentMethod === method ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              } transition-colors duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {method === 'fesh' ? 'پرداخت با فیش' : 'پرداخت درگاه'}
            </motion.button>
          ))}
        </div>
        <h3 className="text-gray-800 mt-5 mb-4">شماره حساب: 6037697551928564</h3>
      </div>

      <div className="flex items-center gap-2 mt-6 px-8">
        <input
          type="checkbox"
          id="show-name"
          checked={status}
          onChange={() => setStatus(!status)}
          className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="show-name" className="text-gray-700 font-medium">
          اطلاعات شما برای دیگر کاربران قابل روئیت باشد؟
        </label>
      </div>
      <PayCheck handleSubmit={handleSubmit} />
      <div className="mt-10">
        <PaymentGateway />
      </div>

      {isPopupOpen && <AgreementPopup onAccept={handleAgreementAccept} />}
    </div>
  );
};

export default Payment;
