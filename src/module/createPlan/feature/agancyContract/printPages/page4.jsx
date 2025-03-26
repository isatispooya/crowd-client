import React from 'react';
import { PropTypes } from 'prop-types';

const Page5 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[10px]">
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
              <td className="border border-gray-300 text-[10px]">10</td>
              <td className="border border-gray-300 text-[10px]">ارائه گزارشات</td>
              <td className="border border-gray-300 text-[10px]">
                متقاضي متعهد است نسبت به ارائة گزارش عملكرد از پيشرفت فيزيكي-ريالي اجراي طرح به صورت
                سه ماهه و ارائه صورتهاي مالي طرح (حسابرسي نشده) به صورت شش ماهه و ارائة صورتهاي مالي
                طرح (حسابرسي شده توسط حسابرس) در انتهاي دوره اقدام نمايد.
              </td>
            </tr>
          </tbody>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[10px]">11</td>
              <td className="border border-gray-300 text-[10px]">مدت فراخوان جمع‌آوری وجوه</td>
              <td className="border border-gray-300 text-[10px]">
                مدت فراخوان جمع آوري وجوه به تشخيص عامل تعيين ميگردد اين دوره با نظر عامل براي يك
                مرتبه قابل تمديد است. لازم به ذكر است تاريخ شروع جمع آوري وجوه از طريق نامه كتبي به
                استحضار متقاضي خواهد رسيد.
              </td>
            </tr>
          </tbody>

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">12</td>
              <td className="border border-gray-300"> نرخ سود مشارکت اسمی </td>
              <td className="border border-gray-300">
                {agencyContract.investor_request.annualized_profit_forecast * 100} درصد ساليانه.
                <br /> تبصره 7: متقاضي متعهد است در سررسيد گواهي شراكت مطابق با شرايط مندرج در
                قرارداد اقدامات اجرايي به محاسبة سود قطعي گواهي هاي شراكت اقدام نمايد و سود قطعي
                محاسبه شده را به تأييد حسابرس برساند.
              </td>
            </tr>
          </tbody>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300 text-[10px]">13</td>
              <td className="border border-gray-300 text-[10px]">ضامن </td>
              <td className="border border-gray-300 text-[10px]">
                ضامن معرفی شده توسط متقاضی که در قرارداد اقدامات اجرایی تعیین می شود.{' '}
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3 className="font-bold mb-2 text-[10px]">ماده 6) مدت قرارداد </h3>
        <p className="mb-2 text-[10px]">
          اين قرارداد از زمان امضاي قرارداد، تا 15 روز كاري پس از اتمام مدت فراخوان جمع آوري وجوه از
          اعتبار قانوني برخوردار است. زمان قرارداد به صلاحديد عامل به طور خودكار و طي ارسال نامه
          كتبي به متقاضي قابل تمديد است.{' '}
        </p>

        <h3 className="font-bold mb-2 text-[10px]">ماده 7)تعهدات و تأییدات متقاضی </h3>
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">1)</span>
          متقاضي تعهد مي نمايد نسبت به معرفي نماينده يا نمايندگاني به عامل به منظور انجام اقدامات
          لازم از سوي متقاضي، حداكثر سه روز پس از شروع قرارداد، اقدام نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">2)</span>
          متقاضي متعهد است در زمان امضاي قرارداد كليه مدارك لازم جهت تهيه گزارشات لازم كه توسط عامل
          تعيين ميشود، ظرف <strong>سه روز</strong> از تاريخ اعلامي تحويل عامل دهد.
        </p>
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">3)</span>
          اخذ مجوز انتشار گواهي هاي شراكت از شركت فرابورس ايران منوط به ارائه كد بورسي و احراز هويت
          سجامي متقاضي مي باشد. در صورت عدم ارايه موارد فوق توسط متقاضي به عامل، عامل مخير به فسخ
          قرارداد است و متقاضي متعهد به اجراي بند ٢-١ مادة ٩ اين قرارداد ميباشد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">4)</span>
          متقاضي متعهد است هرگونه تغيير در اطلاعات و مفروضات ارائه شده را حداكثر طي{' '}
          <strong>٣ روز</strong> به عامل ارائه دهد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">5)</span>
          متقاضي متعهد است گزارشهاي ارائه شده توسط عامل را مطالعه و بررسي نموده و نسبت به تأييد و
          امضاي گزارش حداكثر طي <strong>3 روز</strong> از زمان ارائه گزارش ها، اقدام نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">6)</span>
          متقاضي متعهد است همكاري لازم با عامل را در راستاي تسريع امور مربوط به موضوع قرارداد، به
          عمل آورد.
        </p>
        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">7)</span>
          متقاضي متعهد است اقدامات لازم را جهت بازديد كارشناس يا كارشناسان معرفي شده توسط عامل از
          محل متقاضي يا مكان اجراي عمليات وي و يا برگزاري جلسات ضروري با مديران متقاضي به عمل آورد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">8)</span>
          متقاضي متعهد به عدم استفاده از گزارش هاي ارائه شده توسط عامل در مواردي غير از موضوع اين
          قرارداد است.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">9)</span>
          متقاضي اقرار مينمايد تمام ديون حال و موجل خود را اعلام نموده است و تكاليف مالياتي و بيمه
          تامين اجتماعي خود را رعايت نموده است تعهد مي نمايد كه رعايت نمايد.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">10)</span>
          متقاضي تأييد و اقرار مي نمايد تمامي مجوزهاي لازم را جهت اجراي طرحي كه بابت آن به عامل
          درخواست تأمين مالي ارائه شده است، اخذ نموده است.
        </p>

        <p className="mb-3 pr-4 text-[10px]">
          <span className="font-bold text-[10px]">11)</span>
          متقاضي تضمين مي نمايد كه مسئوليت كليه ضررها، خسارات و هزينه هاي متحمل شده در نتيجه يا در
          رابطه با عدم صحت اظهارات و ضمانت هاي مقرر در اين قرارداد را، جبران نمايد.
        </p>


      </div>
    </div>
  );
};

Page5.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page5;
