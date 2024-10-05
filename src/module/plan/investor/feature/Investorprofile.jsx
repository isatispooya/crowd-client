import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'jalali-moment';
import useGetInvesor from './service/use-getInvestor';

const InvestProfile = () => {
  const { traceCode } = useParams();
  const { data } = useGetInvesor(traceCode);

  const transactionData = data
    ? data.map((item) => ({
        name: item.name,
        create_date: moment(item.create_date).locale('fa').format('YYYY/MM/DD'),
        amount: item.amount,
        value: item.value,
        status: item.status,
        payment_id: item.payment_id === 'True',
      }))
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">پروفایل سرمایه‌گذاران</h1>

      {/* جدول برای دستگاه‌های بزرگتر */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام سرمایه گذار
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3">
                مبلغ واحد
              </th>
              <th scope="col" className="px-6 py-3">
                مجموع مبلغ
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3">
                پرداخت
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.create_date}</td>
                <td className="px-6 py-4">{item.amount}</td>
                <td className="px-6 py-4">{item.value}</td>
                <td className="px-6 py-4">{item.status ? 'فعال' : 'غیرفعال'}</td>
                <td className="px-6 py-4">{item.payment_id ? 'پرداخت شده' : 'در انتظار'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نمایش کارت برای موبایل */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {transactionData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p>
              <strong>تاریخ ایجاد:</strong> {item.create_date}
            </p>
            <p>
              <strong>مبلغ واحد:</strong> {item.amount}
            </p>
            <p>
              <strong>مجموع مبلغ:</strong> {item.value}
            </p>
            <p>
              <strong>وضعیت:</strong> {item.status ? 'فعال' : 'غیرفعال'}
            </p>
            <p>
              <strong>پرداخت:</strong> {item.payment_id ? 'پرداخت شده' : 'در انتظار'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestProfile;
