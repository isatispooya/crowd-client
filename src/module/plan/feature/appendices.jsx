import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { OnRun } from 'src/api/OnRun';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import useAppenices from '../service/use-appendices';

const Appendices = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useAppenices(id);
  console.log('tyu', data);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">خطایی رخ داده است</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
    {data.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
      >
        <div>
          <p className="text-lg font-semibold text-gray-800">{item.title}</p>
        </div>
        <div className="flex gap-4">
          <a
            href={`${OnRun}${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 flex items-center hover:text-blue-800 text-sm font-medium transition-colors duration-200 ease-in-out"
          >
            دانلود فایل
            <FiDownload className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Appendices;
