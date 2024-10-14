/* eslint-disable import/no-extraneous-dependencies */
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
  projectStatus,
  settlementDescription,
  persoanApprovedSymbol,
  realPersonMinPrice,
  creation_date,
  statusSecond,
  amountCollectedNow,
  company,
  endDate,
  startDate,
  statusShow,
}) => {
  const navigate = useNavigate();
  const { data: picture } = usePicure(trace_code);

  const statusValue = parseInt(statusSecond, 10);
  const isCompleted = statusValue === 4;

  const statusMapping = {
    1: 'شروع شده',
    2: 'جمع‌آوری شده',
    3: 'تمدید شده',
    4: 'تکمیل شده',
    5: 'سر رسید ناموفق',
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
      className={`flex flex-col gap-6 p-6 rounded-xl shadow-lg transition-shadow hover:shadow-2xl w-full sm:w-96 mx-auto h-full ${
        isCompleted ? 'bg-gray-300' : 'bg-gray-50'
      }`}
    >
      <div className="relative flex flex-col flex-grow h-full">
        <div className="relative">
          <motion.img
            src={picture?.picture ? `${OnRun}/${picture.picture}` : '/img/nopic.jpg'}
            alt={persianName || 'تصویر موجود نیست'}
            className="w-full h-52 object-cover rounded-2xl mb-4"
            whileHover={{ scale: 1.1 }}
          />

          <div className="absolute top-4 left-4 bg-blue-600 py-1 px-3 rounded-md text-white text-xs font-bold">
            {statusMapping[statusValue]}
          </div>
          <div className="absolute top-4 right-4 w-12 h-8 flex items-center justify-center bg-green-500 rounded-full text-white text-xs font-bold">
            %{rateOfReturn}
          </div>

        </div>

        <div className="px-4 py-2">
          <h2 className="text-lg text-center font-bold text-gray-700 mb-4 tracking-wide">
            {persianName}
          </h2>
        </div>

        <div className="grid gap-4 mt-4 text-gray-800 px-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm ">مبلغ کل:</span>
            <span className="text-sm ">{formatNumber(totalPrice)} ریال</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm ">شرکت:</span>
            <span className="text-sm ">{company}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm ">تعداد گواهی‌های شراکت:</span>
            <span className="text-sm ">{totalUnits}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm ">نوع تامین مالی:</span>
            <span className="text-sm">{crowdFundingType}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm ">حداقل سرمایه‌گذاری:</span>
            <span className="text-sm ">{formatNumber(realPersonMinPrice)} ریال</span>
          </div>
        </div>

        <div className="mt-6 px-4">
          <ProgressLineChart
            progress={Math.round((amountCollectedNow / totalPrice) * 100)}
            label="تامین شده"
          />
          <p className="text-center flex justify-between text-sm font-semibold text-gray-900 mt-2 p-4 ">
            <span className="text-green-600">{formatNumber(totalPrice ?? 0)} مبلغ مورد نیاز </span>
            <span className="text-gray-900">
              {formatNumber(amountCollectedNow ?? 0)}ریال تامین شده
            </span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <CountdownTimer startDate={startDate} endDate={endDate} />
      </div>
      <div className="flex justify-center mt-8 px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="bg-blue-600 text-white rounded-md px-8 py-3 w-full sm:w-auto"
          onClick={handleViewClick}
        >
          {statusValue === 1 ? 'شروع سرمایه گذاری' : 'مشاهده جزئیات'}
        </motion.button>
      </div>
    </motion.div>
  );
};

CartPlan.propTypes = {
  statusShow: PropTypes.bool.isRequired,
  trace_code: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  persianName: PropTypes.string.isRequired,
  rateOfReturn: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  crowdFundingType: PropTypes.string.isRequired,
  projectStatus: PropTypes.bool.isRequired,
  settlementDescription: PropTypes.func.isRequired,
  realPersonMinPrice: PropTypes.number.isRequired,
  creation_date: PropTypes.string.isRequired,
  amountCollectedNow: PropTypes.number.isRequired,
  persoanApprovedSymbol: PropTypes.string.isRequired,
  statusSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CartPlan;
