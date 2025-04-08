import React from 'react';
import { PropTypes } from 'prop-types';

const Page2 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="text-justify leading-relaxed">
        <p className="mb-3 pr-2 md:pr-4 text-right text-base md:text-lg lg:text-xl">
          <span className="font-bold">2)</span> كارمزد ارائه خدمات بازاريابي به متقاضي،{' '}
          {Number(agencyContract.investor_request.execution_wage / 1000000 || 0).toLocaleString()}{' '}
          ميليون ريال ميباشد كه در صورت موفقيت كمپين، حداكثر طي يك روز كاري پيش از واريز وجوه تأمين
          مالی شده به حساب متقاضي، از متقاضي به صورت نقدي/ چك در وجه حساب معرفي شده در بند 4-١- اين
          ماده دريافت خواهد شد.
        </p>

        <p className="mb-3 pr-2 md:pr-4 text-right text-base md:text-lg lg:text-xl">
          <span className="font-bold">3)</span> كارمزد انتشار و فروش گواهي شراكت، جمعاً{' '}
          {Number(
            agencyContract.investor_request.company_certificate_wage / 1000000 || 0
          ).toLocaleString()}{' '}
          میلیون ريال ميباشد. متقاضي متعهد است در صورت موفقيت كمپين، حداكثر يك روز كاري پيش از واريز
          وجوه جمع آوري شده به حساب وي، كارمزد جمع آوري شده به حساب وي، كارمزد اين بند را به صورت
          نقدي/ چك به حساب معرفي شده در بند 4-١- اين ماده واريز نمايد
        </p>

        <p className="mb-3 pr-2 md:pr-4 text-right text-base md:text-lg lg:text-xl">
          <span className="font-bold">4)</span>
          كارمزد شركت فرابورس ايران،{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          ميباشد كه متقاضي متعهد است در صورت تائید فرابورس با طرح، همزمان با واریز 10 درصد
          تعهدی(ردیف 2 جدول ماده 5)، كارمزد اين بند را به حساب شمارة 98785727010103 و شمارة شبا
          IR480150000000310107275878 به نام شركت فرابورس ايران نزد بانك سپه واريز نمايد و اصل فيش
          واريزي را به عامل تحويل نمايد.{' '}
        </p>

        <p className="mb-3 pr-2 md:pr-4 text-right text-base md:text-lg lg:text-xl">
          <span className="font-bold">5)</span>کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی
          و برنامه‌ریزی کمین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی(
          {Number(
            agencyContract.investor_request.marketing_wage / 1000000 || 0
          ).toLocaleString()}{' '}
          میلیون ریال) که متقاضی پس از موفقیت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می
          نماید.
        </p>

        <h3 className="font-bold mb-2 text-lg md:text-xl lg:text-2xl text-right">
          ماده5 ) شرایط انتشار گواهی شراکت
        </h3>

        <p className="mb-4 text-base md:text-lg lg:text-xl text-right">
          متقاضي تمامي شرايط انتشار گواهي شراكت موضوع قرارداد را به شرح جدول اين ماده تأييد مي نمايد
          و متعهد به ايفاي تمامي تعهدات مندرج در جدول ذیل ميباشد:{' '}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
            <thead>
              <tr>
                <th className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  ردیف
                </th>
                <th className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  شرایط
                </th>
                <th className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  توضیحات
                </th>
              </tr>
            </thead>
            <tbody className="border border-gray-300">
              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  1
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  مبلغ کل تامین مالی
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  <strong>
                    {Number(
                      agencyContract.investor_request.amount_of_investment / 1000000 || 0
                    ).toLocaleString()}{' '}
                    میلیون ریال
                  </strong>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  2
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  آورده متقاضی
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های شراکت از شرکت
                  فرابورس ایران،{' '}
                  <strong>
                    {(
                      (Number(agencyContract.investor_request.amount_of_investment || 0) /
                        1000000) *
                      0.1
                    ).toLocaleString()}{' '}
                    میلیون ریال{' '}
                  </strong>
                  معادل 10 درصد مبلغ کل تامین مالی (ردیف 1) را به شماره حساب 3002115158845881 و
                  شماره شبا 4705703002115158845881 IR نزد بانک پاسارگاد شعبه جمهوری یزد به نام شرکت
                  سبدگردان ایساتیس پویا کیش واریز نماید.
                  <br className="hidden md:block" />
                  <span className="block mt-2 text-sm md:text-base">
                    تبصره2: در صورت عدم واریز آورده متقاضی حداکثر طی 5 روز کاری از زمان درخواست
                    عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این
                    قرارداد 2-1 ماده 9 این قرارداد می باشد.
                  </span>
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  3
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  خالص مبلغ تامین مالی{' '}
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  <strong>
                    {(
                      (Number(agencyContract.investor_request.amount_of_investment || 0) /
                        1000000) *
                      0.9
                    ).toLocaleString()}{' '}
                    میلیون ریال
                  </strong>
                  ، معادل 90 درصد مبلغ کل تامین مالی
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  4
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  {' '}
                  دوره بازپرداخت اقساط
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  {Number(agencyContract.investor_request.duration_of_plan || 0).toLocaleString()}
                  ماه
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  5
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  شیوه بازپرداخت اصل و متفرعات مبلغ تامین مالی
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  متفرعات (سود) به صورت{' '}
                  {(() => {
                    switch (agencyContract.investor_request.refund_of_plan) {
                      case '1':
                        return 'یکجا در پایان طرح';
                      case '2':
                        return 'هر یکماه';
                      case '3':
                        return 'هر سه ماه';
                      default:
                        return agencyContract.investor_request.refund_of_plan;
                    }
                  })()}{' '}
                  و با ارائه چك صيادي طرح جديد در مواعد مقرر توسط متقاضي (٤ فقره چك صيادي) حداكثر يك
                  روز كاري پس از موفقيت كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي
                  طرح كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح جديد توسط
                  متقاضي (١ فقره چك صيادي) حداكثر يك روز كاري پس از موفقيت كمپين و جمع آوري وجوه.
                  تبصره 3: در صورت عدم تحويل چك هاي پرداخت اقساط (بابت اصل و متفرعات) در مواعد مقرر
                  شده يا در صورت عدم ثبت چك هاي پرداخت اقساط (بابت اصل و سود) در سامانه چك صيادي،
                  عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد
                  ميباشد. تبصره 4: متقاضي متعهد است شرح چك هاي پرداخت اقساط بابت اصل و سود در سامانة
                  چك صيادي را با درج عبارت «تأديه ديون» ثبت و به عامل تحويل نمايد، در غير اينصورت
                  عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد
                  ميباشد.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  6
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  {' '}
                  نوع تامین مالی{' '}
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  تأمين مالي شناور: {agencyContract.investor_request.buoyancy_plan}درصد از مبلغ كل
                  تأمين مالي معادل{' '}
                  <strong>
                    {(
                      (Number(agencyContract.investor_request.buoyancy_plan / 100 || 0) *
                        Number(agencyContract.investor_request.amount_of_investment || 0)) /
                      1000000
                    ).toLocaleString()}{' '}
                    میلیون ریال{' '}
                  </strong>
                  ميباشد، لذا در صورت تأمين مالي به صورت شناور، كارمزد ياد شدة عامل به چهار درصد از
                  مبلغ كل تأمين مالي انجام شده (شامل آورده متقاضي و وجوه جمع آوري شده از دارندگان
                  گواهي شراكت) تعديل ميشود. تبصره 6: در صورت موفقيت كمپين به صورت شناور با حداقل
                  سرمايه قابل پذيرش، مبالغ چك هاي اقساط و تضامين متناسب با ميزان وجوه جمع آوري شده
                  تعديل ميگردد و جزئيات آن متعاقباً در قرارداد اقدامات اجرايي اعلام ميگردد.
                  <br />
                  تبصره 5 :مجموع کامزد عامل معادل چهار درصد مبلغ کل گواهی های شراکت می باشد , لذا در
                  صورت تامین مالی به صورت شناور ,کارمزد یاد شده عامل به چهار درصد از مبلغ کل تامین
                  مالی انجام شده (شامل آورده متقاضی و وجود جمع آوری شده از دارندگان گواهی شراکت ).
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  7
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  نرخ سود مشارکت اسمی{' '}
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  {agencyContract.investor_request.annualized_profit_forecast * 100} درصد ساليانه.
                  <br className="hidden md:block" /> تبصره 7: متقاضي متعهد است در سررسيد گواهي شراكت
                  مطابق با شرايط مندرج در قرارداد اقدامات اجرايي به محاسبة سود قطعي گواهي هاي شراكت
                  اقدام نمايد و سود قطعي محاسبه شده را به تأييد حسابرس برساند.
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  8
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  ضامن
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  ضامن معرفی شده توسط متقاضی که در قرارداد اقدامات اجرایی تعیین می شود.{' '}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  9
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  تضامین مورد نیاز{' '}
                </td>
                <td className="border border-gray-300 text-sm md:text-base lg:text-lg p-2 md:p-3 text-right">
                  متقاضي متعهد است یک فقره ضمانت نامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به
                  <strong>
                    {Number(
                      agencyContract.investor_request.amount_of_investment / 1000000 || 0
                    ).toLocaleString()}{' '}
                    میلیون ریال{'  '}
                  </strong>
                  را با اعتبار 12 ماهه و قابلیت تمدید توسط عامل و با قابلیت دریافت وجه ضمانت نامه
                  بدون قید و شرط در هر زمان به محض تقاضای عامل (عندالمطالبه)، که مورد تائید واحد
                  حقوقی و واحد مالی عامل باشد، ارائه نماید، همچنین متقاضی متعهد است 2 فقره چک ضمانت
                  صیادی طرح جدید را جمعاً به مبلغ{' '}
                  <strong>
                    {Math.floor(agencyContract.warranty_check / 1000000 || 0).toLocaleString()}{' '}
                    میلیون ریال{'  '}
                  </strong>
                  (یک فقره چک به میزان اصل مبلغ تأمین مالی و یک فقره چک به میزان یک فرع از اقساط
                  مبلغ تأمین مالی) از ضامن دریافت و حداکثر یک روز کاری پس از موفقیت کمین و جمع آوری
                  وجوه به عامل تحویل نماید.
                  <br className="hidden md:block" /> تبصره 8 : متقاضی متعهد است پیش از اقدام عامل
                  برای اخذ مجوز انتشار گواهی های شراکت از شرکت فرابورس ایران، حداکثر طی 5 روز کاری
                  نسبت به ارائه ضمانت نامه تعهد پرداخت اقدام نماید. در صورت عدم ارائه ضمانت نامه در
                  موعد مقرر به عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1
                  ماده 9 این قرارداد می باشد.
                  <br className="hidden md:block" /> تبصره 9 : کلیه هزینه های صدور، تمدید، اصلاح یا
                  ابطال ضمانت نامه تعهد پرداخت بر عهده متقاضی است.
                  <br className="hidden md:block" /> تبصره 10: در صورت عدم تحويل چك هاي تضمين در
                  مواعد مقرر شده يا در صورت عدم ثبت چك هاي تضمين در سامانه چك صيادي، و نیز عدم
                  ظهرنویسی آن توسط صاحبین امضای مجاز، عامل مخير به فسخ قرارداد است و متقاضي متعهد به
                  اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                  <br className="hidden md:block" /> تبصره 11: متقاضي متعهد است چك هاي تضمين را بدون
                  درج عبارت «بابت ضمانت» روي چك تضمين و درج عبارت « تأديه ديون» در شرح سامانه چك
                  صيادي يا عدم تكميل قسمت شرح چك در سامانه چك صياد و به عامل تحويل نمايد، در غير
                  اينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين
                  قرارداد ميباشد.
                  <br className="hidden md:block" />
                  <span className="text-sm md:text-base">
                    تبصره 12: متقاضي ميتواند در صورت نياز هنگام تحويل چك تضمين و چك هاي پرداخت اقساط
                    از عامل رسيد موقت دريافت اسناد ياد شده را درخواست نمايد، اما رسيد موقت صرفاً به
                    معناي تحويل اسناد يادشده توسط متقاضي است و به هيچ وجه به منزله صحت اسناد ياد شده
                    نيست.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Page2.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page2;
