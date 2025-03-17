import React from 'react';
import QRCode from 'react-qr-code';
import moment from 'moment';
import { formatNumber } from 'src/utils/formatNumbers';

const Page1 = ({ agencyContract, qrValue }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <h2 className="text-lg font-bold text-center mb-4">قرارداد نمایندگی</h2>
      <div className="text-justify leading-relaxed text-sm">
        <h3 className="font-bold mb-2">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2">1-1. این قرارداد میان:</p>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) طرف اول:</span> شرکت{' '}
          {agencyContract.company?.title || 'تعیین نشده'}(
          {agencyContract.company?.registration_type_title || 'تعیین نشده'}) به شمارۀ شناسۀ ملی{' '}
          {agencyContract.company?.national_id || 'تعیین نشده'}، کد اقتصادی{' '}
          {agencyContract.company?.economic_code || 'تعیین نشده'}، و شماره ثبت{' '}
          {agencyContract.company?.registration_number || 'تعیین نشده'}
          نزد {agencyContract.company?.registration_unit || 'تعیین نشده'}، به نشانی{' '}
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

        <p className="mb-5 text-center font-semibold">به شرح مواد زير منعقد گرديد</p>

        <p className="mb-3">
          ماده 2: مدت قرارداد از تاریخ امضا به مدت یک سال شمسی می‌باشد و در صورت رضایت طرفین قابل
          تمدید است.
        </p>

        <p className="mb-3">
          ماده 3: تعهدات نماینده شامل رعایت استانداردهای شرکت، حفظ اسرار تجاری، عدم همکاری با رقبا و
          تلاش در جهت افزایش فروش می‌باشد.
        </p>

        <p className="mb-3">
          ماده 4: نماینده موظف است مبلغ {formatNumber(agencyContract.warranty_check)} ریال به عنوان
          چک تضمین به شرکت ارائه نماید.
        </p>
      </div>
      <div className="mt-4 flex justify-center">
        <QRCode value={qrValue} size={80} />
      </div>
    </div>
  );
};

export default Page1;
