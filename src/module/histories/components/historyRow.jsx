/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { FiX, FiDownload } from 'react-icons/fi';


  const HistoryRow = ({ index, list, item, setList }) => {
    const updateFile = (file, national_code) => {
      const updatedList = list.map((i) => i.national_code === national_code ? { ...i, file } : i
      );
     
      setList(updatedList);
    };
  
    const handleFileRemove = (history) => {
      const updatedList = list.map((i) =>
        i.history === history ? { ...i, file: '' } : i
  
      );
      setList(updatedList);
    };
  
  return (
    <div
      key={index}
      className="grid gap-32 disabled:bg-gray-300 grid-cols-1 sm:grid-cols-3  mt-8 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out relative"
    >
      <div className="flex items-center gap-4">
        <label className="text-gray-900 font-semibold">اسم:</label>
        <div className="text-gray-700 text-sm font-medium">{item.name}</div>
      </div>
      <div className="flex items-center gap-4">
        <label className="text-gray-900 font-semibold">کد ملی:</label>
        <div className="text-gray-700 text-sm font-medium">{item.national_code}</div>
      </div>
      <div className="flex items-center gap-4 ">
        {typeof item.file === 'string' && item.file ? (
          <div className="flex gap-8">
             <a
              href={`${OnRun}/${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center  hover:text-blue-800 text-sm font-medium transition-colors duration-200 ease-in-out"
            >
             فایل
              <FiDownload className="w-5 h-5 mr-1" />
            </a>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
              onClick={() => handleFileRemove(item.national_code)}
              disabled={item.lock}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <input
            name="file_upload"
            type="file"
            onChange={(e) => updateFile(e.target.files[0], item.national_code)}
            disabled={item.lock}
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200 transition-colors duration-200 ease-in-out"
          />
        )}
      </div>
    </div>
  );
};

HistoryRow.propTypes = {
  index: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
};

export default HistoryRow;
