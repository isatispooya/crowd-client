import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { PrintableLayout } from '../layouts';
import useBankLetter from '../hooks/useBankLetter';

const BankLetterDraftPage = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);

  useEffect(() => {
    if (urlUuid && urlUuid !== 'undefined') {
      setFinalUuid(urlUuid);
    }
  }, [urlUuid]);

  const { isLoading, refetch } = useBankLetter(finalUuid !== 'undefined' ? finalUuid : null);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const headerInfo = [
    {
      label: 'تاریخ',
      value: '........',
    },
    { label: 'شماره', value: '........' },
    { label: 'پیوست', value: '........' },
  ];

  const title = `ریاست محترم ........  شعبه ........ (کد شعبه ........)`;
  const subtitle = `موضوع: اخذ مجوز صدور ضمانت نامه تعهد پرداخت برای شرکت ........`;

  return (
    <PrintableLayout
      title={title}
      subtitle={subtitle}
      headerInfo={headerInfo}
      printButtonText="دانلود و پرینت نامه بانکی"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm border border-gray-100 mt-10"
      >
        <div className="text-gray-800 leading-relaxed text-right" dir="rtl">
          <p className="font-semibold mb-4">با سلام و مراتب احترام</p>
          <p>
            به استحضار میرساند با توجه به درخواست شرکت ........ به شناسه ملی ........
            مبنی بر تأمین مالی آن شرکت محترم به مبلغ ........ میلیون ریال از طریق انتشار و فروش
            گواهی های شراکت تأمین مالی جمعی، مطابق قرارداد عاملیت به شماره  ........ مورخ ........
            و قرارداد اجرایی به شماره  ........ آن شرکت متعهد به ارائه یک فقره ضمانتنامه تعهد
            پرداخت بانکی برابر اصل مبلغ تامین مالی به مبلغ ........ میلیون ریال با اعتبار 12 ماهه و
            با قابلیت تمدید به درخواست ذینفع و با قابلیت دریافت مبلغ ضمانت نامه به صورت عندالمطالبه
            (به محض تقاضای ذینفع) و به دفعات میباشد. موضوع ضمانت نامه بابت تضمین پرداخت دیونی که
            ضمانت خواه به موجب قرارداد مذکور بر عهده می گیرد، می باشد، لذا خواهشمند است مراتب مورد
            بررسی قرار گرفته و جهت صدور ضمانت نامه تعهد پرداخت به ذینفعی شرکت سبدگردان ایساتیس پویا
            کیش به شماره ثبت 13702 شناسه ملی 14007805556 و کد اقتصادی 411615733645 و به نشانی یزد -
            بلوار جمهوری اسلامی، کوچه شرق، ساختمان بورس، نیم طبقه و کد پستی 8917957914 اقدام
            فرمایید. (شماره شبای متعلق به شرکت سبد گردان ایساتیس پویا کیش نزد بانک پاسارگاد شعبه
            بلوار جمهوری یزد IR470570300211515884588001)
          </p>
        </div>
      </motion.div>
    </PrintableLayout>
  );
};

export default BankLetterDraftPage;
