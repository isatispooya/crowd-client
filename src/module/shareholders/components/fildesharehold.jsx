/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

const FileSharehold = ({ index, validite, setValidite }) => {
  const handleChange = (input, value) => {
    const updatedRow = { ...validite[index], [input]: value };
    const updatedList = [...validite];
    updatedList[index] = updatedRow;
    setValidite(updatedList);
  };

  return (
    <div className="flex justify-center items-center">
      <form className="mt-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              نام و نام خانوادگی :
            </label>
            <input
              type="text"
              name="name"
              value={validite[index].name}
              disabled={validite[index].lock}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="shadow appearance-none disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کدملی :</label>
            <input
              type="text"
              name="national_code"
              value={validite[index].national_code}
              disabled={validite[index].lock}
              onChange={(e) => handleChange('national_code', e.target.value)}
              maxLength={10}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              required
              className="shadow appearance-none disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">درصد سهام :</label>
            <input
              type="text"
              name="percent"
              value={validite[index].percent}
              disabled={validite[index].lock}
              onChange={(e) => {
                let {value} = e.target;
                if (value > 100) value = 100;
                handleChange('percent', value);
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                if (e.target.value.split('.').length > 2) {
                  e.target.value = e.target.value.slice(0, -1); 
                }
              }}
              max={100}
              min={10}
              required
              className="shadow appearance-none disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">شماره تلفن :</label>
            <input
              type="text"
              name="phone"
              value={validite[index].phone}
              disabled={validite[index].lock}
              onChange={(e) => handleChange('phone', e.target.value)}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={11}
              required
              className="shadow appearance-none disabled:bg-gray-200 text-black border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FileSharehold;
