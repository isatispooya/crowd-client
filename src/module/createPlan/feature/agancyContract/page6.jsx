import React from 'react';
import { PropTypes } from 'prop-types';

const Page6 = ({ agencyContract }) => {
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
              <td className="border border-gray-300">11</td>
              <td className="border border-gray-300">مدت فراخوان جمع‌آوری وجوه</td>
              <td className="border border-gray-300">
                مدت فراخوان جمع آوري وجوه به تشخيص عامل تعيين ميگردد اين دوره با نظر عامل براي يك
                مرتبه قابل تمديد است. لازم به ذكر است تاريخ شروع جمع آوري وجوه از طريق نامه كتبي به
                استحضار متقاضي خواهد رسيد.
              </td>
            </tr>
          </tbody>
          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">12</td>
              <td className="border border-gray-300">شرط پرداخت وجوه تامین مالی به حساب متقاضی</td>
              <td className="border border-gray-300">
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

          <tbody className="border border-gray-300">
            <tr>
              <td className="border border-gray-300">13</td>
              <td className="border border-gray-300">ارائه گزارشات</td>
              <td className="border border-gray-300">
                متقاضي متعهد است نسبت به ارائة گزارش عملكرد از پيشرفت فيزيكي-ريالي اجراي طرح به صورت
                سه ماهه و ارائه صورتهاي مالي طرح (حسابرسي نشده) به صورت شش ماهه و ارائة صورتهاي مالي
                طرح (حسابرسي شده توسط حسابرس) در انتهاي دوره اقدام نمايد.
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3 className="font-bold mb-2">ماده 6) مدت قرارداد </h3>
        <p className="mb-2">
          اين قرارداد از زمان امضاي قرارداد، تا 15 روز كاري پس از اتمام مدت فراخوان جمع آوري وجوه از
          اعتبار قانوني برخوردار است. زمان قرارداد به صلاحديد عامل به طور خودكار و طي ارسال نامه
          كتبي به متقاضي قابل تمديد است.{' '}
        </p>

        <h3 className="font-bold mb-2">ماده 7)تعهدات و تأییدات متقاضی </h3>
        <p className="mb-3 pr-4">
          <span className="font-bold">1)</span>
          متقاضي تعهد مي نمايد نسبت به معرفي نماينده يا نمايندگاني به عامل به منظور انجام اقدامات
          لازم از سوي متقاضي، حداكثر سه روز پس از شروع قرارداد، اقدام نمايد.
        </p>
      </div>
    </div>
  );
};

Page6.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page6;
