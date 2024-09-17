/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';


const TransactionOptions = ({ setOpenTransaction }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeModal = () => {
    setOpenTransaction(false);
  };



  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 modal-overlay"

    >
      <div className="relative bg-white shadow-lg rounded-lg w-[400px] p-6">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">برداشت</h2>

        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="میزان برداشت"
            className="input input-bordered w-full bg-gray-100 mb-4"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            برداشت همه
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
