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

  <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          نام سرمایه گذار
        </th>
        <th scope="col" className="px-6 py-3 hidden sm:table-cell">
          تاریخ ایجاد
        </th>
        <th scope="col" className="px-6 py-3">
          مبلغ واحد
        </th>
        <th scope="col" className="px-6 py-3">
          مجموع مبلغ
        </th>
        <th scope="col" className="px-6 py-3 hidden sm:table-cell">
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
          <td className="px-6 py-4 hidden sm:table-cell">{item.create_date}</td>
          <td className="px-6 py-4">{item.amount}</td>
          <td className="px-6 py-4">{item.value}</td>
          <td className="px-6 py-4 hidden sm:table-cell">{item.status ? 'فعال' : 'غیرفعال'}</td>
          <td className="px-6 py-4">{item.payment_id ? 'پرداخت شده' : 'در انتظار'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default InvestProfile;
