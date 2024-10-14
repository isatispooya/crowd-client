/* eslint-disable no-nested-ternary */
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import moment from 'moment-jalaali';
import useGetPlan from '../service/use-plan';

const ApplicantCompany = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  const registrationDateShamsi = moment(data?.company[0]?.registration_date, 'YYYY-MM-DD').format(
    'jYYYY/jMM/jDD'
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">اطلاعات شرکت متقاصی</h1>

      <div className="grid grid-cols-2  lg:grid-cols-3 gap-2">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">نام شرکت</h2>
          <p className="text-gray-600">{data.company[0].name}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">نوع شرکت</h2>
          <p className="text-gray-600">{data.company[0].company_type_description}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">شماره ثبت</h2>
          <p className="text-gray-600">{data.company[0].registration_number}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">کدملی</h2>
          <p className="text-gray-600">{data.company[0].national_id}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">کد اقتصادی</h2>
          <p className="text-gray-600">{data.company[0].economic_id}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">تاریخ ثبت</h2>
          <p className="text-gray-600">{registrationDateShamsi}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">کد پستی</h2>
          <p className="text-gray-600">{data.company[0].postal_code}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">تلفن</h2>
          <p className="text-gray-600">{data.company[0].phone_number}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">فکس</h2>
          <p className="text-gray-600">{data.company[0].fax_number}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">نشانی</h2>
          <p className="text-gray-600">
            { data.company[0].address}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-700 mb-2">ایمیل</h2>
          <p className="text-gray-600">{data.company[0].email_address}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCompany;
