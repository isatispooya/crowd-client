import React from 'react';
import { PropTypes } from 'prop-types';

const Page2 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
        <p className="mb-3 pr-4">
          <span className="font-bold">4)</span>
          كارمزد شركت فرابورس ايران،{' '}
          <strong>
            {Number(agencyContract.investor_request.farabours_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال{' '}
          </strong>
          ميباشد كه متقاضي متعهد است در صورت تائید فرابورس با طرح، همزمان با واریز 10 درصد
          تعهدی(ردیف 2 جدول ماده 5)، كارمزد اين بند را به حساب شمارة ٩٨٧٨٥٧٢٧٠١٠١٣ و شمارة شبا
          ٤٨٠١٥٠٠٠٠٠٠٣١٠١٠٧٢٧٥٨٧٨٩ IR به نام شركت فرابورس ايران نزد بانك سپه واريز نمايد و اصل فيش
          واريزي را به عامل تحويل نمايد. 5-3. کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی و
          برنامه‌ریزی کمپین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی{' '}
          <strong>
            {Number(agencyContract.investor_request.marketing_wage / 1000000 || 0).toLocaleString()}{' '}
            میلیون ریال
          </strong>{' '}
          که متقاضی پس از موفقت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می نماید.
        </p>

        <p className="mb-3 pr-4">
          <span className="font-bold">5)</span>کارمزد ارائه خدمات بازارسازی به متقاضی از طریق طراحی
          و برنامه‌ریزی کمپین‌های تبلیغاتی جمعا به مبلغ 1 درصد مبلغ تامین مالی(
          {Number(
            agencyContract.investor_request.marketing_wage / 1000000 || 0
          ).toLocaleString()}{' '}
          میلیون ریال) که متقاضی پس از موفقت در جمع آوری وجوه به حساب عامل به صورت نقدی پرداخت می
          نماید.
        </p>

        <h3 className="font-bold mb-2 text-[23px]">ماده5 ) شرایط انتشار گواهی شراکت</h3>
        <p className="mb-2">
          متقاضي تمامي شرايط انتشار گواهي شراكت موضوع قرارداد را به شرح جدول اين ماده تأييد مي نمايد
          و متعهد به ايفاي تمامي تعهدات مندرج در جدول ذیل ميباشد:{' '}
        </p>
        <table
          style={{ borderColor: '#374151' }}
          className="table-auto w-full text-center border-collapse  text-[22px]"
        >
          <thead>
            <tr>
              <th style={{ color: '#374151' }} className="  text-[22px]">
                ردیف
              </th>
              <th style={{ color: '#374151' }} className="border border-gray-300 text-[22px]">
                شرایط
              </th>
              <th style={{ color: '#374151' }} className="border border-gray-300 text-[22px]">
                توضیحات
              </th>
            </tr>
          </thead>
          <tbody style={{ borderColor: '#374151' }} className="border border-gray-300">
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                1
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                مبلغ کل تامین مالی
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000 || 0
                  ).toLocaleString()}{' '}
                  میلیون ریال
                </strong>
              </td>
            </tr>

            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                2
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                آورده متقاضی
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                متقاضی متعهد است پیش از اقدام عامل برای اخذ مجوز انتشار گواهی های شراکت از شرکت
                فرابورس ایران،{' '}
                <strong>
                  {(
                    (Number(agencyContract.investor_request.amount_of_investment || 0) / 1000000) *
                    0.1
                  ).toLocaleString()}{' '}
                  میلیون ریال{' '}
                </strong>
                معادل 10 درصد مبلغ کل تامین مالی (ردیف 1) را به شماره حساب 3002115158845881 و شماره
                شبا 4705703002115158845881 IR نزد بانک پاسارگاد شعبه جمهوری یزد به نام شرکت سبدگردان
                ایساتیس پویا کیش واریز نماید.
                <br /> تبصره2: در صورت عدم واریز آورده متقاضی حداکثر طی 5 روز کاری از زمان درخواست
                عامل، عامل مخیر به فسخ قرارداد است و متقاضی متعهد به اجرای بند 2-1 ماده 9 این
                قرارداد 2-1 ماده 9 این قرارداد می باشد.
              </td>
            </tr>

            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                3
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                خالص مبلغ تامین مالی
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
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
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                4
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                دوره بازپرداخت اقساط
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                {Number(agencyContract.investor_request.duration_of_plan || 0).toLocaleString()}
                ماه
              </td>
            </tr>
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                5
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                شیوه بازپرداخت اصل و متفرعات مبلغ تامین مالی
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                متفرعات (سود) به صورت هر {agencyContract.investor_request.refund_of_plan} يكبار و با
                ارائه چك صيادي طرح جديد در مواعد مقرر توسط متقاضي (٤ فقره چك صيادي) حداكثر يك روز
                كاري پس از موفقيت كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح
                كمپين و جمع آوري وجوه. اصل در انتهاي دوره با ارائه چك صيادي طرح جديد توسط متقاضي (١
                فقره چك صيادي) حداكثر يك روز كاري پس از موفقيت كمپين و جمع آوري وجوه. تبصره 3: در
                صورت عدم تحويل چك هاي پرداخت اقساط (بابت اصل و متفرعات) در مواعد مقرر شده يا در صورت
                عدم ثبت چك هاي پرداخت اقساط (بابت اصل و سود) در سامانه چك صيادي، عامل مخير به فسخ
                قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد. تبصره 4:
                متقاضي متعهد است شرح چك هاي پرداخت اقساط بابت اصل و سود در سامانة چك صيادي را با درج
                عبارت «تأديه ديون» ثبت و به عامل تحويل نمايد، در غير اينصورت عامل مخير به فسخ
                قرارداد است و متقاضي متعهد به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
              </td>
            </tr>
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                6
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                نوع تامین مالی
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                تأمين مالي شناور: {agencyContract.investor_request.buoyancy_plan}درصد از مبلغ كل
                تأمين مالي معادل{' '}
                <strong>
                  {(
                    (Number(agencyContract.investor_request.buoyancy_plan || 0) *
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
              </td>
            </tr>
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                7
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                تضامین مورد نیاز
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                متقاضي متعهد است یک فقره ضمانت نامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000 || 0
                  ).toLocaleString()}{' '}
                  میلیون ریال{'  '}
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
            <tr>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                8
              </td>
              <td style={{ color: '#374151' }} className=" text-[22px]">
                موعد چک هاي پرداخت اقساط
              </td>
              <td style={{ color: '#374151' }} className="text-[22px]">
                متقاضي متعهد است چك هاي پرداخت اقساط بابت اصل و متفرعات (سود علي الحساب) را جمعاً به
                مبلغ{' '}
                <strong>
                  {Number(Number(agencyContract.warranty_check || 0) / 1000000).toLocaleString()}{' '}
                  میلیون ریال{' '}
                </strong>
                ،{' '}
                <strong>
                  {Number(
                    agencyContract.investor_request.amount_of_investment / 1000000
                  ).toLocaleString()}{' '}
                  میلیون ریال{' '}
                </strong>
                بابت اصل مبلغ تأمين مالي{' '}
                <strong>
                  {Number(
                    (agencyContract.warranty_check -
                      agencyContract.investor_request.amount_of_investment) /
                      1000000
                  ).toLocaleString()}{' '}
                  میلیون ریال{' '}
                </strong>
                بابت متفرعات مبلغ تأمین مالی)، حداكثر يك روز كاري پس از موفقيت كمپين، طي 5 فقره چك،
                با تاريخ هاي پرداخت حداقل 5 روز كاري زودتر از مواعد سررسيد (زمان پرداخت سود مشاركت
                به دارندگان گواهي شراكت) كه پس از موفقيت كمپين توسط عامل به متقاضي اعلام ميگردد، به
                عامل تحويل نمايد.
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
