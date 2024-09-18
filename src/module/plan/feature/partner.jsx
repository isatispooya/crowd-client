/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import usepartner from '../service/use-participant';
import Partnership from './partnership';

const Partner = () => {
  const { id } = useParams();
  const { data, isLoading } = usepartner(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data || data.length === 0) {
    return <p className="text-center text-red-500">هیچ اطلاعاتی یافت نشد.</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">تاریخچه مشارکت</h2>

      <div className="grid grid-rows-1 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 font-semibold">
            تعداد گواهی خریداری شده:
            <span className="text-blue-800 ml-2">{data[0].amount}</span>
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 font-semibold">
            مبالغ مشارکت:
            <span className="text-blue-800 ml-2">{data[0].total_amount}</span>
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          مشارکت
        </button>
      </div>

      {isModalOpen && (
      <Partnership/>
      )}
    </div>
  );
};

export default Partner;
