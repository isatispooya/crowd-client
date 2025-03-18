import React from 'react';
import { PropTypes } from 'prop-types';

const Page5 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-sm">
        <table className="table-auto w-full text-center border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300">ردیف</th>
              <th className="border border-gray-300">شرایط</th>
              <th className="border border-gray-300">توضیحات</th>
            </tr>
          </thead>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">8</td>
              <td className="border border-gray-300">ضامن </td>
              <td className="border border-gray-300">
                ضامن معرفی شده توسط متقاضی که که در قرارداد اقدامات اجرایی تعیین می شود.{' '}
              </td>
            </tr>
          </tbody>

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">9</td>
              <td className="border border-gray-300">تضامین مورد نیاز </td>
              <td className="border border-gray-300">
                متقاضي متعهد است یک فقره ضمانت نامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به
                میزان{' '}
                {Number(agencyContract.investor_request.amount_of_investment || 0).toLocaleString()}{' '}
                میلیون ریال را با اعتبار {agencyContract.investor_request.duration_of_plan}و قابلیت
                تمدید توسط عامل و با قابلیت دریافت وجه ضمانت نامه بدون قید و شرط در هر زمان به محض
                تقاضای عامل (عندالمطالبه)، که مورد تائید واحد حقوقی و واحد مالی عامل باشد، ارائه
                نماید، همچنین متقاضی متعهد است {agencyContract.investor_request.guarantor_count}{' '}
                فقره چک ضمانت صیادی طرح جدید را جمعاً به مبلغ{' '}
                {Number(agencyContract.warranty_check || 0).toLocaleString()}
                میلیون ریال (یک فقره چک به میزان اصل مبلغ تأمین مالی و یک فقره چک به میزان یک فرع از
                اقساط مبلغ تأمین مالی) از ضامن دریافت و حداکثر یک روز کاری پس از موفقیت کمپین و جمع
                آوری وجوه به عامل تحویل نماید.
                <br /> تبصره 8 : متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های
                شراکت از شرکت فرابورس ایران، حداکثر طی 5 روز کاری نسبت به ارائه ضمانت نامه تعهد
                پرداخت اقدام نماید. در صورت عدم ارائه ضمانت نامه در موعد مقرر به عامل، عامل مخیر به
                فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این قرارداد می باشد.
                <br /> تبصره 9 : کلیه هزینه های صدور، تمدید، اصلاح یا ابطال ضمانت نامه تعهد پرداخت
                بر عهده همتقاضی است. است.
                <br /> تبصره 10: در صورت عدم تحويل چك هاي تضمين در مواعد مقرر شده يا در صورت عدم ثبت
                چكهاي تضمين در سامانه چك صيادي، و نیز عدم ظهرنویسی آن توسط صاحبین امضای مجاز، عامل
                مخير به فسخ قرارداد است و مقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br /> تبصره 11: متقاضي متعهد است چك هاي تضمين را بدون درج عبارت «بابت ضمانت» روي چك
                تضمين و درج عبارت « تأديه ديون» در شرح سامانه چك صيادي يا عدم تكميل قسمت شرح چك در
                سامانه چك صياد و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ قرارداد است و
                متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد. تبصره 12: متقاضي ميتواند در
                صورت نياز هنگام تحويل چك تضمين و چك هاي پرداخت اقساط از عامل رسيد موقت دريافت اسناد
                ياد شده را درخواست نمايد، اما رسيد موقت صرفاً به معناي تحويل اسناد يادشده توسط
                متقاضي است و به هيچ وجه به منزلة صحت اسناد ياد شده نيست.
              </td>
            </tr>
          </tbody>

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">10</td>
              <td className="border border-gray-300">مدت فراخوان جمع‌آوری وجوه </td>
              <td className="border border-gray-300">
                متقاضي متعهد است چك هاي پرداخت اقساط بابت اصل و متفرعات (سود علي الحساب) را جمعاً به
                مبلغ{' '}
                {Number(
                  (agencyContract.investor_request.interest_rate_plan + 1) *
                    agencyContract.investor_request.amount_of_investment
                ).toLocaleString()}{' '}
                ميليون ريال،{' '}
                {Number(agencyContract.investor_request.amount_of_investment).toLocaleString()}بابت
                اصل مبلغ تأمين مالي{' '}
                {Number(
                  agencyContract.investor_request.interest_rate_plan *
                    agencyContract.investor_request.amount_of_investment
                ).toLocaleString()}
                میلیون ریال بابت متفرعات مبلغ تأمین مالی)، حداكثر يك روز كاري پس از موفقيت كمپين، طي
                5 فقره چك، با تاريخ هاي پرداخت حداقل 5 روز كاري زودتر از مواعد سررسيد (زمان پرداخت
                سود مشاركت به دارندگان گواهي شراكت) كه پس از موفقيت كمپين توسط عامل به متقاضي اعلام
                ميگردد، به عامل تحويل نمايد.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Page5.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page5;
