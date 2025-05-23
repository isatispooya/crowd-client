import React from 'react';
import { PropTypes } from 'prop-types';

const Page7 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[23px]">
      <p className="mb-3 pr-8 text-[23px]">6. مشخصات اعضای حقیقی و حقوقی عضو هیئت مدیره؛</p>
        <p className="mb-3 pr-8 text-[23px]">7. مشخصات سهام داران شرکت متقاضی؛</p>
        <p className="mb-3 pr-8 text-[23px]">
          8. امتیازات سهام ممتاز و نصاب سهام سهام داران ممتاز در صورت وجود؛
        </p>
        <p className="mb-3 pr-8 text-[23px]">9. لیست دارایی و بدهی ها؛</p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">تبصره 1:</span>
          حداقل مفاد برنامه کسب وکار متقاضی به شرح پیوست شماره سه این قرارداد است.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">ماده 11) محرمانگی</span>
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          اصل برمحرمانگی اطلاعات است؛ اما موارد موضوع این ماده اسرار تجاری و اطلاعات محرمانه نیست و
          عامل حق دارد تمام یا بخشی از اطلاعات مندرج در بند فوق را جهت رعایت شفافیت در فرایندهای
          تأمین مالی جمعی، به صورت عمومی نمایش دهد یا در مذاکرات جذب منابع مالی، آنها را به تأمین
          کنندگان ارائه و افشا کند. افشا و انتشار موارد موضوع این بند، مشمول هیچ کدام از تعهدات
          رعایت محرمانگی نبوده و عامل هیچ گونه مسئولیتی در قبال ارائه و انتشار این اطلاعات ندارد.
        </p>
        <p className="mb-3 pr-4 text-[23px]">
          مضافا متقاضی متعهد است تمامی قراردادهای باز برای فروش محصولات مندرج در طرح و همچنین
          محصولات تولید شده با منابع داخلی متقاضی را به اطلاع عامل برساند بدیهی است معیار تولید
          ،فروش این محصولات و سود حاصل شده در طرح بر اساس این اطلاعات و به تشخیص عامل خواهد بود.
        </p>

        <p className="mb-3 pr-4 text-[23px]">
          <span className="font-bold">ماده 12) تضامین و جبران خسارات</span>
        </p>

        <p className="mb-3 pr-8 text-[23px]">
          1. متقاضی متعهد است کلیه خساراتی را که درنتیجه عدم ایفای تعهدات خود به تأمین کنندگان یا
          عامل یا نهاد مالی وارد می گردد پرداخت نماید. ازجمله متقاضی متعهد است درهرصورت پرداخت اصل
          منابع مالی تأمین کنندگان به علاوه سود سرمایه گذاری محقق شده به شرح را تضمین نماید؛ جز در
          مواردی که در این قرارداد صراحتا خلاف آن توافق شده است، در صورت نقض هر کدام از تعهدات مندرج
          در کل این قرارداد توسط متقاضی یا اشخاص طرف قرارداد با وی، متقاضی متعهد است (۱۵۰٪ یکصد و
          پنجاه درصد) مبلغ منابع مالی مورد نیاز اعلامی (سرمایه) را به عنوان وجه التزام به عامل
          بپردازد. مبلغ وجه التزام مندرج در این بند حداقل خسارت است که عامل می تواند با اثبات ورود
          خسارت بیش تر، نسبت به مطالبه آن اقدام نماید. درهرصورت تشخیص عامل، ملاک تعیین میزان خسارات
          وارده خواهد بود.
        </p>

        <p className="mb-3 pr-8 text-[23px]">
          2. به منظور تضمین ایفای تعهدات مندرج در کل این قرارداد و قوانین و مقررات لازم الاجرا در
          جمهوری اسلامی ایران و شرایط و ضوابط سکوی تأمین مالی جمعی عامل و صرف مبالغ سرمایه در راستای
          امور کسب وکار، طبق تأیید و نظارت عامل، متقاضی متعهد است یک فقره چک صیادی تضمینی به تاریخ
          ابتدای دوره اجرای طرح به مبلغ (۱۵۰٪ یکصد و پنجاه درصد) مجموع منابع مالی مورد نیاز خود را
          به عامل بسپارد تا در صورت نقض هرکدام از تعهدات، عامل از طریق تضمین موضوع این بند، نسبت به
          مطالبه خسارات وارده اقدام کند. متقاضی به صورت غیرقابل برگشت، کلیه حقوق و اختیارات لازم جهت
          اجرای مفاد این بند را بدون نیاز به مراجعه به مراجع قضایی یا داوری به عامل اعطا نموده است و
          حق هرگونه ادعایی دراین خصوص اعم از دعاوی خیانت درامانت یا استرداد وجه را علیه عامل از خود
          سلب و ساقط کرده است.
        </p>

        <p className="mb-3 pr-8 text-[23px]">
          3. در خصوص این تضامین، عامل از این حق برخوردار است که علاوه بر موارد مصرح در قرارداد که
          وصول تضامین به عنوان ضمانت اجرای تعهد خاصی بیان شده، به طورکلی در سایر مواردی نیز که به
          موجب رأی مراجع قضایی متقاضی متعهد به جبران خسارت است، به عنوان وصول بخشی از خسارات مورد
          حکم، از چک های موصوف نیز استفاده نماید.
        </p>

        <p className="mb-3 pr-8 text-[23px]">
          4. در خصوص نحوه ی صدور چکها، خریدار متعهد است چک های فوق را با شرایط زیر به عامل تسلیم
          نماید:
        </p>

        <p className="mb-3 pr-12 text-[23px]">
          الف) لازم است کلیه اعضای صاحب امضاء متقاضی ظهر چک های موضوع این بند را به عنوان ضامن امضا
          نمایند.
          <br />
          ب) کلیه ی چکها در سامانه صیاد بانک مرکزی به ثبت رسیده باشد.
          <br />
          ج) در قسمت «بابت» و «شرح چک» در سامانه صیاد، عبارت «تادیه دیون» انتخاب شده باشد.
          <br />
          د) رونوشت رسید ثبت چکها، هم زمان با تسلیم برگه چکها، به عامل تسلیم شود.
        </p>

        <p className="mb-3 pr-8 text-[23px]">
          5. تضمین مندرج در قرارداد، ظرف مهلت «15» روز کاری از تاریخ احراز و تأیید ایفای کلیه تعهدات
          متقاضی توسط نهاد مالی یا کارگروه ارزیابی، به وی مسترد می گردد.
        </p>
        <h3 className="font-bold mb-2 text-[23px] text-right">
          ماده 13) عدم تضمین موفقیت طرح در جذب سرمایه
        </h3>
        <p className="mb-3 pr-4 text-[23px]">
          عامل تنها بستری جهت تأمین مالی جمعی برای متقاضی و تأمین کنندگان فراهم می نماید؛ ازاین رو
          عامل تحت هیچ عنوان مواردی اعم از موفقیت طرح در جذب سرمایه و مانند آن را تضمین نمی نماید.
        </p>

        <h3 className="font-bold mb-2 text-[23px] text-right">
          ماده 14) گزارش دهی متقاضی و اعمال حق نظارت عامل
        </h3>
        <p className="mb-3 pr-8 text-[23px]">
          1. به منظور اعمال حق نظارت موضوع این قرارداد، عامل ، ناظر فنی قرارداد را به متقاضی معرفی
          می نماید. درصورتیکه ناظر فنی قرارداد تغییر کند، عامل متعهد است ناظر فنی جدید را به متقاضی
          معرفی نماید.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          2. عامل بدون هرگونه محدودیت و ممنوعیتی از حق نظارت کامل و بدون قیدوشرط نسبت به اعمال و
          اقدامات متقاضی در صرف مبالغ منابع مالی جمع آوری شده و اجرای طرح در هر مقطعی در راستای
          فراخوان تأمین مالی جمعی برخوردار است و می تواند در هر زمان هرگونه گزارش مالی و غیرمالی
          مرتبط با طرح متقاضی را از وی دریافت نماید. عامل به منظور اجرای حق مندرج در این بند،
          می‌تواند از خدمات مؤسسات حسابرسی یا مشاوره اشخاص خبره استفاده نماید.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          3. صرف و هزینه کردن هرگونه مبالغ از محل منابع مالی جمع آوری شده در نتیجه انتشار فراخوان
          تأمین مالی جمعی در سکوی عامل، منوط و مشروط به ارائه تأییدیه مکتوب عامل است؛ در غیر این
          صورت اقدام متقاضی در بهره برداری و تصرف نسبت به مبالغ و وجوه منابع مالی، نقض تعهدات متقاضی
          محسوب و طبق مقررات و ضمانت اجراهای مندرج در این قرارداد با وی برخورد خواهد شد.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          4. در پایان دوره اجرای طرح، متقاضی موظف است اطلاعات لازم جهت تهیه گزارش تسویه را مطابق
          سازوکارهای فرابورس یا کارگروه ارزیابی در خصوص گزارشهای مالی مرتبط و وضعیت نهایی میزان
          درآمد طرح و مقدار سود و زیان آن را به تفکیک به اطلاع عامل برساند.
        </p>
        <p className="mb-3 pr-8 text-[23px]">
          5. در صورت عدم تأیید گزارش تسویه از سوی فرابورس و یا کارگروه ارزیابی، متقاضی باید نسبت به
          ارائه اطلاعات صحیح و معتبر مجددا اقدام نماید و در این زمینه کلیه همکاری های لازم را با
          عامل بکار بندد؛ در غیر این صورت مشمول ضمانت اجرای ارائه اطلاعات نادرست و نامعتبر مندرج در
          این قرارداد خواهد بود.
        </p>


      </div>
    </div>
  );
};

Page7.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page7;
