import React from 'react';
import { PropTypes } from 'prop-types';

const Page1 = ({ agencyContract, qrValue }) => {
  if (!agencyContract) return null;
  console.log(agencyContract);

  return (
    <div className="contract-page page-1">
      <div className="text-center mb-4">
        <p className="text-[10px] font-bold text-gray-800">بسمه تعالی</p>
      </div>
      <h2 className="text-[10px] font-bold text-center mb-4">قرارداد عاملیت</h2>
      <div className="text-justify leading-relaxed text-[10px]">
        <h3 className="font-bold mb-2 text-[10px]">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2 text-[10px]">1-1. این قرارداد میان:</p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">1) طرف اول:</span> شرکت{' '}
          {agencyContract.company?.title || 'تعیین نشده'}(
          {agencyContract.company?.registration_type_title || 'تعیین نشده'}) به شمارۀ شناسۀ ملی{' '}
          {agencyContract.company?.national_id || 'تعیین نشده'}، کد اقتصادی{' '}
          {agencyContract.company?.economic_code || 'تعیین نشده'}، و شماره ثبت{' '}
          {agencyContract.company?.registration_number || 'تعیین نشده'} نزد{' '}
          {agencyContract.company?.registration_unit || 'تعیین نشده'}، به نشانی{' '}
          {agencyContract.company?.address || 'تعیین نشده'}، کدپستی{' '}
          {agencyContract.company?.postal_code || 'تعیین نشده'}، شماره تماس{' '}
          {agencyContract.company?.tel || 'تعیین نشده'}، و با نمایندگی{' '}
          {agencyContract.company_members
            ?.filter((member) => member.signature === true)
            .map((member, index, filteredArray) => (
              <React.Fragment key={member.id}>
                {member.gender === 'True' ? 'آقای' : 'خانم'} {member.person_title} به شماره ملی{' '}
                {member.uniqueIdentifier}
                {member.signature_document && ` و شماره سند امضا ${member.signature_document}`} به
                سمت {member.first_role}
                {member.second_role && ` و ${member.second_role}`}
                {index < filteredArray.length - 1 ? ' و ' : ''}
              </React.Fragment>
            ))}{' '}
          بر اساس روزنامه رسمی شماره {agencyContract.company_members[0]?.by_news_id} مورخ{' '}
          {new Date(agencyContract.company_members[0]?.start_date).toLocaleDateString('fa-IR')} که
          در این قرارداد، «متقاضی» نامیده می شود، از یک طرف،
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">2) طرف دوم:</span> شرکت سبدگردان ایساتیس پویا کیش
          (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی 411615733645، و شماره ثبت 13702، در اداره
          ثبت شرکت ها و موسسات تجاری استان هرمزگان، به نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه
          4 واحد 44 شماره تلفن 076-44480555 و کدپستی 7941757334 و با نمایندگی آقای سید علی محمد
          خبیری به شماره ملی 4431535474 به سمت عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی
          4431855416 به سمت مدیرعامل، صاحبان امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ
          1401/10/24 که از این پس و در این قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان
          گواهي هاي شراكت جهت تأمين منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت
          فرابورس به نامه شـمارة 03/5/1008438 مورخ 15/05/1403 از طرف ديگر،
        </p>

        <p className="mb-5 text-satrt font-semibold text-[10px]">به شرح مواد زير منعقد گرديد</p>

        <h3 className="font-bold mb-2 text-[10px]">ماده 2) تعاریف</h3>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">1) طرح:</span>
          فعالیتی‌ است‌ که‌ متقاضی‌ براي انجام آن در خواست‌ تأمین‌ مالی‌ نموده است‌.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">2) گواهی شراکت:</span>
          ورقه‌ بهادار الکترونیکی‌ است‌ که‌ از ثبت‌ نزد سازمان بورس معاف است‌.
        </p>
      </div>
    </div>
  );
};

Page1.propTypes = {
  agencyContract: PropTypes.object.isRequired,
  qrValue: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  registration_type_title: PropTypes.string.isRequired,
  national_id: PropTypes.string.isRequired,
  economic_code: PropTypes.string.isRequired,
  registration_number: PropTypes.string.isRequired,
  registration_unit: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Page1;
