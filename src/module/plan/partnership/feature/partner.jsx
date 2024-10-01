/* eslint-disable react/button-has-type */
import React from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import usepartner from '../service/use-get-participant';

const Partner = () => {
  const { traceCode } = useParams();
  const { data, isLoading } = usepartner(traceCode);

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 ">شما هنوز دارایی ندارید</p>;
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-6 bg-gray-20 p-8 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl items-center text-center font-bold text-gray-900 mb-6">دارایی ها</h2>

      {/* <div className="grid grid-rows-1 gap-4">
        <div className="bg-blue-100 flex justify-between p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 font-semibold">
            تعداد گواهی خریداری شده:
          </p>
          <p className="text-blue-800 text-base font-semibold">{data[0].amount}</p>

        </div>
      </div> */}
    </div>
  );
};

export default Partner;
