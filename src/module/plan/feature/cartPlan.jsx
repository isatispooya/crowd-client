import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressLineChart from 'src/components/progressLine';
import { OnRun } from 'src/api/OnRun';
import { formatNumber } from 'src/utils/formatNumbers';
import { motion } from 'framer-motion';
import CountdownTimer from 'src/components/countDown';
import usePicure from '../service/use-picture';

const CartPlan = ({
  trace_code,
  persianName,
  rateOfReturn,
  totalUnits,
  totalPrice,
  crowdFundingType,
  company,
  endDate,
  startDate,
  statusSecond,
  amountCollectedNow,
  realPersonMinPrice,
}) => {
  const navigate = useNavigate();
  const { data: picture } = usePicure(trace_code);

  const statusValue = parseInt(statusSecond, 10);
  const isCompleted = statusValue === 4;

  const statusMapping = {
    1: 'شروع شده',
    2: 'جمع‌آوری شده',
    3: 'تمدید شده',
    4: 'سر رسید ناموفق',
    5: 'تکمیل شده',
  };

  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-xl transition-shadow hover:shadow-2xl w-full sm:w-96 mx-auto h-full ${
        isCompleted ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      <div className="relative flex flex-col flex-grow h-full space-y-2">
        <div className="relative">
          <img
            src={picture?.picture ? `${OnRun}/${picture.picture}` : '/img/nopic.jpg'}
            alt={persianName || 'تصویر موجود نیست'}
            className="w-full max-h-60 sm:max-h-72 lg:max-h-96 object-cover rounded-3xl"
            style={{ width: '100%', height: 'auto' }}
          />

          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-blue-500 py-1 px-2 sm:px-4 rounded-full text-white text-xs sm:text-sm font-medium shadow-md">
            {statusMapping[statusValue]}
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-8 sm:w-14 sm:h-10 flex items-center justify-center bg-green-600 rounded-full text-white text-xs sm:text-sm font-semibold shadow-md">
            %{rateOfReturn}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-inner">
          <div className="px-2 sm:px-4 py-2 sm:py-3 my-3 sm:my-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center text-gray-800">
              {persianName}
            </h2>
          </div>

          <div className="grid gap-2 sm:gap-4 text-gray-700 px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm">مبلغ کل:</span>
              <span className="text-sm sm:text-base font-bold">
                {formatNumber(totalPrice)} ریال
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium">شرکت:</span>
              <span className="text-sm sm:text-base font-bold">{company}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium">تعداد گواهی‌های شراکت:</span>
              <span className="text-sm sm:text-base font-bold">{totalUnits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium">نوع تامین مالی:</span>
              <span className="text-sm sm:text-base font-bold">{crowdFundingType}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs sm:text-sm font-medium">حداقل سرمایه‌گذاری:</span>
              <span className="text-sm sm:text-base font-bold">
                {formatNumber(realPersonMinPrice)} ریال
              </span>
            </div>
          </div>
        </div>

        <div className="px-1">
          <ProgressLineChart
            progress={Math.round((amountCollectedNow / totalPrice) * 100)}
            label="تامین شده"
          />

          <CountdownTimer startDate={startDate} endDate={endDate} />
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="text-white bg-gradient-to-r from-[#004ff9] to-[#000000] hover:text-blue-300 rounded-full px-3 sm:px-4 py-2 sm:py-3 w-full sm:w-auto font-bold text-sm sm:text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleViewClick}
        >
          {statusValue === 1 ? 'شروع سرمایه گذاری' : 'مشاهده جزئیات'}
        </motion.button>
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
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  statusSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amountCollectedNow: PropTypes.number.isRequired,
  realPersonMinPrice: PropTypes.number.isRequired,
};

export default CartPlan;


