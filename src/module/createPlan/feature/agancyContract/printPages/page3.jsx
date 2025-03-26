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
              <strong>
                {(
                  Number(agencyContract.investor_request.buoyancy_plan || 0) *
                  Number(agencyContract.investor_request.amount_of_investment || 0)
                ).toLocaleString()}{' '}
                میلیون ریال
              </strong>
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
              <td className="border border-gray-300 text-[10px]">7</td>
              <td className="border border-gray-300 text-[10px]">تضامین مورد نیاز </td>
              <td className="border border-gray-300 text-[10px]">
                متقاضي متعهد است یک فقره ضمانت نامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment || 0
                  ).toLocaleString() / 1000000}{' '}
                  میلیون ریال
                </strong>
                میلیون ریال را با اعتبار 12 ماهه و قابلیت تمدید توسط عامل و با قابلیت دریافت وجه
                ضمانت نامه بدون قید و شرط در هر زمان به محض تقاضای عامل (عندالمطالبه)، که مورد تائید
                واحد حقوقی و واحد مالی عامل باشد، ارائه نماید، همچنین متقاضی متعهد است{' '}
                {agencyContract.investor_request.guarantor_count} فقره چک ضمانت صیادی طرح جدید را
                جمعاً به مبلغ{' '}
                <strong>
                  {Number(agencyContract.warranty_check || 0).toLocaleString()} میلیون ریال
                </strong>
                (یک فقره چک به میزان اصل مبلغ تأمین مالی و یک فقره چک به میزان یک فرع از اقساط مبلغ
                تأمین مالی) از ضامن دریافت و حداکثر یک روز کاری پس از موفقیت کمپین و جمع آوری وجوه
                به عامل تحویل نماید.
                <br /> تبصره 8 : متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های
                شراکت از شرکت فرابورس ایران، حداکثر طی 5 روز کاری نسبت به ارائه ضمانت نامه تعهد
                پرداخت اقدام نماید. در صورت عدم ارائه ضمانت نامه در موعد مقرر به عامل، عامل مخیر به
                فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این قرارداد می باشد.
                <br /> تبصره 9 : کلیه هزینه های صدور، تمدید، اصلاح یا ابطال ضمانت نامه تعهد پرداخت
                بر عهده متقاضی است.
                <br /> تبصره 10: در صورت عدم تحويل چك هاي تضمين در مواعد مقرر شده يا در صورت عدم ثبت
                چك هاي تضمين در سامانه چك صيادي، و نیز عدم ظهرنویسی آن توسط صاحبین امضای مجاز، عامل
                مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br /> تبصره 11: متقاضي متعهد است چك هاي تضمين را بدون درج عبارت «بابت ضمانت» روي چك
                تضمين و درج عبارت « تأديه ديون» در شرح سامانه چك صيادي يا عدم تكميل قسمت شرح چك در
                سامانه چك صياد و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ قرارداد است و
                متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد. تبصره 12: متقاضي ميتواند در
                صورت نياز هنگام تحويل چك تضمين و چك هاي پرداخت اقساط از عامل رسيد موقت دريافت اسناد
                ياد شده را درخواست نمايد، اما رسيد موقت صرفاً به معناي تحويل اسناد يادشده توسط
                متقاضي است و به هيچ وجه به منزله صحت اسناد ياد شده نيست.
              </td>
            </tr>
          </tbody>

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[10px]">8</td>
              <td className="border border-gray-300 text-[10px]">موعد چک هاي پرداخت اقساط </td>
              <td className="border border-gray-300 text-[10px]">
                متقاضي متعهد است چك هاي پرداخت اقساط بابت اصل و متفرعات (سود علي الحساب) را جمعاً به
                مبلغ{' '}
                <strong>
                  {Number(
                    ((agencyContract.investor_request.interest_rate_plan + 1 / 1000000) *
                      agencyContract.investor_request.amount_of_investment) /
                      1000000
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
                ،{' '}
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
                بابت اصل مبلغ تأمين مالي{' '}
                <strong>
                  {Number(
                    (agencyContract.investor_request.interest_rate_plan *
                      agencyContract.investor_request.amount_of_investment) /
                      1000000
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
                بابت متفرعات مبلغ تأمین مالی)، حداكثر يك روز كاري پس از موفقيت كمپين، طي 5 فقره چك،
                با تاريخ هاي پرداخت حداقل 5 روز كاري زودتر از مواعد سررسيد (زمان پرداخت سود مشاركت
                به دارندگان گواهي شراكت) كه پس از موفقيت كمپين توسط عامل به متقاضي اعلام ميگردد، به
                عامل تحويل نمايد.
              </td>
            </tr>
          </tbody>

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[10px]">9</td>
              <td className="border border-gray-300 text-[10px]">
                شرط پرداخت وجوه تامین مالی به حساب متقاضی
              </td>
              <td className="border border-gray-300 text-[10px]">
                عامل پس از اخذ استعلام هاي لازم از تضامين مندرج در رديف 9 اين جدول و چك هاي پرداخت
                اقساط مندرج در رديف 5 اين جدول و كسب اطمينان از صحت اسناد ياد شده، وجوه جمع آوري شده
                را حداكثر طي دو روز كاري به حساب اعلام شده از سوي متقاضي واريز مي نمايد لذا متقاضي
                تا زمان استعلام كامل و اطمينان از صحت اسناد ياد شده توسط عامل، حق هرگونه اعتراضي را
                بابت دريافت وجوه تأمين مالي شده و رسيد قطعي اسناد ياد شده از خود سلب و اسقاط
                مينمايد.
                <br />
                تبصره 13: در صورت وجود هرگونه ايراد در چك هاي تضمين و چك هاي پرداخت اقساط <br />
                (بابت اصل و متفرعات) طي فرايند استعلام، متقاضي موظف است حداكثر طي دو روز كاري نسبت
                به به رفع ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است و متقاضي
                متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
                <br />
                تبصره 14: در صورت وجود هرگونه ايراد در تضامین موجود، متقاضي موظف است حداكثر طي دو
                روز كاري نسبت به رفع ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد
                اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند
                ٢-١ مادة ٩ اين قرارداد ميباشد.
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
