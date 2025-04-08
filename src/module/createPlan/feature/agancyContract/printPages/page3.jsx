import React from 'react';
import { PropTypes } from 'prop-types';

const Page4 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <table className="table-auto w-full text-center border-collapse border border-gray-300 text-[22px]">
        <thead>
          <tr>
            <th className="border border-gray-300 text-[22px] text-right pr-2">ردیف</th>
            <th className="border border-gray-300 text-[22px] text-right pr-2">شرایط</th>
            <th className="border border-gray-300 text-[22px] text-right pr-2">توضیحات</th>
          </tr>
        </thead>
        <tbody className="border border-gray-300 leading-relaxed">
          <tr>
            <td className="border border-gray-300 text-[22px] text-right pr-2">10</td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              مواعد چک هاي پرداخت اقساط
            </td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              متقاضي متعهد است چك هاي پرداخت اقساط بابت اصل و متفرعات (سود علي الحساب) را جمعاً به
              مبلغ{' '}
              <strong>
                {Math.floor(
                  Number(
                    (agencyContract.investor_request.amount_of_investment * 0.9) *
                      (agencyContract.investor_request.interest_rate_plan / 100) +
                      agencyContract.investor_request.amount_of_investment  || 0
                  ) / 1000000
                ).toLocaleString()}{' '}
                میلیون ریال{' '}
              </strong>
              ،{' '}
              <strong>
                {Math.floor(
                  agencyContract.investor_request.amount_of_investment / 1000000
                ).toLocaleString()}{' '}
                میلیون ریال{' '}
              </strong>
              بابت اصل مبلغ تأمين مالي{' '}
              <strong>
                {Math.floor(
                  (agencyContract.investor_request.amount_of_investment *
                    0.9 *
                    (agencyContract.investor_request.interest_rate_plan / 100)) /
                    1000000
                ).toLocaleString()}{' '}
                میلیون ریال{' '}
              </strong>
              بابت متفرعات مبلغ تأمین مالی)، حداكثر يك روز كاري پس از موفقيت كمپين، طي 5 فقره چك، با
              تاريخ هاي پرداخت حداقل 5 روز كاري زودتر از مواعد سررسيد (زمان پرداخت سود مشاركت به
              دارندگان گواهي شراكت) كه پس از موفقيت كمپين توسط عامل به متقاضي اعلام ميگردد، به عامل
              تحويل نمايد.
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 text-[22px] text-right pr-2">11</td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              مدت فراخوان جمع‌آوری وجوه
            </td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              مدت فراخوان جمع آوري وجوه به تشخيص عامل تعيين ميگردد اين دوره با نظر عامل براي يك
              مرتبه قابل تمديد است. لازم به ذكر است تاريخ شروع جمع آوري وجوه از طريق نامه كتبي به
              استحضار متقاضي خواهد رسيد.
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 text-[22px] text-right pr-2">12</td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              شرط پرداخت وجوه تامین مالی به حساب متقاضی
            </td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              عامل پس از اخذ استعلام هاي لازم از تضامين مندرج در رديف 9 اين جدول و چك هاي پرداخت
              اقساط مندرج در رديف 5 اين جدول و كسب اطمينان از صحت اسناد ياد شده، وجوه جمع آوري شده
              را حداكثر طي دو روز كاري به حساب اعلام شده از سوي متقاضي واريز مي نمايد لذا متقاضي تا
              زمان استعلام كامل و اطمينان از صحت اسناد ياد شده توسط عامل، حق هرگونه اعتراضي را بابت
              دريافت وجوه تأمين مالي شده و رسيد قطعي اسناد ياد شده از خود سلب و اسقاط مينمايد.
              <br />
              تبصره 13: در صورت وجود هرگونه ايراد در چك هاي تضمين و چك هاي پرداخت اقساط <br />
              (بابت اصل و متفرعات) طي فرايند استعلام، متقاضي موظف است حداكثر طي دو روز كاري نسبت به
              به رفع ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد
              به اجراي بند ٣-١ مادة ٩ اين قرارداد ميباشد.
              <br />
              تبصره 14: در صورت وجود هرگونه ايراد در تضامین موجود، متقاضي موظف است حداكثر طي دو روز
              كاري نسبت به رفع ايرادات اقدام نمايد، در غيراينصورت عامل مخير به فسخ قرارداد اقدام
              نمايد، در غيراينصورت عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي بند ٢-١ مادة
              ٩ اين قرارداد ميباشد.
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 text-[22px] text-right pr-2">13</td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">ارائه گزارشات</td>
            <td className="border border-gray-300 text-[22px] text-right pr-2">
              متقاضي متعهد است نسبت به ارائة گزارش عملكرد از پيشرفت فيزيكي-ريالي اجراي طرح به صورت
              سه ماهه و ارائه صورتهاي مالي طرح (حسابرسي نشده) به صورت شش ماهه و ارائة صورتهاي مالي
              طرح (حسابرسي شده توسط حسابرس) در انتهاي دوره اقدام نمايد.
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-justify leading-relaxed text-[23px]">
        <br />

        <h3 className="font-bold mb-2 text-[23px] leading-relaxed">ماده 6) مدت قرارداد </h3>
        <p className="mb-2 text-[23px]">
          اين قرارداد از زمان امضاي قرارداد، تا 15 روز كاري پس از اتمام مدت فراخوان جمع آوري وجوه از
          اعتبار قانوني برخوردار است. زمان قرارداد به صلاحديد عامل به طور خودكار و طي ارسال نامه
          كتبي به متقاضي قابل تمديد است.{' '}
        </p>

        <h3 className="font-bold mb-2 text-[23px]">ماده 7)تعهدات و تأییدات متقاضی </h3>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">1)</span>
          متقاضي تعهد مي نمايد نسبت به معرفي نماينده يا نمايندگاني به عامل به منظور انجام اقدامات
          لازم از سوي متقاضي، حداكثر سه روز پس از شروع قرارداد، اقدام نمايد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">2)</span>
          متقاضي متعهد است در زمان امضاي قرارداد كليه مدارك لازم جهت تهيه گزارشات لازم كه توسط عامل
          تعيين ميشود، ظرف <strong>سه روز</strong> از تاريخ اعلامي تحويل عامل دهد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">3)</span>
          اخذ مجوز انتشار گواهي هاي شراكت از شركت فرابورس ايران منوط به ارائه كد بورسي و احراز هويت
          سجامي متقاضي مي باشد. در صورت عدم ارايه موارد فوق توسط متقاضي به عامل، عامل مخير به فسخ
          قرارداد است و متقاضي متعهد به اجراي بند ٢-١ مادة ٩ اين قرارداد ميباشد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">4)</span>
          متقاضي متعهد است هرگونه تغيير در اطلاعات و مفروضات ارائه شده را حداكثر طي{' '}
          <strong>٣ روز</strong> به عامل ارائه دهد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">5)</span>
          متقاضي متعهد است گزارشهاي ارائه شده توسط عامل را مطالعه و بررسي نموده و نسبت به تأييد و
          امضاي گزارش حداكثر طي <strong>3 روز</strong> از زمان ارائه گزارش ها، اقدام نمايد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">6)</span>
          متقاضي متعهد است همكاري لازم با عامل را در راستاي تسريع امور مربوط به موضوع قرارداد، به
          عمل آورد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">7)</span>
          متقاضي متعهد است اقدامات لازم را جهت بازديد كارشناس يا كارشناسان معرفي شده توسط عامل از
          محل متقاضي يا مكان اجراي عمليات وي و يا برگزاري جلسات ضروري با مديران متقاضي به عمل آورد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">8)</span>
          متقاضي متعهد به عدم استفاده از گزارش هاي ارائه شده توسط عامل در مواردي غير از موضوع اين
          قرارداد است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">9)</span>
          متقاضي اقرار مينمايد تمام ديون حال و موجل خود را اعلام نموده است و تكاليف مالياتي و بيمه
          تامين اجتماعي خود را رعايت نموده است تعهد مي نمايد كه رعايت نمايد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">10)</span>
          متقاضي تأييد و اقرار مي نمايد تمامي مجوزهاي لازم را جهت اجراي طرحي كه بابت آن به عامل
          درخواست تأمين مالي ارائه شده است، اخذ نموده است.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">11)</span>
          متقاضي تضمين مي نمايد كه مسئوليت كليه ضررها، خسارات و هزينه هاي متحمل شده در نتيجه يا در
          رابطه با عدم صحت اظهارات و ضمانت هاي مقرر در اين قرارداد را، جبران نمايد.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold text-[23px]">12)</span>
          متقاضي تأييد و تعهد ميكند كه اطلاعات ارائه شده از سوي متقاضي، افشاي درست و كاملي از كليه
          واقعيات مربوط به انتشار جهت تأمين مالي طرح را به دست ميدهد. هرگونه اهمال در اين خصوص كه
          باعث به خطا رفتن پروژه يا وارد آمدن خسارت به عامل به نمايندگي از دارندگان گواهي شراكت
          گردد، بر عهده متقاضي بوده و وي مسئول تمامي خسارتهاي ناشي از اين موضوع است.{' '}
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">13)</span>
          متقاضي اقرار و تعهد مي كند كه دعاوي مؤثر با اهميت حقوقي يا كيفري عليه شركت، اعضاي هيات
          مديره يا مديرعامل وي كه موجب اخلال در اجراي موضوع قرارداد مي باشد وجود ندارد. در صورت كشف
          هرگونه دعاوي مؤثر حين اجراي قرارداد، عامل مخير به فسخ قرارداد است و متقاضي متعهد به اجراي
          بند ٣-١ مادة ٩ اين قرارداد ميباشد. متقاضي به موجب اين بند حق هرگونه ادعايي در اين خصوص را
          از خود سلب و اسقاط نمود.
        </p>
      </div>
    </div>
  );
};

Page4.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page4;
