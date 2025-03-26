import React from 'react';
import { PropTypes } from 'prop-types';

const Page2 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[10px]">
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">3)فراخوان جمع آوری وجوه:</span>
          منظور فرایندي است‌ که‌ &apos;عامل&apos; نسبت‌ به‌ تأمین‌ مالی‌ طرح در یک‌ بازه زمانی‌
          مشخص‌ اقدام می‌نماید. مدت زمان مذکور با صلاحدید عامل‌ می‌تواند تمدید گردد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">4) موقعیت کمپین:</span>
          منظور تأمین‌ مالی‌ طرح به‌ میزان حداقل‌ مبلغ‌ تأمین‌ مالی‌ قابل‌ پذیرش که‌ در فراخوان
          جمع‌آوري وجوه اعلام شده است‌.
        </p>
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">5) دارندگان گواهی‌هاي شراکت‌:</span>
          شخص‌ حقیقی‌ یا حقوقی‌ تأمین‌کننده منابع‌ مالی‌ متقاضی‌ براي اجراي طرح است‌، که‌ نسبت‌ به‌
          خرید گواهی‌هاي شراکت‌ اقدام نموده است.{' '}
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">6) روز کاري: </span>
          تمام روزهاي هفته‌ به‌ غیر از پنج‌شنبه‌، جمعه‌، تعطیلات رسمی‌ و روزهایی‌ که‌ به‌ هر دلیلی‌
          بانک‌ها تعطیل‌ می‌باشند، روز کاري محسوب می‌گردد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">7) قرارداد اقدامات اجرایی‌: </span>
          قراردادي که‌ در صورت موفقیت‌ کمپین‌، به‌ طرح موضوع قرارداد، مواعد و مبالغ‌ چک‌هاي اقساط و
          چک‌هاي تضمین‌ و ... می‌پردازد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">8) تأمین‌ مالی‌ شناور: </span>
          در مدل تأمین‌ مالی‌ شناور، در صورت جمع‌آوري وجوه به‌ میزان درصد مشخصی‌ از مبلغ‌ کل‌ تأمین‌
          مالی‌، کمپین‌ موفق‌ خواهد شد.{' '}
        </p>

        <h3 className="font-bold mb-2 text-[10px]">ماده 3)موضوع فعالیت </h3>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">1) </span>
          ارائه‌ خدمات مشاوره تأمین‌ مالی‌ به‌ متقاضی‌ از طریق‌ طراحی‌ شیوة تأمین‌ مالی‌ و تهیه‌
          گزارش مورد نیاز جهت‌ انتشار گواهی‌هاي شراکت‌ تأمین‌ مالی‌ جمعی‌ توسط‌ عامل برای طرح
          {agencyContract?.investor_request?.suggestion_plan_name}
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">2) </span>
          در مدل تأمین‌ مالی‌ شناور، در صورت جمع‌آوري وجوه به‌ میزان درصد مشخصی‌ از مبلغ‌ کل‌ تأمین‌
          مالی‌، کمپین‌ موفق‌ خواهد شد.{' '}
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">3) </span>
          ارائه‌ خدمات عاملیت‌ و انجام مراحل‌ قانونی‌ اخذ مجوزهاي لازم از شرکت‌ فرابورس ایران جهت‌
          انتشار گواهی‌هاي شراکت‌ تأمین‌ مالی‌ جمعی‌ مطابق‌ با شرایط‌ مندرج در جدول ماده ٥ این‌
          قرارداد. به میزان{' '}
          {(agencyContract?.investor_request?.amount_of_investment || 0 / 1000).toLocaleString()}
          گواهی شراکت.
        </p>
      </div>
    </div>
  );
};

Page2.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page2;
