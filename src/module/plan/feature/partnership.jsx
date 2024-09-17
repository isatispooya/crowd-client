/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { formatNumber, cleanNumber } from 'src/utils/formatNumbers';

const Partnership = () => {
  const [value, setvalue] = useState('');
  const [inventory, setInventory] = useState(8000);
  const [ischecked, seIsChecked] = useState(false);

  const handleInventoryClick = () => {
    setvalue(inventory.toString());
  };

  return (
    <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4"> مشارکت</h2>
      
      <div className="flex flex-col w-full">
        <label className="text-gray-700 font-medium mb-2">مبلغ پرداختی:</label>
        <input
          type="text"
          placeholder="مبلغ پرداختی به ریال"
          value={formatNumber(value)}
          onChange={(e) => setvalue(cleanNumber(e.target.value))}
          className="shadow-sm appearance-none border border-gray-300 rounded-lg py-3 px-4 mb-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
        />
      </div>
      <div className="flex gap-8 w-full">
        <label className="text-gray-700 font-normal text-sm mb-2">موجودی کیف پول:</label>
        <p onClick={handleInventoryClick} className="cursor-pointer text-blue-600 hover:underline">
          {formatNumber(inventory)}
        </p>
      </div>
      <div className="flex items-center w-full mb-6">
        <input
          type="checkbox"
          id="show-name"
          checked={ischecked}
          onChange={() => seIsChecked(!ischecked)}
          className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
        />
        <label htmlFor="show-name" className="text-gray-700 font-medium">موافقتنامه</label>
      </div>
      <button
        className={`bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none transition-transform transform hover:scale-105 ${
          !ischecked ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!ischecked}
      >
        درخواست پرداخت
      </button>
    </div>
  );
};

export default Partnership;
