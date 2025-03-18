import React from 'react';
import { PropTypes } from 'prop-types';

const Page4 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
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
            <td className="border border-gray-300">2</td>
            <td className="border border-gray-300">آورده متقاضی</td>
            <td className="border border-gray-300">
              متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های شراکت از شرکت
              فرابورس ایران،{' '}
              {(
                Number(agencyContract.investor_request.amount_of_investment || 0) * 0.1
              ).toLocaleString()}
              معادل 10 درصد مبلغ کل تامین مالی (ردیف 1) را به شماره حساب 3002115158845881 و شماره
              شبا 4705703002115158845881 IR نزد بانک پاسارگاد شعبه جمهوری یزد به نام شرکت سبدگردان
              ایساتیس بانک پاسارگاد شعبه جمهوری یزد به نام شرکت سبدگردان ایساتیس پویا کیش واریز
              نماید. تبصره2: در صورت عدم واریز آورده متقاضی حداکثر طی 5 روز کاری از زمان درخواست
              عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این قرارداد
              می باشد.
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">3</td>
            <td className="border border-gray-300">خالص مبلغ تامین مالی </td>
            <td className="border border-gray-300">
              {(
                Number(agencyContract.investor_request.amount_of_investment || 0) * 0.9
              ).toLocaleString()}
              میلیون ریال، معادل 90 درصد مبلغ کل تامین مالی
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">4</td>
            <td className="border border-gray-300"> دوره بازپرداخت اقساط</td>
            <td className="border border-gray-300">
              {Number(agencyContract.investor_request.duration_of_plan || 0).toLocaleString()}
              ماه
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">5</td>
            <td className="border border-gray-300">شیوه بازپرداخت اصل و متفرعات مبلغ تامین مالی</td>
            <td className="border border-gray-300">
              متفرعات (سود) به صورت هر {agencyContract.investor_request.refund_of_plan} يكبار و با
              ارائه چك صيادي طرح جديد در مواعد مقرر توسط متقاضي (٤ فقره چك صيادي) حداكثر يك روز كاري
              پس از موفقيت كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح كمپين و
              جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح جديد توسط متقاضي (١ فقره چك
              صيادي) حداكثر يك روز كاري پس از موفقيت كمپين و جمع آوري وجوه. تبصره 3: در صورت عدم
              تحويل چك هاي پرداخت اقساط (بابت اصل و متفرعات) در مواعد مقرر شده يا در صورت عدم ثبت چك
              هاي پرداخت اقساط (بابت اصل و سود) در سامانه چك صيادي، عامل مخير به فسخ قرارداد است و
              متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد. تبصره 4: متقاضي متعهد است شرح
              چك هاي پرداخت اقساط بابت اصل و سود در سامانة چك صيادي را با درج عبارت «تأديه ديون» ثبت
              و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد به
              اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">6</td>
            <td className="border border-gray-300"> نوع تامین مالی </td>
            <td className="border border-gray-300">
              تأمين مالي شناور: {agencyContract.investor_request.buoyancy_plan}درصد از مبلغ كل تأمين
              مالي معادل{' '}
              {(
                Number(agencyContract.investor_request.buoyancy_plan || 0) *
                Number(agencyContract.investor_request.amount_of_investment || 0)
              ).toLocaleString()}
              ميليون ريال. تبصره 5: مجموع كارمزد عامل معادل چهار درصد مبلغ كل گواهي هاي شراكت
              ميباشد، لذا در صورت تأمين مالي به صورت شناور، كارمزد ياد شدة عامل به چهار درصد از مبلغ
              كل تأمين مالي انجام شده (شامل آورده متقاضي و وجوه جمع آوري شده از دارندگان گواهي
              شراكت) تعديل ميشود. تبصره 6: در صورت موفقيت كمپين به صورت شناور با حداقل سرمايه قابل
              پذيرش، مبالغ چك هاي اقساط و تضامين متناسب با ميزان وجوه جمع آوري شده تعديل ميگردد و
              جزئيات آن متعاقباً در قرارداد اقدامات اجرايي اعلام ميگردد.
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">7</td>
            <td className="border border-gray-300"> نرخ سود مشارکت اسمی </td>
            <td className="border border-gray-300">
              {agencyContract.investor_request.annualized_profit_forecast * 100} درصد ساليانه.
              <br /> تبصره 7: متقاضي متعهد است در سررسيد گواهي شراكت مطابق با شرايط مندرج در قرارداد
              اقدامات اجرايي به محاسبة سود قطعي گواهي هاي شراكت اقدام نمايد و سود قطعي محاسبه شده را
              به تأييد حسابرس برساند.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Page4.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page4;
