import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { IoKey } from 'react-icons/io5';
import SmallLoader from 'src/components/SmallLoader';
import { LuRefreshCw } from 'react-icons/lu';
import SmallError from 'src/components/smallError';
import useRefreshOTP from '../hooks/useGetOTP';

const Refresh = ({ setShowRefresh }) => {
  const { mutate, isLoading, isError } = useRefreshOTP();
  const [countdown, setCountdown] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClose = () => {
    setShowRefresh(false);
  };

  const refreshReq = () => {
    // mutate();
    setIsDisabled(true);
    setCountdown(60);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setIsDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isDisabled]);

  return (
    <>
      <div className="fixed inset-0 bg-gray-400 opacity-50 z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative card bg-white w-96 shadow-xl rounded-lg p-5">
          <h2 className="card-title text-xl font-bold text-gray-900">کد تایید</h2>

          <button
            type="button"
            className="absolute top-3 left-3 text-red-500 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <AiOutlineClose size={24} />
          </button>

          <div className="mt-5">
            {isLoading && <SmallLoader />}
            {isError && <SmallError />}
            <label htmlFor="otp" className="input input-bordered flex items-center gap-2 bg-white">
              <IoKey className="text-xl" />
              <input type="text" className="grow bg-gray-400" placeholder="کد" />
            </label>
            <button
              type="button"
              className="mt-5 w-full btn btn-outline hover:bg-blue-500 text-black"
              onClick={handleClose}
            >
              تایید
            </button>
            <button
              type="button"
              className="mt-5 w-full btn btn-outline hover:bg-blue-500 text-black"
              onClick={refreshReq}
            >
              <button
                type="button"
                className={`hover:text-gray-800 focus:outline-none ${
                  isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={refreshReq}
                disabled={isDisabled}
              >
                ارسال مجدد
              </button>
              <div className="flex items-center space-x-1">
                <div className="countdown">
                  <span style={{ '--value': countdown }} className="">
                    {isDisabled ? `(${countdown}s)` : ''}{' '}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Refresh.propTypes = {
  setShowRefresh: PropTypes.func.isRequired,
};

export default Refresh;
