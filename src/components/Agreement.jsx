/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const AgreementPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClosePopup = () => {
    if (isChecked) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">توافق نامه</h2>
        <p className="text-sm mb-4">
          با قبول این موافقت‌نامه، شما تأیید می‌کنید که تمامی قوانین و شرایط استفاده از خدمات ما را
          مطالعه کرده و آن‌ها را پذیرفته‌اید. همچنین شما موافقت می‌کنید که مسئولیت کامل هرگونه
          استفاده از حساب کاربری خود را به عهده دارید و از اطلاعات شخصی و محرمانه خود به خوبی محافظت
          خواهید کرد. هرگونه تخلف از این شرایط می‌تواند منجر به محدودیت دسترسی یا لغو کامل حساب شما
          شود.
        </p>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-sm">
            شرایط و قوانین را میپذیرم
          </label>
        </div>
        <button
          type="button"
          onClick={handleClosePopup}
          className={`w-full py-2 px-4 rounded ${
            isChecked
              ? 'bg-blue-500 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!isChecked}
        >
          تایید  
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
