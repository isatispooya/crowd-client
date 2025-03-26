import React from 'react';
import { PropTypes } from 'prop-types';

const Page10 = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="contract-page page-1">
      <div className="text-justify leading-relaxed text-[10px]">
        <h3 className="font-bold mb-2 text-[10px]">ماده 12) اقامتگاه قانونی </h3>
        <p className="mb-2 text-[10px]">
          اقامتگاه قانوني طرفين قرارداد به شرح مذكور در مادة (١) ميباشد. در صورت تغيير، طرفين
          قرارداد مكلف ميباشند حداكثر ظرف هفت روز يكديگر را كتبا مطلع نمايند. در غير اين صورت ارسال
          هرگونه اسناد و اوراق اداري و قضايي اعم از مرسولات اداري، اخطاريه ها و احضاريه ها به نشاني
          هاي فوقالذكر، دريافت شده محسوب ميگردد.
        </p>

        <h3 className="font-bold mb-2 text-[10px]">ماده 13) اعتبار قرارداد</h3>
        <p className="mb-2 text-[10px]">
          اين قرارداد در <strong>13 ماده</strong> و <strong>24 تبصره</strong>، در دو نسخه واحد و
          بدون پيوست، تنظيم گرديد كه پس از امضاء كليه نسخ آن در حكم واحد بوده و لازم الاجرا مي
          باشند.
        </p>
      </div>
    </div>
  );
};

Page10.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default Page10;
