import React from 'react';
import { PropTypes } from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import moment from 'moment-jalaali';
import crowdlogo from './crowdlogo.png';

const Page1 = ({ agencyContract }) => {
  if (!agencyContract) return null;
  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1 flex items-center relative">
            <div className="absolute top-0 left-[180px] text-[18px] font-bold text-left mt-4">
              شماره قرارداد: {'  '}1{agencyContract.investor_request?.contract_number || ''}
              <br />
              تاریخ: {'  '}
              {agencyContract.investor_request?.agency_agreement_date
                ? moment(agencyContract.investor_request.agency_agreement_date).format(
                    'jYYYY/jMM/jDD'
                  )
                : ''}
            </div>

            <img src={crowdlogo} alt="company Logo" className="h-32 object-contain mt-4 mb-2" />

            <div className="flex flex-col items-center mx-auto">
              <h3 className="font-bold text-[26px] mb-4">بسمه تعالی</h3>
              <h3 className=" text-[22px]">
                قرارداد عاملیت {agencyContract.company?.title} (
                {agencyContract.company?.registration_type_title || ''})
              </h3>
            </div>

            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-32 mt-4"
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
        <h3 className="font-bold mb-2 text-[23px]">مقدمه</h3>
        <p className="mb-3 pr-4 text-[23px]">
          با استعانت از خداوند متعال، در تاریخ{' '}
          {agencyContract.investor_request?.agency_agreement_date
            ? moment(agencyContract.investor_request.agency_agreement_date).format('jYYYY/jMM/jDD')
            : ''}{' '}
          قرارداد حاضر وفق مواد 10، 190 و 219 قانون مدنی به همراه دیگر اسناد و مدارک منضم به آن که
          مجموعاً قرارداد واحد محسوب می‌گردد، در شهر یزد منعقد می‌گردد. طرفین اظهار و اعلام
          می‌نمایند که هیچ‌گونه محدودیت یا ممنوعیتی جهت امضای این قرارداد نداشته و دارای صلاحیت لازم
          و کمال صحت عقل و اراده شخصی جهت امضای قرارداد هستند و از تاریخ انعقاد، طرفین ملزم و متعهد
          به اجرای مفاد آن می‌باشند. مضافاً نظر به اینکه متقاضی برای انجام امور کسب و کار خود
          نیازمند سرمایه و تأمین مالی است و شرکت ایساتیس پویا از طریق سکوی تأمین مالی جمعی با «مجوز
          تأمین مالی جمعی» از کارگروه ارزیابی تأمین مالی جمعی به آدرس: تهران، خیابان خالد اسلامبولی
          (وزرا)، ابتدای خیابان عماد مغنیه، پلاک 145 (شرکت فرابورس ایران) می‌تواند به متقاضی،
          تأمین‌کننده یا تأمین‌کنندگانی را معرفی نماید و نیز به منظور تشریح حقوق و تعهدات طرفین،
          قرارداد تأمین مالی جمعی حاضر (از این پس قرارداد) در راستای ماده ۱۰ قانون مدنی و دستورالعمل
          تأمین مالی جمعی مصوب ۲۵ اردیبهشت ماه 1397 شورای عالی بورس و اوراق بهادار، در شهر یزد منعقد
          گردید. مضافاً این قرارداد به ضمیمه قرارداد اقدامات اجرایی همچنین قرارداد مرابحه منعقد
          می‌گردد که هر سه عقد در زمان واحد و با اراده واحد منعقد گردیده و غیرقابل انفکاک است.
        </p>
        <h3 className="font-bold mb-2 text-[23px]">ماده 1) مشخصات طرفین قرارداد</h3>
        <p className="mb-2 text-[23px]">1-1. این قرارداد میان:</p>
        <div>
          <p className="mb-3 pr-4 text-[23px]">
            <span className="font-bold text-[23px]">1) طرف اول:</span> شرکت{' '}
            {agencyContract.company?.title || ''} (
            {agencyContract.company?.registration_type_title || ''}) به شمارۀ شناسۀ ملی{' '}
            <strong>{agencyContract.company?.national_id || ''}</strong>، کد اقتصادی{' '}
            <strong>{agencyContract.company?.economic_code || ''}</strong>، و شماره ثبت{' '}
            <strong>{agencyContract.company?.registration_number || ''}</strong> نزد{' '}
            {agencyContract.company?.registration_unit || ''}، به نشانی{' '}
            {agencyContract.company?.address || ''}
            {agencyContract.company?.postal_code
              ? `، کدپستی ${agencyContract.company.postal_code}`
              : ''}{' '}
            {agencyContract.company?.tel ? `، شماره تماس ${agencyContract.company.tel}` : ''}، و با
            نمایندگی{' '}
            {agencyContract.company_members
              ?.filter((member) => member.signature === true)
              .map((member, index, filteredArray) => (
                <React.Fragment key={member.id}>
                  {member.gender === 'True' ? 'آقای' : 'خانم'} {member.person_title} به شماره ملی{' '}
                  {member.uniqueIdentifier}
                  سمت {member.first_role}
                  {member.second_role && ` و ${member.second_role}`}
                  {index < filteredArray.length - 1 ? ' و ' : ''}
                </React.Fragment>
              ))}{' '}
            براساس{' '}
            {
              agencyContract.company_members.filter(
                (member) => member.signature_document !== null
              )[0]?.signature_document
            }{' '}
            در این قرارداد، «متقاضی» نامیده می شود،
          </p>

          <p className="mb-3 pr-4 text-[23px]">
            به استناد{' '}
            {agencyContract.company_members.find((member) => member.signature === true)
              ?.signature_document || ''}{' '}
            نمایندگان مجاز و صاحبان امضای طرف اول قرارداد در خصوص امضا و استنکاب اسناد تعهد آور طرف
            اول اشخاص ذیل می‌باشند:
            <ul className="list-disc pr-8">
              {agencyContract.company_members
                ?.filter((member) => member.signature === true)
                .map((member, index) => (
                  <li key={member.id}>
                    <p>
                      {String.fromCharCode(1575 + index)}) نمايندگان طرف نخست، صاحب امضاى مجاز{' '}
                      {member.gender === 'True' ? 'آقای' : 'خانم'} {member.person_title}، شماره ملى{' '}
                      {member.uniqueIdentifier}، سمت {member.first_role} می‌باشد.
                    </p>
                  </li>
                ))}
            </ul>
          </p>
        </div>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2) طرف دوم:</span> شرکت سبدگردان ایساتیس پویا کیش
          (سهامی خاص) به شناسه ملی 14007805556، کد اقتصادی 411615733645، و شماره ثبت 13702، در اداره
          ثبت شرکت ها و موسسات تجاری استان هرمزگان، به نشانی کیش، میدان امیرکبیر، برج مالی آنا، طبقه
          4 واحد 44 شماره تلفن 076-44480555 و کدپستی 7941757334 و با نمایندگی آقای سید علی محمد
          خبیری به شماره ملی 4431535474 به سمت عضو هیئت مدیره و آقای محسن زارعیان به شماره ملی
          4431855416 به سمت مدیرعامل، صاحبان امضای مجاز بر اساس روزنامه رسمی شماره22670، مورخ
          1401/10/24 که از این پس و در این قرارداد، «عامل» نامیده می شود. به وكالت از طرف دارندگان
          گواهي هاي شراكت جهت تأمين منابع مالي مورد نياز متقاضي، براسـاس مجوز صـادره توسـط شـركت
          فرابورس به نامه شـمارة 0042/ف/1403 مورخ 1403/05/15 از طرف ديگر،
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
          <span className="font-bold text-[23px]">4) موفقیت کمپین:</span>
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

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">9) تأمین مالی جمعی: </span>
          تأمین مالی جمعی، طریقه‌ی تأمین منابع مالی موردنیاز راه‌اندازی یا توسعه یک کسب‌وکار است و
          تأمین‌کننده‌ی منابع، نقش مشارکت‌کننده در طرح را داشته و در سود و زیان، با شرایط مشخص شده
          در طرح شریک است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">10) دستورالعمل: </span>
          منظور دستورالعمل تأمین مالی جمعی مصوب 1397/02/25 شورای عالی بورس و اوراق بهادار به انضمام
          کلیه مصوبات، بخشنامه‌ها، ابلاغیه‌ها، اطّلاعیه‌ها، ضوابط و دستورالعمل‌های اجرایی که متعاقب
          آن توسط نهادهای ذیربط مصوب شده است، می‌باشد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">11) کارگروه ارزیابی: </span>
          کارگروهی که مطابق ماده ۱۴ دستورالعمل تأمین مالی جمعی تشکیل می‌گردد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">12) متقاضی: </span>
          شخص حقوقی است که به منظور تأمین منابع مالی، طبق الزامات دستورالعمل تأمین مالی جمعی و
          مقررات سکوی شرکت ایساتیس پویا به عامل مراجعه می‌کند.
        </p>
      </div>
    </div>
  );
};

Page1.propTypes = {
  agencyContract: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  registration_type_title: PropTypes.string.isRequired,
  national_id: PropTypes.string.isRequired,
  economic_code: PropTypes.string.isRequired,
  registration_number: PropTypes.string.isRequired,
  registration_unit: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Page1;
