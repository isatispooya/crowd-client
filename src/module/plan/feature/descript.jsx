import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { OnRun } from 'src/api/OnRun';
import { FiDownload } from 'react-icons/fi';
import usePlan from '../service/use-plan';
import useDocumentation from '../service/use-documentation';
import useAppenices from '../service/use-appendices';

const Descript = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);
  const { data: documentationData } = useDocumentation(id);
  const { data: appenicesData } = useAppenices(id);
  const remainingFrom = new Date(data.remaining_from_to).getTime();
const remainingTo = new Date(data.remaining_date_to).getTime();

const difference =remainingTo- remainingFrom ;
const differenceInDays = Math.floor( difference / (1000 * 60 * 60 * 24));

  const statusMap = {
    1: 'در حال بررسی',
    2: 'در حال اجرا',
    3: 'لغو شده',
    4: 'متوقف شده',
    5: 'تکمیل شده ',
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">خطایی رخ داده است: {error.message}</div>;
  }
  if (!documentationData || !Array.isArray(documentationData) || documentationData.length === 0) {
    return <div>اطلاعاتی موجود نیست</div>;
  }
  if (!appenicesData || !Array.isArray(appenicesData) || appenicesData.length === 0) {
    return <div>اطلاعاتی موجود نیست</div>;
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <div className="relative h-1/2  items-center flex justify-center w-full mb-6  overflow-hidden  group">
        <img
          src={`${OnRun}/${data.picture}`}
          alt={data.plan_name}
          className=" h-1/2 w-1/2 rounded-lg"
        />
      </div>
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">{data.plan_name}</h2>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">اطلاعات طرح:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">نام شرکت</p>
            <p className="text-lg text-gray-900 font-semibold">{data.company_name}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">پیش‌بینی میزان سود</p>
            <p className="text-lg text-green-600 font-bold">{data.profit}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">مبلغ سرمایه‌گذاری</p>
            <p className="text-lg text-indigo-600 font-bold">{data.funded_amount} تومان</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">مدت زمان طرح</p>
          <p className="text-lg text-gray-900 font-semibold">{data.total_time} ماه</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حوزه فعالیت</p>
          <p className="text-lg text-gray-900 font-semibold">{data.activity_field}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نماد</p>
          <p className="text-lg text-gray-900 font-semibold">{data.symbol}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">بازارگردان</p>
          <p className="text-lg text-gray-900 font-semibold">{data.marketer}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">درصد تأمین متقاضی</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.applicant_funding_percentage}%
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">قیمت اسمی هر گواهی</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.nominal_price_certificate} تومان
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">وضعیت اجرای طرح</p>
          <p className="text-lg text-gray-900 font-semibold">
            {statusMap[data.plan_status] || 'وضعیت نامشخص'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">سرمایه موردنیاز طرح</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.funded_amount} تومان
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تعداد سرمایه گذارن</p>
          <p className="text-lg text-gray-900 font-semibold">{data.amount_of_shareholders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حجم سرمایه در دسترس</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.nominal_price_certificate} تومان
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">دوره جمع آوری وجوه </p>
          <p className="text-lg text-gray-900 font-semibold">
           حداکثر {differenceInDays}روز
          </p>
        </div>
        <a
          href={data.farabours_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          مشاهده لینک فرابورس
        </a>
      </div>
      <div>
        مستندات:
        <div className="p-4 bg-white ">
          {documentationData.map((item, index) => (
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
      </div>
      <div>
        تضامین:
        <div className="p-4 ">
          {documentationData.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Descript;
