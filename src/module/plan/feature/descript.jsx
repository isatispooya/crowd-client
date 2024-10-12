/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import Loader from 'src/components/loader';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import ProgressLineChart from 'src/components/progressLine';
import PercentageCollected from 'src/utils/percentCollected';
import useGetPlan from '../service/use-plan';
import usePicure from '../service/use-picture';

const Field = ({ label, value, bold }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <p className="text-gray-500">{label}</p>
    <p className={`text-lg text-gray-900 ${bold ? 'font-semibold' : ''}`}>{value}</p>
  </div>
);

const Descript = () => {
  const { traceCode } = useParams();
  const { data, isPending, error } = useGetPlan(traceCode);

  const { data: picture, isLoading: loadingpicture } = usePicure(traceCode);
  console.log('s', Math.round((data?.information_complete?.amount_collected_now / data?.plan?.total_price)*100));
  console.log('s',data?.plan?.total_price);
  

  if (isPending || loadingpicture || !data) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">خطایی رخ داده است: {error.message}</div>;
  }

  const generalFields = [
    { label: 'نماد (فارسی)', value: data.plan.persoan_approved_symbol || 'نامشخص' },
    { label: 'نام شرکت', value: data.company[0].name },
    { label: 'سود', value: `%${data.information_complete.rate_of_return / 100 || 'نامشخص'}` },
    { label: 'عنوان گروه صنعت', value: data.plan.industry_group_description },
    { label: 'عنوان زیر گروه صنعت', value: data.plan.sub_industry_group_description },
    {
      label: 'قیمت اسمی هر گواهی شراکت (ریال)',
      value: `${formatNumber(data.plan.unit_price)} ریال`,
    },
    { label: 'تعداد کل گواهی‌های شراکت قابل عرضه', value: formatNumber(data.plan.total_units) },
    { label: 'تعداد گواهی شراکت متقاضی', value: formatNumber(data.plan.company_unit_counts) },
    { label: 'عنوان نوع تامین مالی', value: data.plan.crowd_funding_type_description },
    {
      label: 'تاریخ شروع جمع آوری وجوه',
      value: data.plan.persian_suggested_underwiring_start_date,
    },
    {
      label: 'تاریخ پایان جمع آوری وجوه',
      value: data.plan.persian_suggested_underwriting_end_date,
    },
    { label: 'تاریخ شروع اجرای طرح', value: data.plan.persian_project_start_date },
    { label: 'تاریخ پایان اجرای طرح', value: data.plan.persian_project_end_date },
    { label: 'وضعیت پروژه', value: data.plan.project_status_description },
    { label: 'مبلغ مورد نیاز (ریال)', value: `${formatNumber(data.plan.total_price)} ریال` },

    {
      label: 'حداقل مبلغ مورد نیاز جهت موفقیت تامین مالی (ریال)',
      value: `${formatNumber(data.plan.minimum_required_price) || 0} ریال`,
    },
  ];

  const Real = [
    {
      label: 'حداقل مبلغ سرمایه‌گذاری برای تامین کننده حقیقی (ریال)',
      value: `${formatNumber(data.plan.real_person_minimum_availabe_price) || 0} ریال`,
    },
    {
      label: 'حداکثر مبلغ سرمایه‌گذاری برای تامین کننده حقیقی (ریال)',
      value: `${formatNumber(data.plan.real_person_maximum_available_price) || 0} ریال`,
    },
  ];

  const Legal = [
    {
      label: 'حداقل مبلغ سرمایه‌گذاری برای تامین کننده حقوقی (ریال)',
      value: `${formatNumber(data.plan.legal_person_minimum_availabe_price) || 0} ریال`,
    },
    {
      label: 'حداکثر مبلغ سرمایه‌گذاری برای تامین کننده حقوقی (ریال)',
      value: `${formatNumber(data.plan.legal_person_maximum_availabe_price ?? 0)} ریال`,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
      <div className="text-center font-bold mb-4 text-xl">
        <h>{data.plan.persian_name}</h>
      </div>
      <div className="bg-gray-100 w-full mb-8 p-4 rounded-lg shadow-md">
        {picture && picture.picture ? (
          <img
            src={`${OnRun}/${picture.picture}`}
            alt="تصویر پروژه"
            className="w-full h-48 rounded-lg mb-4 object-cover"
          />
        ) : (
          <img
            src="/public/img/nopic.jpg"
            alt="تصویر موجود نیست"
            className="w-full h-48 rounded-lg mb-4 object-cover"
          />
        )}
      </div>
      <div>
        <a
          href="https://cf.ifb.ir/home/viewproject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700 flex items-center"
        >
          مشاهده در فرابورس
        </a>
      </div>
      <div className="w-full mb-8 p-4">
        <p className="text-gray-500">توضیحات</p>
        <p className="text-base text-gray-700 font-medium break-words whitespace-normal">
          {data.plan.persian_subject}
        </p>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {generalFields.map((field, index) => (
          <Field key={index} label={field.label} value={field.value} />
        ))}
      </div>
      <div>
      <ProgressLineChart progress={<percentageCollected/>} />
    </div>
       <PercentageCollected/>
      <div className="flex p-6 gap-12">
        <div className="flex-1">
          <h3 className="text-gray-700 font-bold mb-4 text-lg">سرمایه‌گذاری حقیقی</h3>
          <div className="grid grid-cols-1 gap-6 mb-8">
            {Real.map((field, index) => (
              <Field key={index} label={field.label} value={field.value} bold />
            ))}
          </div>
        </div>

        <div className="h-auto" />

        <div className="flex-1">
          <h3 className="text-gray-700 font-bold mb-4 text-lg">سرمایه‌گذاری حقوقی</h3>
          <div className="grid grid-cols-1 gap-6">
            {Legal.map((field, index) => (
              <Field key={index} label={field.label} value={field.value} bold />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Field.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  bold: PropTypes.bool,
};

export default Descript;
