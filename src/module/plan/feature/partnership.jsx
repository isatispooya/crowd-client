/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { formatNumber } from 'src/utils/formatNumbers';

const Partnership = () => {
  const [value] = useState(10000);

  return (


    <div className="flex flex-col items-center">
      <input
        type="number"
        value={formatNumber(value)}
        className="shadow appearance-none disabled:bg-gray-200 border border-gray-300 rounded-lg  py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-black-300 hover:border-black-300 transition-colors"
      />
      <p>موجودی</p>
      <div className='flex gap-4'>
        <input type="checkbox" id="show-name" className="mr-2" />
        <label htmlFor="show-name">موافقتنامه </label>
      </div>
      <button className='bg-blue-600 px-4 py-2 rounded-md text-white'>درخواست</button>
    </div>

    
  );
};

export default Partnership;
