import React from 'react';
import { PropTypes } from 'prop-types';

const Page7 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[10px]">
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">2)</span>
          متقاضي متعهد است در زمان امضاي قرارداد كليه مدارك لازم جهت تهيه گزارشات لازم كه توسط عامل
          تعيين ميشود، ظرف سه روز از تاريخ اعلامي تحويل عامل دهد.
        </p>
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">3)</span>
          اخذ مجوز انتشار گواهي هاي شراكت از شركت فرابورس ايران منوط به ارائه كد بورسي و احراز هويت
          سجامي متقاضي مي باشد. در صورت عدم ارايه موارد فوق توسط متقاضي به عامل، عامل مخير به فسخ
          قرارداد است و متقاضي متعهد به اجراي بند ٢-١ مادة ٩ اين قرارداد ميباشد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">4)</span>
          متقاضي متعهد است هرگونه تغيير در اطلاعات و مفروضات ارائه شده را حداكثر طي مدت ٣ روز به
          عامل ارائه دهد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">5)</span>
          متقاضي متعهد است گزارشهاي ارائه شده توسط عامل را مطالعه و بررسي نموده و نسبت به تأييد و
          امضاي گزارش حداكثر طي 3 روز از زمان ارائه گزارش ها، اقدام نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">6)</span>
          متقاضي متعهد است همكاري لازم با عامل را در راستاي تسريع امور مربوط به موضوع قرارداد، به
          عمل آورد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">7)</span>
          متقاضي متعهد است اقدامات لازم را جهت بازديد كارشناس يا كارشناسان معرفي شده توسط عامل از
          محل متقاضي يا مكان اجراي عمليات وي و يا برگزاري جلسات ضروري با مديران متقاضي به عمل آورد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">8)</span>
          متقاضي متعهد به عدم استفاده از گزارش هاي ارائه شده توسط عامل در مواردي غير از موضوع اين
          قرارداد است.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">9)</span>
          متقاضي اقرار مينمايد تمام ديون حال و موجل خود را اعلام نموده است و تكاليف مالياتي و بيمه
          تامين اجتماعي خود را رعايت نموده است تعهد مي نمايد كه رعايت نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">10)</span>
          متقاضي تأييد و اقرار مي نمايد تمامي مجوزهاي لازم را جهت اجراي طرحي كه بابت آن به عامل
          درخواست تأمين مالي ارائه شده است، اخذ نموده است.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">11)</span>
          متقاضي تضمين مي نمايد كه مسئوليت كليه ضررها، خسارات و هزينه هاي متحمل شده در نتيجه يا در
          رابطه با عدم صحت اظهارات و ضمانت هاي مقرر در اين قرارداد را، جبران نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">12)</span>
          متقاضي تأييد و تعهد ميكند كه اطلاعات ارائه شده از سوي متقاضي، افشاي درست و كاملي از كليه
          واقعيات مربوط به انتشار جهت تأمين مالي طرح را به دست ميدهد. هرگونه اهمال در اين خصوص كه
          باعث به خطا رفتن پروژه يا وارد آمدن خسارت به عامل به نمايندگي از دارندگان گواهي شراكت
          گردد، بر عهده متقاضي بوده و وي مسئول تمامي خسارتهاي ناشي از اين موضوع است.{' '}
        </p>
      </div>
    </div>
  );
};

Page7.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page7;
