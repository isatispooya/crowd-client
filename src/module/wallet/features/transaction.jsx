import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { formatNumber } from 'src/utils/formatNumbers';
import { useFetchWallet } from '../hooks/getWalletData';

const TransactionOptions = ({ setOpenTransaction }) => {
  const [value, setValue] = useState('');

  const { data: walletData } = useFetchWallet();
  const { remaining } = walletData || {};

  const handleInputChange = (e) => {
    const cleanedValue = e.target.value.replace(/,/g, '');
    setValue(cleanedValue);
  };

  const WithdrawAll = () => {
    setValue(remaining);
  };

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

        <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">برداشت</h2>

        <div className="mb-4">
          <input
            value={formatNumber(value)}
            onChange={handleInputChange}
            type="text"
            placeholder="میزان برداشت"
            className="input input-bordered w-full bg-gray-100 mb-4"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="flex items-center px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={WithdrawAll}
          >
            برداشت همه
            <LuGalleryHorizontalEnd className="mr-2" />
          </button>
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
