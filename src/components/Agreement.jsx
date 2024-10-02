/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const AgreementPopup = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept(); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-center">موافقت‌نامه</h2>
        <p className="text-sm mb-4">
          با قبول این موافقت‌نامه، شما تأیید می‌کنید که تمامی قوانین و شرایط
          استفاده از خدمات ما را مطالعه کرده و آن‌ها را پذیرفته‌اید. همچنین شما
          موافقت می‌کنید که مسئولیت کامل هرگونه استفاده از حساب کاربری خود را به
          عهده دارید و از اطلاعات شخصی و محرمانه خود به خوبی محافظت خواهید کرد.
          هرگونه تخلف از این شرایط می‌تواند منجر به محدودیت دسترسی یا لغو کامل
          حساب شما شود.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-sm">
            موافقم
          </label>
        </div>
        <button
          type='button'
          onClick={handleAccept}
          className={`w-full py-2 px-4 rounded ${
            isChecked
              ? 'bg-blue-500 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!isChecked}
        >
          تأیید و بستن
        </button>
      </div>
    </div>
  );
};

export default AgreementPopup;
