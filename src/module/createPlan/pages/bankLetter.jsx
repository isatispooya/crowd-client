import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import Loader from 'src/components/loader';
import { useBankLetter } from '../hooks';
import LogoSabad from '../Artboard 1 copy 3.png';
import TypeLogo from '../typography.png';
import Sign from '../signContract.png';
import moment from 'moment';

const BankLetter = () => {
  const [searchParams] = useSearchParams();
  const printRef = useRef();

  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue, setQrValue] = useState('');

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
      setQrValue(`${bankLetter?.qr_file_path || `https://example.com/verify/${finalUuid}`}`);
    }
  }, [finalUuid, bankLetter]);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  const handlePrint = () => {
    const content = printRef.current;
    const originalContents = document.body.innerHTML;

    const printStyles = `
      <style>
        @media print {
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
          }
          .print-container {
            padding: 20px;
            max-width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      </style>
    `;

    document.body.innerHTML = printStyles + content.outerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const agencyAgreementDate = bankLetter?.agency_agreement_date
    ? ` ${moment(bankLetter.agency_agreement_date).format('YYYY/MM/DD')} `
    : ' ';

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* دکمه پرینت */}
      <motion.div
        className="flex justify-center mb-4 no-print"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          type="button"
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          دانلود و پرینت نامه بانکی
        </button>
      </motion.div>

      {/* محتوای اصلی */}
      <motion.div
        ref={printRef}
        className="print-container font-sans rtl p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* سربرگ */}
        <div className="mb-6">
          <div className="h-2 bg-gradient-to-l from-purple-600 to-indigo-700 rounded-t-lg -mt-6 -mx-6 mb-4" />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={LogoSabad} alt="logo" className="w-16 h-auto" />
              <img src={TypeLogo} alt="type logo" className="w-20 h-auto ml-2" />
            </div>

            <div className="flex flex-col gap-1 text-left">
              {[
                {
                  label: 'تاریخ',
                  value: agencyAgreementDate,
                },
                { label: 'شماره', value: bankLetter?.contract_number },
                { label: 'پیوست', value: 'ندارد' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700">{item.label}:</span>
                  <span className="text-xs text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-base font-bold text-gray-800">بسمه تعالی</p>
        </div>
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-2">
            ریاست محترم {bankLetter?.bank} ایران شعبه مرکزی {bankLetter?.bank_branch} (کد شعبه{' '}
            {bankLetter?.bank_branch_code})
          </p>
          <p className="text-sm font-bold text-gray-800">
            موضوع: اخذ مجوز صدور ضمانت نامه تعهد پرداخت برای شرکت {bankLetter?.company_name}
          </p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm border border-gray-100"
        >
          <p className="text-gray-800 leading-relaxed">
            با سلام و مراتب احترام، به استحضار میرساند با توجه به درخواست شرکت{' '}
            {bankLetter?.company_name}
            ایساتیس (سهامی خاص) به شناسه ملی {bankLetter?.company_national_id} مبنی بر تأمین مالی آن
            شرکت محترم به مبلغ {formatNumber(bankLetter?.amount_of_investment)} از طریق انتشار و
            فروش گواهی های شراکت تأمین مالی جمعی، مطابق قرارداد عاملیت به شماره 137022464511/11/03
            مورخ
            {agencyAgreementDate} و قرارداد به شماره {bankLetter?.contract_number} آن شرکت متعهد به
            ارائه و قرارداد اقدامات اجرایی به شماره {bankLetter?.contract_number} آن شرکت متعهد به
            ارائه یک فقره ضمانتنامه تعهد پرداخت بانکی برابر اصل مبلغ تامین مالی به مبلغ{' '}
            {formatNumber(bankLetter?.amount_of_investment)}
            با اعتبار 12 ماهه و با قابلیت تمدید به درخواست ذینفع و با قابلیت دریافت مبلغ ضمانت نامه
            به صورت عندالمطالبه (به محض تقاضای ذینفع) و به دفعات میباشد. موضوع ضمانت نامه بابت تضمین
            پرداخت دیونی که ضمانت خواه به موجب قرارداد مذکور بر عهده می گیرد، می باشد، لذا خواهشمند
            است مراتب مورد بررسی قرار گرفته و جهت صدور ضمانت نامه تعهد پرداخت به ذینفعی شرکت
            سبدگردان ایساتیس پویا کیش به شماره ثبت 13702 شناسه ملی 14007805556 و کد اقتصادی
            411615733645 و به نشانی یزد - بلوار جمهوری اسلامی، کوچه شرق، ساختمان بورس، نیم طبقه و کد
            پستی 8917957914 اقدام فرمایید.( شماره شبای متعلق به شرکتسبد گردان ایساتیس پویا کیش نزد
            بانک پاسارگاد شعبه بلوار جمهوری یزد 470570300211515884588001IR)
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-row-reverse justify-between items-center"
        >
          <div className="w-6/12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="border border-gray-300 rounded-lg bg-white p-3 shadow-sm"
            >
              <img
                src={bankLetter?.signature_image || Sign}
                alt="امضای بانک"
                className="w-full max-h-32 object-contain"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="w-5/12 flex justify-start"
          >
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
          </motion.div>
        </motion.div>

        {/* پاورقی */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-3"
        >
          <p>
            {bankLetter?.footer_text ||
              'این نامه بدون مهر برجسته بانک و امضای مسئولین ذیربط فاقد اعتبار می‌باشد.'}
          </p>
          <p className="mt-1">
            {bankLetter?.verification_text || 'برای تایید اصالت این نامه، QR کد را اسکن نمایید.'}
          </p>
          {finalUuid && <p className="mt-1 text-xs text-gray-400">شناسه یکتا: {finalUuid}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BankLetter;
