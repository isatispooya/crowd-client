import React from 'react';
import { PropTypes } from 'prop-types';

const Page7 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="text-justify leading-relaxed space-y-6">
        {/* Force Majeure Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-right">
            ماده 10) حوادث ناگهانی و فورس ماژور
          </h3>

          <p className="text-base md:text-lg lg:text-xl text-right">
            هرگاه به علت وقوع حوادث غيرمترقبه (به غير از تغيير نرخ ارز، تورم، كرونا و تحريم هاي بين
            المللي) مانند ســـيل، زلزله، و ... هريك از طرفين نتواند تعهدات خود را انجام دهد در
            صـــورت اطلاع حداكثر طي 7 روز تقويمي به طرف مقابل، هيچگونه مســـئوليتي براي وي متصـــور
            نبوده و قرارداد منعقده كماكان به قوّت خود باقي خواهدبود. پس از رفع شرايط فوق، طرفين
            متعهد به ادامه انجام تعهدات مي باشند. چنانچه پس از مدّتّ يك ماه شــرايط غيرمترقبه برطرف
            نگرديد عامل به صــلاحديد خود نســبت به فســخ قرارداد اقدام نموده و دريافت كارمزد از
            متقاضــي اقدام مينمايد.
          </p>

          <p className="pr-2 md:pr-4 text-base md:text-lg lg:text-xl text-right">
            <span className="font-bold">تبصره 24</span>
            چنانچه مانعي پس از انعقاد قرارداد به وجود آيد، كه در زمان عقد قرارداد قابل رفع، پيشگيري
            و پيشبيني نبوده اند و امكان ادامه قرارداد را به صورت كلي از بین مي برد، عامل مخير به فسخ
            قرارداد خواهد بود و به صلاحديد خود متناسب با پيشرفت انجام خدمات نسبت به دريافت كارمزد از
            متقاضي اقدام مينمايد.
          </p>
        </div>

        {/* Dispute Resolution Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-right">
            ماده 11) حل اختلاف
          </h3>

          <p className="text-base md:text-lg lg:text-xl text-right">
            در صورت بروز هرگونه اختلاف در خصوص اين قرارداد، موضوع بدواً از طريق مذاكره ميان طرفين
            قرارداد بررسي و حداكثر طي دو هفته رفع خواهد شد. در صورت عدم توافق، موضوع در هيئت داوري
            سازمان بورس و اوراق بهادار قابل رسيدگي ميباشد.
          </p>
        </div>

        {/* Legal Residence Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-right">
            ماده 12) اقامتگاه قانونی
          </h3>

          <p className="text-base md:text-lg lg:text-xl text-right">
            اقامتگاه قانوني طرفين قرارداد به شرح مذكور در مادة (١) ميباشد. در صورت تغيير، طرفين
            قرارداد مكلف ميباشند حداكثر ظرف هفت روز يكديگر را كتبا مطلع نمايند. در غير اين صورت
            ارسال هرگونه اسناد و اوراق اداري و قضايي اعم از مرسولات اداري، اخطاريه ها و احضاريه ها
            به نشاني هاي فوق الذكر، دريافت شده محسوب ميگردد.
          </p>
        </div>

        {/* Contract Validity Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-right">
            ماده 13) اعتبار قرارداد
          </h3>

          <p className="text-base md:text-lg lg:text-xl text-right">
            اين قرارداد در <strong>13 ماده</strong> و <strong>24 تبصره</strong>، در دو نسخه واحد و
            بدون پيوست، تنظيم گرديد كه پس از امضاء كليه نسخ آن در حكم واحد بوده و لازم الاجرا مي
            باشند.
          </p>
        </div>
      </div>
    </div>
  );
};

Page7.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page7;
