import React from 'react';
import { PropTypes } from 'prop-types';
import { OnRun } from 'src/api/OnRun';

const Page1 = ({ agencyContract, qrValue }) => {
  if (!agencyContract) return null;
  console.log(agencyContract);

  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1 flex items-center">
            <h3 className="font-bold text-[26px] mx-auto">بسم تعالی </h3>
            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-20 object-contain mt-4"
            />
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="contract-page page-1">
      {renderHeaderContent()}

      <div className="text-justify leading-relaxed text-[23px]">
        <h3 className="font-bold mb-2 text-[23px]">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2 text-[23px]">1-1. این قرارداد میان:</p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1) طرف اول:</span> شرکت{' '}
          {agencyContract.company?.title || 'تعیین نشده'}(
          {agencyContract.company?.registration_type_title || 'تعیین نشده'}) به شمارۀ شناسۀ ملی{' '}
          <strong>{agencyContract.company?.national_id || 'تعیین نشده'}</strong>، کد اقتصادی{' '}
          <strong>{agencyContract.company?.economic_code || 'تعیین نشده'}</strong>، و شماره ثبت{' '}
          <strong>{agencyContract.company?.registration_number || 'تعیین نشده'}</strong> نزد{' '}
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
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) طرف دوم:</span> شرکت سبدگردان ایساتیس پویا کیش
          (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی 411615733645، و شماره ثبت 13702، در اداره
          ثبت شرکت ها و موسسات تجاری استان هرمزگان، به نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه
          4 واحد 44 شماره تلفن 076-44480555 و کدپستی 7941757334 و با نمایندگی آقای سید علی محمد
          خبیری به شماره ملی 4431535474 به سمت عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی
          4431855416 به سمت مدیرعامل، صاحبان امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ
          1401/10/24 که از این پس و در این قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان
          گواهي هاي شراكت جهت تأمين منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت
          فرابورس به نامه شـمارة 03/5/1008438 مورخ 15/05/1403 از طرف ديگر،
        </p>
        <p className="mb-5 text-satrt font-semibold text-[23px]">به شرح مواد زير منعقد گرديد</p>
        <h3 className="font-bold mb-2 text-[23px]">ماده 2) تعاریف</h3>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1) طرح:</span>
          فعالیتی‌ است‌ که‌ متقاضی‌ براي انجام آن در خواست‌ تأمین‌ مالی‌ نموده است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) گواهی شراکت:</span>
          ورقه‌ بهادار الکترونیکی‌ است‌ که‌ از ثبت‌ نزد سازمان بورس معاف است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">3)فراخوان جمع آوری وجوه:</span>
          منظور فرایندي است‌ که‌ &apos;عامل&apos; نسبت‌ به‌ تأمین‌ مالی‌ طرح در یک‌ بازه زمانی‌
          مشخص‌ اقدام می‌نماید. مدت زمان مذکور با صلاحدید عامل‌ می‌تواند تمدید گردد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">4) موقعیت کمپین:</span>
          منظور تأمین‌ مالی‌ طرح به‌ میزان حداقل‌ مبلغ‌ تأمین‌ مالی‌ قابل‌ پذیرش که‌ در فراخوان
          جمع‌آوري وجوه اعلام شده است‌.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">5) دارندگان گواهی‌هاي شراکت‌:</span>
          شخص‌ حقیقی‌ یا حقوقی‌ تأمین‌کننده منابع‌ مالی‌ متقاضی‌ براي اجراي طرح است‌، که‌ نسبت‌ به‌
          خرید گواهی‌هاي شراکت‌ اقدام نموده است.{' '}
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">6) روز کاري: </span>
          تمام روزهاي هفته‌ به‌ غیر از پنج‌شنبه‌، جمعه‌، تعطیلات رسمی‌ و روزهایی‌ که‌ به‌ هر دلیلی‌
          بانک‌ها تعطیل‌ می‌باشند، روز کاري محسوب می‌گردد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">7) قرارداد اقدامات اجرایی‌: </span>
          قراردادي که‌ در صورت موفقیت‌ کمپین‌، به‌ طرح موضوع قرارداد، مواعد و مبالغ‌ چک‌هاي اقساط و
          چک‌هاي تضمین‌ و ... می‌پردازد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">8) تأمین‌ مالی‌ شناور: </span>
          در مدل تأمین‌ مالی‌ شناور، در صورت جمع‌آوري وجوه به‌ میزان درصد مشخصی‌ از مبلغ‌ کل‌ تأمین‌
          مالی‌، کمپین‌ موفق‌ خواهد شد.{' '}
        </p>

        <h3 className="font-bold mb-2 text-[23px]">ماده 3)موضوع فعالیت </h3>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1) </span>
          ارائه‌ خدمات مشاوره تأمین‌ مالی‌ به‌ متقاضی‌ از طریق‌ طراحی‌ شیوة تأمین‌ مالی‌ و تهیه‌
          گزارش مورد نیاز جهت‌ انتشار گواهی‌هاي شراکت‌ تأمین‌ مالی‌ جمعی‌ توسط‌ عامل برای طرح
          {agencyContract?.investor_request?.suggestion_plan_name}
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) </span>
          در مدل تأمین‌ مالی‌ شناور، در صورت جمع‌آوري وجوه به‌ میزان درصد مشخصی‌ از مبلغ‌ کل‌ تأمین‌
          مالی‌، کمپین‌ موفق‌ خواهد شد.{' '}
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">3) </span>
          ارائه‌ خدمات عاملیت‌ و انجام مراحل‌ قانونی‌ اخذ مجوزهاي لازم از شرکت‌ فرابورس ایران جهت‌
          انتشار گواهی‌هاي شراکت‌ تأمین‌ مالی‌ جمعی‌ مطابق‌ با شرایط‌ مندرج در جدول ماده ٥ این‌
          قرارداد. به میزان{' '}
          <strong>
            {(agencyContract?.investor_request?.amount_of_investment || 0 / 1000).toLocaleString()}{' '}
            گواهی شراکت.
          </strong>
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">ماده 4(کارمزد موضوع قرارداد)</span>
          ارائۀ خدمات بازارسازی به متقاضی از طریق طراحی و برنامه‌ریزی کمپین‌های تبلیغاتی به منظور
          فروش گواهی‌های شراکت به اشخاص حقیقی و حقوقی
        </p>

        <p className="mb-2">
          كارمزد ارائة خدمات موضوع ماده ٣ ( موضوعات 1و2و3) اين قرارداد توسط عامل، جمعا{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.design_wage / 1000000 || 0) +
              Number(agencyContract.investor_request.company_certificate_wage / 1000000 || 0) +
              Number(agencyContract.investor_request.execution_wage / 1000000 || 0)
            ).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          و علاوه بر آن كارمزد شركت فرابورس{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          مي باشد و همچنین کارمزد موضوع 4 ماده 3 این قرارداد{' '}
          <strong>
            {Number(agencyContract.investor_request.execution_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          كه به تفكيك زير، توسط متقاضي در وجه عامل و شركت فرابورس ايران پرداخت ميگردد:
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) </span>
          كارمزد طراحي شيوه تأمين مالي و تهيه گزارش توجيهي، جهت انتشار و فروش گواهي شراكت،{' '}
          <strong>
            {Number(agencyContract.investor_request.design_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          كه متقاضي متعهد است همزمان با امضاي قرارداد، در قالب نقدي در وجه عامل به حساب شماره
          3002.115.15884588.1 و شماره شبا 4705703002115158845881 به نام شركت سبدگردان ایساتیس پویا
          کیش واريز نمايد IR.
        </p>
        <p className="mb-3 pr-4">
          <span className="font-bold">:تبصره1</span>
          در صورت عدم واريز كارمزد بند 4-1 اين ماده حداكثر طي 10 روز كاري از تاريخ اين قرارداد، عامل
          تعهدي نسبت به انجام موضوع قرارداد نداشته و مخير به فسخ قرارداد ميباشد و متقاضي متعهد به
          اجراي بند ١-١ مادة ٩ اين قرارداد ميباشد.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">2)</span> كارمزد ارائه خدمات بازاريابي به متقاضي،{' '}
          {Number(agencyContract.investor_request.marketing_wage / 1000000 || 0).toLocaleString()}{' '}
          ميليون ريال ميباشد كه در صورت موفقيت كمپين، حداكثر طي يك روز كاري پيش از واريز وجوه تأمين
          شده به حساب متقاضي، از متقاضي به صورت نقدي/ چك در وجه حساب معرفي شده در بند 4-١- اين ماده
          دريافت خواهد شد.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">3)</span> كارمزد انتشار و فروش گواهي شراكت، جمعاً{' '}
          {agencyContract.investor_request.company_certificate_wage} میلیون ريال ميباشد. متقاضي
          متعهد است در صورت موفقيت كمپين، حداكثر يك روز كاري پيش از واريز وجوه جمع آوري شده به حساب
          وي، كارمزد جمع آوري شده به حساب وي، كارمزد اين بند را به صورت نقدي/ چك به حساب معرفي شده
          در بند 4-١- اين ماده واريز نمايد
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
