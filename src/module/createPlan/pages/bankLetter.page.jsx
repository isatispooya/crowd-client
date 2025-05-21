import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import moment from 'moment-jalaali';
import { CircularProgress } from '@mui/material';
import { PrintableLayout } from '../layouts';
import useBankLetter from '../hooks/useBankLetter';
import { Sign } from '../assets';

const BankLetter = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue, setQrValue] = useState('');

  const banks = [
    { id: 1, name: 'بانک ملی ایران' },
    { id: 2, name: 'بانک سپه' },
    { id: 3, name: 'بانک صنعت و معدن' },
    { id: 4, name: 'بانک کشاورزی' },
    { id: 5, name: 'بانک مسکن' },
    { id: 6, name: 'بانک توسعه صادرات ایران' },
    { id: 7, name: 'بانک توسعه تعاون' },
    { id: 8, name: 'پست بانک ایران' },
    { id: 9, name: 'بانک اقتصاد نوین' },
    { id: 10, name: 'بانک پارسیان' },
    { id: 11, name: 'بانک کارآفرین' },
    { id: 12, name: 'بانک سامان' },
    { id: 13, name: 'بانک سینا' },
    { id: 14, name: 'بانک خاورمیانه' },
    { id: 15, name: 'بانک شهر' },
    { id: 16, name: 'بانک دی' },
    { id: 17, name: 'بانک صادرات ایران' },
    { id: 18, name: 'بانک ملت' },
    { id: 19, name: 'بانک تجارت' },
    { id: 20, name: 'بانک رفاه کارگران' },
    { id: 21, name: 'بانک حکمت ایرانیان' },
    { id: 22, name: 'بانک گردشگری' },
    { id: 23, name: 'بانک ایران زمین' },
    { id: 24, name: 'بانک قوامین' },
    { id: 25, name: 'بانک انصار' },
    { id: 26, name: 'بانک سرمایه' },
    { id: 27, name: 'بانک پاسارگاد' },
    { id: 28, name: 'بانک مشترک ایران-ونزوئلا' },
  ];

  useEffect(() => {
    if (urlUuid && urlUuid !== 'undefined') {
      setFinalUuid(urlUuid);
    }
  }, [urlUuid]);

  const {
    data: bankLetter,
    isLoading,
    refetch,
  } = useBankLetter(finalUuid !== 'undefined' ? finalUuid : null);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined' && bankLetter) {
      setQrValue('https://app.isatiscrowd.ir/bankLetter');
    }
  }, [finalUuid, bankLetter]);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  const agencyAgreementDate = bankLetter?.agency_agreement_date
    ? ` ${moment(bankLetter.agency_agreement_date).format('jYYYY/jMM/jDD')} `
    : ' ';

  if (isLoading) {
    return <CircularProgress />;
  }

  const headerInfo = [
    {
      label: 'تاریخ',
      value: agencyAgreementDate,
    },
    { label: 'شماره', value: bankLetter?.bank_letter_number },
    { label: 'پیوست', value: 'ندارد' },
  ];

  const getBankNameById = (id) => {
    if (!banks || !Array.isArray(banks)) {
      return 'لیست بانک‌ها نامعتبر است';
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return 'شناسه نامعتبر است';
    }

    const bank = banks.find((bankss) => bankss.id === numericId);
    return bank?.name || 'بانک نامشخص';
  };

  const title = `ریاست محترم ${getBankNameById(bankLetter?.bank)}  شعبه ${
    bankLetter?.bank_branch
  } (کد شعبه ${bankLetter?.bank_branch_code})`;
  const subtitle = `موضوع: اخذ مجوز صدور ضمانت نامه تعهد پرداخت برای شرکت ${bankLetter?.company_name}`;

  const qrCodeComponent = (
    <motion.div
      whileHover={{ rotate: 5, scale: 1.05 }}
      className="w-32 h-32 border border-gray-300 flex justify-center items-center rounded-lg bg-white shadow-sm p-2"
    >
      <div className="text-center">
        <div className="mx-auto bg-white rounded-md flex items-center justify-center">
          <QRCode value={qrValue} size={90} level="H" fgColor="#4B0082" bgColor="#FFFFFF" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <PrintableLayout
      title={title}
      subtitle={subtitle}
      headerInfo={headerInfo}
      printButtonText="دانلود و پرینت نامه بانکی"
      signatureImage={bankLetter?.signature_image || Sign}
      qrCodeComponent={qrCodeComponent}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm border border-gray-100"
      >
        <div className="text-gray-800 leading-relaxed text-right" dir="rtl">
          <p className="font-semibold mb-4">با سلام و مراتب احترام</p>
          <p>
            به استحضار میرساند با توجه به درخواست شرکت {bankLetter?.company_name}(
            {bankLetter?.registration_type_title}) به شناسه ملی {bankLetter?.company_national_id}{' '}
            مبنی بر تأمین مالی آن شرکت محترم به مبلغ{' '}
            {formatNumber((bankLetter?.amount_of_investment ?? 0) / 1000000)} میلیون ریال از طریق
            انتشار و فروش گواهی های شراکت تأمین مالی جمعی، مطابق قرارداد عاملیت به شماره 1
            {bankLetter?.contract_number} مورخ {agencyAgreementDate} و قرارداد اجرایی به شماره 2
            {bankLetter?.contract_number} آن شرکت متعهد به ارائه یک فقره ضمانتنامه تعهد پرداخت بانکی
            برابر اصل مبلغ تامین مالی به مبلغ{' '}
            {formatNumber((bankLetter?.amount_of_investment ?? 0) / 1000000)} میلیون ریال با اعتبار
            12 ماهه و با قابلیت تمدید به درخواست ذینفع و با قابلیت دریافت مبلغ ضمانت نامه به صورت
            عندالمطالبه (به محض تقاضای ذینفع) و به دفعات میباشد. موضوع ضمانت نامه بابت تضمین پرداخت
            دیونی که ضمانت خواه به موجب قرارداد مذکور بر عهده می گیرد، می باشد، لذا خواهشمند است
            مراتب مورد بررسی قرار گرفته و جهت صدور ضمانت نامه تعهد پرداخت به ذینفعی شرکت سبدگردان
            ایساتیس پویا کیش به شماره ثبت 13702 شناسه ملی 14007805556 و کد اقتصادی 411615733645 و به
            نشانی یزد - بلوار جمهوری اسلامی، کوچه شرق، ساختمان بورس، نیم طبقه و کد پستی 8917957914
            اقدام فرمایید. (شماره شبای متعلق به شرکت سبد گردان ایساتیس پویا کیش نزد بانک پاسارگاد
            شعبه بلوار جمهوری یزد IR470570300211515884588001)
          </p>
        </div>
      </motion.div>
    </PrintableLayout>
  );
};

export default BankLetter;
