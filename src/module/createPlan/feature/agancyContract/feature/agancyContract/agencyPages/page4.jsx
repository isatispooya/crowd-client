import React from 'react';
import { PropTypes } from 'prop-types';

const Page5 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
        <br />
        <table className="table-auto w-full border-collapse border border-gray-300 text-[22px]">
          <thead>
            <tr>
              <th className="border border-gray-300 text-[22px] text-right pr-2">ردیف</th>
              <th className="border border-gray-300 text-[22px] text-right pr-2">شرایط</th>
              <th className="border border-gray-300 text-[22px] text-right pr-2">توضیحات</th>
            </tr>
          </thead>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">5</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                شیوه بازپرداخت اصل و متفرعات مبلغ تامین مالی
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                متفرعات (سود) به صورت{' '}
                {(() => {
                  switch (agencyContract.investor_request.refund_of_plan) {
                    case '0':
                      return 'یکجا در پایان طرح';
                    case '1':
                      return 'هر یکماه';
                    case '3':
                      return 'هر سه ماه';
                    default:
                      return agencyContract.investor_request.refund_of_plan;
                  }
                })()}{' '}
                و با ارائه چك صيادي طرح جديد در مواعد مقرر توسط متقاضي (٤ فقره چك صيادي) حداكثر يك
                روز كاري پس از موفقيت كمپين و جمع آوري وجوه.
                <br />
                اصل در انتهاي دوره با ارائه چك صيادي طرح جديد توسط متقاضي (١ فقره چك صيادي) حداكثر
                يك روز كاري پس از موفقيت كمپين و جمع آوري وجوه.
                <br />
                تبصره 3: در صورت عدم تحويل چك هاي پرداخت اقساط (بابت اصل و متفرعات) در مواعد مقرر
                شده يا در صورت عدم ثبت چك هاي پرداخت اقساط (بابت اصل و سود) در سامانه چك صيادي، عامل
                مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br />
                تبصره 4: متقاضي متعهد است شرح چك هاي پرداخت اقساط بابت اصل و سود در سامانة چك صيادي
                را با درج عبارت «تأديه ديون» ثبت و به عامل تحويل نمايد، در غير اينصورت عامل مخير به
                فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">6</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                {' '}
                نوع تامین مالی{' '}
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
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
                گواهي شراكت) تعديل ميشود. تبصره 4: در صورت موفقيت كمپين به صورت شناور با حداقل
                سرمايه قابل پذيرش، مبالغ چك هاي اقساط و تضامين متناسب با ميزان وجوه جمع آوري شده
                تعديل ميگردد و جزئيات آن متعاقباً در قرارداد اقدامات اجرايي اعلام ميگردد.
                <br />
                تبصره 5 :مجموع کامزد عامل معادل چهار درصد مبلغ کل گواهی های شراکت می باشد , لذا در
                صورت تامین مالی به صورت شناور ,کارمزد یاد شده عامل به چهار درصد از مبلغ کل تامین
                مالی انجام شده (شامل آورده متقاضی و وجود جمع آوری شده از دارندگان گواهی شراکت ).
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">7</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                نرخ سود مشارکت اسمی{' '}
              </td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                {agencyContract.investor_request.annualized_profit_forecast * 100} درصد ساليانه.
                {agencyContract.investor_request.refund_of_plan === '3'
                  ? `(${(agencyContract.investor_request.annualized_profit_forecast * 100) / 4})`
                  : agencyContract.investor_request.annualized_profit_forecast * 100}
                {' درصد سه ماهه'}
                <br /> تبصره 7: متقاضي متعهد است در سررسيد گواهي شراكت مطابق با شرايط مندرج در
                قرارداد اقدامات اجرايي به محاسبة سود قطعي گواهي هاي شراكت اقدام نمايد و سود قطعي
                محاسبه شده را به تأييد حسابرس برساند.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">8</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">ضامن</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                ضامن معرفی شده توسط متقاضی که در قرارداد اقدامات اجرایی تعیین می شود.{' '}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right p-3">9</td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                مدت فراخوان جمع‌آوری وجوه
              </td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                مدت فراخوان جمع آوري وجوه به تشخيص عامل تعيين مي گردد اين دوره با نظر عامل براي يك
                مرتبه قابل تمديد است. لازم به ذكر است تاريخ شروع جمع آوري وجوه و مدت زمان آن ، از
                طريق نامه كتبي به استحضار متقاضي خواهد رسيد.
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right p-3">10</td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                شرط پرداخت وجوه تامین مالی به حساب متقاضی
              </td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                عامل پس از اخذ استعلام هاي لازم از تضامين مندرج در رديف 9 اين جدول و چك هاي پرداخت
                اقساط مندرج در رديف 5 اين جدول و كسب اطمينان از صحت اسناد ياد شده، وجوه جمع آوري شده
                را حداكثر طي دو روز كاري به حساب اعلام شده از سوي متقاضي واريز مي نمايد لذا متقاضي
                تا زمان استعلام كامل و اطمينان از صحت اسناد ياد شده توسط عامل، حق هرگونه اعتراضي را
                بابت دريافت وجوه تأمين مالي شده و رسيد قطعي اسناد ياد شده از خود سلب و اسقاط مي
                نمايد.مضافا در تمامی مراحل، متقاضی، حق هیچ اعتراض یا ادعایی را ندارد و حق هر گونه
                ادعا را از خود سلب نموده است.
                <br />
                تبصره 12: در صورت وجود هرگونه ايراد در چك هاي تضمين و چك هاي پرداخت اقساط (بابت اصل
                و متفرعات) طي فرايند استعلام، متقاضي موظف است حداكثر طي دو روز كاري نسبت به رفع
                ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد به
                اجراي بند ٣-١ مادة ٩ اين قرارداد مي باشد.
                <br />
                تبصره 13: در صورت وجود هرگونه ايراد در تضامین موجود، متقاضي موظف است حداكثر طي دو
                روز كاري نسبت به رفع ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است
                و متقاضي متعهد به اجراي بند 3-١ مادة ٩ اين قرارداد مي باشد.
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right p-3">11</td>
              <td className="border border-gray-300 text-[22px] text-right p-3">ارائه گزارشات</td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                متقاضي متعهد است نسبت به ارائة گزارش عملكرد از پيشرفت فيزيكي-ريالي اجراي طرح به صورت
                سه ماهه و ارائه صورتهاي مالي طرح (حسابرسي نشده) به صورت شش ماهه و ارائة صورتهاي مالي
                طرح (حسابرسي شده توسط حسابرس) در انتهاي دوره اقدام نمايد. تخلف از هر یک ، مستوجب حق
                فسخ برای عامل بوده و عامل حق مطالبه تمام مبالغ مندرج در قرارداد را داراست.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-[22px] text-right pr-2">12</td>
              <td className="border border-gray-300 text-[22px] text-right pr-2">
                تضامین مورد نیاز{' '}
              </td>
              <td className="border border-gray-300 text-[18px] text-right pr-2">
                متقاضي متعهد است یک فقره ضمانت نامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000 || 0
                  ).toLocaleString()}{' '}
                  میلیون ریال{'  '}
                </strong>
                را با اعتبار 12 ماهه و قابلیت تمدید توسط عامل و با قابلیت دریافت وجه ضمانت نامه بدون
                قید و شرط در هر زمان به محض تقاضای عامل (عندالمطالبه)، که مورد تائید واحد حقوقی و
                واحد مالی عامل باشد، ارائه نماید، همچنین متقاضی متعهد است 2 فقره چک ضمانت صیادی طرح
                جدید را جمعاً به مبلغ{' '}
                <strong>
                  {Math.ceil(
                    (Math.ceil(agencyContract.warranty_check / 1000) * 1000) / 1000000 || 0
                  ).toLocaleString()}{' '}
                  میلیون ریال{'  '}
                </strong>
                (یک فقره چک به میزان اصل مبلغ تأمین مالی و یک فقره چک به میزان یک فرع از اقساط مبلغ
                تأمین مالی) از ضامن دریافت و حداکثر یک روز کاری پس از موفقیت کمین و جمع آوری وجوه به
                عامل تحویل نماید.
                <br /> تبصره 7 : متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های
                شراکت از شرکت فرابورس ایران، حداکثر طی 5 روز کاری نسبت به ارائه ضمانت نامه تعهد
                پرداخت اقدام نماید. در صورت عدم ارائه ضمانت نامه در موعد مقرر به عامل، عامل مخیر به
                فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این قرارداد می باشد.
                <br /> تبصره 8 : کلیه هزینه های صدور، تمدید، اصلاح یا ابطال ضمانت نامه تعهد پرداخت
                بر عهده متقاضی است.
                <br /> تبصره 9: در صورت عدم تحويل چك هاي تضمين در مواعد مقرر شده يا در صورت عدم ثبت
                چك هاي تضمين در سامانه چك صيادي، و نیز عدم ظهرنویسی آن توسط صاحبین امضای مجاز، عامل
                مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br /> تبصره 10: متقاضي متعهد است چك هاي تضمين را بدون درج عبارت «بابت ضمانت» روي چك
                تضمين و درج عبارت « تأديه ديون» در شرح سامانه چك صيادي يا عدم تكميل قسمت شرح چك در
                سامانه چك صياد و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ قرارداد است و
                متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br />
                <span className="text-[18px]">
                  تبصره 11: متقاضي ميتواند در صورت نياز هنگام تحويل چك تضمين و چك هاي پرداخت اقساط
                  از عامل رسيد موقت دريافت اسناد ياد شده را درخواست نمايد، اما رسيد موقت صرفاً به
                  معناي تحويل اسناد يادشده توسط متقاضي است و به هيچ وجه به منزله صحت اسناد ياد شده
                  نيست.
                </span>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 text-[22px] text-right p-3">13</td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                {' '}
                مواعدچک های پرداخت اقساط
              </td>
              <td className="border border-gray-300 text-[22px] text-right p-3">
                متقاضي متعهد است چك هاي پرداخت اقساط بابت اصل و متفرعات (سود علي الحساب) را جمعاً به
                مبلغ{' '}
                {(
                  (Number(agencyContract.investor_request.amount_of_investment || 0) +
                    Number(agencyContract.investor_request.amount_of_investment || 0) *
                      Number(agencyContract.investor_request.interest_rate_plan / 100 || 0) *
                      0.9) /
                  1000000
                ).toLocaleString()}
                ميليون ريال،{' '}
                {Number(
                  agencyContract.investor_request.amount_of_investment / 1000000 || 0
                ).toLocaleString()}{' '}
                بابت اصل مبلغ تأمين مالي{' '}
                {(
                  (Number(agencyContract.investor_request.amount_of_investment || 0) *
                    Number(agencyContract.investor_request.interest_rate_plan / 100 || 0) *
                    0.9) /
                  1000000
                ).toLocaleString()}{' '}
                میلیون ریال بابت متفرعات مبلغ تأمین مالی)، حداكثر يك روز كاري پس از موفقيت كمپين، طي
                5 فقره چك، با تاريخ هاي پرداخت حداقل 5 روز كاري زودتر از مواعد سررسيد (زمان پرداخت
                سود مشاركت به دارندگان گواهي شراكت) كه پس از موفقيت كمپين توسط عامل به متقاضي اعلام
                مي گردد، به عامل تحويل نمايد.
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
