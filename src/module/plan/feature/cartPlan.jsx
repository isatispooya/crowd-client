import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProgressLineChart from 'src/components/progressLine';
import { OnRun } from 'src/api/OnRun';
import { formatNumber } from 'src/utils/formatNumbers';
import useGetProfile from 'src/module/profile/hooks/useGetProfile';
import usePicure from '../service/use-picture';

const CartPlan = ({
  trace_code,
  persianName,
  rateOfReturn,
  totalUnits,
  totalPrice,
  crowdFundingType,
  company,
  statusSecond,
  amountCollectedNow,
  realPersonMinPrice,
  approved_underwriting_start_date,
  payment_date
}) => {
  const navigate = useNavigate();
  const { data: picture } = usePicure(trace_code);
  const { data: profileData } = useGetProfile();

  const statusValue = parseInt(statusSecond, 10);
  const isCompleted = statusValue === 4;

  const statusMapping = {
    1: 'شروع شده',
    2: 'شروع نشده',
    3: 'تمدید شده',
    4: 'سر رسید ناموفق',
    5: 'خاتمه یافته',
  };

  const statusColorMapping = {
    1: 'bg-green-500', // شروع شده - سبز
    2: 'bg-blue-500',  // شروع نشده - آبی
    3: 'bg-yellow-500', // تمدید شده - زرد
    4: 'bg-red-500',   // سر رسید ناموفق - قرمز
    5: 'bg-blue-500',  // خاتمه یافته - آبی 
  };

  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  const handleShare = async () => {
    try {
      const nationalId = profileData?.acc?.uniqueIdentifier;
      const shareUrl = `${window.location.origin}/plan/${trace_code}?rf=${nationalId}`;
      
      const entry_url = localStorage.getItem('entry_url') || '';
      const tag = localStorage.getItem('tag') || '';
      const utm_medium = localStorage.getItem('utm_medium') || '';
      const utm_term = localStorage.getItem('utm_term') || '';
      const utm_campaign = localStorage.getItem('utm_campaign') || '';
      const utm_content = localStorage.getItem('utm_content') || '';
      const utm_source = localStorage.getItem('utm_source') || '';
      
      const url = new URL(shareUrl);
      if (entry_url) url.searchParams.append('entry_url', entry_url);
      if (tag) url.searchParams.append('tag', tag);
      if (utm_medium) url.searchParams.append('utm_medium', utm_medium);
      if (utm_term) url.searchParams.append('utm_term', utm_term);
      if (utm_campaign) url.searchParams.append('utm_campaign', utm_campaign);
      if (utm_content) url.searchParams.append('utm_content', utm_content);
      if (utm_source) url.searchParams.append('utm_source', utm_source);
      
      if (navigator.share) {
        await navigator.share({
          title: persianName,
          text: `طرح سرمایه‌گذاری ${persianName} را مشاهده کنید`,
          url: url.toString()
        });
      } else {
        await navigator.clipboard.writeText(url.toString());
        toast.success('لینک با موفقیت کپی شد');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }
      toast.error('خطا در اشتراک‌گذاری لینک');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col h-[750px] p-4 md:p-6 lg:p-8 rounded-lg shadow-2xl transition-shadow mx-auto 
        w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
          isCompleted ? 'bg-gray-200' : 'bg-white'
        }`}
    >
      <div className="relative h-48 mb-10">
        <img
          src={picture?.picture ? `${OnRun}/${picture.picture}` : '/img/nopic.jpg'}
          alt={persianName || 'تصویر موجود نیست'}
          className="object-cover w-full h-full rounded-lg"
        />
        <div className={`absolute top-4 left-4 ${statusColorMapping[statusValue]} py-1 px-4 rounded-full text-white text-xs sm:text-sm font-medium shadow-md transform -rotate-12 origin-top-left`}>
          {statusMapping[statusValue]}
        </div>

        <div className="absolute top-2 right-2 bg-green-600 py-1 px-3 rounded-full text-white text-xs sm:text-sm font-semibold shadow-md">
          %{rateOfReturn}
        </div>
      </div>

      <div className="flex flex-col bg-gray-50 rounded-lg h-96 shadow-inner p-4">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center text-gray-800 mt-6 min-h-[3.5rem] break-words">
          {persianName}
        </h2>

        <div className="grid gap-2 mt-6 sm:gap-3 text-gray-700">
          <div className="grid grid-cols-12 items-center">
            <span className="text-xs sm:text-sm col-span-5">مبلغ کل:</span>
            <span className="text-xs sm:text-sm font-bold col-span-7 text-left">{formatNumber(totalPrice)} ریال</span>
          </div>

          <div className="grid grid-cols-12 items-center">
            <span className="text-xs sm:text-sm col-span-5">شرکت:</span>
            <span className="text-xs sm:text-sm font-bold col-span-7 text-left">{company}</span>
          </div>
          <div className="grid grid-cols-12 items-center">
            <span className="text-xs sm:text-sm col-span-5">تعداد گواهی‌های شراکت:</span>
            <span className="text-xs sm:text-sm font-bold col-span-7 text-left">{totalUnits}</span>
          </div>
          <div className="grid grid-cols-12 items-center">
            <span className="text-xs sm:text-sm col-span-5">نوع تامین مالی:</span>
            <span className="text-xs sm:text-sm font-bold col-span-7 text-left">{crowdFundingType}</span>
          </div>
          <div className="grid grid-cols-12 items-center mb-4">
            <span className="text-xs sm:text-sm col-span-5">حداقل سرمایه‌گذاری:</span>
            <span className="text-xs sm:text-sm font-bold col-span-7 text-left">
              {formatNumber(realPersonMinPrice)} ریال
            </span>
          </div>

          {payment_date && approved_underwriting_start_date && statusValue === 5 && (
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mt-2 shadow-sm">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-700">جمع‌آوری وجوه:</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 font-bold text-sm">
                  {Math.ceil(
                    (new Date(payment_date) - new Date(approved_underwriting_start_date)) /
                    (1000 * 60 * 60 * 24)
                  )}
                </span>
                <span className="text-gray-600 mr-1 text-sm">روز</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-end">
        <div className="px-4">
          <ProgressLineChart
            progress={Math.round((amountCollectedNow / totalPrice) * 100)}
            label="تامین شده"
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <div className="flex justify-between w-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-white bg-blue-600 border-b-1 border-blue-900 rounded-2xl px-4 py-2 font-bold text-sm sm:text-base shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleViewClick}
            >
              {statusValue === 1 ? 'شروع سرمایه گذاری' : 'مشاهده جزئیات'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 text-sm transition-all duration-300 flex items-center gap-2"
              onClick={handleShare}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

CartPlan.propTypes = {
  trace_code: PropTypes.string.isRequired,
  persianName: PropTypes.string.isRequired,
  rateOfReturn: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  crowdFundingType: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  statusSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amountCollectedNow: PropTypes.number.isRequired,
  realPersonMinPrice: PropTypes.number.isRequired,
  approved_underwriting_start_date: PropTypes.string,
  payment_date: PropTypes.string
};

export default CartPlan;
