import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { OnRun } from 'src/api/OnRun';
import usePlan from '../service/use-plan';

const Descript = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-inner">
         <div>
          <img
            src={`${OnRun}/${data.picture}`}
            alt={data.plan_name}
            className="h-80 w-full object-cover rounded-md"
          />
        </div>
      <div>
        <p className="text-black mb-4 text-center  mt-8">{data.plan_name}</p>
        <div>
        <h3 className="text-xl font-bold mb-2">توضیحات:</h3>
        <p className="text-gray-700 mb-4">{data.description}</p>
      </div>
        <h3 className="text-xl font-bold mb-2">نام شرکت:</h3>
        <p className="text-gray-700 mb-4">{data.company_name}</p>
      </div>   
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-white rounded-lg'>
          <p className="text-base text-gray-800 mb-4">پیش‌بینی میزان سود: <span className="text-sm text-gray-600 font-semibold">{data.profit}</span></p>
          <p className="text-base text-gray-800 mb-4">مبلغ سرمایه‌گذاری: <span className="text-sm text-gray-600 font-semibold">{data.funded_amount}</span></p>
          <p className="text-base text-gray-800 mb-4">مدت زمان طرح: <span className="text-sm text-gray-600 font-semibold">{data.total_time}</span></p>
          <p className="text-base text-gray-800 mb-4">حوزه فعالیت: <span className="text-sm text-gray-600 font-semibold">{data.activity_field}</span></p>
          <p className="text-base text-gray-800 mb-4">نماد: <span className="text-sm text-gray-600 font-semibold">{data.symbol}</span></p>
          <p className="text-base text-gray-800 mb-4">بازارگردان: <span className="text-sm text-gray-600 font-semibold">{data.marketer}</span></p>
          <p className="text-base text-gray-800 mb-4">درصد تأمین متقاضی: <span className="text-sm text-gray-600 font-semibold">{data.applicant_funding_percentage}</span></p>
          <p className="text-base text-gray-800 mb-4">قیمت اسمی هر گواهی: <span className="text-sm text-gray-600 font-semibold">{data.nominal_price_certificate}</span></p>
          <p className="text-base text-gray-800 mb-4">
            لینک فرابورس:{" "}
            <a
              href={data.farabours_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              مشاهده لینک
            </a>
          </p>
        </div>
    </div>
  );
};

export default Descript;
