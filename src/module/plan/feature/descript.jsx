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
    return <div className="text-red-500 text-center py-4">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <div className="relative mb-6">
        <img
          src={`${OnRun}/${data.picture}`}
          alt={data.plan_name}
          className="h-80 w-full object-cover rounded-lg shadow-md"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg text-white">
          <h2 className="text-2xl font-bold text-center">{data.plan_name}</h2>
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">اطلاعات طرح:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">نام شرکت</p>
            <p className="text-lg text-gray-900 font-semibold">{data.company_name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">پیش‌بینی میزان سود</p>
            <p className="text-lg text-green-600 font-bold">{data.profit}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">مبلغ سرمایه‌گذاری</p>
            <p className="text-lg text-indigo-600 font-bold">{data.funded_amount} تومان</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">مدت زمان طرح</p>
          <p className="text-lg text-gray-900 font-semibold">{data.total_time} ماه</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حوزه فعالیت</p>
          <p className="text-lg text-gray-900 font-semibold">{data.activity_field}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نماد</p>
          <p className="text-lg text-gray-900 font-semibold">{data.symbol}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">بازارگردان</p>
          <p className="text-lg text-gray-900 font-semibold">{data.marketer}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">درصد تأمین متقاضی</p>
          <p className="text-lg text-gray-900 font-semibold">{data.applicant_funding_percentage}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">قیمت اسمی هر گواهی</p>
          <p className="text-lg text-gray-900 font-semibold">{data.nominal_price_certificate} تومان</p>
        </div>
      </div>

      <div className="text-center">
        <a
          href={data.farabours_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-[#004ff9] to-[#000000] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          مشاهده لینک فرابورس
        </a>
      </div>
    </div>
  );
};

export default Descript;
