/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { formatNumber } from 'src/utils/formatNumbers';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { toast, ToastContainer } from 'react-toastify';
import { useFetchWallet } from 'src/module/wallet/hooks/getWalletData';
import UseCartId from 'src/hooks/use-cartId';
import AgreementPopup from 'src/components/Agreement'; 
import usePlan from '../service/use-plan';
import PostPartnership from '../service/use-partnership';


const Partnership = () => {
  const [amount, setAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState();
  const [errorr, setErrorr] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for controlling the popup
  const { mutate, isLoadingpost, errorpost } = PostPartnership();
  const { cartId } = UseCartId();
  const { data: walletData } = useFetchWallet(cartId);
  const { remaining } = walletData || {};
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);

  if (isLoading || isLoadingpost) {
    return <Loader />;
  }

  if (error || errorpost) {
    return <div className="text-red-500">خطایی رخ داده است: {error}</div>;
  }

  const handleInventoryClick = () => {
    setAmount(
      Math.floor(Number(remaining) / Number(data.nominal_price_certificate))
    );
  };

  const handleSubmit = () => {
    if (amount < 1000) {
      setErrorr('حداقل گواهی مشارکت باید 1000 عدد باشد.');
    } else {
      // Open the agreement popup
      setIsPopupOpen(true);
    }
  };

  const handleAgreementAccept = () => {
    // Close the popup
    setIsPopupOpen(false);
    try {
      mutate({ id, amount, status });
      toast.success('اطلاعات با موفقیت ارسال شد.');
    } catch (errorPost) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-8 rounded-xl shadow-lg ">
      <h2 className="text-3xl items-center text-center font-bold text-gray-900 mb-2">
        مشارکت
      </h2>
      <p className="text-blue-800 text-lg font-semibold">
        قیمت هر گواهی: <span>{formatNumber(data.nominal_price_certificate)}</span>
      </p>
      <p className="text-blue-800 text-lg font-semibold">
        حداقل تعداد: <span>1000</span>
      </p>

      <div className="flex flex-col w-full mb-4">
        <label className="text-gray-700 font-medium mb-2">
          تعداد گواهی مشارکت:
        </label>
        <input
          type="number"
          placeholder="تعداد گواهی مشارکت"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow-md bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {errorr && <p className="text-red-500 text-xs mt-2">{errorr}</p>}
      </div>

      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-inner">
        <label className="text-gray-700 font-medium">مبلغ مشارکت:</label>
        <p className="text-lg font-semibold text-blue-600">
          {formatNumber(amount * Number(data.nominal_price_certificate))}
        </p>
      </div>

      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-inner">
        <label className="text-gray-700 font-medium">موجودی کیف پول:</label>
        <p
          onClick={handleInventoryClick}
          className="cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800"
        >
          {remaining !== null && remaining !== undefined
            ? formatNumber(remaining)
            : 0}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          id="show-name"
          checked={status}
          onChange={() => setStatus(!status)}
          className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="show-name"
          className="text-gray-700 bg-white font-medium"
        >
          اطلاعات شما برای دیگر کاربران قابل روئیت باشد؟
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-[#004ff9] to-[#000000] text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        درخواست پرداخت
      </button>

      <ToastContainer />

      {/* Agreement Popup */}
      {isPopupOpen && (
        <AgreementPopup onAccept={handleAgreementAccept} />
      )}
    </div>
  );
};

export default Partnership;
