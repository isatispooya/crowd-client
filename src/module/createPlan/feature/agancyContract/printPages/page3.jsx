import React from 'react';
import { PropTypes } from 'prop-types';

const Page3 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-sm">
        <p className="mb-3 pr-4">
          <span className="font-bold">4)</span>
          ارائۀ خدمات بازارسازی به متقاضی از طریق طراحی و برنامه‌ریزی کمپین‌های تبلیغاتی به منظور
          فروش گواهی‌های شراکت به اشخاص حقیقی و حقوقی
        </p>

        <p className="mb-2">
          كارمزد ارائة خدمات موضوع مادة ٣ ( موضوعات 1،2 و3) اين قرارداد توسط عامل، جمعا{' '}
          {(
            Number(agencyContract.investor_request.marketing_wage || 0) +
            Number(agencyContract.investor_request.company_certificate_wage || 0) +
            Number(agencyContract.investor_request.execution_wage || 0)
          ).toLocaleString()}
          و علاوه بر آن كارمزد شركت فرابورس{' '}
          {Number(agencyContract.investor_request.farabours_wage || 0).toLocaleString()} مي باشد و
          همچنین کارمزد موضوع 4 ماده 3 این قرارداد{' '}
          {Number(agencyContract.investor_request.execution_wage || 0).toLocaleString()}كه به تفكيك
          زير، توسط متقاضي در وجه عامل و شركت فرابورس ايران پرداخت ميگردد:
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) </span>
          كارمزد طراحي شيوه تأمين مالي و تهيه گزارش توجيهي، جهت انتشار و فروش گواهي شراكت،{' '}
          {Number(agencyContract.investor_request.design_wage || 0).toLocaleString()}كه متقاضي متعهد
          است همزمان با امضاي قرارداد، در قالب نقدي در وجه عامل به حساب شماره 3002.115.15884588.1 و
          شماره شبا4705703002115158845881IR بانك پاسارگاد شعبه بلوار جمهوری یزد به نام شركت سبدگردان
          ایساتیس پویا کیش واريز نمايد.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">تبصره1</span>
          در صورت عدم واريز كارمزد بند 4-1 اين ماده حداكثر طي 10 روز كاري از تاريخ اين قرارداد، عامل
          تعهدي نسبت به انجام موضوع قرارداد نداشته و مخير به فسخ قرارداد ميباشد و متقاضي متعهد به
          اجراي بند ١-١ مادة ٩ اين قرارداد ميباشد.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">2)</span>
          كارمزد شركت فرابورس ايران،{' '}
          {Number(agencyContract.investor_request.farabours_wage || 0).toLocaleString()}ميباشد كه
          متقاضي متعهد است در صورت تائید فرابورس با طرح، همزمان با واریز 10 درصد تعهدی(ردیف 2 جدول
          ماده 5)، كارمزد اين بند را به حساب شمارة ٩٨٧٨٥٧٢٧٠١٠١٣ و شمارة شبا
          ٤٨٠١٥٠٠٠٠٠٠٣١٠١٠٧٢٧٥٨٧٨٩ IR به نام شركت فرابورس ايران نزد بانك سپه واريز نمايد و اصل فيش
          واريزي را به عامل تحويل نمايد. 5-3. کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی و
          برنامه‌ریزی کمپین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی
          {Number(agencyContract.investor_request.marketing_wage || 0).toLocaleString()} که متقاضی
          پس از موفقت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می نماید.
        </p>

        <h3 className="font-bold mb-2">ماده5 ) شرایط انتشار گواهی شراکت</h3>
        <p className="mb-2">
          متقاضي تمامي شرايط انتشار گواهي شراكت موضوع قرارداد را به شرح جدول اين ماده تأييد مي نمايد
          و متعهد به ايفاي تمامي تعهدات مندرج در جدول ذیل ميباشد:{' '}
        </p>
      </div>
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
            <td className="border border-gray-300">1</td>
            <td className="border border-gray-300">مبلغ کل تامین مالی</td>
            <td className="border border-gray-300">
              {Number(agencyContract.investor_request.amount_of_investment || 0).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Page3.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page3;
