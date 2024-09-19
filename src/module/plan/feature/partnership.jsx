/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { formatNumber, cleanNumber } from 'src/utils/formatNumbers';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { toast, ToastContainer } from 'react-toastify';
import { useFetchWallet } from 'src/module/wallet/hooks/getWalletData';
import UseCartId from 'src/hooks/use-cartId';
import usePlan from '../service/use-plan';
import PostPartnership from '../service/use-partnership';

const Partnership = () => {
  const [amountNumber, setAmountNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorr, setErrorr] = useState('');
  const { mutateAsync, isLoadingpost, errorpost } = PostPartnership();
  const { cartId } = UseCartId();
  const { data: walletData } = useFetchWallet(cartId);
  const { remaining } = walletData || {};
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);

  if (isLoading || isLoadingpost) {
    return <Loader />;
  }
  const result = remaining && data.nominal_price_certificate
    ? Math.floor(Number(remaining) / Number(data.nominal_price_certificate))
    : 0;
  const newAmount= (Number(result) / Number(data.nominal_price_certificate))
  if (error || errorpost) {
    return <div className="text-red-500">خطایی رخ داده است: {error}</div>;
  }
  const handleInventoryClick = () => {
    setTotalAmount(result||totalAmount);
    setAmountNumber(newAmount);
  };
  const handleChange = (e) => {
    const cleanedValue = cleanNumber(e.target.value);
    setAmountNumber(cleanedValue);
    if (cleanedValue && Number(cleanedValue) < 1000) {
      setErrorr('حداقل گواهی مشارکت باید 1000 عدد باشد.');
    } else {
      setErrorr('');
    }
  };
  useEffect(() => {
    if ((amountNumber) && amountNumber !== '' && data?.nominal_price_certificate) {
      const calculatedResult2 = Math.floor(Number(amountNumber) * (data.nominal_price_certificate));
      setTotalAmount(calculatedResult2);
    }
  }, [amountNumber, data]);
  const handleSubmit = async  () => {
    const sender = {
      id,
      amount: amountNumber ||newAmount, 
    };  
    try {
      await  mutateAsync(sender);
      toast.success('اطلاعات با موفقیت ارسال شد.');
    } catch (errorPost) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };
  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl items-center text-center font-bold text-gray-900 mb-6">مشارکت</h2>
      <p className="text-blue-800 text-lg font-semibold">قیمت هر گواهی: <span>{formatNumber(data.nominal_price_certificate)}</span></p>
      <p className="text-blue-800 text-lg font-semibold">حداقل تعداد: <span>1000</span></p>
      <div className="flex flex-col w-full mb-4">
        <label className="text-gray-700 font-medium mb-2">تعداد گواهی مشارکت:</label>
        <input
          type="number"
          placeholder="تعداد گواهی مشارکت"
          value={amountNumber}
          onChange={handleChange}
          className="shadow-md border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        {errorr && <p className="text-red-500 text-xs mt-2">{errorr}</p>}
      </div>
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-inner">
        <label className="text-gray-700 font-medium">مبلغ مشارکت:</label>
        <p className="text-lg font-semibold text-blue-600">{formatNumber(totalAmount)}</p>
      </div>
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-inner">
        <label className="text-gray-700 font-medium">موجودی کیف پول:</label>
        <p onClick={handleInventoryClick} className="cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800">
          {formatNumber(remaining)}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          id="show-name"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label htmlFor="show-name" className="text-gray-700 font-medium">موافقتنامه</label>
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-gradient-to-r from-[#004ff9] to-[#000000] text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isChecked}
      >
        درخواست پرداخت
      </button>
      <ToastContainer />
    </div>
  );
};
export default Partnership;
