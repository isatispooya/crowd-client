import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressLineChart from 'src/components/progressLine';
import { OnRun } from 'src/api/OnRun';
import { formatNumber } from 'src/utils/formatNumbers';
import PercentageCollected from 'src/utils/percentCollected';
import usePicure from '../service/use-picture';
import DateDifference from './dateDifference';

const CartPlan = ({
  trace_code,
  persianName,
  industryGroup,
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
  message,
  crowdFundingtypeDescription,
}) => {
  const navigate = useNavigate();

  const { data: picture } = usePicure(trace_code);

  const statusValue = parseInt(statusSecond, 10);

  const isCompleted = statusValue === 4;

  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  const statusMapping = {
    1: 'شروع شده',
    2: 'جمع آوری شده',
    3: 'تمدید شده',
    4: 'تکمیل شده',
    5: 'سر رسید ناموفق',
  };

  return (
    <div
      className={`flex flex-col gap-4 p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl w-full sm:w-96 h-auto mx-auto ${
        isCompleted ? 'bg-gray-300' : 'bg-white'
      }`}
    >
      <div className="relative flex-col flex-grow">
        {picture && picture.picture ? (
          <div className="relative">
            <img
              src={`${OnRun}/${picture.picture}`}
              alt={persianName}
              className="w-full h-48 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
            />
            {isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg">
                <span className="text-white text-3xl font-bold">تکمیل شد</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img
              src="../../.../../public/img/nopic.jpg"
              alt="تصویر موجود نیست"
              className="w-full h-48 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
            />
            {isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg">
                <span className="text-white text-3xl font-bold">تکمیل شد</span>
              </div>
            )}
          </div>
        )}
        <div className="grid gap-4">
          <h2 className="text-2xl flex justify-center mt-2 items-center font-bold text-gray-900 mb-2">
          {persianName}          </h2>
        </div>
      
        <div className="grid gap-2 mt-4">
          <p className="text-sm text-gray-700">
            مبلغ کل: <span className="font-semibold">{formatNumber(totalPrice)} ریال</span>
          </p>

          <p className="text-sm text-gray-700">
              شرکت: <span className="font-semibold">{company}</span>
          </p>
          <p className="text-sm text-gray-700">
            تعداد گواهی‌های شراکت: <span className="font-semibold">{totalUnits}</span>
          </p>
          <p className="text-sm text-gray-700">
            نوع تامین مالی: <span className="font-semibold">{crowdFundingType}</span>
          </p>
          <p className="text-sm text-gray-700">
            تاریخ جمع آوری وجوه:<span className="font-semibold"><DateDifference/></span>
          </p>
          <p className="text-sm text-gray-700">
            وضعیت پروژه:{' '}
            <span className="font-semibold">{statusMapping[statusValue] || 'نامشخص'}</span>
          </p>
          <p className="text-sm text-gray-700">
            حداقل سرمایه‌گذاری حقیقی:{' '}
            <span className="font-semibold">{formatNumber(realPersonMinPrice)} ریال</span>
          </p>
        </div>
        <div className="grid gap-2 mt-4">
          <ProgressLineChart
            progress= {Math.round(formatNumber(amountCollectedNow / totalPrice) * 100) / 100}
            label="تامین شده"
          />
        </div>
        <PercentageCollected/>
        </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="bg-blue-600 text-white rounded-md px-6 py-3 w-full sm:w-auto transition-transform hover:scale-105 "
          onClick={handleViewClick}
        >
          مشاهده جزئیات
        </button>
      </div>
    </div>
  );
};

CartPlan.propTypes = {
  trace_code: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  persianName: PropTypes.string.isRequired,
  industryGroup: PropTypes.string.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  crowdFundingType: PropTypes.isRequired,
  projectStatus: PropTypes.bool.isRequired,
  settlementDescription: PropTypes.func.isRequired,
  realPersonMinPrice: PropTypes.isRequired,
  creation_date: PropTypes.isRequired,
  amountCollectedNow: PropTypes.isRequired,
  crowdFundingtypeDescription: PropTypes.isRequired,
  persoanApprovedSymbol: PropTypes.isRequired,
  statusSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CartPlan;
