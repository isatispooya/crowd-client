/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';

const TransactionOptions = ({ setOpenTransaction }) => {
  const closeModal = () => {
    setOpenTransaction(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <div className="indicator bg-white shadow-lg rounded-lg w-[400px] z-50 p-6">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2 transition duration-300 ease-in-out"
          >
            <IoMdClose size={24} />
          </button>
          <div className="indicator-item indicator-bottom">
            <button type="button" className="btn btn-info text-white">
              تایید
            </button>
          </div>

          <div className="  card-body">
            <h2 className="card-title mb-5 text-2xl font-bold text-black border-b-2 border-blue-300">
       
              برداشت
            </h2>
            <input
              type="text"
              placeholder="میزان برداشت"
              className="input input-bordered input-info w-full max-w-xs bg-white mb-4"
            />
            <div className="form-control">
              <label className="cursor-pointer label flex items-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition duration-300"
                >
                  برداشت همه
                  </button>
              </label>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

TransactionOptions.propTypes = {
  setOpenTransaction: PropTypes.func.isRequired,
};

export default TransactionOptions;
