/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { formatNumber } from 'src/utils/formatNumbers';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgreementPopup from 'src/components/Agreement';
import { motion } from 'framer-motion';
import usePlan from '../../service/use-plan';
import usePayment from '../service/use-postpayment';

const Payment = () => {
  const { traceCode } = useParams();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [paymentId, setPaymentId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

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

      {isPopupOpen && <AgreementPopup onAccept={handleAgreementAccept} />}
    </div>
  );
};

export default Payment;
