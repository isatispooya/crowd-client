/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
//  
import { formatNumber } from 'src/utils/formatNumbers';
import { BsCloudUploadFill } from 'react-icons/bs';
// import { useFetchWallet } from '../hooks/getWalletData';

const TransactionOptions = ({ setOpenTransaction }) => {
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState('bankPortal'); // تب فعال

  // const { data: walletData } = useFetchWallet();
  // const { remaining } = walletData || {};

  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/,/g, '');
    setValue(cleanedValue);
  };

  // const WithdrawAll = () => {
  //   setValue(remaining);
  // };

  const closeModal = () => {
    setOpenTransaction(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 modal-overlay">
      <div className="relative bg-white shadow-lg rounded-lg w-[400px] p-6">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 left-3 text-gray-600 hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">افزایش</h2>


        <div className="flex mb-4">
          <button
            type="button"
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === 'bankPortal'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500'  
            }`}
            onClick={() => setActiveTab('bankPortal')}
          >
            درگاه بانکی
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === 'bankReceipt'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab('bankReceipt')}
          >
            فیش بانکی
          </button>
        </div>

    
        {activeTab === 'bankPortal' && (
          <div>
            <input
              value={formatNumber(value)}
              onChange={handleInputChange}
              type="text"
              placeholder="مبلغ"
              className="input input-bordered w-full bg-gray-100 mb-4"
            />
          </div>
        )}

        {activeTab === 'bankReceipt' && (
          <div>
            <input
              type="text"
              placeholder="شماره فیش بانکی"
              className="input input-bordered w-full bg-gray-100 mb-4"
            />
            <input
              type="text"
              placeholder="مبلغ فیش بانکی"
              className="input input-bordered w-full bg-gray-100 mb-4"
            />
            <label className="flex   items-center rounded-md bg-gradient-to-tr from-blue-500 to-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              <BsCloudUploadFill />
               پیوست فایل
              <input id="file_input" type="file" className="hidden" />
            </label>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

TransactionOptions.propTypes = {
  setOpenTransaction: PropTypes.func.isRequired,
};

export default TransactionOptions;
