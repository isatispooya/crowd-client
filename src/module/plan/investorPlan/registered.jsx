import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import useGetPlan from '../service/use-plan';

const Registere = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const boardMembers = data?.board_member || [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">پروفایل اعضای هیئت مدیره</h1>

      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام
            </th>
            <th scope="col" className="px-6 py-3 hidden sm:table-cell">
              نام خانوادگی
            </th>
            <th scope="col" className="px-6 py-3">
              نام شرکت
            </th>
            <th scope="col" className="px-6 py-3">
              کدملی
            </th>
            <th scope="col" className="px-6 py-3">
              نماینده
            </th>
            <th scope="col" className="px-6 py-3 hidden sm:table-cell">
              سمت
            </th>
            <th scope="col" className="px-6 py-3">
              شماره موبایل
            </th>
            <th scope="col" className="px-6 py-3">
              ایمیل
            </th>
          
          </tr>
        </thead>
        <tbody>
          {boardMembers.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{item.first_name}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{item.last_name}</td>
              <td className="px-6 py-4">{item.company_name}</td>
              <td className="px-6 py-4">{item.national_id}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{item.is_agent_from_company ? 'نماینده شرکت' : 'شخصی'}</td>
              <td className="px-6 py-4">{item.organization_post_description}</td>
              <td className="px-6 py-4">{item.mobile_number}</td>
              <td className="px-6 py-4">{item.email_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registere;
