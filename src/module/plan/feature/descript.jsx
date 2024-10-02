import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { formatNumber } from 'src/utils/formatNumbers';
import useGetPlan from '../service/use-plan';
import useGetInformation from '../service/use-getinformtion';

const Descript = () => {
  const { traceCode } = useParams();
  const { data, isPending, error } = useGetPlan(traceCode);
  const { data: addinformtion, isLoading: addloading } = useGetInformation(traceCode);
  if (isPending || addloading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      {/* <div className="relative h-1/2  items-center flex justify-center w-full mb-6  overflow-hidden  group">
        <img
          src={`${OnRun}/${data?.picture}`}
          alt={data?.persian_name}
          className="h-1/2 w-1/2 rounded-lg"
        />
        
      </div> */}
      <div className="bg-gray-100 w-full mb-8 p-4 rounded-lg shadow-md">
        <p className="text-gray-500">توضیحات</p>
        <p className="text-lg text-gray-900 font-semibold break-words whitespace-normal">
          {data.persian_subject}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نام فارسی</p>
          <p className="text-lg text-gray-900 font-semibold">{data.persian_name}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نماد </p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.persoan_approved_symbol || 'نامشخص'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نام انگلیسی</p>
          <p className="text-lg text-gray-900 font-semibold">{data.english_name}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">نماد </p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.english_approved_symbol || 'نامشخص'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">سود </p>
          <p className="text-lg text-gray-900 font-semibold">
            %{addinformtion.rate_of_return || 'نامشخص'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">عنوان گروه صنعت</p>
          <p className="text-lg text-gray-900 font-semibold">{data.industry_group_description}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">عنوان زیر گروه صنعت</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.sub_industry_group_description}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">قیمت اسمی هر گواهی شراکت (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.unit_price)} ریال
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تعداد کل گواهی‌های شراکت قابل عرضه</p>
          <p className="text-lg text-gray-900 font-semibold">{formatNumber(data.total_units)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تعداد گواهی شراکت متقاضی</p>
          <p className="text-lg text-gray-900 font-semibold">{formatNumber(data.company_unit_counts)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">مبلغ مورد نیاز (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.total_price)} ریال
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">عنوان نوع تامین مالی</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.crowd_funding_type_description}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حداقل مبلغ مورد نیاز جهت موفقیت تامین مالی (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.minimum_required_price)} ریال
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حداقل مبلغ سرمایه‌گذاری برای تامین کننده حقیقی (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.real_person_minimum_availabe_price)} ریال
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حداکثر مبلغ سرمایه‌گذاری برای تامین کننده حقیقی (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.real_person_maximum_available_price)} ریال
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حداقل مبلغ سرمایه‌گذاری برای تامین کننده حقوقی (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.legal_person_minimum_availabe_price) || 0} ریال
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">حداکثر مبلغ سرمایه‌گذاری برای تامین کننده حقوقی (ریال)</p>
          <p className="text-lg text-gray-900 font-semibold">
            {formatNumber(data.legal_person_maximum_availabe_price) || 'نامشخص'}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تاریخ شروع جمع آوری وجوه</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.persian_suggested_underwiring_start_date}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تاریخ پایان جمع آوری وجوه</p>
          <p className="text-lg text-gray-900 font-semibold">
            {data.persian_suggested_underwriting_end_date}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تاریخ شروع اجرای طرح</p>
          <p className="text-lg text-gray-900 font-semibold">{data.persian_project_start_date}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">تاریخ پایان اجرای طرح</p>
          <p className="text-lg text-gray-900 font-semibold">{data.persian_project_end_date}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-500">وضعیت پروژه</p>
          <p className="text-lg text-gray-900 font-semibold">{data.project_status_description}</p>
        </div>
      </div>
    </div>
  );
};

export default Descript;
