import React from 'react';
import { PropTypes } from 'prop-types';

const Page1 = ({ agencyContract, qrValue }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-center mb-4">
        <p className="text-base font-bold text-gray-800">بسمه تعالی</p>
      </div>
      <h2 className="text-lg font-bold text-center mb-4">قرارداد عاملیت</h2>
      <div className="text-justify leading-relaxed text-sm">
        <h3 className="font-bold mb-2">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2">1-1. این قرارداد میان:</p>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) طرف اول:</span> شرکت{' '}
          {agencyContract.company?.title || 'تعیین نشده'}(
          {agencyContract.company?.registration_type_title || 'تعیین نشده'}) به شمارۀ شناسۀ ملی{' '}
          {agencyContract.company?.national_id || 'تعیین نشده'}، کد اقتصادی{' '}
          {agencyContract.company?.economic_code || 'تعیین نشده'}، و شماره ثبت{' '}
          {agencyContract.company?.registration_number || 'تعیین نشده'} نزد{' '}
          {agencyContract.company?.registration_unit || 'تعیین نشده'}، به نشانی{' '}
          {agencyContract.company?.address || 'تعیین نشده'}، کدپستی 1476785514، شماره تماس
          02144611693، و با نمایندگی آقای شهرام صالحی نوع پرور به شماره ملی 0050104861 به سمت رئیس
          هیئت‌مدیره و مدیرعامل بر اساس روزنامه رسمی شماره 23115 مورخ 15/05/1403 که در این قرارداد،
          «متقاضی» نامیده می شود، از یک طرف،
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">2) طرف دوم:</span> شرکت سبدگردان ایساتیس پویا کیش (سهامی خاص)
          به شناسه ملی 14007805556، کد اقتصادی 411615733645، و شماره ثبت 13702، در اداره ثبت شرکت ها
          و موسسات تجاری استان هرمزگان، به نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه 4 واحد 44
          شماره تلفن 076-44480555 و کدپستی 7941757334 و با نمایندگی آقای سید علی محمد خبیری به شماره
          ملی 4431535474 به سمت عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی 4431855416 به سمت
          مدیرعامل، صاحبان امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ 24/10/1401 که از این پس
          و در این قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان گواهي هاي شراكت جهت تأمين
          منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت فرابورس به نامه شـمارة
          1008438/5/03 مورخ 15/05/1403 از طرف ديگر،
        </p>

        <p className="mb-5 text-satrt font-semibold">به شرح مواد زير منعقد گرديد</p>

        <h3 className="font-bold mb-2">ماده 2) تعاریف</h3>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) طرح:</span>
          فعالیتی‌ است‌ که‌ متقاضی‌ براي انجام آن در خواست‌ تأمین‌ مالی‌ نموده است‌.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">2) گواهی شراکت:</span>
          ورقه‌ بهادار الکترونیکی‌ است‌ که‌ از ثبت‌ نزد سازمان بورس معاف است‌.
        </p>

        {/* <p className="mb-3 pr-4">
          <span className="font-bold">3)فراخوان جمع آوری وجه:</span>
          منظور فرایندي است‌ که‌ ”عامل‌“ نسبت‌ به‌ تأمین‌ مالی‌ طرح در یک‌ بازه زمانی‌ مشخص‌ اقدام
          می‌نماید. مدت زمان مذکور با صلاحدید عامل‌ می‌تواند تمدید گردد.
        </p> */}

        {/* <p className="mb-3 pr-4">
          <span className="font-bold">4) موقعیت کمپین:</span>
          منظور تأمین‌ مالی‌ طرح به‌ میزان حداقل‌ مبلغ‌ تأمین‌ مالی‌ قابل‌ پذیرش که‌ در فراخوان
          جمع‌آوري وجوه اعلام شده است‌.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">5) دارندگان گواهی‌هاي شراکت‌:</span>
          شخص‌ حقیقی‌ یا حقوقی‌ تأمین‌کننده منابع‌ مالی‌ متقاضی‌ براي اجراي طرح است‌، که‌ نسبت‌ به‌
          خرید گواهی‌هاي شراکت‌ اقدام نموده است.{' '}
        </p> */}

        {/* <p className="mb-3 pr-4">
          <span className="font-bold">5) روز کاري: </span>
          تمام روزهاي هفته‌ به‌ غیر از پنج‌شنبه‌، جمعه‌، تعطیلات رسمی‌ و روزهایی‌ که‌ به‌ هر دلیلی‌ بانک‌ها تعطیل‌ می‌باشند، روز کاري محسوب می‌گردد.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">5) روز کاري: </span>
          تمام روزهاي هفته‌ به‌ غیر از پنج‌شنبه‌، جمعه‌، تعطیلات رسمی‌ و روزهایی‌ که‌ به‌ هر دلیلی‌ بانک‌ها تعطیل‌ می‌باشند، روز کاري محسوب می‌گردد.
        </p> */}
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
