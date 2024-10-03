import React from 'react';
import { useParams } from 'react-router-dom';

import usecertificate from '../hooks/use-certificate';

const Certificate = () => {
  const { id } = useParams();
  const { data: Data } = usecertificate(id);

  const certificateData = Data
    ? Data.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        amount: item.amount,
        total_amount: item.total_amount,
        link: item.link,
      }))
    : [];

  return (
    <div className="w-full h-full flex flex-wrap justify-start gap-6 p-6 ">
      {certificateData.length === 0 ? (
        <p className="text-gray-700">هیچ اطلاعاتی یافت نشد.</p>
      ) : (
        certificateData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px]"
          >
            <div className="flex flex-col items-center flex-grow space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 p-2 border-gray-400">
                {item.firstName} {item.lastName}
              </h3>
              <div className="flex flex-col justify-center items-center space-y-4">
                <p className="text-lg font-medium text-black">
                  مبلغ واحد: <span className="text-sm text-gray-700">{item.amount} تومان</span>
                </p>
                <p className="text-lg font-medium text-black">
                  مجموع مبلغ:{' '}
                  <span className="text-sm text-gray-700">{item.total_amount} تومان</span>
                </p>
              </div>
              <a
                href={item.link}
                className="px-8 py-3 rounded-md border bg-gradient-to-r from-[#004ff9] to-[#000000] text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                download
              >
                دانلود گواهی مشارکت
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Certificate;
