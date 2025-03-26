import React from 'react';
import { PropTypes } from 'prop-types';

const Page2 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[10px]">
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
          <strong>
            {(agencyContract?.investor_request?.amount_of_investment || 0 / 1000).toLocaleString()}{' '}
            گواهی شراکت.
          </strong>
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">ماده 4(کارمزد موضوع قرارداد))</span>
          ارائۀ خدمات بازارسازی به متقاضی از طریق طراحی و برنامه‌ریزی کمپین‌های تبلیغاتی به منظور
          فروش گواهی‌های شراکت به اشخاص حقیقی و حقوقی
        </p>

        <p className="mb-2">
          كارمزد ارائة خدمات موضوع ماده ٣ ( موضوعات 1و2و3) اين قرارداد توسط عامل، جمعا{' '}
          <strong>
            {(
              Number(agencyContract.investor_request.marketing_wage || 0) +
              Number(agencyContract.investor_request.company_certificate_wage || 0) +
              Number(agencyContract.investor_request.execution_wage || 0)
            ).toLocaleString()}{' '}
            میلیون ریال
          </strong>
          و علاوه بر آن كارمزد شركت فرابورس{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage || 0).toLocaleString()} میلیون
            ریال
          </strong>
          مي باشد و همچنین کارمزد موضوع 4 ماده 3 این قرارداد{' '}
          <strong>
            {Number(agencyContract.investor_request.execution_wage || 0).toLocaleString()} میلیون
            ریال
          </strong>
          كه به تفكيك زير، توسط متقاضي در وجه عامل و شركت فرابورس ايران پرداخت ميگردد:
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">1) </span>
          كارمزد طراحي شيوه تأمين مالي و تهيه گزارش توجيهي، جهت انتشار و فروش گواهي شراكت،{' '}
          <strong>
            {Number(agencyContract.investor_request.design_wage || 0).toLocaleString()} میلیون ریال
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
          <span className="font-bold">2)</span>
          كارمزد شركت فرابورس ايران،{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage || 0).toLocaleString()} میلیون
            ریال
          </strong>
          ميباشد كه متقاضي متعهد است در صورت تائید فرابورس با طرح، همزمان با واریز 10 درصد
          تعهدی(ردیف 2 جدول ماده 5)، كارمزد اين بند را به حساب شمارة ٩٨٧٨٥٧٢٧٠١٠١٣ و شمارة شبا
          ٤٨٠١٥٠٠٠٠٠٠٣١٠١٠٧٢٧٥٨٧٨٩ IR به نام شركت فرابورس ايران نزد بانك سپه واريز نمايد و اصل فيش
          واريزي را به عامل تحويل نمايد. 5-3. کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی و
          برنامه‌ریزی کمپین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی{' '}
          <strong>
            {Number(agencyContract.investor_request.marketing_wage || 0).toLocaleString()} میلیون
            ریال
          </strong>{' '}
          که متقاضی پس از موفقت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می نماید.
        </p>

        <h3 className="font-bold mb-2 text-[10px]">ماده5 ) شرایط انتشار گواهی شراکت</h3>
        <p className="mb-2">
          متقاضي تمامي شرايط انتشار گواهي شراكت موضوع قرارداد را به شرح جدول اين ماده تأييد مي نمايد
          و متعهد به ايفاي تمامي تعهدات مندرج در جدول ذیل ميباشد:{' '}
        </p>
        <table className="table-auto w-full text-center border-collapse border border-gray-300 text-[10px]">
        <thead>
          <tr>
            <th className="border border-gray-300 text-[10px]">ردیف</th>
            <th className="border border-gray-300 text-[10px]">شرایط</th>
            <th className="border border-gray-300 text-[10px]">توضیحات</th>
          </tr>
        </thead>
        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300 text-[10px]">1</td>
            <td className="border border-gray-300 text-[10px]">مبلغ کل تامین مالی</td>
            <td className="border border-gray-300 text-[10px]">
              <strong>
                {Number(agencyContract.investor_request.amount_of_investment || 0).toLocaleString()}{' '}
                میلیون ریال
              </strong>
            </td>
          </tr>
        </tbody>
        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">2</td>
            <td className="border border-gray-300">آورده متقاضی</td>
            <td className="border border-gray-300 text-[10px]">
              متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های شراکت از شرکت
              فرابورس ایران،{' '}
              <strong>
                {(
                  (Number(agencyContract.investor_request.amount_of_investment || 0) / 1000000) *
                  0.1
                ).toLocaleString()}{' '}
                میلیون ریال
              </strong>
              معادل 10 درصد مبلغ کل تامین مالی (ردیف 1) را به شماره حساب 3002115158845881 و شماره
              شبا 4705703002115158845881 IR نزد بانک پاسارگاد شعبه جمهوری یزد به نام شرکت سبدگردان
              ایساتیس پویا کیش واریز نماید.
              <br /> تبصره2: در صورت عدم واریز آورده متقاضی حداکثر طی 5 روز کاری از زمان درخواست
              عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این قرارداد
              2-1 ماده 9 این قرارداد می باشد.
            </td>
          </tr>
        </tbody>

        <tbody className="border border-gray-300">
          <tr>
            <td className="border border-gray-300">3</td>
            <td className="border border-gray-300">خالص مبلغ تامین مالی </td>
            <td className="border border-gray-300 text-[10px]">
              <strong>
                {(
                  (Number(agencyContract.investor_request.amount_of_investment || 0) / 1000000) *
                  0.9
                ).toLocaleString()}{' '}
                میلیون ریال
              </strong>
              ، معادل 90 درصد مبلغ کل تامین مالی
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

Page2.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page2;
